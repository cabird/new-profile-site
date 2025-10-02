# Academic Profile Website - System Documentation

## Overview
A static academic profile website built with React (in-browser with Babel Standalone), Flask backend, and data-driven content from JSON files. Designed for showcasing publications, bio, and research projects.

## Tech Stack
- **Frontend**: React 18 (via CDN), Babel Standalone for in-browser JSX transpilation
- **Backend**: Flask (Python) with gunicorn for production
- **Styling**: Custom CSS with CSS variables for easy theming
- **Deployment**: Render.com

## Architecture
- **No build step** - Uses Babel Standalone to transpile JSX in the browser
- **UMD module system** - Components loaded via `data-plugins="transform-modules-umd"`
- **Data-driven** - All content from JSON files, no hardcoded data

## File Structure
```
site/
├── index.html              # Bio, about, current projects page
├── publications.html       # Publications page with search/filtering
├── styles.css              # Global styles with CSS variables
├── site_data.json          # Bio, contact, projects data
├── paper_data.json         # Publications data (copied from parent)
├── pdfs/                   # PDF files (copied from parent)
├── components/             # React components
│   ├── SearchBar.jsx       # Search input with SVG icon
│   ├── TagFilter.jsx       # Tag/award filtering UI
│   ├── PublicationCard.jsx # Individual publication card
│   ├── PublicationModal.jsx# Paper details modal
│   └── BibtexModal.jsx     # BibTeX citation modal
├── app.py                  # Flask server
├── build.sh                # Copies data from parent directory
└── requirements.txt        # Python dependencies

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
      "awards": ["Best Paper Award"],
      "under_submission": true /* optional */,
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

## Key Features

### Publications Page
1. **Search** - Real-time search across title, authors, venue, awards (sub-word matching)
2. **Tag Filtering** - Multi-select tags (AND logic)
3. **Awards Filter** - Special gold-styled filter pill
4. **Venue Display** - Uses `booktitle` for conferences, `journal` for articles
5. **Awards Badges** - Gold gradient badges for award-winning papers
6. **Under Submission Badge** - Amber badge, hides venue when `under_submission: true`
7. **Author Formatting** - Converts "Name1 and Name2" to "Name1, Name2"
8. **BibTeX Export** - Modal with copy-to-clipboard

### Styling
- **CSS Variables** - Blue color scheme (easy to change)
- **Responsive** - Mobile-friendly
- **Component Classes**:
  - `.btn-pill` - Regular tag filters
  - `.btn-pill-award` - Gold awards filter
  - `.badge-under-submission` - Amber submission badge
  - `.award-badge` - Gold award badges on papers

### Build & Deploy
1. **Build**: `./build.sh` copies `paper_data.json`, `pdfs/`, `markdowns/` from parent
2. **Local**: `python app.py` (port 5000)
3. **Production**: Render.com with:
   - Build Command: `./build.sh && pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`

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
<!-- Components must load before main app -->
<script ... src="components/SearchBar.jsx"></script>
<script ... src="components/TagFilter.jsx"></script>
<script ... src="components/PublicationCard.jsx"></script>
<script ... src="components/PublicationModal.jsx"></script>
<script ... src="components/BibtexModal.jsx"></script>
<!-- Then main app -->
<script>
  import SearchBar from './components/SearchBar.jsx';
  // ... rest of app
</script>
```

## Common Operations

### Update Publications
1. Edit `../paper_data.json` (parent directory)
2. Run `./build.sh` to copy into site/
3. Refresh browser

### Change Theme
Edit CSS variables in `styles.css`:
```css
:root {
  --primary-color: #2563eb; /* Main blue */
  --bg-secondary: #f8fafc;  /* Page background */
  /* ... */
}
```

### Add New Paper Field
1. Add to `paper_data.json`
2. Update `PublicationCard.jsx` and/or `PublicationModal.jsx` to display it
3. Optionally add to search in `publications.html` filter logic

## Performance Notes
- `paper_data.json` is ~547 KB uncompressed
- Gzipped: ~130 KB (76% reduction)
- Future: Consider Flask-Compress or lazy-loading for details

## Known Limitations
- No build step means slower initial page load (Babel transpiles in browser)
- All publications loaded upfront (no pagination)
- Search is client-side only (fine for ~100-200 papers)
