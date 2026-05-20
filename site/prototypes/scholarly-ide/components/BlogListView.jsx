/* ─── Blog List View ─── */
const { useState: useStateBlog, useMemo: useMemoBlog } = React;
const { SearchIconSmall: SearchIconSmallBlog, logEvent: logEventBlog } = IDE;

IDE.BlogListView = function BlogListView({ posts, onOpenPost }) {
  const [search, setSearch] = useStateBlog('');
  const [activeTag, setActiveTag] = useStateBlog(null);

  const allTags = useMemoBlog(() => {
    const tagCounts = {};
    posts.forEach(p => (p.tags || []).forEach(t => { tagCounts[t] = (tagCounts[t] || 0) + 1; }));
    return Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).map(([t]) => t);
  }, [posts]);

  const filtered = useMemoBlog(() => {
    let list = posts;
    if (activeTag) {
      list = list.filter(p => (p.tags || []).includes(activeTag));
    }
    if (search.trim()) {
      const words = search.toLowerCase().split(/\s+/).filter(Boolean);
      list = list.filter(p => {
        const haystack = [
          p.title || '', p.description || '', p.date || '', ...(p.tags || [])
        ].join(' ').toLowerCase();
        return words.every(w => haystack.includes(w));
      });
    }
    return list;
  }, [posts, search, activeTag]);

  return (
    <div className="editor-content">
      <div className="editor-body" style={{ flex: 1 }}>
        <div style={{ padding: '12px 24px 4px 24px' }}>
          <div className="md-h2" style={{ margin: 0, marginBottom: 8 }}>
            <span className="hash">##</span> Posts
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 4 }}>
            Notes, half-baked ideas, and the occasional rant.
          </div>
        </div>

        {posts.length > 0 && (
          <div className="search-bar-container">
            <div className="search-bar">
              <span className="search-icon-prefix"><SearchIconSmallBlog /></span>
              <input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <span className="result-count">{filtered.length}/{posts.length}</span>
            </div>
          </div>
        )}

        {allTags.length > 0 && (
          <div className="tag-filters">
            <button
              className={`tag-btn ${!activeTag ? 'active' : ''}`}
              onClick={() => setActiveTag(null)}
            >all</button>
            {allTags.map(t => (
              <button
                key={t}
                className={`tag-btn ${activeTag === t ? 'active' : ''}`}
                onClick={() => setActiveTag(activeTag === t ? null : t)}
              >{t}</button>
            ))}
          </div>
        )}

        {posts.length === 0 && (
          <div className="loading" style={{textAlign:'center', padding: '24px 0'}}>
            No posts yet.
          </div>
        )}

        {filtered.map((p, idx) => (
          <div
            key={p.slug}
            className="pub-row"
            onClick={() => { logEventBlog('paper', `Open post: ${p.title}`); onOpenPost(p.slug); }}
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter') onOpenPost(p.slug); }}
          >
            <div className="pub-row-main">
              <span className="pub-ln">{idx + 1}</span>
              <span className="pub-year">{(p.date || '').slice(0, 10) || '—'}</span>
              <div className="pub-title-col">
                <div className="pub-title">{p.title}</div>
                {p.description && (
                  <div className="pub-venue">{p.description}</div>
                )}
                {p.tags && p.tags.length > 0 && (
                  <div className="pub-authors">{p.tags.join(' · ')}</div>
                )}
              </div>
            </div>
          </div>
        ))}

        {posts.length > 0 && filtered.length === 0 && (
          <div className="loading" style={{textAlign:'center', padding: '24px 0'}}>
            No posts matching "{search}"{activeTag ? ` in tag [${activeTag}]` : ''}
          </div>
        )}

        <footer className="page-footer">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </footer>
      </div>
    </div>
  );
};
