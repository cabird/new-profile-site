/* ─── Paper View (renders paper markdown in editor style) ─── */
const { useEffect, useRef, useMemo, useState, useCallback } = React;
const { Codicon } = IDE;

IDE.PaperView = function PaperView({ paper, markdown, loadState, onRetry, onChat, imageBase, kind }) {
  const contentRef = useRef(null);
  const bodyRef = useRef(null);
  const gutterRef = useRef(null);
  const [lineCount, setLineCount] = useState(0);
  const [bibtexCopied, setBibtexCopied] = useState(false);
  const [bibtexOpen, setBibtexOpen] = useState(false);

  const renderedHtml = useMemo(() => {
    if (!markdown) return '';
    try {
      const md = window.markdownit({ html: true, linkify: true, typographer: true });
      let raw = md.render(markdown);
      // Rewrite relative image paths to use the extracted assets URL
      if (imageBase) {
        raw = raw.replace(/src="(?!https?:\/\/|\/)(.*?)"/g, `src="${imageBase}/$1"`);
      }
      if (window.DOMPurify) {
        return DOMPurify.sanitize(raw, { ADD_TAGS: ['img'], ADD_ATTR: ['src', 'alt'] });
      }
      return raw;
    } catch (e) {
      return '<p style="color:#f85149">Failed to render markdown</p>';
    }
  }, [markdown, imageBase]);

  // After render, measure body height and compute line count to fill it
  useEffect(() => {
    if (!bodyRef.current) return;
    const measure = () => {
      const bodyHeight = bodyRef.current.scrollHeight;
      const lineHeight = 1.65 * 14; // line-height * font-size (from CSS)
      setLineCount(Math.ceil(bodyHeight / lineHeight));
    };
    // Measure after DOM settles
    const raf = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(raf);
  }, [renderedHtml]);

  // Scroll to top when paper changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [paper?.id]);

  const skeletonWidths = [72, 58, 83, 64, 77, 49, 68, 81, 55, 74, 62, 79, 51, 66, 70];

  if (!loadState || loadState.status === 'loading') {
    return (
      <div className="editor-content">
        <div className="editor-body paper-view-loading">
          {Array.from({ length: 15 }, (_, i) => (
            <div className="content-line" key={i}>
              <span className="line-number">{i + 1}</span>
              <div className="line-content">
                <div className="skeleton-line" style={{ width: `${skeletonWidths[i % skeletonWidths.length]}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (loadState.status === 'error') {
    return (
      <div className="editor-content">
        <div className="editor-body" style={{ padding: 40, textAlign: 'center' }}>
          <div style={{ color: 'var(--error)', marginBottom: 16 }}>Failed to load paper markdown</div>
          <div style={{ color: 'var(--text-muted)', marginBottom: 16, fontSize: 13 }}>{loadState.error}</div>
          {onRetry && (
            <button className="tag-btn" onClick={onRetry} style={{ cursor: 'pointer' }}>
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  const pdfUrl = paper?.mapped_pdf ? `/pdfs/${paper.mapped_pdf}` : null;

  return (
    <div className="editor-content" ref={contentRef}>
      <div className="paper-view">
        <div className="paper-gutter" ref={gutterRef}>
          {Array.from({ length: lineCount }, (_, i) => (
            <div className="paper-gutter-line" key={i}>{i + 1}</div>
          ))}
        </div>
        <div className="paper-body" ref={bodyRef}>
          {paper && (
            <div className="paper-header">
              <h1 className="paper-header-title">{paper.title}</h1>
              {paper.subtitle && (
                <div className="paper-header-subtitle">{paper.subtitle}</div>
              )}
              {(paper.venue || paper.journal) && (
                <div className="paper-header-venue">
                  {paper.venue || paper.journal}{paper.year ? `, ${paper.year}` : ''}
                </div>
              )}
              {paper.authors && (
                <div className="paper-header-authors">{paper.authors}</div>
              )}
              <div className="paper-header-actions">
                {onChat && (
                  <button className="paper-action-btn" onClick={() => onChat(paper)}>
                    <Codicon name="comment-discussion" size={14} />
                    <span>{kind === 'blog' ? 'Ask about this post' : 'Ask about this paper'}</span>
                  </button>
                )}
                {pdfUrl && (
                  <a href={pdfUrl} target="_blank" rel="noopener" className="paper-action-btn">
                    <Codicon name="file-pdf" size={14} color="#e06c75" />
                    <span>Open PDF</span>
                  </a>
                )}
                {paper.doi && (
                  <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener" className="paper-action-btn">
                    <Codicon name="link-external" size={14} />
                    <span>DOI</span>
                  </a>
                )}
                {paper.raw_bibtex && (
                  <button className={`paper-action-btn ${bibtexOpen ? 'active' : ''}`} onClick={() => setBibtexOpen(prev => !prev)}>
                    <Codicon name="references" size={14} />
                    <span>BibTeX</span>
                  </button>
                )}
              </div>
              {bibtexOpen && paper.raw_bibtex && (
                <div className="bibtex-peek">
                  <div className="bibtex-peek-header">
                    <span className="bibtex-peek-title">
                      <Codicon name="references" size={12} />
                      BibTeX
                    </span>
                    <div className="bibtex-peek-actions">
                      <button className="bibtex-peek-btn" onClick={() => {
                        navigator.clipboard.writeText(paper.raw_bibtex);
                        setBibtexCopied(true);
                        setTimeout(() => setBibtexCopied(false), 2000);
                      }}>
                        <Codicon name={bibtexCopied ? 'check' : 'copy'} size={14} />
                        <span>{bibtexCopied ? 'Copied!' : 'Copy'}</span>
                      </button>
                      <button className="bibtex-peek-btn" onClick={() => setBibtexOpen(false)}>
                        <Codicon name="close" size={14} />
                      </button>
                    </div>
                  </div>
                  <pre className="bibtex-peek-content"><code>{paper.raw_bibtex}</code></pre>
                </div>
              )}
              <hr className="paper-header-sep" />
            </div>
          )}
          <div className="paper-markdown" dangerouslySetInnerHTML={{ __html: renderedHtml }} />
        </div>
      </div>
    </div>
  );
};
