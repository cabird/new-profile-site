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

  // Keep the gutter long enough to cover the body height. Re-measures whenever
  // the body resizes (images load, fonts reflow, window resize) and overshoots
  // generously so the gutter never visibly runs out.
  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    const lineHeight = 1.65 * 14;
    const measure = () => {
      const h = body.scrollHeight;
      // Always render at least bodyHeight worth of lines plus a healthy buffer.
      // We track the max we've seen so we never shrink the gutter below the
      // body height even if a transient layout reports it smaller.
      const needed = Math.ceil(h / lineHeight) + 30;
      setLineCount(prev => Math.max(prev, needed));
    };
    measure();

    let ro = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(measure);
      ro.observe(body);
    }

    // Re-measure when web fonts finish loading (they reflow the body)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }

    // Re-measure when images inside the body finish loading
    const imgs = body.querySelectorAll('img');
    const onImgLoad = () => measure();
    imgs.forEach(img => {
      if (!img.complete) img.addEventListener('load', onImgLoad);
    });

    // And on window resize (viewport changes)
    window.addEventListener('resize', measure);

    // Safety net: a few delayed re-measurements catch late layout shifts
    const timers = [200, 600, 1500, 3000].map(ms => setTimeout(measure, ms));

    return () => {
      if (ro) ro.disconnect();
      imgs.forEach(img => img.removeEventListener('load', onImgLoad));
      window.removeEventListener('resize', measure);
      timers.forEach(clearTimeout);
    };
  }, [renderedHtml]);

  // Scroll to top + reset gutter when paper changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
    setLineCount(0);
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
