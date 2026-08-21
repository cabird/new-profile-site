"""Data APIs: paper metadata and markdown, blog index and posts, misc."""
from quart import Blueprint, jsonify

import config
import corpus

bp = Blueprint('content', __name__)


@bp.route('/api/paper_data.json')
async def get_paper_data():
    return jsonify(corpus.paper_data)


@bp.route('/api/canned_questions')
async def get_canned_questions():
    return jsonify({'questions': corpus.canned_questions})


@bp.route('/api/version')
async def get_version():
    return jsonify({'version': config.APP_VERSION})


@bp.route('/api/papers/<path:paper_id>/markdown')
async def get_paper_markdown(paper_id):
    paper, content, extracted_dir = corpus.load_paper_markdown(paper_id)
    if not paper or not content:
        return jsonify({'error': 'Paper or markdown not found'}), 404
    result = {'paper_id': paper_id, 'title': paper.get('title', ''), 'markdown': content}
    if extracted_dir:
        result['image_base'] = f'/extracted/{extracted_dir}'
    return jsonify(result)


@bp.route('/api/blog')
async def get_blog_index():
    """List all blog posts sorted by date descending."""
    posts = list(corpus.blog_posts.values())
    posts.sort(key=lambda p: p.get('date', ''), reverse=True)
    return jsonify({'posts': posts})


@bp.route('/api/blog/<slug>')
async def get_blog_post(slug):
    """Return markdown content and metadata for a single blog post."""
    metadata, body = corpus.load_blog_post_markdown(slug)
    if not metadata and not body:
        return jsonify({'error': 'Post not found'}), 404
    result = corpus.blog_post_summary(slug, metadata)
    result['markdown'] = body
    result['image_base'] = f'/blog/{slug}'
    return jsonify(result)
