"""In-memory implementation of chat storage."""

import threading
from datetime import datetime, timedelta
from typing import Optional, Tuple, List, Dict, Any
import logging

from chat_store_base import ChatStore

logger = logging.getLogger(__name__)


class InMemoryChatStore(ChatStore):
    """In-memory implementation with thread safety.

    ⚠️ DEPLOYMENT NOTE: Requires single-worker mode (gunicorn --workers=1)
    For multi-worker deployments, use RedisChatStore instead.

    Attributes:
        conversations: Dict mapping session_id -> paper_id -> conversation data
        rate_limits: Dict mapping session_id -> rate limit data
        lock: Thread lock for concurrent access
        timeout: Inactivity timeout for conversations
        max_messages_per_hour: Rate limit threshold
        inactivity_timeout_minutes: Minutes before conversation expires
    """

    def __init__(self, max_messages_per_hour: int = 20, inactivity_timeout_minutes: int = 10):
        """Initialize in-memory store.

        Args:
            max_messages_per_hour: Rate limit for messages per hour
            inactivity_timeout_minutes: Minutes of inactivity before cleanup
        """
        self.conversations = {}  # {session_id: {paper_id: {...}}}
        self.rate_limits = {}    # {session_id: {count, window_start}}
        self.lock = threading.Lock()
        self.timeout = timedelta(minutes=inactivity_timeout_minutes)
        self.max_messages_per_hour = max_messages_per_hour
        self.inactivity_timeout_minutes = inactivity_timeout_minutes

    def get_conversation(self, session_id: str, paper_id: str) -> Optional[Dict[str, Any]]:
        """Get conversation dict or None."""
        with self.lock:
            if session_id not in self.conversations:
                return None
            return self.conversations[session_id].get(paper_id)

    def init_conversation(self, session_id: str, paper_id: str,
                         messages: List[Dict[str, str]], message_count: int = 0) -> None:
        """Initialize new conversation. Clears other conversations for session."""
        with self.lock:
            # Clear all other conversations for this session (one chat at a time)
            self.conversations[session_id] = {}

            # Create new conversation
            self.conversations[session_id][paper_id] = {
                'messages': messages,
                'message_count': message_count,
                'last_activity': datetime.now()
            }

    def add_message(self, session_id: str, paper_id: str, role: str, content: str) -> None:
        """Add message to conversation and increment count."""
        with self.lock:
            conv = self.conversations.get(session_id, {}).get(paper_id)
            if conv:
                conv['messages'].append({'role': role, 'content': content})
                conv['message_count'] += 1
                conv['last_activity'] = datetime.now()

    def delete_conversation(self, session_id: str, paper_id: Optional[str] = None) -> None:
        """Delete conversation(s)."""
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

    def update_activity(self, session_id: str, paper_id: str) -> None:
        """Update last activity timestamp."""
        with self.lock:
            conv = self.conversations.get(session_id, {}).get(paper_id)
            if conv:
                conv['last_activity'] = datetime.now()

    def get_message_count(self, session_id: str, paper_id: str) -> int:
        """Get message count for conversation."""
        with self.lock:
            conv = self.conversations.get(session_id, {}).get(paper_id)
            return conv['message_count'] if conv else 0

    def check_rate_limit(self, session_id: str) -> Tuple[bool, int, Optional[datetime]]:
        """Check if session has exceeded rate limit."""
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
            if user_data['count'] >= self.max_messages_per_hour:
                reset_time = user_data['window_start'] + timedelta(hours=1)
                return False, 0, reset_time

            remaining = self.max_messages_per_hour - user_data['count']
            return True, remaining, None

    def increment_rate_limit(self, session_id: str) -> None:
        """Increment hourly message counter."""
        with self.lock:
            if session_id in self.rate_limits:
                self.rate_limits[session_id]['count'] += 1

    def cleanup_inactive(self) -> int:
        """Remove conversations inactive for timeout period.

        Returns:
            Number of conversations removed
        """
        with self.lock:
            now = datetime.now()
            removed_count = 0

            sessions_to_delete = []

            for session_id, papers in list(self.conversations.items()):
                papers_to_delete = []

                for paper_id, conv in list(papers.items()):
                    if now - conv['last_activity'] > self.timeout:
                        papers_to_delete.append(paper_id)
                        removed_count += 1

                # Delete expired conversations
                for paper_id in papers_to_delete:
                    del papers[paper_id]

                # If session has no conversations, mark for deletion
                if not papers:
                    sessions_to_delete.append(session_id)

            # Delete empty sessions
            for session_id in sessions_to_delete:
                del self.conversations[session_id]

            if removed_count > 0:
                logger.info(f"Cleaned up {removed_count} inactive conversations")

            return removed_count