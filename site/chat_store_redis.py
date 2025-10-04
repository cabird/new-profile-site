"""Redis-based implementation of chat storage."""

import redis
import json
import os
import logging
from datetime import datetime, timedelta
from typing import Optional, Tuple, List, Dict, Any

from chat_store_base import ChatStore

logger = logging.getLogger(__name__)


class RedisChatStore(ChatStore):
    """Redis implementation for multi-worker deployments.

    Uses Redis data structures:
    - Conversations: JSON strings with TTL (auto-cleanup)
    - Rate limiting: Redis counters with TTL (auto-reset)
    - Activity tracking: Not needed - TTL handles cleanup

    Key patterns:
    - chat:session:{session_id}:{paper_id} -> JSON conversation
    - rate_limit:{session_id}:hour -> Counter
    - chat:sessions:{session_id} -> Set of active paper_ids

    Benefits:
    - Multi-worker safe (no shared memory required)
    - Auto-expiration (no cleanup scheduler needed)
    - Persistent across restarts
    - Observable via redis_cli.py
    """

    def __init__(self, redis_url: Optional[str] = None,
                 max_messages_per_hour: int = 20,
                 inactivity_timeout_minutes: int = 10,
                 connection_timeout: int = 5):
        """Initialize Redis store.

        Args:
            redis_url: Redis URL (defaults to REDIS_URL env var)
            max_messages_per_hour: Rate limit for messages per hour
            inactivity_timeout_minutes: Minutes before conversation expires
            connection_timeout: Redis connection timeout in seconds
        """
        self.redis_url = redis_url or os.getenv('REDIS_URL')
        if not self.redis_url:
            raise ValueError("REDIS_URL not set in environment or provided")

        self.max_messages_per_hour = max_messages_per_hour
        self.inactivity_timeout_seconds = inactivity_timeout_minutes * 60

        # Initialize Redis connection
        try:
            self.redis = redis.Redis.from_url(
                self.redis_url,
                decode_responses=True,
                socket_connect_timeout=connection_timeout,
                socket_keepalive=True,
                socket_keepalive_options={
                    1: 1,  # TCP_KEEPIDLE
                    2: 3,  # TCP_KEEPINTVL
                    3: 5,  # TCP_KEEPCNT
                }
            )
            # Test connection
            self.redis.ping()
            logger.info("Connected to Redis for chat storage")
        except redis.ConnectionError as e:
            logger.error(f"Failed to connect to Redis: {e}")
            raise

    def _conversation_key(self, session_id: str, paper_id: str) -> str:
        """Generate Redis key for conversation."""
        return f"chat:session:{session_id}:{paper_id}"

    def _rate_limit_key(self, session_id: str) -> str:
        """Generate Redis key for rate limit."""
        return f"rate_limit:{session_id}:hour"

    def _sessions_key(self, session_id: str) -> str:
        """Generate Redis key for session's active papers."""
        return f"chat:sessions:{session_id}"

    def get_conversation(self, session_id: str, paper_id: str) -> Optional[Dict[str, Any]]:
        """Get conversation dict or None."""
        try:
            key = self._conversation_key(session_id, paper_id)
            data = self.redis.get(key)

            if data:
                # Refresh TTL on access
                self.redis.expire(key, self.inactivity_timeout_seconds)
                return json.loads(data)

            return None

        except (redis.RedisError, json.JSONDecodeError) as e:
            logger.error(f"Error getting conversation: {e}")
            return None

    def init_conversation(self, session_id: str, paper_id: str,
                         messages: List[Dict[str, str]], message_count: int = 0) -> None:
        """Initialize new conversation. Clears other conversations for session."""
        try:
            pipe = self.redis.pipeline()

            # Get list of existing conversations for this session
            sessions_key = self._sessions_key(session_id)
            existing_papers = self.redis.smembers(sessions_key)

            # Delete all existing conversations for this session
            for existing_paper in existing_papers:
                old_key = self._conversation_key(session_id, existing_paper)
                pipe.delete(old_key)

            # Clear the sessions set
            pipe.delete(sessions_key)

            # Create new conversation
            conversation_data = {
                'messages': messages,
                'message_count': message_count,
                'last_activity': datetime.now().isoformat()
            }

            key = self._conversation_key(session_id, paper_id)

            # Set conversation with TTL
            pipe.setex(
                key,
                self.inactivity_timeout_seconds,
                json.dumps(conversation_data)
            )

            # Add to sessions set
            pipe.sadd(sessions_key, paper_id)
            pipe.expire(sessions_key, self.inactivity_timeout_seconds)

            pipe.execute()

        except redis.RedisError as e:
            logger.error(f"Error initializing conversation: {e}")
            raise

    def add_message(self, session_id: str, paper_id: str, role: str, content: str) -> None:
        """Add message to conversation and increment count."""
        try:
            key = self._conversation_key(session_id, paper_id)

            # Get current conversation
            data = self.redis.get(key)
            if not data:
                logger.warning(f"Attempted to add message to non-existent conversation: {session_id}/{paper_id}")
                return

            conversation = json.loads(data)

            # Add message
            conversation['messages'].append({'role': role, 'content': content})
            conversation['message_count'] += 1
            conversation['last_activity'] = datetime.now().isoformat()

            # Update with refreshed TTL
            self.redis.setex(
                key,
                self.inactivity_timeout_seconds,
                json.dumps(conversation)
            )

            # Refresh sessions set TTL
            sessions_key = self._sessions_key(session_id)
            self.redis.expire(sessions_key, self.inactivity_timeout_seconds)

        except (redis.RedisError, json.JSONDecodeError) as e:
            logger.error(f"Error adding message: {e}")
            raise

    def delete_conversation(self, session_id: str, paper_id: Optional[str] = None) -> None:
        """Delete conversation(s)."""
        try:
            if paper_id:
                # Delete specific conversation
                key = self._conversation_key(session_id, paper_id)
                self.redis.delete(key)

                # Remove from sessions set
                sessions_key = self._sessions_key(session_id)
                self.redis.srem(sessions_key, paper_id)

                # If set is now empty, delete it
                if not self.redis.scard(sessions_key):
                    self.redis.delete(sessions_key)
            else:
                # Delete all conversations for session
                sessions_key = self._sessions_key(session_id)
                paper_ids = self.redis.smembers(sessions_key)

                pipe = self.redis.pipeline()
                for paper_id in paper_ids:
                    key = self._conversation_key(session_id, paper_id)
                    pipe.delete(key)

                pipe.delete(sessions_key)
                pipe.execute()

        except redis.RedisError as e:
            logger.error(f"Error deleting conversation: {e}")

    def update_activity(self, session_id: str, paper_id: str) -> None:
        """Update last activity timestamp."""
        try:
            key = self._conversation_key(session_id, paper_id)

            # Get current conversation
            data = self.redis.get(key)
            if not data:
                return

            conversation = json.loads(data)
            conversation['last_activity'] = datetime.now().isoformat()

            # Update with refreshed TTL
            self.redis.setex(
                key,
                self.inactivity_timeout_seconds,
                json.dumps(conversation)
            )

            # Refresh sessions set TTL
            sessions_key = self._sessions_key(session_id)
            self.redis.expire(sessions_key, self.inactivity_timeout_seconds)

        except (redis.RedisError, json.JSONDecodeError) as e:
            logger.error(f"Error updating activity: {e}")

    def get_message_count(self, session_id: str, paper_id: str) -> int:
        """Get message count for conversation."""
        try:
            key = self._conversation_key(session_id, paper_id)
            data = self.redis.get(key)

            if data:
                conversation = json.loads(data)
                return conversation.get('message_count', 0)

            return 0

        except (redis.RedisError, json.JSONDecodeError) as e:
            logger.error(f"Error getting message count: {e}")
            return 0

    def check_rate_limit(self, session_id: str) -> Tuple[bool, int, Optional[datetime]]:
        """Check if session has exceeded rate limit.

        Uses Redis counter with TTL for automatic window expiration.
        """
        try:
            key = self._rate_limit_key(session_id)

            # Get current count
            count = self.redis.get(key)
            current_count = int(count) if count else 0

            # Check if we need to initialize the counter
            if current_count == 0:
                # Set with 1-hour TTL
                self.redis.setex(key, 3600, 0)

            # Check limit
            if current_count >= self.max_messages_per_hour:
                # Get TTL to determine reset time
                ttl = self.redis.ttl(key)
                if ttl > 0:
                    reset_time = datetime.now() + timedelta(seconds=ttl)
                else:
                    # TTL expired or not set, reset now
                    self.redis.setex(key, 3600, 0)
                    reset_time = None
                    current_count = 0

                return False, 0, reset_time

            remaining = self.max_messages_per_hour - current_count
            return True, remaining, None

        except (redis.RedisError, ValueError) as e:
            logger.error(f"Error checking rate limit: {e}")
            # On error, allow the request (fail open)
            return True, self.max_messages_per_hour, None

    def increment_rate_limit(self, session_id: str) -> None:
        """Increment hourly message counter."""
        try:
            key = self._rate_limit_key(session_id)

            # Increment counter
            new_count = self.redis.incr(key)

            # If this is the first message, set TTL
            if new_count == 1:
                self.redis.expire(key, 3600)

        except redis.RedisError as e:
            logger.error(f"Error incrementing rate limit: {e}")

    def cleanup_inactive(self) -> int:
        """Remove inactive conversations.

        Note: With Redis TTL, this is mostly unnecessary as Redis
        automatically removes expired keys. This method is kept for
        compatibility but returns 0 as cleanup is automatic.

        Returns:
            Always returns 0 (cleanup is automatic via TTL)
        """
        # Redis handles cleanup automatically via TTL
        # This method exists for interface compatibility
        logger.debug("Cleanup called but not needed - Redis TTL handles expiration")
        return 0

    def get_stats(self) -> Dict[str, Any]:
        """Get statistics about stored conversations.

        Returns:
            Dict with conversation and rate limit statistics
        """
        try:
            # Count conversations
            chat_keys = list(self.redis.scan_iter("chat:session:*"))
            rate_keys = list(self.redis.scan_iter("rate_limit:*"))

            # Get unique sessions
            sessions = set()
            papers = set()
            for key in chat_keys:
                if key.startswith("chat:session:") and not key.startswith("chat:sessions:"):
                    parts = key.split(":")
                    if len(parts) >= 4:
                        sessions.add(parts[2])
                        papers.add(parts[3])

            return {
                "total_conversations": len([k for k in chat_keys if not k.startswith("chat:sessions:")]),
                "unique_sessions": len(sessions),
                "unique_papers": len(papers),
                "active_rate_limits": len(rate_keys),
                "storage_backend": "redis"
            }

        except redis.RedisError as e:
            logger.error(f"Error getting stats: {e}")
            return {"error": str(e)}