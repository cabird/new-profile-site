# Paper Chat Implementation Plan (Revised)

## Overview

Implementing a "Chat with Paper" feature for the academic publications website that allows users to have AI-powered conversations about individual research papers using Azure OpenAI. The system supports multiple concurrent users with session-based isolation, rate limiting, and automatic cleanup.

**V1 Strategy**: Use in-memory storage with abstraction layer for easy migration to Redis when ready for multi-worker deployment.

---

## Architecture

### Multi-User Session Management

**Session-Based Isolation** with **Storage Abstraction Layer**:

The system uses an abstract `ChatStore` interface that allows seamless migration from in-memory (V1) to Redis (V2) by changing a single line of code.

```python
class ChatStore(ABC):
    """Abstract interface for chat storage - swap implementations easily."""

    @abstractmethod
    def get_conversation(self, session_id, paper_id):
        """Get conversation or None."""
        pass

    @abstractmethod
    def init_conversation(self, session_id, paper_id, messages):
        """Initialize new conversation."""
        pass

    @abstractmethod
    def add_message(self, session_id, paper_id, role, content):
        """Add message to conversation."""
        pass

    @abstractmethod
    def delete_conversation(self, session_id, paper_id=None):
        """Delete conversation(s)."""
        pass

    @abstractmethod
    def update_activity(self, session_id, paper_id):
        """Update last activity timestamp."""
        pass

    @abstractmethod
    def check_rate_limit(self, session_id):
        """Returns (allowed, remaining, reset_time)."""
        pass

    @abstractmethod
    def increment_message_count(self, session_id):
        """Increment rate limit counter."""
        pass

    @abstractmethod
    def cleanup_inactive(self):
        """Remove inactive conversations."""
        pass
```

**V1 Implementation (In-Memory)**:
```python
class InMemoryChatStore(ChatStore):
    """In-memory storage with thread safety.

    NOTE: Requires single-worker deployment (--workers=1 for gunicorn).
    For multi-worker production, use RedisChatStore instead.
    """

    def __init__(self):
        self.conversations = {}  # {session_id: {paper_id: {...}}}
        self.rate_limits = {}    # {session_id: {count, window_start}}
        self.lock = threading.Lock()

    def get_conversation(self, session_id, paper_id):
        with self.lock:
            if session_id not in self.conversations:
                return None
            return self.conversations[session_id].get(paper_id)

    # ... all other methods wrapped with self.lock
```

**Future V2 Implementation (Redis)**:
```python
class RedisChatStore(ChatStore):
    """Redis-backed storage for multi-worker deployments."""

    def __init__(self, redis_client):
        self.redis = redis_client

    def get_conversation(self, session_id, paper_id):
        key = f"chat:{session_id}:{paper_id}"
        data = self.redis.get(key)
        return json.loads(data) if data else None

    # ... all other methods using Redis commands
```

**One Active Chat Per Session**:
- When user opens a new chat modal, any previous chat for that session is automatically cleared
- Frontend enforces single modal at a time (only one `chatPaper` state)
- Backend enforces single conversation per session (clears old when new chat starts)

---

## Paper Data Caching & Chat Availability

### Startup Initialization

**All paper data is loaded and cached at Flask app startup**, including pre-computed chat availability:

```python
# Global cache
paper_data_cache = None

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
        markdown_filename = paper.get('markdown') or paper.get('mapped_pdf', '').replace('.pdf', '.md')

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
```

**Benefits**:
- ✅ No repeated file I/O
- ✅ No N+1 API calls from frontend (availability pre-computed)
- ✅ Fast availability checks (instant endpoint response)
- ✅ Logging of chat availability stats

### Frontend Integration

**Publications page receives pre-computed availability**:

The frontend no longer makes individual API calls. Instead, `chat_available` is already in the paper data:

```javascript
// In publications.html - paper data already includes chat_available
const pubsArray = Object.entries(data.papers)
    .filter(([key, pub]) => pub.status === 'MAPPED')
    .map(([key, pub]) => ({
        id: key,
        ...pub  // Includes chat_available: true/false
    }));
```

**PublicationCard uses the pre-computed value**:

```javascript
const PublicationCard = ({ publication, onViewDetails, onViewBibtex, onChatWithPaper }) => {
    // No API call needed - availability is already in publication object
    const chatAvailable = publication.chat_available || false;

    return (
        <div className="card">
            {/* ... existing card content ... */}

            <div className="card-actions">
                {/* ... other buttons ... */}

                {chatAvailable ? (
                    <button
                        className="btn btn-secondary btn-sm btn-chat"
                        onClick={() => onChatWithPaper(publication)}
                    >
                        <i data-lucide="message-circle"></i>
                        Chat
                    </button>
                ) : (
                    <button
                        className="btn btn-secondary btn-sm"
                        disabled
                        title="Chat unavailable - markdown not found"
                    >
                        <i data-lucide="message-circle"></i>
                        Chat
                    </button>
                )}
            </div>
        </div>
    );
};
```

---

## Constants and Configuration

### Backend Constants (app.py)

```python
# Token and message limits
MAX_MESSAGE_TOKENS = 1000
MAX_MESSAGES_PER_CONVERSATION = 10
MAX_MESSAGES_PER_HOUR = 20

# Timeout settings
INACTIVITY_TIMEOUT_MINUTES = 10
CLEANUP_INTERVAL_MINUTES = 5  # How often to run cleanup task
```

### Environment Variables (.env)

```
AZURE_OPENAI_PAPER_CHAT_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_PAPER_CHAT_KEY=your-api-key-here
AZURE_OPENAI_PAPER_CHAT_DEPLOYMENT=gpt-4
AZURE_OPENAI_PAPER_CHAT_API_VERSION=2024-02-01
SECRET_KEY=auto-generated-secret-key
```

---

## Backend Implementation

### 1. Storage Abstraction Layer

**Location**: `app.py` or separate `chat_storage.py`

```python
from abc import ABC, abstractmethod
from datetime import datetime, timedelta
import threading
import json

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


# Future Redis implementation
class RedisChatStore(ChatStore):
    """Redis-backed storage for multi-worker deployments.

    Migration: Just swap InMemoryChatStore() for RedisChatStore(redis_client)
    """

    def __init__(self, redis_client):
        self.redis = redis_client
        self.timeout_seconds = INACTIVITY_TIMEOUT_MINUTES * 60

    def get_conversation(self, session_id, paper_id):
        key = f"chat:{session_id}:{paper_id}"
        data = self.redis.get(key)
        return json.loads(data) if data else None

    def init_conversation(self, session_id, paper_id, messages, message_count=0):
        # Clear all other conversations for this session
        pattern = f"chat:{session_id}:*"
        for key in self.redis.scan_iter(match=pattern):
            self.redis.delete(key)

        # Create new conversation
        key = f"chat:{session_id}:{paper_id}"
        data = {
            'messages': messages,
            'message_count': message_count,
            'last_activity': datetime.now().isoformat()
        }
        self.redis.setex(key, self.timeout_seconds, json.dumps(data))

    # ... implement all other methods with Redis commands
```

### 2. Application Initialization

```python
from flask import Flask
from dotenv import load_dotenv
from openai import AzureOpenAI
from flask_apscheduler import APScheduler
import os
import secrets

# Load environment
load_dotenv()

app = Flask(__name__)

# Generate secret key if not in environment
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY') or secrets.token_hex(32)

# Global instances
paper_chat_client = None
chat_store = None
paper_data_cache = None
scheduler = APScheduler()

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

    # To migrate to Redis in the future, just change to:
    # redis_client = redis.from_url(os.getenv('REDIS_URL', 'redis://localhost:6379'))
    # chat_store = RedisChatStore(redis_client)

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
```

### 3. System Prompt (Strict Restrictions)

```python
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
```

### 4. Paper Content Loading

```python
def load_paper_markdown(paper_id):
    """Load markdown content for a paper from cache.

    Returns (paper_dict, markdown_content) or (None, None) if not available.
    """
    # Get paper from cache
    paper = paper_data_cache['papers'].get(paper_id)

    if not paper or not paper.get('chat_available'):
        return None, None

    # Determine markdown filename
    markdown_filename = paper.get('markdown') or paper.get('mapped_pdf', '').replace('.pdf', '.md')

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
```

### 5. Token Counting

```python
import tiktoken

def count_tokens(text, model="gpt-4"):
    """Count tokens in a text string."""
    try:
        encoding = tiktoken.encoding_for_model(model)
        return len(encoding.encode(text))
    except:
        # Fallback: rough estimate
        return len(text) // 4
```

### 6. API Endpoints

#### POST `/api/papers/<paper_id>/chat`

```python
from flask import request, Response, stream_with_context, session, jsonify
import json

@app.route('/api/papers/<paper_id>/chat', methods=['POST'])
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
```

#### DELETE `/api/papers/<paper_id>/chat`

```python
@app.route('/api/papers/<paper_id>/chat', methods=['DELETE'])
def clear_paper_chat(paper_id):
    """Clear chat for a specific paper."""
    if 'id' not in session:
        return jsonify({'message': 'No active session'})

    session_id = session['id']

    if chat_store:
        chat_store.delete_conversation(session_id, paper_id)

    return jsonify({'message': 'Chat cleared successfully'})
```

---

## Frontend Implementation

### 1. External Dependencies

**Add to publications.html `<head>`**:
```html
<!-- Marked.js for markdown rendering -->
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

<!-- DOMPurify for XSS protection -->
<script src="https://cdn.jsdelivr.net/npm/dompurify@3/dist/purify.min.js"></script>

<!-- Lucide Icons -->
<script src="https://unpkg.com/lucide@latest"></script>
```

### 2. ChatModal Component

**Location**: `components/ChatModal.jsx`

**Key Features**:
- SSE streaming with incremental updates
- Markdown rendering with DOMPurify sanitization
- Auto-scroll to latest message
- Loading states and error handling
- Lucide icons (no emojis)

**Markdown Rendering with XSS Protection**:
```javascript
const renderMarkdown = (text) => {
    if (!text) return '';

    const markedOptions = {
        breaks: true,
        gfm: true,
        headerIds: true,
        mangle: false
    };

    // Parse markdown then sanitize HTML
    const rawHtml = marked.parse(text, markedOptions);
    return DOMPurify.sanitize(rawHtml);
};
```

**Component Implementation** (full code in ChatModal.jsx):
- State management for messages, loading, errors
- SSE streaming handler
- Clear chat functionality
- Cleanup on unmount (DELETE request)
- Lucide icon integration

### 3. PublicationCard Updates

**No API calls needed** - availability pre-computed:

```javascript
const PublicationCard = ({ publication, onViewDetails, onViewBibtex, onChatWithPaper }) => {
    // Use pre-computed availability from paper data
    const chatAvailable = publication.chat_available || false;

    // ... render with conditional chat button
};
```

### 4. Publications Page Updates

**Add ChatModal state and handler**:
```javascript
import ChatModal from './components/ChatModal.jsx';

function PublicationsApp() {
    const [chatPaper, setChatPaper] = useState(null);

    const handleChatWithPaper = (publication) => {
        setChatPaper(publication);
    };

    const handleCloseChat = () => {
        setChatPaper(null);
    };

    // Initialize lucide icons after render
    useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, [filteredPublications, chatPaper]);

    return (
        <div className="container">
            {/* ... existing content ... */}

            {chatPaper && (
                <ChatModal paper={chatPaper} onClose={handleCloseChat} />
            )}
        </div>
    );
}
```

---

## Security Enhancements

### XSS Protection

**DOMPurify Integration**:
- All markdown-rendered content is sanitized
- Prevents malicious HTML injection
- Applied to all AI responses before rendering

```javascript
// Safe rendering pipeline
const html = DOMPurify.sanitize(marked.parse(text));
```

### System Prompt Protection

- Strict instructions to refuse off-topic queries
- Response must be: "I can only provide information about the paper."
- No exceptions, no helpful suggestions for other topics

### Rate Limiting

- Per-session hourly limits (20 messages)
- Prevents abuse and cost control
- Clear user feedback on limits
- Can be bypassed by clearing cookies (acceptable for V1)

---

## Deployment Notes

### Single-Worker Requirement (V1)

**Gunicorn Configuration**:
```bash
gunicorn app:app --workers=1 --timeout=120
```

⚠️ **Important**: In-memory storage requires single worker. For multi-worker deployments, migrate to RedisChatStore.

### Migration to Redis (V2)

**When ready for multi-worker production**:

1. Install Redis: `pip install redis`
2. Add Redis service (Render, AWS, etc.)
3. Update initialization (one line change):

```python
# In initialize_app()
# OLD:
# chat_store = InMemoryChatStore()

# NEW:
redis_client = redis.from_url(os.getenv('REDIS_URL', 'redis://localhost:6379'))
chat_store = RedisChatStore(redis_client)
```

4. Deploy with multiple workers: `gunicorn app:app --workers=4`

---

## Files to Create/Modify

### New Files
1. `components/ChatModal.jsx` - Chat modal component
2. `.env` - Environment variables (add to .gitignore)
3. `.env.example` - Template for environment variables

### Modified Files
1. `app.py` - Add ChatStore classes, endpoints, initialization
2. `requirements.txt` - Add dependencies
3. `publications.html` - Add ChatModal import, state, CDN links
4. `components/PublicationCard.jsx` - Add chat button (uses pre-computed availability)
5. `styles.css` - Add chat-specific styles

### Configuration
1. `.gitignore` - Ensure `.env` is ignored
2. `build.sh` - Verify markdowns/ directory is copied

---

## Dependencies

### requirements.txt
```
openai>=1.0.0
python-dotenv
tiktoken
Flask-APScheduler
```

### Frontend CDN
```html
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dompurify@3/dist/purify.min.js"></script>
<script src="https://unpkg.com/lucide@latest"></script>
```

---

## Testing Checklist

### Backend
- [ ] Azure OpenAI client initializes with API key
- [ ] Paper data cached at startup
- [ ] Chat availability pre-computed correctly
- [ ] ChatStore abstraction works
- [ ] Thread safety with locks
- [ ] Rate limiting enforces 20 msg/hour
- [ ] Conversation limiting enforces 10 msg/chat
- [ ] Token counting works
- [ ] SSE streaming delivers chunks
- [ ] Cleanup task runs every 5 minutes
- [ ] Inactive conversations deleted after 10 minutes

### Frontend
- [ ] Chat button shows/hides based on pre-computed availability
- [ ] No N+1 API calls on page load
- [ ] Modal opens and closes properly
- [ ] Only one modal open at a time
- [ ] Markdown rendering with DOMPurify works
- [ ] User messages appear immediately
- [ ] Streaming shows incremental updates
- [ ] Status bar shows message counts
- [ ] Clear chat works
- [ ] Error messages display properly
- [ ] DELETE sent on modal close
- [ ] Lucide icons render correctly (no emojis)

### Security
- [ ] DOMPurify sanitizes all markdown output
- [ ] System prompt restricts off-topic questions
- [ ] Token limits prevent abuse
- [ ] Rate limiting works correctly

---

## Success Metrics

1. **Engagement**
   - % of papers with chat markdown available
   - % of users who try chat feature
   - Average messages per conversation

2. **Performance**
   - Time to first token in response
   - Streaming latency
   - Modal load time

3. **Costs**
   - Tokens per conversation
   - Daily cost of chat feature

4. **Quality**
   - Rate of "I can only provide information" responses
   - Conversation completion rate

---

## Migration Path Summary

**V1 (Now)**:
- In-memory storage with threading locks
- Single worker deployment
- Fast, simple, no external dependencies

**V2 (When Scaling)**:
- Change one line: `chat_store = RedisChatStore(redis_client)`
- Add Redis service
- Multi-worker deployment
- Shared state across workers

**The abstraction layer makes this transition seamless.**

---

**END OF IMPLEMENTATION PLAN**
