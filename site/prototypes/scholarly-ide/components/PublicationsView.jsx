/* ─── Publications View ─── */
const { useState, useEffect, useMemo } = React;
const { PubRow, SearchIconSmall, parseTags, logEvent } = IDE;

IDE.PublicationsView = function PublicationsView({ papers, onOpenPaper, hoveredLine, setHoveredLine }) {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState(null);
  const [awardsOnly, setAwardsOnly] = useState(false);
  const awardCount = useMemo(() => papers.filter(p => Array.isArray(p.awards) && p.awards.length > 0).length, [papers]);

  const [showAllTags, setShowAllTags] = useState(false);

  const allTags = useMemo(() => {
    const tagCounts = {};
    papers.forEach(p => parseTags(p.tags).forEach(t => { tagCounts[t] = (tagCounts[t] || 0) + 1; }));
    return Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).map(([t]) => t);
  }, [papers]);

  const visibleTags = showAllTags ? allTags : allTags.slice(0, 6);

  const filtered = useMemo(() => {
    let list = papers;
    if (awardsOnly) {
      list = list.filter(p => Array.isArray(p.awards) && p.awards.length > 0);
    }
    if (activeTag) {
      list = list.filter(p => parseTags(p.tags).includes(activeTag));
    }
    if (search.trim()) {
      const words = search.toLowerCase().split(/\s+/).filter(Boolean);
      list = list.filter(p => {
        const haystack = [
          p.title || '', p.authors || '', p.venue || '',
          p.journal || '', ...parseTags(p.tags)
        ].join(' ').toLowerCase();
        return words.every(w => haystack.includes(w));
      });
    }
    return list;
  }, [papers, search, activeTag, awardsOnly]);

  // Expose filtered count via a ref on the DOM for the status bar to read
  useEffect(() => {
    window.__pubsFilteredCount = filtered.length;
  }, [filtered.length]);

  return (
    <div className="editor-content">
      <div className="editor-body" style={{ flex: 1 }} onMouseLeave={() => setHoveredLine(null)}>
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
            {awardCount > 0 && (
              <button
                className={`tag-btn tag-btn-award ${awardsOnly ? 'active' : ''}`}
                title="Only papers that received an award"
                onClick={() => { setAwardsOnly(v => !v); logEvent('filter', awardsOnly ? 'Award filter cleared' : 'Filter: award-winning papers'); }}
              >
                <IDE.Codicon name="star-full" size={10} /> award-winning ({awardCount})
              </button>
            )}
            {visibleTags.map(t => (
              <button
                key={t}
                className={`tag-btn ${activeTag === t ? 'active' : ''}`}
                onClick={() => { const newTag = activeTag === t ? null : t; setActiveTag(newTag); logEvent('filter', newTag ? `Filter by tag: ${newTag}` : 'Filter cleared'); }}
              >
                {t}
              </button>
            ))}
            {allTags.length > 6 && (
              <button className="tag-btn tag-btn-more" onClick={() => setShowAllTags(!showAllTags)}>
                {showAllTags ? 'less' : `+${allTags.length - 6} more`}
              </button>
            )}
          </div>
        )}

        {/* Table Header */}
        <div className="pub-list-header">
          <span className="col-ln">#</span>
          <span className="col-year">Year</span>
          <span className="col-title">Title / Venue / Authors</span>
        </div>

        {/* Publication Rows */}
        {filtered.map((p, idx) => (
          <PubRow
            key={p.id}
            paper={p}
            lineNum={idx + 1}
            onClick={() => { logEvent('paper', `Open: ${p.title}`); if (onOpenPaper) onOpenPaper(p.id); }}
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
