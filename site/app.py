from quart import Quart, send_from_directory, send_file, request, Response, session, jsonify, redirect
from quart_cors import cors
from datetime import datetime, timedelta
from dotenv import load_dotenv
from openai import AsyncAzureOpenAI
import asyncio
import logging
import secrets
import tiktoken
import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Version
APP_VERSION = '2.0.0'

# Constants
MAX_MESSAGE_TOKENS = 1000
MAX_MESSAGES_PER_CONVERSATION = 10
MAX_MESSAGES_PER_HOUR = 20
INACTIVITY_TIMEOUT_MINUTES = 60
CLEANUP_INTERVAL_MINUTES = 5

# System prompt template
SYSTEM_PROMPT_TEMPLATE = """You are an AI assistant for discussing a specific research paper.

STRICT RULES:
1. You MUST ONLY answer questions about this paper.  It's ok to be tangentially related such as "tell me about related work" or "how does this compare to X" where X is another paper.
2. But if the user asks ANYTHING unrelated to the paper or research, respond ONLY with: "I can only talk about this paper."  We want to stay within the domain of research.
3. Do not engage with off-topic requests, personal questions, or general queries
4. Do not help with unrelated tasks, even if framed as research-related
5. Stay focused exclusively and try to use the paper content to answer questions first.

Paper Metadata:
- Title: {title}
- Authors: {authors}
- Year: {year}
- Venue: {venue}

Paper Content:
{content}
"""


# ============================================================================
# In-Memory Chat Store
# ============================================================================

class ConversationNotFoundError(Exception):
    pass


class ChatStore:
    """In-memory chat store. Safe for single-process async (Quart/Hypercorn)."""

    def __init__(self, max_messages_per_hour: int = 20, inactivity_timeout_minutes: int = 10):
        self.conversations = {}  # {session_id: {paper_id: {...}}}
        self.rate_limits = {}    # {session_id: {count, window_start}}
        self.timeout = timedelta(minutes=inactivity_timeout_minutes)
        self.max_messages_per_hour = max_messages_per_hour

    def get_conversation(self, session_id, paper_id):
        if session_id not in self.conversations:
            return None
        return self.conversations[session_id].get(paper_id)

    def init_conversation(self, session_id, paper_id, messages, message_count=0):
        self.conversations[session_id] = {}
        self.conversations[session_id][paper_id] = {
            'messages': messages,
            'message_count': message_count,
            'last_activity': datetime.now()
        }

    def add_message(self, session_id, paper_id, role, content):
        conv = self.conversations.get(session_id, {}).get(paper_id)
        if not conv:
            raise ConversationNotFoundError(f"Conversation not found for {session_id}/{paper_id}")
        conv['messages'].append({'role': role, 'content': content})
        if role == 'user':
            conv['message_count'] += 1
        conv['last_activity'] = datetime.now()

    def delete_conversation(self, session_id, paper_id=None):
        if session_id not in self.conversations:
            return
        if paper_id:
            self.conversations[session_id].pop(paper_id, None)
        else:
            del self.conversations[session_id]

    def get_message_count(self, session_id, paper_id):
        conv = self.conversations.get(session_id, {}).get(paper_id)
        return conv['message_count'] if conv else 0

    def check_rate_limit(self, session_id):
        now = datetime.now()
        if session_id not in self.rate_limits:
            self.rate_limits[session_id] = {'count': 0, 'window_start': now}

        data = self.rate_limits[session_id]
        if now - data['window_start'] > timedelta(hours=1):
            data['count'] = 0
            data['window_start'] = now

        if data['count'] >= self.max_messages_per_hour:
            reset_time = data['window_start'] + timedelta(hours=1)
            return False, 0, reset_time

        return True, self.max_messages_per_hour - data['count'], None

    def increment_rate_limit(self, session_id):
        if session_id in self.rate_limits:
            self.rate_limits[session_id]['count'] += 1

    def cleanup_inactive(self):
        now = datetime.now()
        removed = 0
        for session_id in list(self.conversations):
            papers = self.conversations[session_id]
            for paper_id in list(papers):
                if now - papers[paper_id]['last_activity'] > self.timeout:
                    del papers[paper_id]
                    removed += 1
            if not papers:
                del self.conversations[session_id]
        if removed:
            logger.info(f"Cleaned up {removed} inactive conversations")
        return removed


# ============================================================================
# PostgreSQL Analytics Logging
# ============================================================================

def get_db_connection():
    database_url = os.getenv('DATABASE_URL')
    if not database_url:
        return None
    try:
        return psycopg2.connect(database_url)
    except Exception as e:
        logger.error(f"Failed to connect to database: {e}")
        return None


def init_analytics_db():
    conn = get_db_connection()
    if not conn:
        return
    try:
        with conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS chat_messages (
                    id SERIAL PRIMARY KEY,
                    session_id VARCHAR(255) NOT NULL,
                    paper_id VARCHAR(255) NOT NULL,
                    role VARCHAR(50) NOT NULL,
                    content TEXT NOT NULL,
                    token_count INTEGER,
                    ip_address VARCHAR(45),
                    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            cur.execute("""
                CREATE INDEX IF NOT EXISTS idx_session_paper
                ON chat_messages (session_id, paper_id)
            """)
            cur.execute("""
                CREATE INDEX IF NOT EXISTS idx_timestamp
                ON chat_messages (timestamp)
            """)
            conn.commit()
            logger.info("Analytics database tables initialized")
    except Exception as e:
        logger.error(f"Failed to initialize analytics database: {e}")
        conn.rollback()
    finally:
        conn.close()


def log_chat_message(session_id, paper_id, role, content, token_count=None, ip_address=None):
    conn = get_db_connection()
    if not conn:
        return
    try:
        with conn.cursor() as cur:
            cur.execute("""
                INSERT INTO chat_messages (session_id, paper_id, role, content, token_count, ip_address)
                VALUES (%s, %s, %s, %s, %s, %s)
            """, (session_id, paper_id, role, content, token_count, ip_address))
            conn.commit()
    except Exception as e:
        logger.error(f"Failed to log chat message: {e}")
        conn.rollback()
    finally:
        conn.close()


# ============================================================================
# Quart App Initialization
# ============================================================================

app = Quart(__name__, static_folder='.')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY') or secrets.token_hex(32)

# Configure CORS
app = cors(app,
           allow_origin=['https://cabird.github.io'],
           allow_credentials=True,
           allow_headers=['Content-Type', 'X-Session-ID'],
           expose_headers=['X-Session-ID'])

# Global instances
paper_chat_client = None
chat_store = None
paper_data_cache = None
canned_questions = []


# ============================================================================
# Initialization Functions
# ============================================================================

def count_tokens(text, model="gpt-4"):
    try:
        encoding = tiktoken.encoding_for_model(model)
        return len(encoding.encode(text))
    except:
        return len(text) // 4


def get_session_id():
    session_id = request.headers.get('X-Session-ID')
    if not session_id:
        if 'id' not in session:
            session['id'] = os.urandom(16).hex()
        session_id = session['id']
    return session_id


def get_client_ip():
    if request.headers.get('X-Forwarded-For'):
        return request.headers.get('X-Forwarded-For').split(',')[0].strip()
    if request.headers.get('X-Real-IP'):
        return request.headers.get('X-Real-IP')
    return request.remote_addr


def initialize_paper_data():
    global paper_data_cache
    with open('paper_data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    papers = data.get('papers', {})
    chat_available_count = 0
    for paper_id, paper in papers.items():
        markdown_filename = paper.get('markdown') or (paper.get('mapped_pdf') or '').replace('.pdf', '.md')
        if markdown_filename:
            markdown_path = os.path.join('markdowns', markdown_filename)
            paper['chat_available'] = os.path.exists(markdown_path)
            if paper['chat_available']:
                chat_available_count += 1
        else:
            paper['chat_available'] = False

    paper_data_cache = data
    logger.info(f"Loaded {len(papers)} papers")
    logger.info(f"Chat available for {chat_available_count} papers")
    return data


def load_paper_markdown(paper_id):
    paper = paper_data_cache['papers'].get(paper_id)
    if not paper or not paper.get('chat_available'):
        return None, None

    markdown_filename = paper.get('markdown') or (paper.get('mapped_pdf') or '').replace('.pdf', '.md')
    if not markdown_filename:
        return None, None

    markdown_path = os.path.join('markdowns', markdown_filename)
    try:
        with open(markdown_path, 'r', encoding='utf-8') as f:
            content = f.read()
        if not content.strip():
            return None, None
        return paper, content
    except Exception as e:
        logger.error(f"Failed to load markdown for paper {paper_id}: {e}")
        return None, None


def load_canned_questions():
    global canned_questions
    try:
        with open('canned_questions.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
            canned_questions = data.get('questions', [])
            logger.info(f"Loaded {len(canned_questions)} canned questions")
    except Exception as e:
        logger.error(f"Failed to load canned questions: {e}")
        canned_questions = []


def initialize_app():
    global paper_chat_client, chat_store, paper_data_cache

    paper_data_cache = initialize_paper_data()
    load_canned_questions()

    try:
        paper_chat_client = AsyncAzureOpenAI(
            azure_endpoint=os.getenv('AZURE_OPENAI_PAPER_CHAT_ENDPOINT'),
            api_key=os.getenv('AZURE_OPENAI_PAPER_CHAT_KEY'),
            api_version=os.getenv('AZURE_OPENAI_PAPER_CHAT_API_VERSION', '2024-02-01')
        )
        logger.info("Paper chat client initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize paper chat client: {e}")
        paper_chat_client = None

    chat_store = ChatStore(
        max_messages_per_hour=MAX_MESSAGES_PER_HOUR,
        inactivity_timeout_minutes=INACTIVITY_TIMEOUT_MINUTES
    )
    logger.info("Using in-memory chat store")

    init_analytics_db()


# Run initialization
initialize_app()


# Periodic cleanup task
async def cleanup_loop():
    while True:
        await asyncio.sleep(CLEANUP_INTERVAL_MINUTES * 60)
        chat_store.cleanup_inactive()


@app.before_serving
async def start_cleanup():
    app.add_background_task(cleanup_loop)


# ============================================================================
# Error handler — always return JSON for API routes
# ============================================================================

@app.errorhandler(500)
async def handle_500(error):
    return jsonify({'error': 'Internal server error'}), 500


# ============================================================================
# Routes
# ============================================================================

@app.route('/')
async def index():
    return await send_file('index.html')

@app.route('/pages/about/')
@app.route('/pages/about')
async def redirect_old_about():
    return redirect('/', code=301)

@app.route('/publications')
async def redirect_publications():
    return redirect('/publications.html', code=301)

@app.route('/publications.html')
async def publications():
    return await send_file('publications.html')

@app.route('/api/paper_data.json')
async def get_paper_data():
    return jsonify(paper_data_cache)

@app.route('/api/canned_questions')
async def get_canned_questions():
    return jsonify({'questions': canned_questions})

@app.route('/api/version')
async def get_version():
    return jsonify({'version': APP_VERSION})


# ============================================================================
# Chat API Endpoints
# ============================================================================

@app.route('/api/papers/<path:paper_id>/chat', methods=['POST'])
async def chat_with_paper(paper_id):
    """Chat with a specific paper using Azure OpenAI streaming."""

    session_id = get_session_id()

    if not paper_chat_client:
        return jsonify({'error': 'Chat service unavailable'}), 503

    if not chat_store:
        return jsonify({'error': 'Chat storage unavailable'}), 503

    data = await request.get_json()
    user_message = data.get('message', '').strip()

    if not user_message:
        return jsonify({'error': 'Message is required'}), 400

    token_count = count_tokens(user_message)
    if token_count > MAX_MESSAGE_TOKENS:
        return jsonify({
            'error': f'Message too long. Maximum {MAX_MESSAGE_TOKENS} tokens, got {token_count}'
        }), 400

    client_ip = get_client_ip()

    # Check rate limit
    allowed, remaining, reset_time = chat_store.check_rate_limit(session_id)
    if not allowed:
        return jsonify({
            'error': f'Rate limit exceeded. Limit resets at {reset_time.strftime("%H:%M")}',
            'type': 'rate_limit',
            'remaining': 0
        }), 429

    # Get or initialize conversation
    conversation = chat_store.get_conversation(session_id, paper_id)

    if not conversation:
        paper, content = load_paper_markdown(paper_id)
        if not paper or not content:
            return jsonify({'error': 'Paper or markdown not found'}), 404

        venue = 'Unknown'
        if paper.get('type') == 'inproceedings':
            venue = paper.get('booktitle') or paper.get('venue', 'Unknown')
        elif paper.get('type') == 'article':
            venue = paper.get('journal') or paper.get('venue', 'Unknown')
        else:
            venue = paper.get('venue', 'Unknown')

        system_message = SYSTEM_PROMPT_TEMPLATE.format(
            title=paper.get('title', 'Unknown'),
            authors=paper.get('authors', 'Unknown'),
            year=paper.get('year', 'Unknown'),
            venue=venue,
            content=content
        )

        messages = [{'role': 'system', 'content': system_message}]
        chat_store.init_conversation(session_id, paper_id, messages, message_count=0)
        conversation = chat_store.get_conversation(session_id, paper_id)

    # Check conversation message limit
    message_count = chat_store.get_message_count(session_id, paper_id)
    if message_count >= MAX_MESSAGES_PER_CONVERSATION:
        return jsonify({
            'error': f'Conversation limit reached. Maximum {MAX_MESSAGES_PER_CONVERSATION} messages per chat.',
            'type': 'conversation_limit'
        }), 400

    # Check for inactivity timeout
    last_activity = conversation.get('last_activity')
    if isinstance(last_activity, str):
        last_activity = datetime.fromisoformat(last_activity)

    inactive_duration = datetime.now() - last_activity
    if inactive_duration > timedelta(minutes=INACTIVITY_TIMEOUT_MINUTES):
        chat_store.delete_conversation(session_id, paper_id)
        return jsonify({
            'error': 'Chat ended due to inactivity',
            'type': 'timeout'
        }), 408

    # Add user message
    try:
        chat_store.add_message(session_id, paper_id, 'user', user_message)
    except ConversationNotFoundError:
        logger.warning(f"Conversation expired for {session_id}/{paper_id}")
        return jsonify({
            'error': 'Your chat session expired. Please start a new conversation.',
            'type': 'conversation_expired'
        }), 410

    log_chat_message(session_id, paper_id, 'user', user_message, token_count, client_ip)
    chat_store.increment_rate_limit(session_id)

    async def generate_sse():
        try:
            conv = chat_store.get_conversation(session_id, paper_id)

            stream = await paper_chat_client.chat.completions.create(
                model=os.getenv('AZURE_OPENAI_PAPER_CHAT_DEPLOYMENT'),
                messages=conv['messages'],
                stream=True
            )

            full_response = ""

            async for chunk in stream:
                if chunk.choices and chunk.choices[0].delta.content:
                    content = chunk.choices[0].delta.content
                    full_response += content
                    yield f"data: {json.dumps({'type': 'chat_chunk', 'content': content})}\n\n"

            try:
                chat_store.add_message(session_id, paper_id, 'assistant', full_response)
            except ConversationNotFoundError:
                logger.warning(f"Conversation expired during response for {session_id}/{paper_id}")
                yield f"data: {json.dumps({'type': 'error', 'message': 'Your chat session expired. Please start a new conversation.', 'error_type': 'conversation_expired'})}\n\n"
                return

            response_token_count = count_tokens(full_response)
            log_chat_message(session_id, paper_id, 'assistant', full_response, response_token_count, client_ip)

            _, remaining, _ = chat_store.check_rate_limit(session_id)
            msg_count = chat_store.get_message_count(session_id, paper_id)

            yield f"data: {json.dumps({'type': 'chat_complete', 'remaining_messages': remaining, 'message_count': msg_count})}\n\n"

        except ConversationNotFoundError:
            logger.warning(f"Conversation expired during stream for {session_id}/{paper_id}")
            yield f"data: {json.dumps({'type': 'error', 'message': 'Your chat session expired. Please start a new conversation.', 'error_type': 'conversation_expired'})}\n\n"
        except Exception as e:
            logger.error(f"Chat error: {e}")
            yield f"data: {json.dumps({'type': 'error', 'message': 'An error occurred. Please try again.'})}\n\n"

    return Response(
        generate_sse(),
        mimetype='text/event-stream',
        headers={
            'Cache-Control': 'no-cache',
            'X-Accel-Buffering': 'no',
            'Connection': 'keep-alive',
        }
    )


@app.route('/api/papers/<path:paper_id>/chat', methods=['DELETE'])
async def clear_paper_chat(paper_id):
    session_id = get_session_id()
    if chat_store:
        chat_store.delete_conversation(session_id, paper_id)
    return jsonify({'message': 'Chat cleared successfully'})


@app.route('/AI_where_it_matters/')
@app.route('/AI_where_it_matters')
async def ai_matters_index():
    return await send_from_directory('AI_where_it_matters', 'index.html')

@app.route('/AI_where_it_matters/<path:path>')
async def serve_ai_matters(path):
    return await send_from_directory('AI_where_it_matters', path)

@app.route('/<path:path>')
async def serve_static(path):
    return await send_from_directory('.', path)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
