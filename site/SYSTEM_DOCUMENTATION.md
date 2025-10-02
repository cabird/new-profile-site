# Academic Profile Website - System Documentation

## Overview
A static academic profile website built with React (in-browser with Babel Standalone), Flask backend, and data-driven content from JSON files. Designed for showcasing publications, bio, and research projects.

## Tech Stack
- **Frontend**: React 18 (via CDN), Babel Standalone for in-browser JSX transpilation
- **Backend**: Flask (Python) with gunicorn for production
- **AI/Chat**: Azure OpenAI with streaming responses (SSE), tiktoken for token counting
- **Libraries**: marked.js (markdown rendering), DOMPurify (XSS protection)
- **Styling**: Custom CSS with CSS variables for easy theming
- **Scheduling**: Flask-APScheduler for background cleanup tasks
- **Deployment**: Render.com (single-worker mode required for in-memory chat storage)

## Architecture
- **No build step** - Uses Babel Standalone to transpile JSX in the browser
- **UMD module system** - Components loaded via `data-plugins="transform-modules-umd"`
- **Data-driven** - All content from JSON files, no hardcoded data

## File Structure
```
site/
├── index.html              # Bio, about, current projects page
├── publications.html       # Publications page with search/filtering/chat
├── styles.css              # Global styles with CSS variables
├── site_data.json          # Bio, contact, projects data
├── paper_data.json         # Publications data (copied from parent)
├── canned_questions.json   # Pre-defined chat questions
├── .env                    # Azure OpenAI credentials (not in git)
├── .env.example            # Template for environment variables
├── pdfs/                   # PDF files (copied from parent)
├── markdowns/              # Markdown versions of papers (copied from parent)
├── components/             # React components
│   ├── SearchBar.jsx       # Search input with SVG icon
│   ├── TagFilter.jsx       # Tag/award filtering UI
│   ├── PublicationCard.jsx # Individual publication card with chat button
│   ├── PublicationModal.jsx# Paper details modal
│   ├── BibtexModal.jsx     # BibTeX citation modal
│   └── ChatModal.jsx       # AI chat interface with streaming
├── app.py                  # Flask server with chat API endpoints
├── build.sh                # Copies data from parent directory
├── requirements.txt        # Python dependencies
└── Procfile                # Render.com deployment config

Parent directory:
├── paper_data.json         # Source of truth
├── pdfs/                   # Source PDFs
└── markdowns/              # Markdown versions of papers
```

## Data Schema

### paper_data.json
```json
{
  "metadata": { /* counts, dates, status legend */ },
  "papers": {
    "PAPER_ID": {
      "status": "MAPPED",
      "type": "inproceedings" | "article",
      "title": "...",
      "authors": "Name1 and Name2 and Name3",
      "year": "2025",
      "booktitle": "..." /* for inproceedings */,
      "journal": "..." /* for articles */,
      "venue": "..." /* fallback */,
      "mapped_pdf": "filename.pdf",
      "markdown": "filename.md" /* optional, defaults to mapped_pdf with .md */,
      "awards": ["Best Paper Award"],
      "under_submission": true /* optional */,
      "chat_available": true /* computed at runtime based on markdown existence */,
      "extracted_paper_info": {
        "tldr": "...",
        "details": {
          "topic": "...",
          "problem": "...",
          "approach": "...",
          "key_insights": ["..."],
          "implications": "..."
        }
      },
      "tags": ["tag1", "tag2"],
      "raw_bibtex": "@inproceedings{...}"
    }
  }
}
```

### site_data.json
```json
{
  "name": "Dr. Christian Bird",
  "title": "Senior Principal Researcher",
  "affiliation": "Microsoft Research",
  "bio": "...",
  "about": "...",
  "current_projects": [
    {"title": "...", "description": "..."}
  ],
  "cv_link": "https://...",
  "contact": {
    "email": "...",
    "links": [
      {"label": "Google Scholar", "url": "..."}
    ]
  }
}
```

### canned_questions.json
```json
{
  "questions": [
    "What is the main research question this paper addresses?",
    "What methodology did the authors use?",
    ...
  ]
}
```

## Key Features

### Publications Page
1. **Search** - Real-time search across title, authors, venue, awards (sub-word matching)
2. **Tag Filtering** - Multi-select tags (AND logic)
3. **Awards Filter** - Special gold-styled filter pill
4. **Sorting** - Papers under submission appear first, then reverse chronological by year
5. **Venue Display** - Uses `booktitle` for conferences, `journal` for articles
6. **Awards Badges** - Gold gradient badges for award-winning papers
7. **Under Submission Badge** - Amber badge, hides venue when `under_submission: true`
8. **Author Formatting** - Converts "Name1 and Name2" to "Name1, Name2"
9. **BibTeX Export** - Modal with copy-to-clipboard
10. **Chat with Paper** - AI-powered chat about individual papers (when markdown available)

### Chat with Paper Feature
1. **AI Conversations** - Azure OpenAI-powered chat about paper content
2. **Streaming Responses** - Real-time streaming via Server-Sent Events (SSE)
3. **Rate Limiting** - 20 messages per hour, 10 messages per conversation
4. **Inactivity Timeout** - Conversations expire after 10 minutes of inactivity
5. **Canned Questions** - Dropdown with common research questions
6. **Markdown Rendering** - Formatted responses with marked.js and DOMPurify sanitization
7. **Session Management** - One active conversation per user session
8. **Availability Indicator** - Chat button enabled/disabled based on markdown file existence
9. **Automatic Cleanup** - Background scheduler removes inactive conversations every 5 minutes

### Styling
- **CSS Variables** - Blue color scheme (easy to change)
- **Responsive** - Mobile-friendly
- **Component Classes**:
  - `.btn-pill` - Regular tag filters
  - `.btn-pill-award` - Gold awards filter
  - `.badge-under-submission` - Amber submission badge
  - `.award-badge` - Gold award badges on papers
  - `.btn-chat` - Chat button on publication cards
  - `.chat-modal` - Full-screen chat interface
  - `.chat-message-user` / `.chat-message-assistant` - Message styling
  - `.chat-typing-indicator` - Animated typing dots

### Build & Deploy
1. **Build**: `./build.sh` copies `paper_data.json`, `pdfs/`, `markdowns/` from parent
2. **Environment Variables** (create `.env` from `.env.example`):
   - `AZURE_OPENAI_PAPER_CHAT_ENDPOINT` - Azure OpenAI endpoint URL
   - `AZURE_OPENAI_PAPER_CHAT_KEY` - API key
   - `AZURE_OPENAI_PAPER_CHAT_DEPLOYMENT` - Model deployment name
   - `AZURE_OPENAI_PAPER_CHAT_API_VERSION` - API version (default: 2024-02-01)
   - `SECRET_KEY` - Flask session secret (auto-generated if not set)
3. **Local**: `python app.py` (port 5000)
4. **Production**: Render.com with:
   - Build Command: `./build.sh && pip install -r requirements.txt`
   - Start Command: `gunicorn app:app --workers=1` (single worker required for in-memory chat)
   - Environment Variables: Set in Render dashboard

**Important**: The current implementation uses `InMemoryChatStore` which requires single-worker mode. For multi-worker deployments, migrate to Redis-based storage.

## Important Implementation Details

### Venue Logic
```javascript
if (type === 'inproceedings') use booktitle
else if (type === 'article') use journal
else use venue
```

### Filter Logic (AND-based)
```javascript
// Must match ALL selected criteria:
- Search query (if present)
- Awards filter (if active)
- ALL selected tags
```

### Module Loading Order (publications.html)
```html
<!-- External libraries -->
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dompurify@3/dist/purify.min.js"></script>

<!-- Components must load before main app -->
<script ... src="components/SearchBar.jsx"></script>
<script ... src="components/TagFilter.jsx"></script>
<script ... src="components/PublicationCard.jsx"></script>
<script ... src="components/PublicationModal.jsx"></script>
<script ... src="components/BibtexModal.jsx"></script>
<script ... src="components/ChatModal.jsx"></script>
<!-- Then main app -->
<script>
  import SearchBar from './components/SearchBar.jsx';
  import ChatModal from './components/ChatModal.jsx';
  // ... rest of app
</script>
```

## Common Operations

### Update Publications
1. Edit `../paper_data.json` (parent directory)
2. Run `./build.sh` to copy into site/
3. Restart Flask app (automatic reload in development)
4. Refresh browser

### Enable Chat for a Paper
1. Ensure markdown file exists in `../markdowns/` (named `{mapped_pdf}.md` or set `markdown` field)
2. Run `./build.sh` to copy markdowns into site/
3. Restart Flask app (it computes `chat_available` at startup)
4. Chat button will be enabled on publication card

### Change Theme
Edit CSS variables in `styles.css`:
```css
:root {
  --primary-color: #2563eb; /* Main blue */
  --bg-secondary: #f8fafc;  /* Page background */
  /* ... */
}
```

### Customize Canned Questions
Edit `canned_questions.json`:
```json
{
  "questions": [
    "Your custom question here",
    ...
  ]
}
```

### Add New Paper Field
1. Add to `paper_data.json`
2. Update `PublicationCard.jsx` and/or `PublicationModal.jsx` to display it
3. Optionally add to search in `publications.html` filter logic

## API Endpoints

### Frontend Routes
- `GET /` - Serve index.html (bio/about page)
- `GET /publications.html` - Serve publications page
- `GET /<path>` - Serve static files (CSS, JS, PDFs, etc.)

### API Routes
- `GET /api/paper_data.json` - Paper data with computed `chat_available` flags
- `GET /api/canned_questions` - List of pre-defined chat questions
- `POST /api/papers/<paper_id>/chat` - Send chat message, returns SSE stream
- `DELETE /api/papers/<paper_id>/chat` - Clear chat conversation for paper

### Chat API Details
**POST /api/papers/<paper_id>/chat**
- Request: `{"message": "user question"}`
- Response: Server-Sent Events (SSE) stream
  - `data: {"type": "chat_chunk", "content": "..."}`
  - `data: {"type": "chat_complete", "remaining_messages": N, "message_count": M}`
  - `data: {"type": "error", "message": "..."}`
- Rate Limits: 20 messages/hour, 10 messages/conversation
- Token Limit: 1000 tokens per message

## Performance Notes
- `paper_data.json` is ~547 KB uncompressed
- Gzipped: ~130 KB (76% reduction)
- Chat responses stream in real-time (SSE)
- Paper data cached in memory at startup
- Inactive conversations cleaned up every 5 minutes

## Known Limitations
- No build step means slower initial page load (Babel transpiles in browser)
- All publications loaded upfront (no pagination)
- Search is client-side only (fine for ~100-200 papers)
- **Chat storage is in-memory** - requires single-worker mode (data lost on restart)
- Chat only available for papers with markdown files
- Rate limiting is per-session (cookies), can be cleared by user
