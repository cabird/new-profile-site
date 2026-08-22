"""Page and static-file routes: the IDE, prototypes, paper pages, catch-all assets."""
import json
import os
import re

from quart import Blueprint, jsonify, redirect, render_template, send_file, send_from_directory

import corpus

bp = Blueprint('pages', __name__)

# Which frontend the server-rendered paper pages pull their assets from.
# When a prototype is promoted to the site root, change this to '/'.
PAPER_PAGE_ASSET_BASE = '/prototypes/v6/'
PAPER_PAGE_ASSET_VERSION = '6.5'


@bp.route('/papers/<slug>')
async def paper_page(slug):
    """Server-rendered head + client-rendered body for one paper."""
    paper_id = corpus.paper_slugs.get(slug)
    paper = corpus.paper_data.get('papers', {}).get(paper_id) if paper_id else None
    if not paper:
        return jsonify({'error': 'Paper not found'}), 404

    info = paper.get('extracted_paper_info') or {}
    title = re.sub(r'[{}]', '', str(paper.get('title', paper_id))) \
        .replace('``', '“').replace("''", '”')
    description = (info.get('tldr') or f"{title}, by {paper.get('authors', '')}.")[:300]

    payload = {
        'id': paper_id,
        'slug': slug,
        'title': title,
        'short_title': title.split(':')[0].split('?')[0][:60],
        'authors': paper.get('authors', ''),
        'year': paper.get('year', ''),
        'venue': corpus.venue_of(paper),
        'doi': paper.get('doi'),
        'awards': paper.get('awards') or [],
        'tags': paper.get('tags'),
        'pdf': f"/pdfs/{paper['mapped_pdf']}" if paper.get('mapped_pdf') else None,
        'bibtex': paper.get('raw_bibtex'),
        'tldr': info.get('tldr'),
        'problem': (info.get('details') or {}).get('problem'),
        'approach': (info.get('details') or {}).get('approach'),
        'findings': (info.get('details') or {}).get('key_insights'),
        'implications': (info.get('details') or {}).get('implications'),
    }

    json_ld = {
        '@context': 'https://schema.org',
        '@type': 'ScholarlyArticle',
        'headline': title,
        'author': [{'@type': 'Person', 'name': a.strip()}
                   for a in str(paper.get('authors', '')).split(' and ') if a.strip()],
        'datePublished': str(paper.get('year', '')),
        'publisher': corpus.venue_of(paper),
    }
    if paper.get('doi'):
        json_ld['sameAs'] = f"https://doi.org/{paper['doi']}"

    def script_safe(obj):
        return json.dumps(obj).replace('</', '<\\/')

    return await render_template(
        'paper.html',
        title=title,
        description=description,
        slug=slug,
        asset_base=PAPER_PAGE_ASSET_BASE,
        asset_version=PAPER_PAGE_ASSET_VERSION,
        paper_json=script_safe(payload),
        json_ld=script_safe(json_ld),
    )


@bp.route('/')
async def index():
    return redirect('/ide/')


@bp.route('/classic')
@bp.route('/classic/')
async def classic_site():
    return await send_file('index.html')


@bp.route('/pages/about/')
@bp.route('/pages/about')
async def redirect_old_about():
    return redirect('/classic', code=301)


@bp.route('/publications')
async def redirect_publications():
    return redirect('/publications.html', code=301)


@bp.route('/publications.html')
async def publications():
    return await send_file('publications.html')


@bp.route('/ide')
async def ide_redirect():
    return redirect('/ide/')


@bp.route('/ide/')
async def ide_index():
    return await send_from_directory('prototypes/scholarly-ide', 'index.html')


@bp.route('/ide/<path:path>')
async def ide_assets(path):
    # If the path resolves to a real file inside the IDE directory, serve it.
    # Otherwise return index.html so the client-side router takes over.
    # Defense-in-depth: explicitly contain the path inside the IDE directory.
    ide_root = os.path.realpath(os.path.join('prototypes', 'scholarly-ide'))
    try:
        requested = os.path.realpath(os.path.join(ide_root, path))
    except Exception:
        return await send_from_directory('prototypes/scholarly-ide', 'index.html')

    inside = (requested == ide_root) or requested.startswith(ide_root + os.sep)
    if inside and os.path.isfile(requested):
        rel = os.path.relpath(requested, ide_root)
        return await send_from_directory('prototypes/scholarly-ide', rel)
    return await send_from_directory('prototypes/scholarly-ide', 'index.html')


@bp.route('/AI_where_it_matters/')
@bp.route('/AI_where_it_matters')
async def ai_matters_index():
    return await send_from_directory('AI_where_it_matters', 'index.html')


@bp.route('/AI_where_it_matters/<path:path>')
async def serve_ai_matters(path):
    return await send_from_directory('AI_where_it_matters', path)


@bp.route('/blog/<path:path>')
async def serve_blog_asset(path):
    """Serve blog assets (images, etc.) from blog/<slug>/<filename>."""
    return await send_from_directory(os.path.join('..', 'blog'), path)


@bp.route('/extracted/<path:path>')
async def serve_extracted(path):
    return await send_from_directory(os.path.join('..', 'extracted'), path)


@bp.route('/<path:path>')
async def serve_static(path):
    # This catch-all sits over the whole site/ tree, which also contains
    # backend source and local secrets. Serve only genuine static assets.
    parts = path.split('/')
    if any(p.startswith('.') for p in parts) or parts[-1].endswith(('.py', '.pyc')):
        return jsonify({'error': 'Not found'}), 404
    return await send_from_directory('.', path)
