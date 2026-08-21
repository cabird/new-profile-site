"""The simulated terminal: virtual filesystem, bio, and prompt context.

Everything static (filesystem listing, bio, corpus stats) is built once at
startup; only the client's date/time varies per request.
"""
import logging

import corpus
import prompts

logger = logging.getLogger(__name__)

_filesystem = ""
_bio_info = ""
_stats = {'paper_count': 0, 'venue_count': 0, 'year_range': '2006-2026'}


def _build_filesystem(paper_data):
    """Build a fake filesystem string from paper data for the terminal LLM."""
    papers = paper_data.get('papers', {})
    by_year = {}
    for pid, p in papers.items():
        year = str(p.get('year', 'unknown'))
        title = p.get('title', 'Untitled')
        slug = title.lower()[:60].strip()
        for ch in [':', '?', '!', '"', "'", ',', ';', '(', ')', '[', ']']:
            slug = slug.replace(ch, '')
        slug = slug.replace(' ', '-').replace('--', '-').strip('-')
        by_year.setdefault(year, []).append(f"    {slug}.md ({title})")

    lines = ["/home/cbird/", "  papers/"]
    for year in sorted(by_year.keys(), reverse=True):
        lines.append(f"    {year}/")
        for entry in sorted(by_year[year]):
            lines.append(f"  {entry}")
    lines.extend([
        "  cv.pdf",
        "  about.txt",
        "  README.md",
        "  .bashrc",
        "  .env",
        "  .gitconfig",
        "  .ssh/",
        "    authorized_keys",
        "    id_ed25519.pub",
        "  .git/",
        "  .research_notes/",
        "    ideas.txt",
        "    reading_list.txt",
        "  todo.txt",
        "  scripts/",
        "    analyze_papers.py",
        "    build_site.sh",
        "    sync_bib.py",
        "  data/",
        "    collaboration_network.csv",
        "    citation_counts.json",
        "    yearly_stats.csv",
        "  drafts/",
        "    untitled-2026.md",
        "    review-response-draft.md",
        "  playlists/",
        "    coding.m3u",
        "    writing.m3u",
        "    deep-focus.m3u",
    ])
    return "\n".join(lines)


def init():
    """Build the static prompt context from the loaded corpus. Call after corpus.load_all()."""
    global _filesystem, _bio_info, _stats

    _filesystem = _build_filesystem(corpus.paper_data)

    site = corpus.site_data or {}
    _bio_info = (
        f"Name: {site.get('name', 'Christian Bird')}\n"
        f"Title: {site.get('title', 'Senior Principal Researcher')}\n"
        f"Affiliation: {site.get('affiliation', 'Microsoft Research')}\n"
        f"Bio: {site.get('about', '') or site.get('bio', '')}\n"
    )

    papers = corpus.paper_data.get('papers', {})
    years = sorted(set(p.get('year', '') for p in papers.values() if p.get('year')))
    _stats = {
        'paper_count': len(papers),
        'venue_count': len(set(p.get('venue', '') for p in papers.values() if p.get('venue'))),
        'year_range': f"{years[0]}-{years[-1]}" if years else "2006-2026",
    }
    logger.info(f"Terminal context built ({len(_filesystem)} chars filesystem)")


def system_prompt(client_datetime, client_timezone):
    return prompts.render(
        'terminal',
        client_datetime=client_datetime,
        client_timezone=client_timezone,
        bio_info=_bio_info,
        filesystem=_filesystem,
        **_stats,
    )
