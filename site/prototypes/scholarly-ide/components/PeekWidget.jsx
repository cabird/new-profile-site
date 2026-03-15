/* ─── Peek Definition Widget ─── */
const { useState, useEffect, useRef, useCallback } = React;
const { FileMdIcon, parseTags, parseTldr, slugify } = IDE;

IDE.PeekWidget = function PeekWidget({ paper, onClose, onChat }) {
  const tags = parseTags(paper.tags);
  const tldr = parseTldr(paper);
  const slug = slugify(paper.title || 'untitled') + '.md';
  const peekRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  useEffect(() => {
    if (peekRef.current) {
      peekRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [visible]);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(() => onClose(), 150);
  }, [onClose]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        handleClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleClose]);

  let paperInfo = {};
  if (paper.extracted_paper_info) {
    try {
      paperInfo = typeof paper.extracted_paper_info === 'string'
        ? JSON.parse(paper.extracted_paper_info)
        : paper.extracted_paper_info;
    } catch {}
  }

  return (
    <div className={`peek-widget ${visible ? 'peek-open' : ''}`} ref={peekRef}>
      <div className="peek-header">
        <div className="peek-header-left">
          <span className="peek-header-icon"><FileMdIcon /></span>
          <span className="peek-header-filename">{slug}</span>
        </div>
        <button className="peek-header-close" onClick={handleClose} title="Close (Escape)">
          <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12">
            <path d="M8 8.71l3.65 3.64a.5.5 0 00.7-.7L8.71 8l3.64-3.65a.5.5 0 00-.7-.7L8 7.29 4.35 3.65a.5.5 0 00-.7.7L7.29 8l-3.64 3.65a.5.5 0 00.7.7L8 8.71z"/>
          </svg>
        </button>
      </div>
      <div className="peek-content">
        <div className="peek-actions">
          {paper.mapped_pdf && (
            <a className="pub-action-btn" href={paper.mapped_pdf} target="_blank" rel="noopener">
              <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12"><path d="M13.71 4.29l-3-3A1 1 0 0010 1H4a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V5a1 1 0 00-.29-.71zM12 14H4V2h5v3a1 1 0 001 1h3v8z"/></svg>
              PDF
            </a>
          )}
          {paper.doi && (
            <a className="pub-action-btn" href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener">
              DOI
            </a>
          )}
          {paper.url && (
            <a className="pub-action-btn" href={paper.url} target="_blank" rel="noopener">
              Link
            </a>
          )}
          <button className="pub-action-btn chat-btn" onClick={(e) => { e.stopPropagation(); onChat(paper); }}>
            <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12"><path d="M14 1H2a1 1 0 00-1 1v9a1 1 0 001 1h3l3 3 3-3h3a1 1 0 001-1V2a1 1 0 00-1-1zm0 10h-3.6L8 13.4 5.6 11H2V2h12v9z"/></svg>
            Chat with Paper
          </button>
        </div>

        {tldr && (
          <div className="peek-tldr">
            <div className="peek-comment">// tl;dr</div>
            <div className="peek-tldr-text">{tldr}</div>
          </div>
        )}

        <div className="peek-metadata">
          {paper.authors && (
            <div className="peek-meta-row">
              <span className="peek-meta-key">authors:</span>
              <span className="peek-meta-val-string">{paper.authors}</span>
            </div>
          )}
          {(paper.venue || paper.journal) && (
            <div className="peek-meta-row">
              <span className="peek-meta-key">venue:</span>
              <span className="peek-meta-val-string">{paper.venue || paper.journal}</span>
            </div>
          )}
          {paper.year && (
            <div className="peek-meta-row">
              <span className="peek-meta-key">year:</span>
              <span className="peek-meta-val-number">{paper.year}</span>
            </div>
          )}
          {paper.type && (
            <div className="peek-meta-row">
              <span className="peek-meta-key">type:</span>
              <span className="peek-meta-val-tag">{paper.type}</span>
            </div>
          )}
          {paper.doi && (
            <div className="peek-meta-row">
              <span className="peek-meta-key">doi:</span>
              <a className="peek-meta-val-link" href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener">{paper.doi}</a>
            </div>
          )}
        </div>

        {tags.length > 0 && (
          <div className="peek-tags">
            {tags.map((t, i) => (
              <span className="pub-tag" key={i}>{t}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
