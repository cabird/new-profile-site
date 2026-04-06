/* ─── Tag View ─── */
const { useState, useEffect, useMemo } = React;
const { PubRow, SearchIconSmall, parseTags, logEvent } = IDE;

IDE.TagView = function TagView({ papers, tag, onOpenPaper, hoveredLine, setHoveredLine }) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = papers.filter(p => parseTags(p.tags).includes(tag));
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
  }, [papers, tag, search]);

  // Expose filtered count for status bar
  useEffect(() => {
    window.__tagFilteredCount = filtered.length;
    window.__tagTotalCount = papers.filter(p => parseTags(p.tags).includes(tag)).length;
  }, [filtered.length, papers, tag]);

  return (
    <div className="editor-content">
      <div className="editor-body" style={{ flex: 1 }}>
        {/* Header */}
        <div style={{ padding: '12px 24px 4px 24px' }}>
          <div className="md-h2" style={{ margin: 0, marginBottom: 8 }}>
            <span className="hash">##</span> Papers tagged: <span style={{ color: '#4ec9b0' }}>{tag}</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-bar-container">
          <div className="search-bar">
            <span className="search-icon-prefix"><SearchIconSmall /></span>
            <input
              type="text"
              placeholder={`Search within ${tag}...`}
              value={search}
              onChange={e => { setSearch(e.target.value); if (e.target.value && e.target.value.length === 1) logEvent('search', `Tag search: "${e.target.value}..."`); }}
            />
            <span className="result-count">{filtered.length}/{papers.filter(p => parseTags(p.tags).includes(tag)).length}</span>
          </div>
        </div>

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
            No results matching "{search}" in tag [{tag}]
          </div>
        )}

        <footer className="page-footer">
          {filtered.length} of {papers.filter(p => parseTags(p.tags).includes(tag)).length} publications in [{tag}]
        </footer>
      </div>
    </div>
  );
};
