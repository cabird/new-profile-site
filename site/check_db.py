import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

try:
    conn = psycopg2.connect(os.getenv('DATABASE_URL'))
    cur = conn.cursor()

    # Check if table exists
    cur.execute("""
        SELECT EXISTS (
            SELECT FROM information_schema.tables
            WHERE table_name = 'chat_messages'
        )
    """)
    table_exists = cur.fetchone()[0]

    if not table_exists:
        print("❌ Table 'chat_messages' does not exist yet.")
        print("   Run the Flask app at least once to create tables.")
    else:
        # Get count
        cur.execute("SELECT COUNT(*) FROM chat_messages")
        count = cur.fetchone()[0]
        print(f"✅ Table exists! Total messages: {count}")

        if count > 0:
            print("\nRecent messages:")
            print("-" * 100)
            cur.execute("""
                SELECT paper_id, role, LEFT(content, 50) as preview, session_id, ip_address, timestamp, token_count
                FROM chat_messages
                ORDER BY timestamp DESC
                LIMIT 10
            """)
            for row in cur.fetchall():
                paper_id, role, preview, session_id, ip_address, timestamp, token_count = row
                #remove newlines from preview and truncate if needed
                preview = preview.replace("\n", " ").replace("\r", " ")
                preview = (preview[:47] + '...') if len(preview) > 50 else preview
                ip_display = ip_address if ip_address else 'N/A'
                print(f"{session_id} | {timestamp} | {role:10s} | {ip_display:15s} | {paper_id[:15]:15s} | {token_count:5} | {preview}")
        else:
            print("\nNo messages yet. Test the chat feature to see data appear!")

    conn.close()

except Exception as e:
    print(f"❌ Error connecting to database: {e}")
    print("\nMake sure DATABASE_URL is set in your .env file!")
