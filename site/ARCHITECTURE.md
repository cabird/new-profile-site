# Architecture

A rough working document. Describes how the site works today. The backend
refactoring this document originally proposed has been carried out; the file
map below is the current layout.

## The system in one paragraph

A Quart (async Flask) app serves a personal research site: static
frontend prototypes built with in-browser React (no build step), a paper
corpus with extracted full text, and several AI features backed by Azure
OpenAI. Everything runs as one process under Hypercorn on Render,
auto-deployed from `main`. Chat conversations live in process memory, which
is why the worker count must stay at 1.

## Frontend

- `prototypes/scholarly-ide/` is the current public site at `/ide/` (and `/`
  redirects there). A fake IDE with file explorer, paper reader, per-paper AI
  chat, and a simulated terminal.
- `prototypes/v4/ v5/ v6/` are candidate redesigns of the professional front
  door. v6 is the current direction: multi-page (home, expertise,
  publications, recognition, about), typography-first, with a floating chat
  panel wired to the new `/api/chat` research assistant.
- `index.html` + `components/` at the site root are the older "classic" site,
  still reachable at `/classic`.
- All prototypes fetch `/api/paper_data.json` and talk to the chat endpoints
  over server-sent events (SSE). Frontends send `data: {json}` framed events;
  event types are `chat_chunk`, `chat_complete`, `tool_activity` (assistant
  only), `terminal_chunk`, and `error`.

## Data assets

- `paper_data.json`: metadata for all 119 papers, including per-paper
  LLM-extracted summaries (`tldr`, `approach`, `findings`), tags, and awards.
  Loaded once at startup into `paper_data_cache`.
- `../extracted/<safe_dirname(paper_id)>/`: per-paper extraction output from
  `scripts/batch_extract.py`. `combined.md` (with images) feeds the paper
  reader and per-paper chat; `combined_text_only.md` feeds the research
  assistant's index. 113 of 119 papers have full text.
- `markdowns/`: older fallback markdown, used when a paper has no extracted
  directory.
- `../blog/<slug>/post.md`: blog posts with YAML-ish frontmatter.
- `cv/cv_academic.md` and `cv/cv_academic.pdf`: the public CV. The markdown
  is included in AI system prompts; the PDF is the download link.

## AI features

All use the same Azure OpenAI resource (see `.env` / Render env vars).
Streaming SSE throughout, `reasoning_effort` medium (terminal: low).

1. Per-paper chat (`POST /api/papers/<id>/chat`): system prompt = rules +
   metadata + the paper's full markdown. Conversation state per session in
   the chat store, with message caps, hourly rate limit, and inactivity
   timeout.
2. Blog post chat (`POST /api/blog/<slug>/chat`): same pattern, post content
   in the prompt.
3. AI Where It Matters chat (`POST /api/chat/ai-where-it-matters`): a
   two-paper companion-site chat with both papers' content in one prompt.
4. Career ask (`POST /api/ask`): legacy `{message}` contract kept for the
   older frontends, now a stateful adapter over the research assistant: the
   conversation history lives in the chat store and each turn runs the full
   tool-using agent. Its `chat_complete` still carries `remaining_messages`
   and `message_count` for legacy clients.
5. Terminal (`POST /api/terminal`): an LLM simulating a bash shell over a
   fictional filesystem built from real paper data. Stateless on the server;
   the client sends command history.
6. Research assistant (`POST /api/chat`, in `assistant.py`): the unified
   tool-using bot. System prompt = role and conduct rules + biographical
   sketch + full CV + a catalog line per paper (id, year, venue, awards,
   tldr). Three tools over the extracted corpus:
   - `get_paper(paper_id)`: metadata, summaries, section outline
   - `read_paper(paper_id, section?, start_char?)`: full text in bounded chunks
   - `search_passages(query, paper_id?)`: hand-rolled BM25 over ~5,400
     passages (~400 tokens each), built in memory at startup
   Runs on the Azure Responses API (required for tools + reasoning on this
   model family) in a loop of up to 8 tool rounds. Tool calls stream to the
   client as `tool_activity` events so visitors can watch it work. The client
   sends the whole user/assistant history each turn; tool traffic stays
   inside one request.

## Backend file map (current)

Pragmatic split, no enterprise layering. Quart blueprints per route group.

```
site/
  app.py            app factory, CORS, startup wiring, blueprint registration,
                    error handler, cleanup task, __main__  (~110 lines)
  config.py         constants and env access (limits, version, model name)
  corpus.py         paper_data loading, safe_dirname, load_paper_markdown,
                    venue_of (the single venue-extraction implementation),
                    blog loading + frontmatter, canned questions, site data, CV
  chat_store.py     ChatStore + ConversationNotFoundError + RateWindow;
                    the store and the terminal rate window are module-level
                    singletons created at import
  analytics.py      DB connection, table init, log_chat_message (async: the
                    synchronous psycopg2 call runs on the default executor so
                    it never blocks the event loop mid-stream)
  chat_common.py    session/token/ip helpers, sse_response/sse_event, enforced
                    rate limiting, and conversation_chat(): the one shared
                    engine behind every stateful single-context chat
  prompts.py        tiny Jinja2 loader: render(name, **vars) over prompts/
  prompts/          all system prompts as .md.j2 files (see below)
  assistant.py      research assistant: catalog, BM25 index, three tools,
                    Responses-API agent loop
  terminal.py       terminal filesystem/bio/stats, built once at startup
  routes/
    pages.py        page routes, redirects, /ide/, blog/extracted assets, the
                    static catch-all (with a denylist for dotfiles and source)
    content.py      JSON APIs: paper data, markdown, blog index/post,
                    canned questions, version
    chat.py         paper chat, blog chat, ai-where-it-matters, /api/ask,
                    /api/chat research assistant
    terminal.py     /api/terminal
```

The biggest single win was `chat_common.conversation_chat()`: the stateful
chat endpoints used to repeat the same ~80-line body (validate, guard limits,
build prompt on first use, append message, stream, log, complete event); each
route is now a few lines binding a conversation key to a prompt builder.

## Prompts

Every LLM prompt lives in `site/prompts/`, one Jinja2 template each. Quart
already depends on Jinja2, so this adds no dependency.

```
prompts/
  paper_chat.md.j2           title, authors, year, venue, content
  blog_chat.md.j2            title, subtitle, date, tags, content
  ai_where_it_matters.md.j2  paper metadata vars, content1, content2
  research_assistant.md.j2   cv_content, catalog (bio sketch is literal text)
  terminal.md.j2             datetime, timezone, bio, filesystem, stats
```

Jinja2 rather than `str.format` because prompts contain literal braces (JSON
examples, shell snippets) that `str.format` would treat as fields, and
`StrictUndefined` turns a missing variable into a loud error instead of a
silently wrong prompt. Autoescape is off (these are not HTML). Prompts that
do not vary per request (research assistant, ai-where-it-matters) are
rendered once at startup; the terminal prompt renders per request because the
client's clock and timezone are interpolated (the compiled template is
cached by Jinja2).

## Deployment

See `DEPLOYMENT.md`. Short version: Render web service, root directory
`site`, `./build.sh`, `hypercorn app:app --workers 1`, env vars in the
Render dashboard. The app serves fine without Azure keys; AI features
return 503s. Analytics logging is skipped when `DATABASE_URL` is absent.

## Known wrinkles

- One worker only: conversations and rate limits are process memory.
- Hourly rate limits are now enforced (429 with a `rate_limit` type and
  `reset_time`), for chats and the terminal alike. The session id can come
  from a client-chosen `X-Session-ID` header (needed by the CORS'd static
  frontends), so the limits are abuse-dampening, not hard security.
- Legacy compatibility: the external static frontend for AI Where It Matters
  predates the inactivity-timeout contract, so that endpoint passes
  `check_inactivity=False` and never 408s. Paper and blog chat keep their
  historical 408 behavior.
- `analytics.log_chat_message` still opens a connection per message (now off
  the event loop); a small pool would be the next step if volume ever grows.
- The JS venue-extraction copy in the prototypes' shared.jsx still exists;
  the Python side is unified in `corpus.venue_of`.
- `check_db.py` / `query_db.py` remain as standalone operator scripts (no
  longer publicly servable: the static catch-all denies `.py`).
