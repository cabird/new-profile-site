from flask import Flask, send_from_directory, send_file, request, Response, stream_with_context, session, jsonify
from flask_apscheduler import APScheduler
from datetime import datetime, timedelta
from dotenv import load_dotenv
from openai import AzureOpenAI
import threading
import logging
import secrets
import tiktoken
import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

# Import chat storage implementations
from chat_store_base import ChatStore
from chat_store_memory import InMemoryChatStore
from chat_store_redis import RedisChatStore

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Constants
MAX_MESSAGE_TOKENS = 1000
MAX_MESSAGES_PER_CONVERSATION = 10
MAX_MESSAGES_PER_HOUR = 20
INACTIVITY_TIMEOUT_MINUTES = 10
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
# Chat Storage Abstraction Layer
# ============================================================================

# Chat storage classes are now imported from separate modules
# See: chat_store_base.py, chat_store_memory.py, chat_store_redis.py


# ============================================================================
# PostgreSQL Analytics Logging
# ============================================================================

def get_db_connection():
    """Get database connection using DATABASE_URL from environment."""
    database_url = os.getenv('DATABASE_URL')
    if not database_url:
        logger.warning("DATABASE_URL not set - analytics logging disabled")
        return None

    try:
        conn = psycopg2.connect(database_url)
        return conn
    except Exception as e:
        logger.error(f"Failed to connect to database: {e}")
        return None


def init_analytics_db():
    """Initialize database tables for analytics."""
    conn = get_db_connection()
    if not conn:
        return

    try:
        with conn.cursor() as cur:
            # Chat messages table
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

            # Create indexes
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


def get_client_ip():
    """Get client IP address, handling proxies and load balancers."""
    # Check for X-Forwarded-For header (Render, Cloudflare, etc.)
    if request.headers.get('X-Forwarded-For'):
        # X-Forwarded-For can be a list: "client, proxy1, proxy2"
        # First IP is the original client
        return request.headers.get('X-Forwarded-For').split(',')[0].strip()

    # Check for X-Real-IP header
    if request.headers.get('X-Real-IP'):
        return request.headers.get('X-Real-IP')

    # Fall back to remote_addr
    return request.remote_addr


def log_chat_message(session_id, paper_id, role, content, token_count=None, ip_address=None):
    """Log a chat message to the database."""
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
# Flask App Initialization
# ============================================================================

app = Flask(__name__, static_folder='.')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY') or secrets.token_hex(32)

# Global instances
paper_chat_client = None
chat_store = None
paper_data_cache = None
canned_questions = []
scheduler = APScheduler()


# ============================================================================
# Initialization Functions
# ============================================================================

def count_tokens(text, model="gpt-4"):
    """Count tokens in a text string."""
    try:
        encoding = tiktoken.encoding_for_model(model)
        return len(encoding.encode(text))
    except:
        # Fallback: rough estimate
        return len(text) // 4


def initialize_paper_data():
    """Load and cache paper data with chat availability at startup."""
    global paper_data_cache

    # Load paper_data.json once
    with open('paper_data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    papers = data.get('papers', {})

    # Pre-compute chat availability for each paper
    chat_available_count = 0
    for paper_id, paper in papers.items():
        # Determine markdown filename
        markdown_filename = paper.get('markdown') or (paper.get('mapped_pdf') or '').replace('.pdf', '.md')

        # Check if markdown file exists
        if markdown_filename:
            markdown_path = os.path.join('markdowns', markdown_filename)
            paper['chat_available'] = os.path.exists(markdown_path)
            if paper['chat_available']:
                chat_available_count += 1
        else:
            paper['chat_available'] = False

    # Cache the data
    paper_data_cache = data

    logger.info(f"Loaded {len(papers)} papers")
    logger.info(f"Chat available for {chat_available_count} papers")

    return data


def load_paper_markdown(paper_id):
    """Load markdown content for a paper from cache.

    Returns (paper_dict, markdown_content) or (None, None) if not available.
    """
    # Get paper from cache
    paper = paper_data_cache['papers'].get(paper_id)

    if not paper or not paper.get('chat_available'):
        return None, None

    # Determine markdown filename
    markdown_filename = paper.get('markdown') or (paper.get('mapped_pdf') or '').replace('.pdf', '.md')

    if not markdown_filename:
        return None, None

    # Load markdown content
    markdown_path = os.path.join('markdowns', markdown_filename)

    try:
        with open(markdown_path, 'r', encoding='utf-8') as f:
            content = f.read()

        if not content.strip():
            logger.warning(f"Empty markdown file for paper {paper_id}")
            return None, None

        return paper, content

    except Exception as e:
        logger.error(f"Failed to load markdown for paper {paper_id}: {e}")
        return None, None


def load_canned_questions():
    """Load canned questions from JSON file."""
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
    """Initialize all components at app startup."""
    global paper_chat_client, chat_store, paper_data_cache

    # 1. Load and cache paper data with availability
    paper_data_cache = initialize_paper_data()

    # 2. Load canned questions
    load_canned_questions()

    # 3. Initialize Azure OpenAI client
    try:
        paper_chat_client = AzureOpenAI(
            azure_endpoint=os.getenv('AZURE_OPENAI_PAPER_CHAT_ENDPOINT'),
            api_key=os.getenv('AZURE_OPENAI_PAPER_CHAT_KEY'),
            api_version=os.getenv('AZURE_OPENAI_PAPER_CHAT_API_VERSION', '2024-02-01')
        )
        logger.info("Paper chat client initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize paper chat client: {e}")
        paper_chat_client = None

    # 4. Initialize chat store based on environment configuration
    chat_storage_backend = os.getenv('CHAT_STORAGE_BACKEND', 'memory').lower()

    if chat_storage_backend == 'redis':
        # Use Redis for multi-worker deployments
        try:
            chat_store = RedisChatStore(
                max_messages_per_hour=MAX_MESSAGES_PER_HOUR,
                inactivity_timeout_minutes=INACTIVITY_TIMEOUT_MINUTES
            )
            logger.info("✅ Using Redis chat store - supports multiple workers!")
        except Exception as e:
            logger.error(f"Failed to initialize Redis chat store: {e}")
            logger.error("Redis is required when CHAT_STORAGE_BACKEND=redis")
            logger.error("Please ensure Redis is running and REDIS_URL is correctly configured")
            chat_store = None  # Chat will be disabled
    else:
        # Default to in-memory for backward compatibility
        chat_store = InMemoryChatStore(
            max_messages_per_hour=MAX_MESSAGES_PER_HOUR,
            inactivity_timeout_minutes=INACTIVITY_TIMEOUT_MINUTES
        )
        logger.warning("Using in-memory chat store - requires single worker (gunicorn --workers=1)")
        logger.info("Set CHAT_STORAGE_BACKEND=redis for multi-worker support")

    # 5. Initialize analytics database
    init_analytics_db()

    # 6. Initialize cleanup scheduler (only needed for in-memory storage)
    if chat_store and isinstance(chat_store, InMemoryChatStore):
        scheduler.init_app(app)
        scheduler.start()
        scheduler.add_job(
            id='cleanup_conversations',
            func=lambda: chat_store.cleanup_inactive(),
            trigger='interval',
            minutes=CLEANUP_INTERVAL_MINUTES
        )
        logger.info("Chat cleanup scheduler started for in-memory storage")
    elif chat_store and isinstance(chat_store, RedisChatStore):
        logger.info("Redis TTL handles cleanup automatically - scheduler not needed")


# Run initialization
initialize_app()


# ============================================================================
# Routes
# ============================================================================

@app.route('/')
def index():
    """Serve the main index.html page"""
    return send_file('index.html')

@app.route('/publications.html')
def publications():
    """Serve the publications page"""
    return send_file('publications.html')

@app.route('/api/paper_data.json')
def get_paper_data():
    """Serve paper data with pre-computed chat availability"""
    return jsonify(paper_data_cache)

@app.route('/api/canned_questions')
def get_canned_questions():
    """Serve canned questions for chat"""
    return jsonify({'questions': canned_questions})


# ============================================================================
# Chat API Endpoints
# ============================================================================

@app.route('/api/papers/<path:paper_id>/chat', methods=['POST'])
def chat_with_paper(paper_id):
    """Chat with a specific paper using Azure OpenAI streaming."""

    # Ensure session is initialized
    if 'id' not in session:
        session['id'] = os.urandom(16).hex()

    session_id = session['id']

    # Validate services available
    if not paper_chat_client:
        return jsonify({'error': 'Chat service unavailable'}), 503

    if not chat_store:
        return jsonify({'error': 'Chat storage unavailable'}), 503

    # Get and validate message
    data = request.get_json()
    user_message = data.get('message', '').strip()

    if not user_message:
        return jsonify({'error': 'Message is required'}), 400

    # Check token count
    token_count = count_tokens(user_message)
    if token_count > MAX_MESSAGE_TOKENS:
        return jsonify({
            'error': f'Message too long. Maximum {MAX_MESSAGE_TOKENS} tokens, got {token_count}'
        }), 400

    # Get client IP for logging
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
        # Load paper content
        paper, content = load_paper_markdown(paper_id)
        if not paper or not content:
            return jsonify({'error': 'Paper or markdown not found'}), 404

        # Determine venue based on publication type
        venue = 'Unknown'
        if paper.get('type') == 'inproceedings':
            venue = paper.get('booktitle') or paper.get('venue', 'Unknown')
        elif paper.get('type') == 'article':
            venue = paper.get('journal') or paper.get('venue', 'Unknown')
        else:
            venue = paper.get('venue', 'Unknown')

        # Create system message with full metadata
        system_message = SYSTEM_PROMPT_TEMPLATE.format(
            title=paper.get('title', 'Unknown'),
            authors=paper.get('authors', 'Unknown'),
            year=paper.get('year', 'Unknown'),
            venue=venue,
            content=content
        )

        # Initialize conversation (this clears any other active chats for session)
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
    chat_store.add_message(session_id, paper_id, 'user', user_message)

    # Log user message to database
    log_chat_message(session_id, paper_id, 'user', user_message, token_count, client_ip)

    # Increment rate limit counter
    chat_store.increment_rate_limit(session_id)

    def generate_sse():
        """Generate SSE stream."""
        try:
            # Get updated conversation
            conv = chat_store.get_conversation(session_id, paper_id)

            # Create streaming completion
            stream = paper_chat_client.chat.completions.create(
                model=os.getenv('AZURE_OPENAI_PAPER_CHAT_DEPLOYMENT'),
                messages=conv['messages'],
                stream=True
            )

            full_response = ""

            # Stream chunks
            for chunk in stream:
                if chunk.choices and chunk.choices[0].delta.content:
                    content = chunk.choices[0].delta.content
                    full_response += content
                    yield f"data: {json.dumps({'type': 'chat_chunk', 'content': content})}\n\n"

            # Add assistant response to conversation
            chat_store.add_message(session_id, paper_id, 'assistant', full_response)

            # Log assistant response to database
            response_token_count = count_tokens(full_response)
            log_chat_message(session_id, paper_id, 'assistant', full_response, response_token_count, client_ip)

            # Send completion with metadata
            _, remaining, _ = chat_store.check_rate_limit(session_id)
            msg_count = chat_store.get_message_count(session_id, paper_id)

            yield f"data: {json.dumps({'type': 'chat_complete', 'remaining_messages': remaining, 'message_count': msg_count})}\n\n"

        except Exception as e:
            logger.error(f"Chat error: {e}")
            yield f"data: {json.dumps({'type': 'error', 'message': 'An error occurred. Please try again.'})}\n\n"

    return Response(
        stream_with_context(generate_sse()),
        mimetype='text/event-stream',
        headers={
            'Cache-Control': 'no-cache',
            'X-Accel-Buffering': 'no',
            'Connection': 'keep-alive',
        }
    )


@app.route('/api/papers/<path:paper_id>/chat', methods=['DELETE'])
def clear_paper_chat(paper_id):
    """Clear chat for a specific paper."""
    if 'id' not in session:
        return jsonify({'message': 'No active session'})

    session_id = session['id']

    if chat_store:
        chat_store.delete_conversation(session_id, paper_id)

    return jsonify({'message': 'Chat cleared successfully'})


@app.route('/AI_where_it_matters/')
@app.route('/AI_where_it_matters')
def ai_matters_index():
    """Serve AI_where_it_matters index page"""
    return send_from_directory('AI_where_it_matters', 'index.html')

@app.route('/AI_where_it_matters/<path:path>')
def serve_ai_matters(path):
    """Serve static content from AI_where_it_matters directory"""
    return send_from_directory('AI_where_it_matters', path)

@app.route('/<path:path>')
def serve_static(path):
    """Serve all other static files (JS, CSS, JSON, PDFs, etc.)"""
    return send_from_directory('.', path)

if __name__ == '__main__':
    # For local development
    app.run(debug=True, host='0.0.0.0', port=5000)
