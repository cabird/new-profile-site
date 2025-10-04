"""Base abstract class for chat storage implementations."""

from abc import ABC, abstractmethod
from datetime import datetime
from typing import Optional, Tuple, List, Dict, Any


class ChatStore(ABC):
    """Abstract storage interface for chat conversations and rate limiting.

    Implementations must provide thread-safe operations for:
    - Conversation management (CRUD operations)
    - Rate limiting (per-session message counting)
    - Activity tracking and cleanup
    """

    @abstractmethod
    def get_conversation(self, session_id: str, paper_id: str) -> Optional[Dict[str, Any]]:
        """Get conversation dict or None.

        Returns:
            Dict with keys: 'messages', 'message_count', 'last_activity'
            or None if conversation doesn't exist
        """
        pass

    @abstractmethod
    def init_conversation(self, session_id: str, paper_id: str,
                         messages: List[Dict[str, str]], message_count: int = 0) -> None:
        """Initialize new conversation. Clears other conversations for session.

        Args:
            session_id: User session identifier
            paper_id: Paper identifier
            messages: Initial message list
            message_count: Starting message count (default 0)
        """
        pass

    @abstractmethod
    def add_message(self, session_id: str, paper_id: str, role: str, content: str) -> None:
        """Add message to conversation and increment count.

        Args:
            session_id: User session identifier
            paper_id: Paper identifier
            role: Message role ('user' or 'assistant')
            content: Message content
        """
        pass

    @abstractmethod
    def delete_conversation(self, session_id: str, paper_id: Optional[str] = None) -> None:
        """Delete conversation(s).

        Args:
            session_id: User session identifier
            paper_id: If specified, delete only this conversation.
                     If None, delete all conversations for session.
        """
        pass

    @abstractmethod
    def update_activity(self, session_id: str, paper_id: str) -> None:
        """Update last activity timestamp.

        Args:
            session_id: User session identifier
            paper_id: Paper identifier
        """
        pass

    @abstractmethod
    def get_message_count(self, session_id: str, paper_id: str) -> int:
        """Get message count for conversation.

        Returns:
            Number of messages in conversation (0 if doesn't exist)
        """
        pass

    @abstractmethod
    def check_rate_limit(self, session_id: str) -> Tuple[bool, int, Optional[datetime]]:
        """Check if session has exceeded rate limit.

        Returns:
            Tuple of:
            - allowed (bool): True if under rate limit
            - remaining (int): Number of messages remaining in window
            - reset_time (datetime or None): When rate limit resets (if exceeded)
        """
        pass

    @abstractmethod
    def increment_rate_limit(self, session_id: str) -> None:
        """Increment hourly message counter.

        Args:
            session_id: User session identifier
        """
        pass

    @abstractmethod
    def cleanup_inactive(self) -> int:
        """Remove inactive conversations.

        Returns:
            Number of conversations removed
        """
        pass