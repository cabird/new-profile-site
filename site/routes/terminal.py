"""The simulated-terminal endpoint."""
import logging

from quart import Blueprint, jsonify, request

import chat_common
import config
import terminal
from chat_common import get_session_id, sse_event, sse_response
from chat_store import terminal_rate

logger = logging.getLogger(__name__)

bp = Blueprint('terminal', __name__)


@bp.route('/api/terminal', methods=['POST'])
async def terminal_command():
    """LLM-powered fake terminal that simulates a bash shell."""
    if not chat_common.client:
        return jsonify({'error': 'Terminal service unavailable'}), 503

    session_id = get_session_id()

    ok, _, reset_time = terminal_rate.check(session_id)
    if not ok:
        return jsonify({
            'error': 'Rate limit exceeded. The terminal will be back later.',
            'type': 'rate_limit',
            'reset_time': reset_time.isoformat() if reset_time else None,
        }), 429

    data = await request.get_json()
    command = (data or {}).get('command', '').strip()
    history = (data or {}).get('history', [])
    client_datetime = (data or {}).get('datetime', '')
    client_timezone = (data or {}).get('timezone', '')

    if not command:
        return jsonify({'error': 'Command is required'}), 400

    terminal_rate.increment(session_id)

    messages = [{'role': 'system',
                 'content': terminal.system_prompt(client_datetime, client_timezone)}]
    # History is alternating user/assistant messages; keep last 10 exchanges (20 messages)
    for msg in history[-20:]:
        messages.append({'role': msg.get('role', 'user'), 'content': msg.get('content', '')})
    messages.append({'role': 'user', 'content': command})

    async def generate_sse():
        try:
            stream = await chat_common.client.chat.completions.create(
                model=config.azure_model(),
                messages=messages,
                stream=True,
                max_completion_tokens=config.TERMINAL_MAX_RESPONSE_TOKENS,
                reasoning_effort='low'
            )

            async for chunk in stream:
                if chunk.choices and chunk.choices[0].delta.content:
                    yield sse_event({'type': 'terminal_chunk',
                                     'content': chunk.choices[0].delta.content})

            yield sse_event({'type': 'terminal_complete'})

        except Exception as e:
            logger.error(f"Terminal error: {e}")
            yield sse_event({'type': 'error', 'message': 'Terminal error. Please try again.'})

    return sse_response(generate_sse())
