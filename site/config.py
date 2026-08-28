"""Configuration: constants and environment access."""
import os

APP_VERSION = '2.0.0'

# Chat limits
MAX_MESSAGE_TOKENS = 1000
MAX_MESSAGES_PER_CONVERSATION = 10
MAX_MESSAGES_PER_HOUR = 20
INACTIVITY_TIMEOUT_MINUTES = 60
CLEANUP_INTERVAL_MINUTES = 5

# Terminal
TERMINAL_MAX_COMMANDS_PER_HOUR = 20
TERMINAL_MAX_RESPONSE_TOKENS = 500


def llm_enabled():
    """Master switch for every LLM-backed endpoint (chat, ask, terminal).

    Off unless LLM_ENABLED is set to 1/true/yes in the environment. When off,
    the Azure client is never created and the request guard in app.py answers
    every LLM route with 503 before any handler runs.
    """
    return os.getenv('LLM_ENABLED', '').strip().lower() in ('1', 'true', 'yes', 'on')


# Route prefixes/suffixes that reach an LLM. Checked by the guard in app.py.
LLM_ROUTE_PREFIXES = ('/api/chat', '/api/ask', '/api/terminal')
LLM_ROUTE_SUFFIXES = ('/chat',)  # /api/papers/<id>/chat, /api/blog/<slug>/chat

LLM_DISABLED_MESSAGE = 'AI features are switched off right now.'


def azure_model():
    return os.getenv('AZURE_OPENAI_PAPER_CHAT_DEPLOYMENT')


def database_url():
    return os.getenv('DATABASE_URL')
