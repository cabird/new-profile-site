"""Shared plumbing for the SSE chat endpoints.

Every stateful chat (paper, blog, AI-where-it-matters) used to carry its own
copy of the same validate → guard → stream → log skeleton. conversation_chat()
is the single engine; each route binds a conversation key to a system-prompt
builder and hands the rest over.

Also home to the request helpers (session id, client ip, token estimate) and
sse_response(), used by every streaming endpoint including /api/ask and
/api/chat.
"""
import json
import logging
from datetime import datetime, timedelta

import tiktoken
from quart import Response, jsonify, request, session

import analytics
import config
from chat_store import ConversationNotFoundError, store

logger = logging.getLogger(__name__)

client = None  # AsyncAzureOpenAI, set by init()

try:
    _encoding = tiktoken.get_encoding('o200k_base')
except Exception:
    _encoding = None


def init(azure_client):
    global client
    client = azure_client


def count_tokens(text):
    """Estimate: o200k_base is close enough for limits across gpt-5.x models."""
    if _encoding is not None:
        try:
            return len(_encoding.encode(text))
        except Exception:
            pass
    return len(text) // 4


def get_session_id():
    # Note: the X-Session-ID header is client-chosen (needed by the CORS'd
    # github.io frontend), so per-session limits are advisory, not hard security.
    session_id = request.headers.get('X-Session-ID')
    if not session_id:
        if 'id' not in session:
            session['id'] = __import__('os').urandom(16).hex()
        session_id = session['id']
    return session_id


def get_client_ip():
    if request.headers.get('X-Forwarded-For'):
        return request.headers.get('X-Forwarded-For').split(',')[0].strip()
    if request.headers.get('X-Real-IP'):
        return request.headers.get('X-Real-IP')
    return request.remote_addr


def sse_response(generator):
    return Response(
        generator,
        mimetype='text/event-stream',
        headers={
            'Cache-Control': 'no-cache',
            'X-Accel-Buffering': 'no',
            'Connection': 'keep-alive',
        }
    )


def sse_event(payload):
    return f"data: {json.dumps(payload)}\n\n"


async def validate_message():
    """Parse and bound the incoming {message}; returns (message, tokens, error_response)."""
    data = await request.get_json()
    user_message = (data or {}).get('message', '').strip()
    if not user_message:
        return None, 0, (jsonify({'error': 'Message is required'}), 400)
    token_count = count_tokens(user_message)
    if token_count > config.MAX_MESSAGE_TOKENS:
        return None, 0, (jsonify({
            'error': f'Message too long. Maximum {config.MAX_MESSAGE_TOKENS} tokens, got {token_count}'
        }), 400)
    return user_message, token_count, None


def check_rate_limit(session_id):
    """Enforced hourly limit shared by all chat endpoints; returns error response or None."""
    ok, _, reset_time = store.check_rate_limit(session_id)
    if not ok:
        return jsonify({
            'error': 'Rate limit exceeded. Please try again later.',
            'type': 'rate_limit',
            'reset_time': reset_time.isoformat() if reset_time else None,
        }), 429
    return None


EXPIRED = {'error': 'Your chat session expired. Please start a new conversation.',
           'type': 'conversation_expired'}


async def conversation_chat(conv_key, ensure_system_prompt, not_found_error='Content not found',
                            check_inactivity=True):
    """The shared engine for stateful single-context SSE chats.

    ensure_system_prompt: () -> system prompt string, or None for a 404.
    Called only when the conversation does not exist yet.
    check_inactivity=False preserves the legacy behavior of endpoints that
    never returned 408s (external static frontends depend on the old contract).
    """
    if not client:
        return jsonify({'error': 'Chat service unavailable'}), 503

    session_id = get_session_id()

    user_message, token_count, err = await validate_message()
    if err:
        return err

    err = check_rate_limit(session_id)
    if err:
        return err

    client_ip = get_client_ip()

    conversation = store.get_conversation(session_id, conv_key)
    if not conversation:
        system_prompt = ensure_system_prompt()
        if not system_prompt:
            return jsonify({'error': not_found_error}), 404
        store.init_conversation(
            session_id, conv_key,
            [{'role': 'system', 'content': system_prompt}], message_count=0)
        conversation = store.get_conversation(session_id, conv_key)

    if store.get_message_count(session_id, conv_key) >= config.MAX_MESSAGES_PER_CONVERSATION:
        return jsonify({
            'error': f'Conversation limit reached. Maximum {config.MAX_MESSAGES_PER_CONVERSATION} messages per chat.',
            'type': 'conversation_limit'
        }), 400

    if check_inactivity:
        last_activity = conversation.get('last_activity')
        if isinstance(last_activity, str):
            last_activity = datetime.fromisoformat(last_activity)
        if datetime.now() - last_activity > timedelta(minutes=config.INACTIVITY_TIMEOUT_MINUTES):
            store.delete_conversation(session_id, conv_key)
            return jsonify({'error': 'Chat ended due to inactivity', 'type': 'timeout'}), 408

    try:
        store.add_message(session_id, conv_key, 'user', user_message)
    except ConversationNotFoundError:
        return jsonify(EXPIRED), 410

    await analytics.log_chat_message(session_id, conv_key, 'user', user_message,
                                     token_count, client_ip)
    store.increment_rate_limit(session_id)

    async def generate_sse():
        try:
            conv = store.get_conversation(session_id, conv_key)
            stream = await client.chat.completions.create(
                model=config.azure_model(),
                messages=conv['messages'],
                stream=True,
                reasoning_effort='medium'
            )

            full_response = ""
            async for chunk in stream:
                if chunk.choices and chunk.choices[0].delta.content:
                    content = chunk.choices[0].delta.content
                    full_response += content
                    yield sse_event({'type': 'chat_chunk', 'content': content})

            try:
                store.add_message(session_id, conv_key, 'assistant', full_response)
            except ConversationNotFoundError:
                yield sse_event({'type': 'error', 'message': EXPIRED['error'],
                                 'error_type': 'conversation_expired'})
                return

            await analytics.log_chat_message(session_id, conv_key, 'assistant', full_response,
                                             count_tokens(full_response), client_ip)

            _, remaining, _ = store.check_rate_limit(session_id)
            yield sse_event({
                'type': 'chat_complete',
                'remaining_messages': remaining,
                'message_count': store.get_message_count(session_id, conv_key),
            })

        except ConversationNotFoundError:
            yield sse_event({'type': 'error', 'message': EXPIRED['error'],
                             'error_type': 'conversation_expired'})
        except Exception as e:
            logger.error(f"Chat error ({conv_key}): {e}")
            yield sse_event({'type': 'error', 'message': 'An error occurred. Please try again.'})

    return sse_response(generate_sse())
