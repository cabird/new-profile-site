from flask import Flask, send_from_directory, send_file, request, Response, stream_with_context, session, jsonify
from flask_apscheduler import APScheduler
from abc import ABC, abstractmethod
from datetime import datetime, timedelta
from dotenv import load_dotenv
from openai import AzureOpenAI
import threading
import logging
import secrets
import tiktoken
import json
import os

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
1. You MUST ONLY answer questions about this paper and directly related research concepts
2. If the user asks ANYTHING unrelated to the paper or research, respond ONLY with: "I can only provide information about the paper."
3. Do not engage with off-topic requests, personal questions, or general queries
4. Do not help with unrelated tasks, even if framed as research-related
5. Stay focused exclusively on the paper content provided below

Paper Title: {title}

Paper Content:
{content}
"""


# ============================================================================
# Chat Storage Abstraction Layer
# ============================================================================

class ChatStore(ABC):
    """Abstract storage interface for chat conversations and rate limiting."""

    @abstractmethod
    def get_conversation(self, session_id, paper_id):
        """Get conversation dict or None."""
        pass

    @abstractmethod
    def init_conversation(self, session_id, paper_id, messages, message_count=0):
        """Initialize new conversation. Clears other conversations for session."""
        pass

    @abstractmethod
    def add_message(self, session_id, paper_id, role, content):
        """Add message to conversation and increment count."""
        pass

    @abstractmethod
    def delete_conversation(self, session_id, paper_id=None):
        """Delete conversation(s). If paper_id is None, delete all for session."""
        pass

    @abstractmethod
    def update_activity(self, session_id, paper_id):
        """Update last activity timestamp."""
        pass

    @abstractmethod
    def get_message_count(self, session_id, paper_id):
        """Get message count for conversation."""
        pass

    @abstractmethod
    def check_rate_limit(self, session_id):
        """Returns (allowed: bool, remaining: int, reset_time: datetime|None)."""
        pass

    @abstractmethod
    def increment_rate_limit(self, session_id):
        """Increment hourly message counter."""
        pass

    @abstractmethod
    def cleanup_inactive(self):
        """Remove inactive conversations (>10 minutes)."""
        pass


class InMemoryChatStore(ChatStore):
    """In-memory implementation with thread safety.

    ⚠️ DEPLOYMENT NOTE: Requires single-worker mode (gunicorn --workers=1)
    For multi-worker deployments, migrate to RedisChatStore.
    """

    def __init__(self):
        self.conversations = {}  # {session_id: {paper_id: {...}}}
        self.rate_limits = {}    # {session_id: {count, window_start}}
        self.lock = threading.Lock()
        self.timeout = timedelta(minutes=INACTIVITY_TIMEOUT_MINUTES)

    def get_conversation(self, session_id, paper_id):
        with self.lock:
            if session_id not in self.conversations:
                return None
            return self.conversations[session_id].get(paper_id)

    def init_conversation(self, session_id, paper_id, messages, message_count=0):
        with self.lock:
            # Clear all other conversations for this session (one chat at a time)
            self.conversations[session_id] = {}

            # Create new conversation
            self.conversations[session_id][paper_id] = {
                'messages': messages,
                'message_count': message_count,
                'last_activity': datetime.now()
            }

    def add_message(self, session_id, paper_id, role, content):
        with self.lock:
            conv = self.conversations.get(session_id, {}).get(paper_id)
            if conv:
                conv['messages'].append({'role': role, 'content': content})
                conv['message_count'] += 1
                conv['last_activity'] = datetime.now()

    def delete_conversation(self, session_id, paper_id=None):
        with self.lock:
            if session_id not in self.conversations:
                return

            if paper_id:
                # Delete specific conversation
                if paper_id in self.conversations[session_id]:
                    del self.conversations[session_id][paper_id]
            else:
                # Delete all conversations for session
                del self.conversations[session_id]

    def update_activity(self, session_id, paper_id):
        with self.lock:
            conv = self.conversations.get(session_id, {}).get(paper_id)
            if conv:
                conv['last_activity'] = datetime.now()

    def get_message_count(self, session_id, paper_id):
        with self.lock:
            conv = self.conversations.get(session_id, {}).get(paper_id)
            return conv['message_count'] if conv else 0

    def check_rate_limit(self, session_id):
        with self.lock:
            now = datetime.now()

            # Initialize if not exists
            if session_id not in self.rate_limits:
                self.rate_limits[session_id] = {
                    'count': 0,
                    'window_start': now
                }

            user_data = self.rate_limits[session_id]
            window_age = now - user_data['window_start']

            # Reset if window expired (>1 hour)
            if window_age > timedelta(hours=1):
                user_data['count'] = 0
                user_data['window_start'] = now

            # Check limit
            if user_data['count'] >= MAX_MESSAGES_PER_HOUR:
                reset_time = user_data['window_start'] + timedelta(hours=1)
                return False, 0, reset_time

            remaining = MAX_MESSAGES_PER_HOUR - user_data['count']
            return True, remaining, None

    def increment_rate_limit(self, session_id):
        with self.lock:
            if session_id in self.rate_limits:
                self.rate_limits[session_id]['count'] += 1

    def cleanup_inactive(self):
        """Remove conversations inactive for >10 minutes."""
        with self.lock:
            now = datetime.now()

            sessions_to_delete = []

            for session_id, papers in list(self.conversations.items()):
                papers_to_delete = []

                for paper_id, conv in list(papers.items()):
                    age = now - conv['last_activity']
                    if age > self.timeout:
                        papers_to_delete.append(paper_id)

                for paper_id in papers_to_delete:
                    del self.conversations[session_id][paper_id]
                    logger.info(f"Cleaned up inactive conversation: session={session_id}, paper={paper_id}")

                # Clean up empty sessions
                if not self.conversations[session_id]:
                    sessions_to_delete.append(session_id)

            for session_id in sessions_to_delete:
                del self.conversations[session_id]

            # Cleanup old rate limiting data (>2 hours old)
            old_threshold = timedelta(hours=2)
            sessions_to_cleanup = []

            for session_id, data in list(self.rate_limits.items()):
                age = now - data['window_start']
                if age > old_threshold:
                    sessions_to_cleanup.append(session_id)

            for session_id in sessions_to_cleanup:
                del self.rate_limits[session_id]


# ============================================================================
# Flask App Initialization
# ============================================================================

app = Flask(__name__, static_folder='.')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY') or secrets.token_hex(32)

# Global instances
paper_chat_client = None
chat_store = None
paper_data_cache = None
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


def initialize_app():
    """Initialize all components at app startup."""
    global paper_chat_client, chat_store, paper_data_cache

    # 1. Load and cache paper data with availability
    paper_data_cache = initialize_paper_data()

    # 2. Initialize Azure OpenAI client
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

    # 3. Initialize chat store (easy to swap for Redis later)
    chat_store = InMemoryChatStore()
    logger.warning("Using in-memory chat store - requires single worker (gunicorn --workers=1)")
    logger.warning("For multi-worker deployments, migrate to RedisChatStore")

    # 4. Initialize cleanup scheduler
    scheduler.init_app(app)
    scheduler.start()
    scheduler.add_job(
        id='cleanup_conversations',
        func=lambda: chat_store.cleanup_inactive(),
        trigger='interval',
        minutes=CLEANUP_INTERVAL_MINUTES
    )
    logger.info("Chat cleanup scheduler started")


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

        # Create system message
        system_message = SYSTEM_PROMPT_TEMPLATE.format(
            title=paper.get('title', 'Unknown'),
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


@app.route('/<path:path>')
def serve_static(path):
    """Serve all other static files (JS, CSS, JSON, PDFs, etc.)"""
    return send_from_directory('.', path)

if __name__ == '__main__':
    # For local development
    app.run(debug=True, host='0.0.0.0', port=5000)
