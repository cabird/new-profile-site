# Research IDE - Project Instructions

## Version Bumping

Before every commit, bump the patch version in `site/prototypes/scholarly-ide/index.html`.
The version is stored in `window.__v` and in all the `?v=` cache-busting query params.
Use find-and-replace to update all occurrences at once (e.g., `1.0.34` → `1.0.35`).
The version displays in the status bar of the IDE.

## Architecture

- **Frontend**: In-browser React with Babel standalone (no build step). Components use the `window.IDE` namespace pattern.
- **Backend**: Quart (async Flask) served by Hypercorn. Entry point: `site/app.py`.
- **Deployment**: Render, auto-deploys from `main` branch. Start command: `hypercorn app:app --bind 0.0.0.0:$PORT --workers 1`
- **Deployment docs**: `site/DEPLOYMENT.md`
- **LLM**: Azure OpenAI (gpt-5.4-mini). Used for paper chat (reasoning_effort=medium) and terminal simulation (reasoning_effort=low).

## Key Paths

- `site/prototypes/scholarly-ide/` — all IDE frontend code (components/, utils/, styles.css, index.html)
- `site/app.py` — backend (API endpoints, paper data, chat, terminal)
- `site/paper_data.json` — committed paper metadata, loaded at startup
- `site/cv/cv_academic.tex` — public academic CV LaTeX source
- `site/cv/Makefile` — builds the checked-in `cv_academic.pdf`
- `extracted/` — LLM-extracted paper markdown + figures (per-paper directories)
- `scripts/batch_extract.py` — batch PDF extraction script

## Environment Variables (on Render)

- `LLM_ENABLED` — master switch for all LLM features (chat, ask, terminal). Off unless set to `1`; guard lives in `site/app.py`, flag in `site/config.py`
- `AZURE_OPENAI_PAPER_CHAT_ENDPOINT` — Azure OpenAI endpoint URL
- `AZURE_OPENAI_PAPER_CHAT_KEY` — API key
- `AZURE_OPENAI_PAPER_CHAT_DEPLOYMENT` — model name (gpt-5.4-mini)
- `AZURE_OPENAI_PAPER_CHAT_API_VERSION` — API version
- `SECRET_KEY` — session secret
- `DATABASE_URL` — PostgreSQL for analytics
