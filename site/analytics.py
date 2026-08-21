"""PostgreSQL analytics logging.

psycopg2 is synchronous; the log call is pushed onto the default executor so
it never blocks the event loop mid-stream. Logging is best-effort: when
DATABASE_URL is absent or the database is down, calls are no-ops.
"""
import asyncio
import logging

import psycopg2

import config

logger = logging.getLogger(__name__)


def _get_db_connection():
    url = config.database_url()
    if not url:
        return None
    try:
        return psycopg2.connect(url)
    except Exception as e:
        logger.error(f"Failed to connect to database: {e}")
        return None


def init_analytics_db():
    conn = _get_db_connection()
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


def _log_chat_message_sync(session_id, conv_key, role, content, token_count, ip_address):
    conn = _get_db_connection()
    if not conn:
        return
    try:
        with conn.cursor() as cur:
            cur.execute("""
                INSERT INTO chat_messages (session_id, paper_id, role, content, token_count, ip_address)
                VALUES (%s, %s, %s, %s, %s, %s)
            """, (session_id, conv_key, role, content, token_count, ip_address))
            conn.commit()
    except Exception as e:
        logger.error(f"Failed to log chat message: {e}")
        conn.rollback()
    finally:
        conn.close()


async def log_chat_message(session_id, conv_key, role, content, token_count=None, ip_address=None):
    if not config.database_url():
        return
    loop = asyncio.get_running_loop()
    await loop.run_in_executor(
        None, _log_chat_message_sync,
        session_id, conv_key, role, content, token_count, ip_address,
    )
