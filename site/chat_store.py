"""In-memory conversation store and rate limiting.

Single-process only (matches the one-worker Hypercorn deployment); the
store instance is created here at import time so it always exists.
"""
import logging
from datetime import datetime, timedelta

import config

logger = logging.getLogger(__name__)


class ConversationNotFoundError(Exception):
    pass


class RateWindow:
    """A per-session sliding hourly window. Used for chat and the terminal."""

    def __init__(self, max_per_hour):
        self.max_per_hour = max_per_hour
        self.windows = {}  # {session_id: {count, window_start}}

    def check(self, session_id):
        now = datetime.now()
        data = self.windows.setdefault(session_id, {'count': 0, 'window_start': now})
        if now - data['window_start'] > timedelta(hours=1):
            data['count'] = 0
            data['window_start'] = now
        if data['count'] >= self.max_per_hour:
            return False, 0, data['window_start'] + timedelta(hours=1)
        return True, self.max_per_hour - data['count'], None

    def increment(self, session_id):
        if session_id in self.windows:
            self.windows[session_id]['count'] += 1


class ChatStore:
    """In-memory chat store. Safe for single-process async (Quart/Hypercorn)."""

    def __init__(self, max_messages_per_hour=20, inactivity_timeout_minutes=10):
        self.conversations = {}  # {session_id: {conv_key: {...}}}
        self.rate = RateWindow(max_messages_per_hour)
        self.timeout = timedelta(minutes=inactivity_timeout_minutes)

    def get_conversation(self, session_id, conv_key):
        return self.conversations.get(session_id, {}).get(conv_key)

    def init_conversation(self, session_id, conv_key, messages, message_count=0):
        self.conversations.setdefault(session_id, {})[conv_key] = {
            'messages': messages,
            'message_count': message_count,
            'last_activity': datetime.now(),
        }

    def add_message(self, session_id, conv_key, role, content):
        conv = self.conversations.get(session_id, {}).get(conv_key)
        if not conv:
            raise ConversationNotFoundError(f"Conversation not found for {session_id}/{conv_key}")
        conv['messages'].append({'role': role, 'content': content})
        if role == 'user':
            conv['message_count'] += 1
        conv['last_activity'] = datetime.now()

    def delete_conversation(self, session_id, conv_key=None):
        if session_id not in self.conversations:
            return
        if conv_key:
            self.conversations[session_id].pop(conv_key, None)
        else:
            del self.conversations[session_id]

    def get_message_count(self, session_id, conv_key):
        conv = self.conversations.get(session_id, {}).get(conv_key)
        return conv['message_count'] if conv else 0

    def check_rate_limit(self, session_id):
        return self.rate.check(session_id)

    def increment_rate_limit(self, session_id):
        self.rate.increment(session_id)

    def cleanup_inactive(self):
        now = datetime.now()
        removed = 0
        for session_id in list(self.conversations):
            convs = self.conversations[session_id]
            for conv_key in list(convs):
                if now - convs[conv_key]['last_activity'] > self.timeout:
                    del convs[conv_key]
                    removed += 1
            if not convs:
                del self.conversations[session_id]
        if removed:
            logger.info(f"Cleaned up {removed} inactive conversations")
        return removed


store = ChatStore(
    max_messages_per_hour=config.MAX_MESSAGES_PER_HOUR,
    inactivity_timeout_minutes=config.INACTIVITY_TIMEOUT_MINUTES,
)

terminal_rate = RateWindow(config.TERMINAL_MAX_COMMANDS_PER_HOUR)
