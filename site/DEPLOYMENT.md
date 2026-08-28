# Deployment

The public site is deployed from `cabird/new-profile-site` to Render. Render
auto-deploys the `main` branch.

## Render configuration

Configure the Render web service with:

| Setting | Value |
|---|---|
| Root Directory | `site` |
| Build Command | `./build.sh` |
| Start Command | `hypercorn app:app --bind 0.0.0.0:$PORT --workers 1` |
| Auto-Deploy | Enabled for `main` |

The start command is also checked in as `site/Procfile`. The application is
Quart, not Flask, and must run with Hypercorn rather than Gunicorn. Keep one
worker because chat sessions are stored in process memory.

There is no checked-in `render.yaml`; service settings and secrets are managed
in the Render dashboard.

## Environment variables

Configure these in Render rather than committing them:

| Variable | Required | Purpose |
|---|---|---|
| `LLM_ENABLED` | No | **Off by default.** Set to `1` to enable chat, ask, and terminal. When unset, no Azure client is created and every LLM route returns 503. |
| `AZURE_OPENAI_PAPER_CHAT_ENDPOINT` | For AI features | Azure OpenAI endpoint |
| `AZURE_OPENAI_PAPER_CHAT_KEY` | For AI features | Azure OpenAI API key |
| `AZURE_OPENAI_PAPER_CHAT_DEPLOYMENT` | For AI features | Model deployment, currently `gpt-5.4-mini` |
| `AZURE_OPENAI_PAPER_CHAT_API_VERSION` | No | Defaults to `2024-02-01` |
| `SECRET_KEY` | Production | Stable session signing key |
| `DATABASE_URL` | No | PostgreSQL analytics; logging is disabled when absent |

The site still serves static content if Azure OpenAI is not configured, but
paper chat, blog chat, and the simulated terminal are unavailable.

## Local development

From `site/`:

```bash
python3 -m pip install -r requirements.txt
python3 app.py
```

The development server listens on port 5000. To run the production server
locally:

```bash
hypercorn app:app --bind 0.0.0.0:8000 --workers 1
```

## Building the academic CV

Render serves the checked-in `site/cv/cv_academic.pdf`; it does not regenerate
the PDF. Rebuild and commit it whenever the source or bibliography changes:

```bash
cd site/cv
make
```

This requires LuaLaTeX and BibTeX. Private CV variants are maintained outside
this public repository and must not be copied into it.

## Release process

1. Update the site and rebuild `site/cv/cv_academic.pdf` when its sources change.
2. Bump every `1.0.x` occurrence in
   `site/prototypes/scholarly-ide/index.html`.
3. Commit and push `main`.
4. Confirm the Render deployment reaches `Live`.
5. Smoke-test `/ide/`, `/api/paper_data.json`, the CV link, and one paper PDF.

`site/build.sh` installs Python dependencies. Publication metadata, extracted
paper content, and public PDFs required at runtime must already be committed;
the build does not copy them from another directory.
