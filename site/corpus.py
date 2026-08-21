"""Corpus loading: papers, blog posts, canned questions, site data.

All content is loaded once at startup into module-level caches; accessors
read from those caches. venue_of() is the single home for venue extraction.
"""
import json
import logging
import os

logger = logging.getLogger(__name__)

paper_data = {}       # full paper_data.json contents
paper_slugs = {}      # safe_dirname(paper_id) -> paper_id, for /papers/<slug> URLs
blog_posts = {}       # slug -> metadata dict
canned_questions = []
site_data = {}


def safe_dirname(paper_id):
    """Sanitize paper ID for use as a directory name."""
    return paper_id.replace("/", "_").replace(":", "_").replace(" ", "_")


def venue_of(paper, default=''):
    """The one venue-extraction implementation (was duplicated three times)."""
    if paper.get('type') == 'inproceedings':
        return paper.get('booktitle') or paper.get('venue') or default
    if paper.get('type') == 'article':
        return paper.get('journal') or paper.get('venue') or default
    return paper.get('journal') or paper.get('booktitle') or paper.get('venue') or default


def load_papers():
    global paper_data
    with open('paper_data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    papers = data.get('papers', {})
    chat_available_count = 0
    for paper_id, paper in papers.items():
        markdown_filename = paper.get('markdown') or (paper.get('mapped_pdf') or '').replace('.pdf', '.md')
        if markdown_filename:
            markdown_path = os.path.join('markdowns', markdown_filename)
            paper['chat_available'] = os.path.exists(markdown_path)
            if paper['chat_available']:
                chat_available_count += 1
        else:
            paper['chat_available'] = False

    paper_data = data

    global paper_slugs
    paper_slugs = {}
    for paper_id in papers:
        slug = safe_dirname(paper_id)
        if slug in paper_slugs:
            logger.warning(f"Paper slug collision: {slug} ({paper_slugs[slug]} vs {paper_id})")
        paper_slugs[slug] = paper_id

    logger.info(f"Loaded {len(papers)} papers")
    logger.info(f"Chat available for {chat_available_count} papers")
    return data


def load_paper_markdown(paper_id):
    """Return (paper, markdown, extracted_dirname_or_None) or (None, None, None)."""
    paper = paper_data.get('papers', {}).get(paper_id)
    if not paper:
        return None, None, None

    # Prefer extracted/ directory (from batch_extract.py)
    extracted_md = os.path.join('..', 'extracted', safe_dirname(paper_id), 'combined.md')
    if os.path.exists(extracted_md):
        try:
            with open(extracted_md, 'r', encoding='utf-8') as f:
                content = f.read()
            if content.strip():
                return paper, content, safe_dirname(paper_id)
        except Exception as e:
            logger.error(f"Failed to load extracted markdown for {paper_id}: {e}")

    # Fall back to markdowns/ directory
    if not paper.get('chat_available'):
        return None, None, None
    markdown_filename = paper.get('markdown') or (paper.get('mapped_pdf') or '').replace('.pdf', '.md')
    if not markdown_filename:
        return None, None, None
    try:
        with open(os.path.join('markdowns', markdown_filename), 'r', encoding='utf-8') as f:
            content = f.read()
        if not content.strip():
            return None, None, None
        return paper, content, None
    except Exception as e:
        logger.error(f"Failed to load markdown for paper {paper_id}: {e}")
        return None, None, None


def parse_frontmatter(text):
    """Parse simple YAML-ish frontmatter. Returns (metadata_dict, body_text)."""
    if not text.startswith('---'):
        return {}, text
    end = text.find('\n---', 3)
    if end == -1:
        return {}, text
    fm_text = text[3:end].strip()
    body = text[end + 4:].lstrip('\n')

    metadata = {}
    for line in fm_text.split('\n'):
        line = line.strip()
        if not line or ':' not in line:
            continue
        key, _, value = line.partition(':')
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if value.startswith('[') and value.endswith(']'):
            value = [v.strip().strip('"').strip("'") for v in value[1:-1].split(',') if v.strip()]
        metadata[key] = value
    return metadata, body


def blog_post_summary(slug, metadata):
    return {
        'slug': slug,
        'title': metadata.get('title', slug),
        'subtitle': metadata.get('subtitle', ''),
        'filename': metadata.get('filename', slug),
        'authors': metadata.get('authors', ''),
        'date': metadata.get('date', ''),
        'tags': metadata.get('tags', []) if isinstance(metadata.get('tags'), list) else [],
        'description': metadata.get('description', ''),
    }


def load_blog_posts():
    global blog_posts
    blog_posts = {}
    blog_dir = os.path.join('..', 'blog')
    if not os.path.isdir(blog_dir):
        logger.info("No blog/ directory found")
        return

    for slug in sorted(os.listdir(blog_dir)):
        post_md = os.path.join(blog_dir, slug, 'post.md')
        if not os.path.isfile(post_md):
            continue
        try:
            with open(post_md, 'r', encoding='utf-8') as f:
                text = f.read()
            metadata, _ = parse_frontmatter(text)
            blog_posts[slug] = blog_post_summary(slug, metadata)
        except Exception as e:
            logger.error(f"Failed to load blog post {slug}: {e}")

    logger.info(f"Loaded {len(blog_posts)} blog posts")


def load_blog_post_markdown(slug):
    """Return (metadata, body) for a single blog post, or (None, None)."""
    post_md = os.path.join('..', 'blog', slug, 'post.md')
    if not os.path.isfile(post_md):
        return None, None
    try:
        with open(post_md, 'r', encoding='utf-8') as f:
            text = f.read()
        return parse_frontmatter(text)
    except Exception as e:
        logger.error(f"Failed to load blog post {slug}: {e}")
        return None, None


def load_canned_questions():
    global canned_questions
    try:
        with open('canned_questions.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
            canned_questions = data.get('questions', [])
            logger.info(f"Loaded {len(canned_questions)} canned questions")
    except Exception as e:
        logger.error(f"Failed to load canned questions: {e}")
        canned_questions = []


def load_site_data():
    global site_data
    try:
        with open('site_data.json', 'r', encoding='utf-8') as f:
            site_data = json.load(f)
    except Exception as e:
        logger.error(f"Failed to load site_data.json: {e}")
        site_data = {}


def load_cv_markdown():
    try:
        with open(os.path.join('cv', 'cv_academic.md'), 'r', encoding='utf-8') as f:
            return f.read()
    except OSError as e:
        logger.error(f"Could not load CV markdown: {e}")
        return '(CV not available)'


def load_all():
    load_papers()
    load_blog_posts()
    load_canned_questions()
    load_site_data()
