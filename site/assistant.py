"""Career-wide research assistant with tool use over the paper corpus.

One bot that can answer anything about Christian Bird's research and
professional background. The system prompt carries the map (bio, CV, and a
one-line-per-paper catalog); three tools carry the depth:

  - get_paper(paper_id): metadata, summaries, and section outline
  - read_paper(paper_id, section?, start_char?): the extracted full text
  - search_passages(query, paper_id?): BM25 over ~400-token passages

The agent loop runs on the Azure OpenAI Responses API (required for
function tools + reasoning on this model family) and yields SSE-ready
event dicts: tool_activity, chat_chunk, chat_complete, error.
"""

import json
import logging
import math
import os
import re
from collections import Counter

import corpus
import prompts

logger = logging.getLogger(__name__)

EXTRACTED_ROOT = os.path.join('..', 'extracted')
READ_CAP = 24000          # chars returned per read_paper call
SNIPPET_LEN = 700         # chars per search result snippet
CHUNK_TARGET = 1800       # chars per BM25 passage (~400 tokens)
MAX_TOOL_ROUNDS = 8
MAX_HISTORY_MESSAGES = 30

# Module state, populated by init()
_papers = {}              # paper_id -> metadata dict
_texts = {}               # paper_id -> combined_text_only.md contents
_outlines = {}            # paper_id -> [heading, ...]
_chunks = []              # [{paper_id, heading, text, tokens}]
_bm25 = None
_system_prompt = None
_safe_dirname = None


# ----------------------------------------------------------------------------
# Corpus loading and indexing
# ----------------------------------------------------------------------------

_WORD_RE = re.compile(r"[a-z0-9]+")


def _tokenize(text):
    return _WORD_RE.findall(text.lower())


class _BM25:
    """Minimal Okapi BM25 over pre-tokenized documents."""

    K1 = 1.5
    B = 0.75

    def __init__(self, docs_tokens):
        self.doc_freqs = [Counter(toks) for toks in docs_tokens]
        self.doc_lens = [len(toks) for toks in docs_tokens]
        self.avg_len = (sum(self.doc_lens) / len(self.doc_lens)) if self.doc_lens else 0
        self.n = len(docs_tokens)
        df = Counter()
        for freqs in self.doc_freqs:
            df.update(freqs.keys())
        self.idf = {
            term: math.log(1 + (self.n - d + 0.5) / (d + 0.5))
            for term, d in df.items()
        }

    def scores(self, query_tokens):
        out = [0.0] * self.n
        for term in query_tokens:
            idf = self.idf.get(term)
            if idf is None:
                continue
            for i, freqs in enumerate(self.doc_freqs):
                tf = freqs.get(term)
                if not tf:
                    continue
                denom = tf + self.K1 * (1 - self.B + self.B * self.doc_lens[i] / (self.avg_len or 1))
                out[i] += idf * tf * (self.K1 + 1) / denom
        return out


def _headings_of(text):
    return [m.group(1).strip() for m in re.finditer(r'^#{1,4}\s+(.+)$', text, re.M)]


def _chunk_paper(paper_id, text):
    """Split into ~CHUNK_TARGET-char passages on paragraph boundaries,
    tracking the most recent markdown heading."""
    chunks = []
    heading = ''
    buf = []
    buf_len = 0

    def flush():
        nonlocal buf, buf_len
        body = '\n\n'.join(buf).strip()
        if body:
            chunks.append({'paper_id': paper_id, 'heading': heading, 'text': body})
        buf, buf_len = [], 0

    for para in re.split(r'\n\s*\n', text):
        para = para.strip()
        if not para:
            continue
        m = re.match(r'^#{1,4}\s+(.+)$', para.splitlines()[0])
        if m:
            flush()
            heading = m.group(1).strip()
        buf.append(para)
        buf_len += len(para)
        if buf_len >= CHUNK_TARGET:
            flush()
    flush()
    return chunks


def _build_catalog():
    lines = []
    papers = sorted(
        _papers.items(),
        key=lambda kv: (str(kv[1].get('year', '')),), reverse=True,
    )
    for pid, p in papers:
        info = p.get('extracted_paper_info') or {}
        tldr = (info.get('tldr') or '').strip()
        awards = f" [{'; '.join(p['awards'])}]" if p.get('awards') else ''
        has_text = ' (full text available)' if pid in _texts else ''
        head = f"id: {pid} | {p.get('year', '?')} | {corpus.venue_of(p)}{awards}{has_text}\n" \
               f"  {p.get('title', pid)}"
        lines.append(f"{head}\n  {tldr}" if tldr else head)
    return '\n'.join(lines)


def init(paper_data_cache, safe_dirname):
    """Load corpus, build the BM25 index and the system prompt. Called once at startup."""
    global _papers, _texts, _outlines, _chunks, _bm25, _system_prompt, _safe_dirname

    _safe_dirname = safe_dirname
    _papers = dict(paper_data_cache.get('papers', {}))

    _texts, _outlines = {}, {}
    for pid in _papers:
        path = os.path.join(EXTRACTED_ROOT, safe_dirname(pid), 'combined_text_only.md')
        try:
            with open(path, 'r', encoding='utf-8') as f:
                text = f.read()
        except OSError:
            continue
        _texts[pid] = text
        _outlines[pid] = _headings_of(text)

    _chunks = []
    for pid, text in _texts.items():
        _chunks.extend(_chunk_paper(pid, text))
    _bm25 = _BM25([_tokenize(c['text']) for c in _chunks])

    _system_prompt = prompts.render(
        'research_assistant',
        cv_content=corpus.load_cv_markdown(),
        catalog=_build_catalog(),
    )
    logger.info(
        f"assistant: {len(_texts)}/{len(_papers)} papers with full text, "
        f"{len(_chunks)} passages indexed, system prompt {len(_system_prompt)} chars"
    )


# ----------------------------------------------------------------------------
# Tools
# ----------------------------------------------------------------------------

TOOL_SCHEMAS = [
    {
        'type': 'function',
        'name': 'get_paper',
        'description': "Get one paper's metadata, abstract-level summaries, and the "
                       "section outline of its full text. Cheap; call before reading.",
        'parameters': {
            'type': 'object',
            'properties': {
                'paper_id': {'type': 'string', 'description': 'Paper id from the catalog.'},
            },
            'required': ['paper_id'],
        },
    },
    {
        'type': 'function',
        'name': 'read_paper',
        'description': "Read a paper's extracted full text. Pass section to read from a "
                       "specific heading (matched case-insensitively); otherwise reading "
                       "starts at start_char (default 0). Long texts are returned in "
                       f"chunks of at most {READ_CAP} characters; the result says how to continue.",
        'parameters': {
            'type': 'object',
            'properties': {
                'paper_id': {'type': 'string', 'description': 'Paper id from the catalog.'},
                'section': {'type': 'string', 'description': 'Heading to start reading from.'},
                'start_char': {'type': 'integer', 'description': 'Character offset to start from.'},
            },
            'required': ['paper_id'],
        },
    },
    {
        'type': 'function',
        'name': 'search_passages',
        'description': 'Full-text BM25 search over all papers. Returns the best-matching '
                       'passages with paper id, section heading, and snippet. Pass '
                       'paper_id to search within a single paper.',
        'parameters': {
            'type': 'object',
            'properties': {
                'query': {'type': 'string', 'description': 'Search terms.'},
                'paper_id': {'type': 'string', 'description': 'Optional: restrict to this paper.'},
                'top_k': {'type': 'integer', 'description': 'Results to return (default 8, max 20).'},
            },
            'required': ['query'],
        },
    },
]


def _tool_get_paper(paper_id):
    p = _papers.get(paper_id)
    if not p:
        return json.dumps({'error': f'Unknown paper_id: {paper_id}. Use an id from the catalog.'})
    info = p.get('extracted_paper_info') or {}
    out = {
        'paper_id': paper_id,
        'title': p.get('title'),
        'year': p.get('year'),
        'venue': corpus.venue_of(p),
        'authors': p.get('authors'),
        'awards': p.get('awards') or [],
        'doi': p.get('doi'),
        'tldr': info.get('tldr'),
        'problem': (info.get('details') or {}).get('problem'),
        'approach': (info.get('details') or {}).get('approach'),
        'key_insights': (info.get('details') or {}).get('key_insights'),
        'implications': (info.get('details') or {}).get('implications'),
        'full_text_available': paper_id in _texts,
        'section_outline': _outlines.get(paper_id) or [],
        'text_length_chars': len(_texts.get(paper_id, '')),
    }
    return json.dumps({k: v for k, v in out.items() if v not in (None, '', [])})


def _tool_read_paper(paper_id, section=None, start_char=0):
    text = _texts.get(paper_id)
    if text is None:
        if paper_id in _papers:
            return json.dumps({'error': 'No extracted full text for this paper. '
                                        'Use get_paper for its summaries instead.'})
        return json.dumps({'error': f'Unknown paper_id: {paper_id}.'})

    start = max(0, int(start_char or 0))
    if section:
        m = re.search(r'^#{1,4}\s+.*' + re.escape(section.strip()) + r'.*$',
                      text, re.M | re.I)
        if m:
            start = m.start()
        else:
            return json.dumps({'error': f'Section "{section}" not found.',
                               'section_outline': _outlines.get(paper_id) or []})

    body = text[start:start + READ_CAP]
    result = {'paper_id': paper_id, 'start_char': start, 'text': body}
    if start + READ_CAP < len(text):
        result['truncated'] = True
        result['continue_hint'] = (f'Text continues; call read_paper with '
                                   f'start_char={start + READ_CAP} for more.')
    return json.dumps(result)


def _tool_search_passages(query, paper_id=None, top_k=8):
    if not _bm25:
        return json.dumps({'error': 'Search index not available.'})
    top_k = min(int(top_k or 8), 20)
    scores = _bm25.scores(_tokenize(query))
    order = sorted(range(len(scores)), key=lambda i: scores[i], reverse=True)
    results = []
    for i in order:
        if scores[i] <= 0:
            break
        c = _chunks[i]
        if paper_id and c['paper_id'] != paper_id:
            continue
        p = _papers.get(c['paper_id'], {})
        results.append({
            'paper_id': c['paper_id'],
            'title': p.get('title'),
            'year': p.get('year'),
            'section': c['heading'],
            'snippet': c['text'][:SNIPPET_LEN],
        })
        if len(results) >= top_k:
            break
    return json.dumps({'query': query, 'results': results})


def _execute_tool(name, args):
    try:
        if name == 'get_paper':
            return _tool_get_paper(args.get('paper_id', ''))
        if name == 'read_paper':
            return _tool_read_paper(args.get('paper_id', ''), args.get('section'),
                                    args.get('start_char', 0))
        if name == 'search_passages':
            return _tool_search_passages(args.get('query', ''), args.get('paper_id'),
                                         args.get('top_k', 8))
        return json.dumps({'error': f'Unknown tool: {name}'})
    except Exception as e:
        logger.error(f"assistant tool {name} failed: {e}")
        return json.dumps({'error': 'Tool execution failed.'})


def _describe_call(name, args):
    """Human-readable activity line streamed to the visitor while a tool runs."""
    if name == 'search_passages':
        q = args.get('query', '')
        return f'Searching the papers for "{q}"…'
    pid = args.get('paper_id', '')
    p = _papers.get(pid, {})
    title = p.get('title') or pid
    year = f" ({p.get('year')})" if p.get('year') else ''
    if name == 'get_paper':
        return f'Looking up {title}{year}…'
    if name == 'read_paper':
        section = args.get('section')
        where = f', section "{section}"' if section else ''
        return f'Reading {title}{year}{where}…'
    return 'Working…'


# ----------------------------------------------------------------------------
# Agent loop
# ----------------------------------------------------------------------------

def sanitize_history(messages):
    """Keep only well-formed user/assistant turns, bounded."""
    clean = []
    for m in messages[-MAX_HISTORY_MESSAGES:]:
        role = m.get('role')
        content = m.get('content')
        if role in ('user', 'assistant') and isinstance(content, str) and content.strip():
            clean.append({'role': role, 'content': content.strip()})
    return clean


async def stream_agent(client, model, history):
    """Run the tool loop; yield SSE-ready event dicts."""
    if _system_prompt is None:
        yield {'type': 'error', 'message': 'Assistant not initialized.'}
        return

    input_items = list(history)
    for _round in range(MAX_TOOL_ROUNDS):
        stream = await client.responses.create(
            model=model,
            instructions=_system_prompt,
            input=input_items,
            tools=TOOL_SCHEMAS,
            reasoning={'effort': 'medium'},
            stream=True,
        )
        final = None
        async for ev in stream:
            if ev.type == 'response.output_text.delta':
                yield {'type': 'chat_chunk', 'content': ev.delta}
            elif ev.type == 'response.completed':
                final = ev.response
            elif ev.type == 'response.failed':
                msg = 'The model request failed.'
                try:
                    msg = ev.response.error.message or msg
                except Exception:
                    pass
                yield {'type': 'error', 'message': msg}
                return

        calls = [it for it in (final.output if final else [])
                 if getattr(it, 'type', '') == 'function_call']
        if not calls:
            yield {'type': 'chat_complete'}
            return

        # Feed the round's full output (reasoning items included) back as input,
        # then append each tool result.
        for it in final.output:
            input_items.append(it.model_dump(exclude_none=True))
        for call in calls:
            try:
                args = json.loads(call.arguments or '{}')
            except json.JSONDecodeError:
                args = {}
            yield {'type': 'tool_activity', 'message': _describe_call(call.name, args)}
            output = _execute_tool(call.name, args)
            input_items.append({
                'type': 'function_call_output',
                'call_id': call.call_id,
                'output': output,
            })

    yield {'type': 'error', 'message': 'The assistant took too many steps. Try a narrower question.'}
