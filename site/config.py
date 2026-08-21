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


def azure_model():
    return os.getenv('AZURE_OPENAI_PAPER_CHAT_DEPLOYMENT')


def database_url():
    return os.getenv('DATABASE_URL')
