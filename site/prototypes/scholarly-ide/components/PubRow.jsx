/* ─── Publication Row ─── */
const { useRef } = React;

IDE.PubRow = function PubRow({ paper, lineNum, onClick, isHovered, onHover }) {
  const rowRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onClick();
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
      <div className="pub-row-main" onClick={onClick}>
        <span className="pub-ln">{lineNum}</span>
        <span className="pub-year">{paper.year || '\u2014'}</span>
        <div className="pub-title-col">
          <div className="pub-title">{paper.title}</div>
          {(paper.venue || paper.journal) && (
            <div className="pub-venue">{paper.venue || paper.journal}</div>
          )}
          <div className="pub-authors">{paper.authors || ''}</div>
        </div>
      </div>
    </div>
  );
};
