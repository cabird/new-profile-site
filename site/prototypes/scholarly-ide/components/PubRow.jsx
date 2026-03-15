/* ─── Publication Row ─── */
const { useRef } = React;
const { PeekWidget, parseTags } = IDE;

IDE.PubRow = function PubRow({ paper, lineNum, isExpanded, onToggle, onChat, isHovered, onHover }) {
  const tags = parseTags(paper.tags);
  const rowRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'F12' || e.key === 'Enter') {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div
      className={`pub-row ${isHovered ? 'line-active' : ''}`}
      ref={rowRef}
      data-paper-id={paper.id}
      onMouseEnter={() => onHover(lineNum)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="pub-row-main" onClick={onToggle}>
        <span className="pub-ln">{lineNum}</span>
        <span className="pub-year">{paper.year || '\u2014'}</span>
        <div className="pub-title-col">
          <div className="pub-title">{paper.title}</div>
          <div className="pub-authors">{paper.authors || ''}</div>
        </div>
        <span className="pub-venue">{paper.venue || paper.journal || ''}</span>
        <div className="pub-tags">
          {tags.slice(0, 3).map((t, i) => (
            <span className="pub-tag" key={i}>{t}</span>
          ))}
        </div>
      </div>
      {isExpanded && (
        <PeekWidget
          paper={paper}
          onClose={onToggle}
          onChat={onChat}
        />
      )}
    </div>
  );
};
