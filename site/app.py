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

# Register .jsx MIME type before anything else
import mimetypes
mimetypes.add_type('application/javascript', '.jsx')

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


BLOG_SYSTEM_PROMPT_TEMPLATE = """You are an AI assistant for discussing a specific blog post written by Christian Bird.

STRICT RULES:
1. You MUST ONLY answer questions about this blog post and closely related topics (e.g., "what is the author's take on X" where X is discussed in the post).
2. If the user asks ANYTHING unrelated to the post or its topic area, respond ONLY with: "I can only talk about this blog post."
3. Do not engage with off-topic requests, personal questions, or general queries.
4. Do not help with unrelated tasks, even if framed as research-related.
5. Stay focused on the post content. Use it as the primary source for answers.
6. Be substantive and concrete. Quote or reference specific parts of the post when helpful.

Post Metadata:
- Title: {title}
- Subtitle: {subtitle}
- Date: {date}
- Tags: {tags}

Post Content:
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
terminal_filesystem = ""
terminal_bio_info = ""


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


def safe_dirname(paper_id):
    """Sanitize paper ID for use as a directory name."""
    return paper_id.replace("/", "_").replace(":", "_").replace(" ", "_")


def load_paper_markdown(paper_id):
    paper = paper_data_cache['papers'].get(paper_id)
    if not paper:
        return None, None, None

    # Prefer extracted/ directory (from batch_extract.py)
    extracted_dir = os.path.join('..', 'extracted', safe_dirname(paper_id))
    extracted_md = os.path.join(extracted_dir, 'combined.md')
    if os.path.exists(extracted_md):
        try:
            with open(extracted_md, 'r', encoding='utf-8') as f:
                content = f.read()
            if content.strip():
                return paper, content, safe_dirname(paper_id)
        except Exception as e:
            logger.error(f"Failed to load extracted markdown for {paper_id}: {e}")

    # Fall back to markdowns/ directory
    if not paper.get('chat_available'):
        return None, None, None
    markdown_filename = paper.get('markdown') or (paper.get('mapped_pdf') or '').replace('.pdf', '.md')
    if not markdown_filename:
        return None, None, None

    markdown_path = os.path.join('markdowns', markdown_filename)
    try:
        with open(markdown_path, 'r', encoding='utf-8') as f:
            content = f.read()
        if not content.strip():
            return None, None, None
        return paper, content, None
    except Exception as e:
        logger.error(f"Failed to load markdown for paper {paper_id}: {e}")
        return None, None, None


blog_posts_cache = {}  # slug -> {title, date, tags, description, slug}


def parse_frontmatter(text):
    """Parse simple YAML-ish frontmatter. Returns (metadata_dict, body_text)."""
    if not text.startswith('---'):
        return {}, text
    end = text.find('\n---', 3)
    if end == -1:
        return {}, text
    fm_text = text[3:end].strip()
    body = text[end + 4:].lstrip('\n')

    metadata = {}
    for line in fm_text.split('\n'):
        line = line.strip()
        if not line or ':' not in line:
            continue
        key, _, value = line.partition(':')
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        # Handle list values like [tag1, tag2]
        if value.startswith('[') and value.endswith(']'):
            value = [v.strip().strip('"').strip("'") for v in value[1:-1].split(',') if v.strip()]
        metadata[key] = value
    return metadata, body


def load_blog_posts():
    """Scan blog/ directory and cache post metadata."""
    global blog_posts_cache
    blog_posts_cache = {}
    blog_dir = os.path.join('..', 'blog')
    if not os.path.isdir(blog_dir):
        logger.info("No blog/ directory found")
        return

    for slug in sorted(os.listdir(blog_dir)):
        post_dir = os.path.join(blog_dir, slug)
        post_md = os.path.join(post_dir, 'post.md')
        if not os.path.isfile(post_md):
            continue
        try:
            with open(post_md, 'r', encoding='utf-8') as f:
                text = f.read()
            metadata, _ = parse_frontmatter(text)
            blog_posts_cache[slug] = {
                'slug': slug,
                'title': metadata.get('title', slug),
                'subtitle': metadata.get('subtitle', ''),
                'filename': metadata.get('filename', slug),
                'authors': metadata.get('authors', ''),
                'date': metadata.get('date', ''),
                'tags': metadata.get('tags', []) if isinstance(metadata.get('tags'), list) else [],
                'description': metadata.get('description', ''),
            }
        except Exception as e:
            logger.error(f"Failed to load blog post {slug}: {e}")

    logger.info(f"Loaded {len(blog_posts_cache)} blog posts")


def load_blog_post_markdown(slug):
    """Return (metadata, body) for a single blog post, or (None, None)."""
    blog_dir = os.path.join('..', 'blog', slug)
    post_md = os.path.join(blog_dir, 'post.md')
    if not os.path.isfile(post_md):
        return None, None
    try:
        with open(post_md, 'r', encoding='utf-8') as f:
            text = f.read()
        return parse_frontmatter(text)
    except Exception as e:
        logger.error(f"Failed to load blog post {slug}: {e}")
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


def build_terminal_filesystem(paper_data):
    """Build a fake filesystem string from paper data for the terminal LLM."""
    papers = paper_data.get('papers', {})
    by_year = {}
    for pid, p in papers.items():
        year = str(p.get('year', 'unknown'))
        title = p.get('title', 'Untitled')
        # Create a slug filename from the title
        slug = title.lower()[:60].strip()
        for ch in [':', '?', '!', '"', "'", ',', ';', '(', ')', '[', ']']:
            slug = slug.replace(ch, '')
        slug = slug.replace(' ', '-').replace('--', '-').strip('-')
        by_year.setdefault(year, []).append(f"    {slug}.md ({title})")

    lines = ["/home/cbird/", "  papers/"]
    for year in sorted(by_year.keys(), reverse=True):
        lines.append(f"    {year}/")
        for entry in sorted(by_year[year]):
            lines.append(f"  {entry}")
    lines.extend([
        "  cv.pdf",
        "  about.txt",
        "  README.md",
        "  .bashrc",
        "  .env",
        "  .gitconfig",
        "  .ssh/",
        "    authorized_keys",
        "    id_ed25519.pub",
        "  .git/",
        "  .research_notes/",
        "    ideas.txt",
        "    reading_list.txt",
        "  todo.txt",
        "  scripts/",
        "    analyze_papers.py",
        "    build_site.sh",
        "    sync_bib.py",
        "  data/",
        "    collaboration_network.csv",
        "    citation_counts.json",
        "    yearly_stats.csv",
        "  drafts/",
        "    untitled-2026.md",
        "    review-response-draft.md",
        "  playlists/",
        "    coding.m3u",
        "    writing.m3u",
        "    deep-focus.m3u",
    ])
    return "\n".join(lines)


def build_terminal_bio(site_data):
    """Build bio info string for the terminal system prompt."""
    return (
        f"Name: {site_data.get('name', 'Christian Bird')}\n"
        f"Title: {site_data.get('title', 'Senior Principal Researcher')}\n"
        f"Affiliation: {site_data.get('affiliation', 'Microsoft Research')}\n"
        f"Bio: {site_data.get('about', '') or site_data.get('bio', '')}\n"
    )


def initialize_app():
    global paper_chat_client, chat_store, paper_data_cache
    global terminal_filesystem, terminal_bio_info

    paper_data_cache = initialize_paper_data()
    load_canned_questions()
    load_blog_posts()

    # Build terminal filesystem and bio
    terminal_filesystem = build_terminal_filesystem(paper_data_cache)
    try:
        with open('site_data.json', 'r', encoding='utf-8') as f:
            site_data = json.load(f)
        terminal_bio_info = build_terminal_bio(site_data)
    except Exception as e:
        logger.error(f"Failed to load site_data.json for terminal: {e}")
        terminal_bio_info = "Name: Christian Bird\nTitle: Senior Principal Researcher\nAffiliation: Microsoft Research\n"
    logger.info(f"Terminal filesystem built ({len(terminal_filesystem)} chars)")

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
    return redirect('/ide/')

@app.route('/classic')
@app.route('/classic/')
async def classic_site():
    return await send_file('index.html')

@app.route('/pages/about/')
@app.route('/pages/about')
async def redirect_old_about():
    return redirect('/classic', code=301)

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

    # Get or initialize conversation
    conversation = chat_store.get_conversation(session_id, paper_id)

    if not conversation:
        paper, content, _ = load_paper_markdown(paper_id)
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
                stream=True,
                reasoning_effort='medium'
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


@app.route('/api/blog/<slug>/chat', methods=['POST'])
async def chat_with_blog_post(slug):
    """Chat with a specific blog post using Azure OpenAI streaming."""

    session_id = get_session_id()
    # Use a distinct namespace for the conversation key
    conv_key = f'blog:{slug}'

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

    conversation = chat_store.get_conversation(session_id, conv_key)

    if not conversation:
        metadata, body = load_blog_post_markdown(slug)
        if not metadata or not body:
            return jsonify({'error': 'Blog post not found'}), 404

        tags = metadata.get('tags', [])
        if not isinstance(tags, list):
            tags = []

        system_message = BLOG_SYSTEM_PROMPT_TEMPLATE.format(
            title=metadata.get('title', slug),
            subtitle=metadata.get('subtitle', ''),
            date=metadata.get('date', ''),
            tags=', '.join(tags) if tags else 'none',
            content=body
        )

        messages = [{'role': 'system', 'content': system_message}]
        chat_store.init_conversation(session_id, conv_key, messages, message_count=0)
        conversation = chat_store.get_conversation(session_id, conv_key)

    message_count = chat_store.get_message_count(session_id, conv_key)
    if message_count >= MAX_MESSAGES_PER_CONVERSATION:
        return jsonify({
            'error': f'Conversation limit reached. Maximum {MAX_MESSAGES_PER_CONVERSATION} messages per chat.',
            'type': 'conversation_limit'
        }), 400

    last_activity = conversation.get('last_activity')
    if isinstance(last_activity, str):
        last_activity = datetime.fromisoformat(last_activity)

    inactive_duration = datetime.now() - last_activity
    if inactive_duration > timedelta(minutes=INACTIVITY_TIMEOUT_MINUTES):
        chat_store.delete_conversation(session_id, conv_key)
        return jsonify({
            'error': 'Chat ended due to inactivity',
            'type': 'timeout'
        }), 408

    try:
        chat_store.add_message(session_id, conv_key, 'user', user_message)
    except ConversationNotFoundError:
        return jsonify({
            'error': 'Your chat session expired. Please start a new conversation.',
            'type': 'conversation_expired'
        }), 410

    log_chat_message(session_id, conv_key, 'user', user_message, token_count, client_ip)
    chat_store.increment_rate_limit(session_id)

    async def generate_sse():
        try:
            conv = chat_store.get_conversation(session_id, conv_key)

            stream = await paper_chat_client.chat.completions.create(
                model=os.getenv('AZURE_OPENAI_PAPER_CHAT_DEPLOYMENT'),
                messages=conv['messages'],
                stream=True,
                reasoning_effort='medium'
            )

            full_response = ""

            async for chunk in stream:
                if chunk.choices and chunk.choices[0].delta.content:
                    content = chunk.choices[0].delta.content
                    full_response += content
                    yield f"data: {json.dumps({'type': 'chat_chunk', 'content': content})}\n\n"

            try:
                chat_store.add_message(session_id, conv_key, 'assistant', full_response)
            except ConversationNotFoundError:
                yield f"data: {json.dumps({'type': 'error', 'message': 'Session expired.'})}\n\n"
                return

            response_token_count = count_tokens(full_response)
            log_chat_message(session_id, conv_key, 'assistant', full_response, response_token_count, client_ip)

            _, remaining, _ = chat_store.check_rate_limit(session_id)
            msg_count = chat_store.get_message_count(session_id, conv_key)

            yield f"data: {json.dumps({'type': 'chat_complete', 'remaining_messages': remaining, 'message_count': msg_count})}\n\n"

        except Exception as e:
            logger.error(f"Blog chat error: {e}")
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


# ============================================================================
# Terminal API Endpoint
# ============================================================================

TERMINAL_MAX_COMMANDS_PER_HOUR = 20
TERMINAL_MAX_RESPONSE_TOKENS = 500

# Rate limits for terminal (separate from chat)
terminal_rate_limits = {}  # {session_id: {count, window_start}}


def check_terminal_rate_limit(session_id):
    now = datetime.now()
    if session_id not in terminal_rate_limits:
        terminal_rate_limits[session_id] = {'count': 0, 'window_start': now}
    data = terminal_rate_limits[session_id]
    if now - data['window_start'] > timedelta(hours=1):
        data['count'] = 0
        data['window_start'] = now
    if data['count'] >= TERMINAL_MAX_COMMANDS_PER_HOUR:
        reset_time = data['window_start'] + timedelta(hours=1)
        return False, 0, reset_time
    return True, TERMINAL_MAX_COMMANDS_PER_HOUR - data['count'], None


def increment_terminal_rate_limit(session_id):
    if session_id in terminal_rate_limits:
        terminal_rate_limits[session_id]['count'] += 1


@app.route('/api/terminal', methods=['POST'])
async def terminal_command():
    """LLM-powered fake terminal that simulates a bash shell."""

    session_id = get_session_id()

    if not paper_chat_client:
        return jsonify({'error': 'Terminal service unavailable'}), 503

    data = await request.get_json()
    command = data.get('command', '').strip()
    history = data.get('history', [])
    client_datetime = data.get('datetime', '')
    client_timezone = data.get('timezone', '')

    if not command:
        return jsonify({'error': 'Command is required'}), 400

    paper_count = len(paper_data_cache.get('papers', {}))
    years = sorted(set(p.get('year', '') for p in paper_data_cache.get('papers', {}).values() if p.get('year')))
    year_range = f"{years[0]}-{years[-1]}" if years else "2006-2026"
    venues = set(p.get('venue', '') for p in paper_data_cache.get('papers', {}).values() if p.get('venue'))

    system_prompt = f"""You are a bash shell running on Christian Bird's research server. You must act EXACTLY like a real bash terminal.

CRITICAL RULES:
- Respond ONLY with terminal output. No explanations, no markdown formatting, no commentary.
- Do NOT wrap output in code blocks or backticks.
- Maintain filesystem state based on conversation history (track cd commands, etc.)
- Never run interactive programs that need a TUI (vim, nano, top, htop, less, etc.) — print "This terminal does not support interactive programs. Try a non-interactive alternative."
- One-shot commands ARE allowed: python3 -c "...", node -e "...", perl -e "...", etc. Simulate their output realistically.
- python3, node, gcc, git, curl, wget, jq, awk, sed, sort, uniq, etc. are all "installed" — simulate their output.
- For truly unknown commands, output "bash: <cmd>: command not found"
- Keep responses concise and realistic.
- IMPORTANT: At the very end of EVERY response, append TWO hidden markers on their own lines. The user will not see them.
  1. Current working directory: __CWD__/current/path__CWD__
  2. Files in the current directory: __LS__file1.md,file2.txt,subdir/,another-dir/__LS__
  Directories MUST end with /. Separate entries with commas. Include hidden files (dotfiles).
  Example after cd ~/papers/2024:
  __CWD__/home/cbird/papers/2024__CWD__
  __LS__paper-one.md,paper-two.md,paper-three.md__LS__
  These MUST be the last two lines of every response.

SYSTEM INFO:
- User: cbird
- Hostname: research
- Home: /home/cbird
- OS: Ubuntu 24.04 LTS (Research Edition)
- Kernel: 6.8.0-research
- Shell: bash 5.2.21
- Current date/time: {client_datetime}
- Timezone: {client_timezone}

USER BIO:
{terminal_bio_info}

VIRTUAL FILESYSTEM:
{terminal_filesystem}

STATS:
- {paper_count} papers
- {len(venues)} venues
- Year range: {year_range}

FILE CONTENTS (available for cat/less/head/etc.):
- about.txt contains the user's bio text
- README.md: "# Christian Bird's Research Server\nWelcome! This server hosts my research papers, data, and tools.\nRun `help` to see what you can do."
- cv.pdf is a binary file (show "binary file" message if cat'd, suggest "see cv.pdf online")
- .bashrc contains typical bash config with aliases like ll='ls -la', research='cd ~/papers', alias papers='ls ~/papers', a PS1 prompt, and export EDITOR=code
- .env: Show "# Nice try ;)\nSECRET_KEY=definitely-not-a-real-key\nOPENAI_API_KEY=sk-fake-nice-try-though"
- .gitconfig: Show realistic git config with name "Christian Bird", email, default branch main, some aliases
- .ssh/authorized_keys: "# You really thought you'd find real keys here? :)"
- .ssh/id_ed25519.pub: "ssh-ed25519 AAAA... cbird@research (this is not a real key)"
- Papers are markdown files with title, authors, abstract, content
- .research_notes/ideas.txt: Generate 4-6 realistic but interesting research ideas each time. Mix of half-baked shower thoughts and serious directions. Should feel like a real researcher's scratchpad — some are exciting, some have "???" next to them.
- .research_notes/reading_list.txt: Generate a short reading list of classic and recent SE papers. Mix real-sounding titles. Vary each time.
- todo.txt: Generate ~10 items each time (mix of [ ] and [x]). Mix of real-sounding research tasks and funny mundane ones. Examples of the VIBE to aim for: finishing camera-ready papers, reviewing intern proposals, writing blog posts, replying to Reviewer 2, fixing the office coffee machine, figuring out why the CI is flaky, updating slides for a talk, reading that paper someone recommended 3 months ago, organizing the desk (again), submitting expense reports. Be creative — vary it every time, keep it funny and human.
- scripts/analyze_papers.py: A short Python script that imports pandas, loads citation_counts.json, and prints stats
- scripts/build_site.sh: A bash script that runs the scholarly IDE build
- scripts/sync_bib.py: A script that syncs BibTeX from DBLP
- data/collaboration_network.csv: CSV with columns "author1,author2,paper_count" showing a few co-author pairs
- data/citation_counts.json: JSON with a few papers and their citation counts
- data/yearly_stats.csv: CSV with year, paper_count, venue_count
- drafts/untitled-2026.md: Generate a funny incomplete paper draft. Has a vague title placeholder, a TODO abstract, and an intro that trails off. Should feel like a real "I'll finish this later" draft.
- drafts/review-response-draft.md: Generate a funny half-written reviewer response. Polite but with snarky TODO comments to self about being more diplomatic. Vary each time.
- playlists/coding.m3u: Generate a playlist of ~8 tracks. Draw from artists Christian actually likes: Depeche Mode, Erasure, Duran Duran, Fall Out Boy, Keen, Panic at the Disco, Information Society, Pet Shop Boys. Mix in some electronic/synthwave. Use real track names. Vary each time.
- playlists/writing.m3u: Generate a playlist of ~8 tracks. Draw from: Enya, Norah Jones, Adele, Toad the Wet Sprocket, REM, Taylor Swift. More chill/contemplative picks. Use real track names. Vary each time.
- playlists/deep-focus.m3u: Generate a playlist of ~8 tracks. Mix from all the above artists plus lo-fi and ambient. The vibe is "deep work at 2am." Use real track names. Vary each time.
- .git/: git log should show recent papers as commits with realistic messages, git status shows "nothing to commit, working tree clean", git branch shows "main"

SPECIAL COMMANDS (make these fun):
- neofetch: Show ASCII art penguin + system info (user, host, OS, kernel, shell, papers count, venues, career span)
- fortune: Show a random witty quote about research/academia/software engineering
- cowsay <text>: Show a cow saying the text (ASCII art)
- sl: Show a small ASCII steam locomotive animation (just a static frame since we can't animate)
- help: Show a list of "interesting" commands to try
- date: Show current date/time
- whoami: cbird
- hostname: research
- uname -a: Linux research 6.8.0-research #1 SMP x86_64 GNU/Linux
- uptime: show realistic uptime with load averages
- df -h: show filesystem with /home/cbird having realistic sizes
- free -h: show memory info
- ps aux: show a few fake processes (bash, python app.py, quart, etc.)
- cat /etc/os-release: Ubuntu 24.04 LTS research edition info
- grep/find/wc on papers directory should give realistic results
- ls should list files appropriately based on the filesystem above
- cat on paper .md files should show a brief realistic snippet (title, authors, abstract)
- tree: show directory tree structure

When listing papers, use the real titles from the filesystem above."""

    # Build messages: system + last 10 exchanges from history
    messages = [{'role': 'system', 'content': system_prompt}]
    # History is alternating user/assistant messages; keep last 10 exchanges (20 messages)
    trimmed = history[-20:] if len(history) > 20 else history
    for msg in trimmed:
        messages.append({'role': msg.get('role', 'user'), 'content': msg.get('content', '')})
    # Add the current command
    messages.append({'role': 'user', 'content': command})

    async def generate_sse():
        try:
            stream = await paper_chat_client.chat.completions.create(
                model=os.getenv('AZURE_OPENAI_PAPER_CHAT_DEPLOYMENT'),
                messages=messages,
                stream=True,
                max_completion_tokens=TERMINAL_MAX_RESPONSE_TOKENS,
                reasoning_effort='low'
            )

            async for chunk in stream:
                if chunk.choices and chunk.choices[0].delta.content:
                    content = chunk.choices[0].delta.content
                    yield f"data: {json.dumps({'type': 'terminal_chunk', 'content': content})}\n\n"

            yield f"data: {json.dumps({'type': 'terminal_complete'})}\n\n"

        except Exception as e:
            logger.error(f"Terminal error: {e}")
            yield f"data: {json.dumps({'type': 'error', 'message': 'Terminal error. Please try again.'})}\n\n"

    return Response(
        generate_sse(),
        mimetype='text/event-stream',
        headers={
            'Cache-Control': 'no-cache',
            'X-Accel-Buffering': 'no',
            'Connection': 'keep-alive',
        }
    )


AI_WHERE_IT_MATTERS_SYSTEM_PROMPT = None

def build_ai_where_it_matters_prompt():
    """Build the system prompt for the combined AI Where It Matters chat."""
    global AI_WHERE_IT_MATTERS_SYSTEM_PROMPT
    paper1_id = 'Choudhuri2026AIWhere'
    paper2_id = 'choudhuri2025copilot-beyond'

    _, content1, _ = load_paper_markdown(paper1_id)
    _, content2, _ = load_paper_markdown(paper2_id)

    p1 = paper_data_cache['papers'].get(paper1_id, {})
    p2 = paper_data_cache['papers'].get(paper2_id, {})

    AI_WHERE_IT_MATTERS_SYSTEM_PROMPT = f"""You are a research assistant for the "AI Where It Matters" companion website. You have access to two research papers from the same research program (860 Microsoft developers, surveyed July 2025).

PAPER I: "AI Where It Matters: Where, Why, and How Developers Want AI Support in Daily Work"
Authors: {p1.get('authors', 'Choudhuri, Badea, Bird, Butler, DeLine, Houck')}
Year: {p1.get('year', '2026')}
Venue: {p1.get('venue', 'ICSE-SEIP 2026')}
Focus: Maps developer AI demand across 20 SE tasks using a grounded taxonomy. Shows WHERE developers want AI and how much they currently use it.

PAPER II: "To Copilot and Beyond: 22 AI Systems Developers Want Built"
Authors: {p2.get('authors', 'Choudhuri, Bird, Badea, Sarma')}
Year: {p2.get('year', '2026')}
Venue: {p2.get('venue', 'arXiv Preprint')}
Focus: Derives 22 concrete AI systems from developer free-text responses, organized into 5 categories (Development, Design & Planning, Quality & Risk, Infrastructure & Ops, Meta-Work). Each system includes the problem, example capabilities, and constraints/guardrails developers insist on.

The website presents both papers together with:
- A "22 Systems Catalog" showing cards for each system with prevalence %, category, and problem description
- An "Opportunity Space" scatter plot mapping AI demand vs. current satisfaction across 20 SE tasks
- Inline paper readers for both papers

Key cross-cutting themes:
- "Bounded delegation": developers want AI for tedious/context-heavy work but retain craft and judgment
- Four recurring constraints: explicit authority scoping, provenance, uncertainty signaling, least-privilege access
- Developers spend ~10% of time coding; most AI tools target only that fraction

STRICT RULES:
1. You MUST ONLY answer questions about these papers, their findings, and closely related research topics.
2. If the user asks ANYTHING unrelated to the papers or research, respond ONLY with: "I can only discuss these research papers and related topics."
3. Do not engage with off-topic requests, personal questions, or general queries.
4. Do not help with unrelated tasks, even if framed as research-related.
5. Stay focused exclusively on the papers' content to answer questions first.
6. Cite specific findings with prevalence percentages when possible.
7. Reference which paper a finding comes from (Paper I or Paper II).
8. Be concise but substantive.
9. If asked about something not in the papers, say so honestly.

--- PAPER I CONTENT ---
{content1 or '(Paper I content not available)'}

--- PAPER II CONTENT ---
{content2 or '(Paper II content not available)'}
"""
    logger.info(f"AI Where It Matters prompt built ({len(AI_WHERE_IT_MATTERS_SYSTEM_PROMPT)} chars)")


@app.route('/api/chat/ai-where-it-matters', methods=['POST'])
async def chat_ai_where_it_matters():
    """Chat about both AI Where It Matters papers using Azure OpenAI streaming."""
    global AI_WHERE_IT_MATTERS_SYSTEM_PROMPT

    session_id = get_session_id()
    paper_id = 'ai-where-it-matters'

    if not paper_chat_client:
        return jsonify({'error': 'Chat service unavailable'}), 503

    if not chat_store:
        return jsonify({'error': 'Chat storage unavailable'}), 503

    # Build prompt on first use (lazy init)
    if AI_WHERE_IT_MATTERS_SYSTEM_PROMPT is None:
        build_ai_where_it_matters_prompt()

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

    # Get or initialize conversation
    conversation = chat_store.get_conversation(session_id, paper_id)

    if not conversation:
        messages = [{'role': 'system', 'content': AI_WHERE_IT_MATTERS_SYSTEM_PROMPT}]
        chat_store.init_conversation(session_id, paper_id, messages, message_count=0)
        conversation = chat_store.get_conversation(session_id, paper_id)

    # Check conversation message limit
    message_count = chat_store.get_message_count(session_id, paper_id)
    if message_count >= MAX_MESSAGES_PER_CONVERSATION:
        return jsonify({
            'error': f'Conversation limit reached. Maximum {MAX_MESSAGES_PER_CONVERSATION} messages per chat.',
            'type': 'conversation_limit'
        }), 400

    # Add user message
    try:
        chat_store.add_message(session_id, paper_id, 'user', user_message)
    except ConversationNotFoundError:
        return jsonify({
            'error': 'Your chat session expired. Please start a new conversation.',
            'type': 'conversation_expired'
        }), 410

    log_chat_message(session_id, paper_id, 'user', user_message, token_count, client_ip)

    async def generate_sse():
        try:
            conv = chat_store.get_conversation(session_id, paper_id)

            stream = await paper_chat_client.chat.completions.create(
                model=os.getenv('AZURE_OPENAI_PAPER_CHAT_DEPLOYMENT'),
                messages=conv['messages'],
                stream=True,
                reasoning_effort='medium'
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
                yield f"data: {json.dumps({'type': 'error', 'message': 'Session expired.'})}\n\n"
                return

            response_token_count = count_tokens(full_response)
            log_chat_message(session_id, paper_id, 'assistant', full_response, response_token_count, client_ip)

            msg_count = chat_store.get_message_count(session_id, paper_id)
            yield f"data: {json.dumps({'type': 'chat_complete', 'message_count': msg_count})}\n\n"

        except Exception as e:
            logger.error(f"AI Where It Matters chat error: {e}")
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


@app.route('/api/papers/<path:paper_id>/markdown')
async def get_paper_markdown(paper_id):
    paper, content, extracted_dir = load_paper_markdown(paper_id)
    if not paper or not content:
        return jsonify({'error': 'Paper or markdown not found'}), 404
    result = {'paper_id': paper_id, 'title': paper.get('title', ''), 'markdown': content}
    if extracted_dir:
        result['image_base'] = f'/extracted/{extracted_dir}'
    return jsonify(result)


@app.route('/extracted/<path:path>')
async def serve_extracted(path):
    return await send_from_directory(os.path.join('..', 'extracted'), path)


@app.route('/api/blog')
async def get_blog_index():
    """List all blog posts sorted by date descending."""
    posts = list(blog_posts_cache.values())
    posts.sort(key=lambda p: p.get('date', ''), reverse=True)
    return jsonify({'posts': posts})


@app.route('/api/blog/<slug>')
async def get_blog_post(slug):
    """Return markdown content and metadata for a single blog post."""
    metadata, body = load_blog_post_markdown(slug)
    if not metadata and not body:
        return jsonify({'error': 'Post not found'}), 404
    return jsonify({
        'slug': slug,
        'title': metadata.get('title', slug),
        'subtitle': metadata.get('subtitle', ''),
        'filename': metadata.get('filename', slug),
        'authors': metadata.get('authors', ''),
        'date': metadata.get('date', ''),
        'tags': metadata.get('tags', []) if isinstance(metadata.get('tags'), list) else [],
        'description': metadata.get('description', ''),
        'markdown': body,
        'image_base': f'/blog/{slug}',
    })


@app.route('/blog/<path:path>')
async def serve_blog_asset(path):
    """Serve blog assets (images, etc.) from blog/<slug>/<filename>."""
    return await send_from_directory(os.path.join('..', 'blog'), path)


@app.route('/ide')
async def ide_redirect():
    return redirect('/ide/')

@app.route('/ide/')
async def ide_index():
    return await send_from_directory('prototypes/scholarly-ide', 'index.html')

@app.route('/ide/<path:path>')
async def ide_assets(path):
    # If the path resolves to a real file inside the IDE directory, serve it.
    # Otherwise return index.html so the client-side router takes over.
    # Defense-in-depth: explicitly contain the path inside the IDE directory.
    ide_root = os.path.realpath(os.path.join('prototypes', 'scholarly-ide'))
    try:
        requested = os.path.realpath(os.path.join(ide_root, path))
    except Exception:
        return await send_from_directory('prototypes/scholarly-ide', 'index.html')

    inside = (requested == ide_root) or requested.startswith(ide_root + os.sep)
    if inside and os.path.isfile(requested):
        rel = os.path.relpath(requested, ide_root)
        return await send_from_directory('prototypes/scholarly-ide', rel)
    return await send_from_directory('prototypes/scholarly-ide', 'index.html')


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
