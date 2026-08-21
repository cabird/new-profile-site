"""App factory and startup wiring.

Everything else lives in modules: see ARCHITECTURE.md.
  config.py       constants and env access
  corpus.py       papers, blog, canned questions, site data
  chat_store.py   in-memory conversations and rate windows
  analytics.py    Postgres chat logging (async, best-effort)
  chat_common.py  request helpers and the shared SSE chat engine
  prompts.py      Jinja2 prompt loader over prompts/*.md.j2
  terminal.py     simulated-terminal context
  assistant.py    tool-using research assistant (catalog, BM25, agent loop)
  routes/         blueprints: pages, content, chat, terminal
"""
import asyncio
import logging
import os
import secrets

from dotenv import load_dotenv
from openai import AsyncAzureOpenAI
from quart import Quart, jsonify
from quart_cors import cors

# Register .jsx MIME type before anything else
import mimetypes
mimetypes.add_type('application/javascript', '.jsx')

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

import analytics
import assistant
import chat_common
import config
import corpus
import terminal
from chat_store import store
from routes import chat as chat_routes
from routes import content as content_routes
from routes import pages as pages_routes
from routes import terminal as terminal_routes

app = Quart(__name__, static_folder='.')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY') or secrets.token_hex(32)

app = cors(app,
           allow_origin=['https://cabird.github.io'],
           allow_credentials=True,
           allow_headers=['Content-Type', 'X-Session-ID'],
           expose_headers=['X-Session-ID'])

app.register_blueprint(content_routes.bp)
app.register_blueprint(chat_routes.bp)
app.register_blueprint(terminal_routes.bp)
app.register_blueprint(pages_routes.bp)  # last: contains the catch-all


@app.errorhandler(500)
async def handle_500(error):
    return jsonify({'error': 'Internal server error'}), 500


def initialize_app():
    corpus.load_all()
    terminal.init()
    chat_routes.build_prompts()

    try:
        assistant.init(corpus.paper_data, corpus.safe_dirname)
    except Exception as e:
        logger.error(f"Failed to initialize research assistant: {e}")

    try:
        client = AsyncAzureOpenAI(
            azure_endpoint=os.getenv('AZURE_OPENAI_PAPER_CHAT_ENDPOINT'),
            api_key=os.getenv('AZURE_OPENAI_PAPER_CHAT_KEY'),
            api_version=os.getenv('AZURE_OPENAI_PAPER_CHAT_API_VERSION', '2024-02-01')
        )
        chat_common.init(client)
        logger.info("Azure OpenAI client initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize Azure OpenAI client: {e}")

    analytics.init_analytics_db()


initialize_app()


async def cleanup_loop():
    while True:
        await asyncio.sleep(config.CLEANUP_INTERVAL_MINUTES * 60)
        store.cleanup_inactive()


@app.before_serving
async def start_cleanup():
    app.add_background_task(cleanup_loop)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
