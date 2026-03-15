/* ─── Publications View ─── */
const { useState, useEffect, useMemo } = React;
const { PubRow, SearchIconSmall, parseTags, logEvent } = IDE;

IDE.PublicationsView = function PublicationsView({ papers, expandedId, setExpandedId, onChatWithPaper, hoveredLine, setHoveredLine }) {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState(null);

  const allTags = useMemo(() => {
    const tagSet = new Set();
    papers.forEach(p => parseTags(p.tags).forEach(t => tagSet.add(t)));
    return [...tagSet].sort();
  }, [papers]);

  const filtered = useMemo(() => {
    let list = papers;
    if (activeTag) {
      list = list.filter(p => parseTags(p.tags).includes(activeTag));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        (p.title || '').toLowerCase().includes(q) ||
        (p.authors || '').toLowerCase().includes(q) ||
        (p.venue || '').toLowerCase().includes(q) ||
        (p.journal || '').toLowerCase().includes(q) ||
        parseTags(p.tags).some(t => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [papers, search, activeTag]);

  // Expose filtered count via a ref on the DOM for the status bar to read
  useEffect(() => {
    window.__pubsFilteredCount = filtered.length;
  }, [filtered.length]);

  return (
    <div className="editor-content">
      <div className="editor-body" style={{ flex: 1 }}>
        {/* Search Bar */}
        <div className="search-bar-container">
          <div className="search-bar">
            <span className="search-icon-prefix"><SearchIconSmall /></span>
            <input
              type="text"
              placeholder="Search titles, authors, venues, tags..."
              value={search}
              onChange={e => { setSearch(e.target.value); if (e.target.value && e.target.value.length === 1) logEvent('search', `Searching: "${e.target.value}..."`); }}
            />
            <span className="result-count">{filtered.length}/{papers.length}</span>
          </div>
        </div>

        {/* Tag Filters */}
        {allTags.length > 0 && (
          <div className="tag-filters">
            <button
              className={`tag-btn ${!activeTag ? 'active' : ''}`}
              onClick={() => setActiveTag(null)}
            >
              all
            </button>
            {allTags.map(t => (
              <button
                key={t}
                className={`tag-btn ${activeTag === t ? 'active' : ''}`}
                onClick={() => { const newTag = activeTag === t ? null : t; setActiveTag(newTag); logEvent('filter', newTag ? `Filter by tag: ${newTag}` : 'Filter cleared'); }}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        {/* Table Header */}
        <div className="pub-list-header">
          <span className="col-ln">#</span>
          <span className="col-year">Year</span>
          <span className="col-title">Title / Authors</span>
          <span className="col-venue">Venue</span>
          <span className="col-tags">Tags</span>
        </div>

        {/* Publication Rows */}
        {filtered.map((p, idx) => (
          <PubRow
            key={p.id}
            paper={p}
            lineNum={idx + 1}
            isExpanded={expandedId === p.id}
            onToggle={() => { const opening = expandedId !== p.id; setExpandedId(opening ? p.id : null); if (opening) { logEvent('paper', `Peek: ${p.title}`); onChatWithPaper(p); } }}
            onChat={onChatWithPaper}
            isHovered={hoveredLine === idx + 1}
            onHover={setHoveredLine}
          />
        ))}

        {filtered.length === 0 && (
          <div className="loading" style={{textAlign:'center', padding: '24px 0'}}>
            No results matching "{search}"{activeTag ? ` in tag [${activeTag}]` : ''}
          </div>
        )}

        <footer className="page-footer">
          {papers.length} publications indexed
        </footer>
      </div>
    </div>
  );
};
