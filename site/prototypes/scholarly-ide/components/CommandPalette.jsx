/* ─── Command Palette ─── */
const { useState, useEffect, useRef, useMemo } = React;
const { PaletteFileIcon, highlightMatch, logEvent } = IDE;

IDE.CommandPalette = function CommandPalette({ files, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return files;
    const q = query.toLowerCase();
    return files.filter(f => f.path.toLowerCase().includes(q));
  }, [files, query]);

  useEffect(() => {
    setSelectedIdx(0);
  }, [query]);

  useEffect(() => {
    if (listRef.current) {
      const selected = listRef.current.children[selectedIdx];
      if (selected) selected.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIdx]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIdx(prev => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIdx(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIdx]) {
        logEvent('navigate', `Open: ${filtered[selectedIdx].path}`);
        filtered[selectedIdx].action();
        onClose();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div className="command-palette-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="command-palette">
        <div className="command-palette-input">
          <input
            ref={inputRef}
            type="text"
            placeholder="Go to File..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="command-palette-results" ref={listRef}>
          {filtered.length === 0 && (
            <div className="command-palette-empty">No matching files</div>
          )}
          {filtered.map((f, i) => (
            <div
              key={f.path}
              className={`command-palette-row ${i === selectedIdx ? 'selected' : ''}`}
              onClick={() => { logEvent('navigate', `Open: ${f.path}`); f.action(); onClose(); }}
              onMouseEnter={() => setSelectedIdx(i)}
            >
              <span className="command-palette-row-icon"><PaletteFileIcon ext={f.ext} /></span>
              <span className="command-palette-row-name">{highlightMatch(f.name, query)}</span>
              <span className="command-palette-row-path">{highlightMatch(f.path, query)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
