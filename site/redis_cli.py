#!/usr/bin/env python3
"""
Redis CLI utility for managing cache, sessions, and analytics.

Usage as CLI:
    # Direct Redis operations
    python redis_cli.py get "user:123"
    python redis_cli.py set "user:123:limit" 20 --ttl 3600
    python redis_cli.py get "chat:*" --pattern
    python redis_cli.py delete "session:expired:*" --pattern
    python redis_cli.py keys "chat:*"
    python redis_cli.py ttl "user:123:limit"
    python redis_cli.py monitor --live

    # High-level commands
    python redis_cli.py chat list-sessions
    python redis_cli.py chat export-conversation <paper_id> [--output chat.json]
    python redis_cli.py chat stats
    python redis_cli.py rate-limit check <user_id>
    python redis_cli.py rate-limit reset <user_id>
    python redis_cli.py analytics top-papers --days 7
    python redis_cli.py analytics user-activity --hours 24

Usage as module:
    from redis_cli import RedisClient

    client = RedisClient()
    client.set_with_ttl("key", {"data": "value"}, ttl=3600)
    sessions = client.get_chat_sessions()
"""

import redis
import json
import sys
import os
import argparse
import time
from datetime import datetime, timedelta
from typing import Any, Dict, List, Optional, Tuple
import csv
from collections import defaultdict, Counter
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


class RedisClient:
    """Redis client wrapper with utility methods."""

    def __init__(self, redis_url: Optional[str] = None):
        """Initialize Redis connection.

        Args:
            redis_url: Redis URL (defaults to REDIS_URL env var)
        """
        self.redis_url = redis_url or os.getenv('REDIS_URL')
        if not self.redis_url:
            raise ValueError("REDIS_URL not set in environment or provided")

        self.redis = redis.Redis.from_url(
            self.redis_url,
            decode_responses=True,
            socket_connect_timeout=5
        )

        # Test connection
        try:
            self.redis.ping()
        except redis.ConnectionError as e:
            print(f"❌ Failed to connect to Redis: {e}", file=sys.stderr)
            sys.exit(1)

    # ========== Direct Redis Operations ==========

    def get(self, key: str) -> Any:
        """Get value by key, auto-deserializing JSON if possible."""
        value = self.redis.get(key)
        if value is None:
            return None

        # Try to parse as JSON
        try:
            return json.loads(value)
        except (json.JSONDecodeError, TypeError):
            return value

    def set(self, key: str, value: Any, ttl: Optional[int] = None) -> bool:
        """Set value with optional TTL, auto-serializing dicts/lists to JSON."""
        if isinstance(value, (dict, list)):
            value = json.dumps(value)

        if ttl:
            return self.redis.setex(key, ttl, value)
        return self.redis.set(key, value)

    def delete(self, *keys) -> int:
        """Delete one or more keys."""
        if keys:
            return self.redis.delete(*keys)
        return 0

    def get_pattern(self, pattern: str) -> Dict[str, Any]:
        """Get all keys matching pattern with their values."""
        keys = self.redis.keys(pattern)
        if not keys:
            return {}

        results = {}
        for key in keys:
            results[key] = self.get(key)
        return results

    def delete_pattern(self, pattern: str) -> int:
        """Delete all keys matching pattern."""
        keys = self.redis.keys(pattern)
        if keys:
            return self.redis.delete(*keys)
        return 0

    def get_ttl(self, key: str) -> int:
        """Get TTL for key in seconds (-1 if no TTL, -2 if doesn't exist)."""
        return self.redis.ttl(key)

    def set_ttl(self, key: str, ttl: int) -> bool:
        """Set TTL for existing key."""
        return self.redis.expire(key, ttl)

    def keys(self, pattern: str = "*") -> List[str]:
        """List all keys matching pattern."""
        return sorted(self.redis.keys(pattern))

    # ========== Chat Management ==========

    def get_chat_sessions(self, paper_id: Optional[str] = None) -> List[Dict]:
        """Get all active chat sessions."""
        pattern = f"chat:session:{paper_id}:*" if paper_id else "chat:session:*"
        sessions = []

        for key in self.redis.keys(pattern):
            data = self.get(key)
            if data:
                # Parse key format: chat:session:{paper_id}:{session_id}
                parts = key.split(":")
                if len(parts) >= 4:
                    session_info = {
                        "key": key,
                        "paper_id": parts[2],
                        "session_id": parts[3] if len(parts) > 3 else "unknown",
                        "ttl": self.get_ttl(key),
                        "messages": len(data.get("messages", [])) if isinstance(data, dict) else 0,
                        "last_activity": data.get("last_activity") if isinstance(data, dict) else None
                    }
                    sessions.append(session_info)

        return sorted(sessions, key=lambda x: x.get("last_activity", ""), reverse=True)

    def export_conversation(self, paper_id: str, session_id: Optional[str] = None) -> Optional[Dict]:
        """Export conversation data for a paper."""
        if session_id:
            key = f"chat:session:{paper_id}:{session_id}"
            data = self.get(key)
            if data:
                return {
                    "paper_id": paper_id,
                    "session_id": session_id,
                    "conversation": data,
                    "exported_at": datetime.now().isoformat()
                }
        else:
            # Export all conversations for the paper
            pattern = f"chat:session:{paper_id}:*"
            conversations = []
            for key in self.redis.keys(pattern):
                parts = key.split(":")
                if len(parts) >= 4:
                    data = self.get(key)
                    if data:
                        conversations.append({
                            "session_id": parts[3],
                            "data": data
                        })

            if conversations:
                return {
                    "paper_id": paper_id,
                    "conversations": conversations,
                    "total": len(conversations),
                    "exported_at": datetime.now().isoformat()
                }

        return None

    def get_chat_stats(self) -> Dict:
        """Get chat statistics."""
        sessions = self.get_chat_sessions()

        stats = {
            "total_sessions": len(sessions),
            "active_sessions": sum(1 for s in sessions if s["ttl"] > 0),
            "total_messages": sum(s["messages"] for s in sessions),
            "papers_with_chats": len(set(s["paper_id"] for s in sessions)),
            "sessions_by_paper": Counter(s["paper_id"] for s in sessions).most_common(10)
        }

        return stats

    # ========== Rate Limiting ==========

    def check_rate_limit(self, user_id: str, window: str = "hour", limit: int = 20) -> Dict:
        """Check rate limit for user."""
        # Determine window in seconds
        window_seconds = {
            "minute": 60,
            "hour": 3600,
            "day": 86400
        }.get(window, 3600)

        key = f"rate_limit:{user_id}:{window}"
        current = self.redis.get(key)
        current_count = int(current) if current else 0
        ttl = self.get_ttl(key)

        return {
            "user_id": user_id,
            "window": window,
            "limit": limit,
            "current": current_count,
            "remaining": max(0, limit - current_count),
            "resets_in": ttl if ttl > 0 else 0,
            "is_limited": current_count >= limit
        }

    def reset_rate_limit(self, user_id: str, window: Optional[str] = None):
        """Reset rate limit for user."""
        if window:
            keys = [f"rate_limit:{user_id}:{window}"]
        else:
            # Reset all windows
            keys = self.redis.keys(f"rate_limit:{user_id}:*")

        deleted = 0
        for key in keys:
            deleted += self.redis.delete(key)

        return deleted

    # ========== Analytics ==========

    def get_top_papers(self, days: int = 7) -> List[Tuple[str, int]]:
        """Get most active papers by chat sessions in last N days."""
        # For now, analyze all sessions (in production, you'd filter by timestamp)
        sessions = self.get_chat_sessions()
        paper_counts = Counter(s["paper_id"] for s in sessions)
        return paper_counts.most_common(10)

    def get_user_activity(self, hours: int = 24) -> Dict:
        """Get user activity stats for last N hours."""
        # Analyze rate limit keys to understand user activity
        rate_keys = self.redis.keys("rate_limit:*:hour")
        active_users = len(rate_keys)

        total_requests = 0
        for key in rate_keys:
            value = self.redis.get(key)
            if value:
                total_requests += int(value)

        return {
            "period_hours": hours,
            "active_users": active_users,
            "total_requests": total_requests,
            "avg_requests_per_user": round(total_requests / active_users, 2) if active_users else 0
        }

    def get_memory_stats(self) -> Dict:
        """Get Redis memory statistics."""
        info = self.redis.info("memory")
        stats = self.redis.dbsize()

        return {
            "used_memory_human": info.get("used_memory_human", "N/A"),
            "used_memory_peak_human": info.get("used_memory_peak_human", "N/A"),
            "total_keys": stats,
            "memory_per_key": f"{info.get('used_memory', 0) / stats:.0f} bytes" if stats else "N/A"
        }


def pretty_print_dict(data: Dict, indent: int = 0):
    """Pretty print a dictionary."""
    spacing = "  " * indent
    for key, value in data.items():
        if isinstance(value, dict):
            print(f"{spacing}{key}:")
            pretty_print_dict(value, indent + 1)
        elif isinstance(value, list):
            print(f"{spacing}{key}:")
            for item in value:
                if isinstance(item, dict):
                    pretty_print_dict(item, indent + 1)
                else:
                    print(f"{spacing}  - {item}")
        else:
            print(f"{spacing}{key}: {value}")


def monitor_live(client: RedisClient, refresh_interval: int = 2):
    """Monitor Redis activity in real-time."""
    print("📊 Redis Live Monitor (Ctrl+C to exit)")
    print("=" * 60)

    try:
        while True:
            # Clear screen (works on Unix/Windows)
            os.system('cls' if os.name == 'nt' else 'clear')

            print(f"🕐 {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
            print("=" * 60)

            # Memory stats
            mem_stats = client.get_memory_stats()
            print(f"💾 Memory: {mem_stats['used_memory_human']} / Peak: {mem_stats['used_memory_peak_human']}")
            print(f"🔑 Total Keys: {mem_stats['total_keys']}")
            print()

            # Chat stats
            chat_stats = client.get_chat_stats()
            print(f"💬 Chat Sessions: {chat_stats['total_sessions']} ({chat_stats['active_sessions']} active)")
            print(f"📝 Total Messages: {chat_stats['total_messages']}")
            print()

            # Top papers
            if chat_stats['sessions_by_paper']:
                print("📚 Top Papers by Sessions:")
                for paper_id, count in chat_stats['sessions_by_paper'][:5]:
                    print(f"   {paper_id}: {count} sessions")
            print()

            # User activity
            activity = client.get_user_activity(1)
            print(f"👥 Active Users (last hour): {activity['active_users']}")
            print(f"📊 Total Requests: {activity['total_requests']}")

            time.sleep(refresh_interval)

    except KeyboardInterrupt:
        print("\n\n✋ Monitor stopped")


def main():
    """Main CLI entry point."""
    parser = argparse.ArgumentParser(
        description='Redis CLI utility for cache and session management',
        formatter_class=argparse.RawDescriptionHelpFormatter
    )

    subparsers = parser.add_subparsers(dest='command', help='Command to execute')

    # ===== Direct Redis Operations =====

    # GET command
    get_parser = subparsers.add_parser('get', help='Get value by key or pattern')
    get_parser.add_argument('key', help='Key to get')
    get_parser.add_argument('--pattern', action='store_true', help='Treat key as pattern')
    get_parser.add_argument('--output', help='Output to JSON file')

    # SET command
    set_parser = subparsers.add_parser('set', help='Set key-value pair')
    set_parser.add_argument('key', help='Key to set')
    set_parser.add_argument('value', help='Value to set (JSON string for objects)')
    set_parser.add_argument('--ttl', type=int, help='TTL in seconds')

    # DELETE command
    del_parser = subparsers.add_parser('delete', help='Delete key(s)')
    del_parser.add_argument('key', help='Key to delete')
    del_parser.add_argument('--pattern', action='store_true', help='Delete all matching pattern')

    # KEYS command
    keys_parser = subparsers.add_parser('keys', help='List keys')
    keys_parser.add_argument('pattern', nargs='?', default='*', help='Pattern to match (default: *)')

    # TTL command
    ttl_parser = subparsers.add_parser('ttl', help='Get/set TTL for key')
    ttl_parser.add_argument('key', help='Key to check/update')
    ttl_parser.add_argument('--set', type=int, help='Set TTL to this value (seconds)')

    # MONITOR command
    monitor_parser = subparsers.add_parser('monitor', help='Monitor Redis activity')
    monitor_parser.add_argument('--live', action='store_true', help='Live monitoring mode')
    monitor_parser.add_argument('--interval', type=int, default=2, help='Refresh interval (seconds)')

    # ===== Chat Commands =====

    chat_parser = subparsers.add_parser('chat', help='Chat session management')
    chat_sub = chat_parser.add_subparsers(dest='chat_command')

    # chat list-sessions
    chat_list = chat_sub.add_parser('list-sessions', help='List all chat sessions')
    chat_list.add_argument('--paper-id', help='Filter by paper ID')
    chat_list.add_argument('--output', help='Output to CSV file')

    # chat export-conversation
    chat_export = chat_sub.add_parser('export-conversation', help='Export conversation')
    chat_export.add_argument('paper_id', help='Paper ID')
    chat_export.add_argument('--session-id', help='Specific session ID')
    chat_export.add_argument('--output', help='Output to JSON file')

    # chat stats
    chat_stats = chat_sub.add_parser('stats', help='Show chat statistics')

    # ===== Rate Limit Commands =====

    rate_parser = subparsers.add_parser('rate-limit', help='Rate limit management')
    rate_sub = rate_parser.add_subparsers(dest='rate_command')

    # rate-limit check
    rate_check = rate_sub.add_parser('check', help='Check rate limit')
    rate_check.add_argument('user_id', help='User ID to check')
    rate_check.add_argument('--window', choices=['minute', 'hour', 'day'], default='hour')
    rate_check.add_argument('--limit', type=int, default=20, help='Rate limit threshold')

    # rate-limit reset
    rate_reset = rate_sub.add_parser('reset', help='Reset rate limit')
    rate_reset.add_argument('user_id', help='User ID to reset')
    rate_reset.add_argument('--window', choices=['minute', 'hour', 'day'], help='Specific window to reset')

    # ===== Analytics Commands =====

    analytics_parser = subparsers.add_parser('analytics', help='Analytics and reporting')
    analytics_sub = analytics_parser.add_subparsers(dest='analytics_command')

    # analytics top-papers
    top_papers = analytics_sub.add_parser('top-papers', help='Show most active papers')
    top_papers.add_argument('--days', type=int, default=7, help='Number of days to analyze')

    # analytics user-activity
    user_activity = analytics_sub.add_parser('user-activity', help='Show user activity')
    user_activity.add_argument('--hours', type=int, default=24, help='Number of hours to analyze')

    # analytics memory
    memory_stats = analytics_sub.add_parser('memory', help='Show memory statistics')

    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        return 1

    # Initialize Redis client
    try:
        client = RedisClient()
    except Exception as e:
        print(f"❌ Error: {e}", file=sys.stderr)
        return 1

    # Execute commands
    try:
        # ===== Direct Redis Operations =====

        if args.command == 'get':
            if args.pattern:
                results = client.get_pattern(args.key)
                if args.output:
                    with open(args.output, 'w') as f:
                        json.dump(results, f, indent=2)
                    print(f"✅ Exported {len(results)} keys to {args.output}")
                else:
                    if results:
                        print(f"Found {len(results)} keys:")
                        for key, value in results.items():
                            print(f"\n{key}:")
                            if isinstance(value, dict):
                                pretty_print_dict(value, indent=1)
                            else:
                                print(f"  {value}")
                    else:
                        print("No keys found matching pattern")
            else:
                value = client.get(args.key)
                if value is not None:
                    if isinstance(value, dict):
                        pretty_print_dict(value)
                    else:
                        print(value)
                else:
                    print(f"Key '{args.key}' not found")
                    return 1

        elif args.command == 'set':
            # Try to parse value as JSON
            try:
                value = json.loads(args.value)
            except json.JSONDecodeError:
                value = args.value

            success = client.set(args.key, value, ttl=args.ttl)
            if success:
                ttl_msg = f" with TTL={args.ttl}s" if args.ttl else ""
                print(f"✅ Set '{args.key}'{ttl_msg}")
            else:
                print(f"❌ Failed to set '{args.key}'")
                return 1

        elif args.command == 'delete':
            if args.pattern:
                count = client.delete_pattern(args.key)
                print(f"✅ Deleted {count} keys matching pattern '{args.key}'")
            else:
                count = client.delete(args.key)
                if count:
                    print(f"✅ Deleted '{args.key}'")
                else:
                    print(f"Key '{args.key}' not found")

        elif args.command == 'keys':
            keys = client.keys(args.pattern)
            if keys:
                print(f"Found {len(keys)} keys:")
                for key in keys:
                    ttl = client.get_ttl(key)
                    ttl_str = f" (TTL: {ttl}s)" if ttl > 0 else ""
                    print(f"  {key}{ttl_str}")
            else:
                print(f"No keys found matching '{args.pattern}'")

        elif args.command == 'ttl':
            if args.set:
                success = client.set_ttl(args.key, args.set)
                if success:
                    print(f"✅ Set TTL for '{args.key}' to {args.set} seconds")
                else:
                    print(f"❌ Failed to set TTL (key might not exist)")
                    return 1
            else:
                ttl = client.get_ttl(args.key)
                if ttl == -2:
                    print(f"Key '{args.key}' does not exist")
                elif ttl == -1:
                    print(f"Key '{args.key}' has no TTL (persistent)")
                else:
                    print(f"TTL for '{args.key}': {ttl} seconds ({ttl//60} minutes)")

        elif args.command == 'monitor':
            if args.live:
                monitor_live(client, args.interval)
            else:
                # One-time snapshot
                print("📊 Redis Snapshot")
                print("=" * 60)

                mem_stats = client.get_memory_stats()
                print("\n💾 Memory Statistics:")
                pretty_print_dict(mem_stats, indent=1)

                chat_stats = client.get_chat_stats()
                print("\n💬 Chat Statistics:")
                pretty_print_dict(chat_stats, indent=1)

                activity = client.get_user_activity(24)
                print("\n👥 User Activity (24h):")
                pretty_print_dict(activity, indent=1)

        # ===== Chat Commands =====

        elif args.command == 'chat':
            if args.chat_command == 'list-sessions':
                sessions = client.get_chat_sessions(args.paper_id)

                if args.output:
                    # Export to CSV
                    with open(args.output, 'w', newline='') as f:
                        if sessions:
                            writer = csv.DictWriter(f, fieldnames=sessions[0].keys())
                            writer.writeheader()
                            writer.writerows(sessions)
                        print(f"✅ Exported {len(sessions)} sessions to {args.output}")
                else:
                    if sessions:
                        print(f"Found {len(sessions)} chat sessions:\n")
                        for s in sessions:
                            ttl_str = f"{s['ttl']}s" if s['ttl'] > 0 else "expired"
                            print(f"  📑 {s['paper_id']} / {s['session_id']}")
                            print(f"     Messages: {s['messages']}, TTL: {ttl_str}")
                    else:
                        print("No chat sessions found")

            elif args.chat_command == 'export-conversation':
                data = client.export_conversation(args.paper_id, args.session_id)

                if data:
                    if args.output:
                        with open(args.output, 'w') as f:
                            json.dump(data, f, indent=2)
                        print(f"✅ Exported conversation to {args.output}")
                    else:
                        print(json.dumps(data, indent=2))
                else:
                    print(f"No conversation found for paper '{args.paper_id}'")

            elif args.chat_command == 'stats':
                stats = client.get_chat_stats()
                print("💬 Chat Statistics:")
                print("=" * 40)
                pretty_print_dict(stats)

        # ===== Rate Limit Commands =====

        elif args.command == 'rate-limit':
            if args.rate_command == 'check':
                info = client.check_rate_limit(args.user_id, args.window, args.limit)
                print(f"🔒 Rate Limit Status for '{args.user_id}':")
                print("=" * 40)
                pretty_print_dict(info)

                if info['is_limited']:
                    print("\n⚠️  USER IS RATE LIMITED")

            elif args.rate_command == 'reset':
                count = client.reset_rate_limit(args.user_id, args.window)
                if count:
                    window_msg = f" for window '{args.window}'" if args.window else " (all windows)"
                    print(f"✅ Reset {count} rate limit(s) for '{args.user_id}'{window_msg}")
                else:
                    print(f"No rate limits found for '{args.user_id}'")

        # ===== Analytics Commands =====

        elif args.command == 'analytics':
            if args.analytics_command == 'top-papers':
                papers = client.get_top_papers(args.days)
                if papers:
                    print(f"📚 Top Papers (last {args.days} days):")
                    print("=" * 40)
                    for i, (paper_id, count) in enumerate(papers, 1):
                        print(f"{i:2}. {paper_id}: {count} sessions")
                else:
                    print("No paper activity found")

            elif args.analytics_command == 'user-activity':
                activity = client.get_user_activity(args.hours)
                print(f"👥 User Activity (last {args.hours} hours):")
                print("=" * 40)
                pretty_print_dict(activity)

            elif args.analytics_command == 'memory':
                stats = client.get_memory_stats()
                print("💾 Redis Memory Statistics:")
                print("=" * 40)
                pretty_print_dict(stats)

        return 0

    except Exception as e:
        print(f"❌ Error: {e}", file=sys.stderr)
        return 1


if __name__ == '__main__':
    sys.exit(main())