"""LLM chat endpoints.

The three stateful single-context chats (paper, blog, AI-where-it-matters)
bind a conversation key and a system-prompt builder to the shared engine in
chat_common. The two assistant endpoints (/api/ask stateful, /api/chat
stateless) run the tool-using agent loop in assistant.py instead.
"""
import logging

from quart import Blueprint, jsonify, request

import analytics
import assistant
import chat_common
import config
import corpus
import prompts
from chat_common import (
    check_rate_limit, count_tokens, get_client_ip, get_session_id,
    sse_event, sse_response, validate_message,
)
from chat_store import ConversationNotFoundError, store

logger = logging.getLogger(__name__)

bp = Blueprint('chat', __name__)


# ---------------------------------------------------------------------------
# Per-paper chat
# ---------------------------------------------------------------------------

def _paper_system_prompt(paper_id):
    paper, content, _ = corpus.load_paper_markdown(paper_id)
    if not paper or not content:
        return None
    return prompts.render(
        'paper_chat',
        title=paper.get('title', 'Unknown'),
        authors=paper.get('authors', 'Unknown'),
        year=paper.get('year', 'Unknown'),
        venue=corpus.venue_of(paper, 'Unknown'),
        bibtex=paper.get('raw_bibtex'),
        content=content,
    )


@bp.route('/api/papers/<path:paper_id>/chat', methods=['POST'])
async def chat_with_paper(paper_id):
    """Chat with a specific paper using Azure OpenAI streaming."""
    return await chat_common.conversation_chat(
        paper_id,
        lambda: _paper_system_prompt(paper_id),
        not_found_error='Paper or markdown not found',
    )


@bp.route('/api/papers/<path:paper_id>/chat', methods=['DELETE'])
async def clear_paper_chat(paper_id):
    store.delete_conversation(get_session_id(), paper_id)
    return jsonify({'message': 'Chat cleared successfully'})


# ---------------------------------------------------------------------------
# Blog post chat
# ---------------------------------------------------------------------------

def _blog_system_prompt(slug):
    metadata, body = corpus.load_blog_post_markdown(slug)
    if not metadata or not body:
        return None
    tags = metadata.get('tags', [])
    if not isinstance(tags, list):
        tags = []
    return prompts.render(
        'blog_chat',
        title=metadata.get('title', slug),
        subtitle=metadata.get('subtitle', ''),
        date=metadata.get('date', ''),
        tags=', '.join(tags) if tags else 'none',
        content=body,
    )


@bp.route('/api/blog/<slug>/chat', methods=['POST'])
async def chat_with_blog_post(slug):
    """Chat with a specific blog post using Azure OpenAI streaming."""
    return await chat_common.conversation_chat(
        f'blog:{slug}',
        lambda: _blog_system_prompt(slug),
        not_found_error='Blog post not found',
    )


# ---------------------------------------------------------------------------
# AI Where It Matters companion chat
# ---------------------------------------------------------------------------

_ai_where_prompt = None


def build_prompts():
    """Build the AI-where-it-matters prompt once at startup (was lazy per request)."""
    global _ai_where_prompt
    paper1_id = 'Choudhuri2026AIWhere'
    paper2_id = 'choudhuri2025copilot-beyond'

    _, content1, _ = corpus.load_paper_markdown(paper1_id)
    _, content2, _ = corpus.load_paper_markdown(paper2_id)
    p1 = corpus.paper_data.get('papers', {}).get(paper1_id, {})
    p2 = corpus.paper_data.get('papers', {}).get(paper2_id, {})

    _ai_where_prompt = prompts.render(
        'ai_where_it_matters',
        p1_authors=p1.get('authors', 'Choudhuri, Badea, Bird, Butler, DeLine, Houck'),
        p1_year=p1.get('year', '2026'),
        p1_venue=p1.get('venue', 'ICSE-SEIP 2026'),
        p2_authors=p2.get('authors', 'Choudhuri, Bird, Badea, Sarma'),
        p2_year=p2.get('year', '2026'),
        p2_venue=p2.get('venue', 'ICSME 2026 Industry Track'),
        content1=content1 or '(Paper I content not available)',
        content2=content2 or '(Paper II content not available)',
    )
    logger.info(f"AI Where It Matters prompt built ({len(_ai_where_prompt)} chars)")


@bp.route('/api/chat/ai-where-it-matters', methods=['POST'])
async def chat_ai_where_it_matters():
    """Chat about both AI Where It Matters papers using Azure OpenAI streaming."""
    # check_inactivity=False: the external static frontend (cabird.github.io)
    # predates the 408 timeout contract and must keep working unchanged.
    return await chat_common.conversation_chat(
        'ai-where-it-matters',
        lambda: _ai_where_prompt,
        check_inactivity=False,
    )


# ---------------------------------------------------------------------------
# Research assistant: the tool-using agent over the whole corpus
# ---------------------------------------------------------------------------

@bp.route('/api/ask', methods=['POST'])
async def career_ask():
    """Career-wide chat: a stateful adapter over the tool-using research assistant.

    Same {message} contract the older frontends use; the conversation history
    lives in the chat store (user/assistant turns only, no system message: the
    assistant carries its own instructions and tools).
    """
    if not chat_common.client:
        return jsonify({'error': 'Chat service unavailable'}), 503

    session_id = get_session_id()
    conv_key = 'career-ask'

    user_message, token_count, err = await validate_message()
    if err:
        return err

    err = check_rate_limit(session_id)
    if err:
        return err

    if not store.get_conversation(session_id, conv_key):
        store.init_conversation(session_id, conv_key, [], message_count=0)

    if store.get_message_count(session_id, conv_key) >= config.MAX_MESSAGES_PER_CONVERSATION:
        return jsonify({
            'error': f'Conversation limit reached. Maximum {config.MAX_MESSAGES_PER_CONVERSATION} messages per chat.',
            'type': 'conversation_limit'
        }), 400

    try:
        store.add_message(session_id, conv_key, 'user', user_message)
    except ConversationNotFoundError:
        return jsonify(chat_common.EXPIRED), 410

    client_ip = get_client_ip()
    await analytics.log_chat_message(session_id, conv_key, 'user', user_message,
                                     token_count, client_ip)
    store.increment_rate_limit(session_id)

    history = list(store.get_conversation(session_id, conv_key)['messages'])

    async def generate_sse():
        full_response = ""
        try:
            async for event in assistant.stream_agent(
                chat_common.client, config.azure_model(), history,
            ):
                if event.get('type') == 'chat_chunk':
                    full_response += event.get('content', '')
                elif event.get('type') == 'chat_complete':
                    # Legacy /api/ask clients read these counters.
                    _, remaining, _ = store.check_rate_limit(session_id)
                    event = {**event, 'remaining_messages': remaining,
                             'message_count': store.get_message_count(session_id, conv_key)}
                yield sse_event(event)
        except Exception as e:
            logger.error(f"Career ask error: {e}")
            yield sse_event({'type': 'error', 'message': 'An error occurred. Please try again.'})
        finally:
            if full_response:
                try:
                    store.add_message(session_id, conv_key, 'assistant', full_response)
                except ConversationNotFoundError:
                    pass
                await analytics.log_chat_message(session_id, conv_key, 'assistant', full_response,
                                                 count_tokens(full_response), client_ip)

    return sse_response(generate_sse())


@bp.route('/api/ask', methods=['DELETE'])
async def clear_career_ask():
    """Clear the career-wide chat conversation for this session."""
    store.delete_conversation(get_session_id(), 'career-ask')
    return jsonify({'message': 'Chat cleared successfully'})


@bp.route('/api/chat', methods=['POST'])
async def research_assistant_chat():
    """Stateless research assistant: accepts {messages: [...]}, streams SSE.

    The client keeps the user/assistant history and sends it whole each turn;
    tool calls and results live only inside a single request, so history stays
    lean automatically.
    """
    if not chat_common.client:
        return jsonify({'error': 'Chat service unavailable'}), 503

    data = await request.get_json()
    if not data or not isinstance(data.get('messages'), list):
        return jsonify({'error': 'messages array is required'}), 400

    history = assistant.sanitize_history(data['messages'])
    if not history or history[-1]['role'] != 'user':
        return jsonify({'error': 'Last message must be from the user'}), 400

    token_count = count_tokens(history[-1]['content'])
    if token_count > config.MAX_MESSAGE_TOKENS:
        return jsonify({
            'error': f'Message too long. Maximum {config.MAX_MESSAGE_TOKENS} tokens, got {token_count}'
        }), 400

    session_id = get_session_id()

    err = check_rate_limit(session_id)
    if err:
        return err
    store.increment_rate_limit(session_id)

    client_ip = get_client_ip()
    await analytics.log_chat_message(session_id, 'research-assistant', 'user',
                                     history[-1]['content'], token_count, client_ip)

    async def generate_sse():
        full_response = ""
        try:
            async for event in assistant.stream_agent(
                chat_common.client, config.azure_model(), history,
            ):
                if event.get('type') == 'chat_chunk':
                    full_response += event.get('content', '')
                yield sse_event(event)
        except Exception as e:
            logger.error(f"Research assistant error: {e}")
            yield sse_event({'type': 'error', 'message': 'An error occurred. Please try again.'})
        finally:
            if full_response:
                await analytics.log_chat_message(session_id, 'research-assistant', 'assistant',
                                                 full_response, count_tokens(full_response), client_ip)

    return sse_response(generate_sse())
