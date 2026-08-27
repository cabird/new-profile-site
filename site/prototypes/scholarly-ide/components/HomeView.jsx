/* ─── Home View (includes ContentLine, Metrics, ResearchAreas) ─── */
const { useState } = React;
const { FolderIcon } = IDE;

/* ─── Content Line (line numbers for home view) ─── */
IDE.ContentLine = function ContentLine({ num, active, onHover, onClick, children }) {
  return (
    <div
      className={`content-line ${active ? 'line-active' : ''}`}
      onMouseEnter={() => onHover(num)}
      onClick={() => onClick(num)}
    >
      <span className="line-number">{num}</span>
      <div className="line-content">{children}</div>
    </div>
  );
};

/* ─── Metrics Row ─── */
IDE.Metrics = function Metrics({ paperCount, patentCount, awardCount, yearsActive }) {
  const items = [
    [paperCount, 'publications'],
    [patentCount, 'U.S. patents'],
    [awardCount, 'paper awards'],
    [yearsActive, 'years active'],
  ].filter(([v]) => v > 0);
  return (
    <div className="metrics-row">
      {items.map(([value, label]) => (
        <div className="metric" key={label}>
          <div className="metric-value">{value}</div>
          <div className="metric-label">// {label}</div>
        </div>
      ))}
    </div>
  );
};

/* ─── Research Areas ─── */
IDE.ResearchAreas = function ResearchAreas({ areas, onSelectTag }) {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div className="research-list">
      {areas.map((a, i) => {
        const open = openIdx === i;
        return (
          <div className="research-item" key={i} onClick={() => setOpenIdx(open ? null : i)}>
            <div className="research-item-header">
              <span className={`chevron ${open ? 'open' : ''}`}>{'\u25B8'}</span>
              <span className="folder-icon"><FolderIcon open={open} /></span>
              <span className="title">{a.title}</span>
              {a.tag && <span className="tag" style={{cursor: 'pointer'}} onClick={(e) => { e.stopPropagation(); if (onSelectTag) onSelectTag(a.tag); }}>{a.tag}</span>}
            </div>
            <div className={`research-item-desc ${open ? 'open' : ''}`}>
              {a.tag && (
                <div className="research-item-link" onClick={(e) => { e.stopPropagation(); if (onSelectTag) onSelectTag(a.tag); }}>
                  → View papers in this area
                </div>
              )}
              <div className="research-item-desc-text">{a.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ─── Home View ─── */
IDE.HomeView = function HomeView({ siteData, papers, activeLine, clickedLine, setActiveLine, setClickedLine, onNavigatePublications, onNavigateHonors, onSelectPaper, onSelectTag }) {
  const { ContentLine, Metrics, ResearchAreas } = IDE;
  const paperCount = papers.length;
  const patentCount = siteData?.patents?.length || 0;
  const awardCount = papers.reduce((n, p) => n + (Array.isArray(p.awards) ? p.awards.length : 0), 0);
  const years = papers.map(p => p.year).filter(Boolean);
  const yearsActive = years.length > 0 ? (Math.max(...years) - Math.min(...years)) : 0;
  const honors = IDE.honorStats ? IDE.honorStats(siteData) : null;
  const honorTeaser = honors ? [
    ...honors.career.map(i => ({ year: i.year, text: i.title, sub: i.org })),
    honors.impact.length ? { year: honors.impactSpan, text: `${honors.impact.length} test-of-time, most-influential, and impact paper awards`, sub: 'ESEC/FSE, MSR, ISSRE, ACM SIGSOFT' } : null,
    honors.best.length ? { year: honors.bestSpan, text: `${honors.best.length} distinguished and best paper awards`, sub: 'ICSE, FSE, ISSTA, MSR, ICSME, IEEE Software' } : null,
  ].filter(Boolean) : [];
  const subtitle = [siteData?.distinction?.label, [siteData?.title, siteData?.affiliation].filter(Boolean).join(', ')]
    .filter(Boolean).join(' \u00b7 ');
  const featured = papers.slice(0, 10);

  const currentLine = clickedLine || activeLine;
  let lineNum = 0;
  const nextLine = () => ++lineNum;

  if (!siteData) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="editor-content">
      <div className="editor-body" onMouseLeave={() => { if (!clickedLine) setActiveLine(1); }}>
        <ContentLine num={nextLine()} active={currentLine === lineNum} onHover={setActiveLine} onClick={setClickedLine}>
          <div className="md-h1">
            <span className="hash">#</span> {siteData.name}
          </div>
        </ContentLine>
        <ContentLine num={nextLine()} active={currentLine === lineNum} onHover={setActiveLine} onClick={setClickedLine}>
          <div className="md-subtitle" title={siteData.distinction?.detail || ''}>
            {subtitle}
          </div>
        </ContentLine>
        <ContentLine num={nextLine()} active={currentLine === lineNum} onHover={setActiveLine} onClick={setClickedLine}>
          <span>&nbsp;</span>
        </ContentLine>
        <ContentLine num={nextLine()} active={currentLine === lineNum} onHover={setActiveLine} onClick={setClickedLine}>
          <Metrics paperCount={paperCount} patentCount={patentCount} awardCount={awardCount} yearsActive={yearsActive} />
        </ContentLine>
        {(siteData.about || siteData.bio || '').split('\n\n').map((para, pi) => (
          <React.Fragment key={pi}>
            <ContentLine num={nextLine()} active={currentLine === lineNum} onHover={setActiveLine} onClick={setClickedLine}>
              <p className="md-paragraph" style={{margin: 0}}>{para}</p>
            </ContentLine>
            {pi < (siteData.about || siteData.bio || '').split('\n\n').length - 1 && (
              <ContentLine num={nextLine()} active={currentLine === lineNum} onHover={setActiveLine} onClick={setClickedLine}>
                <span>&nbsp;</span>
              </ContentLine>
            )}
          </React.Fragment>
        ))}
        <ContentLine num={nextLine()} active={currentLine === lineNum} onHover={setActiveLine} onClick={setClickedLine}>
          <span>&nbsp;</span>
        </ContentLine>

        {honorTeaser.length > 0 && (
          <>
            <ContentLine num={nextLine()} active={currentLine === lineNum} onHover={setActiveLine} onClick={setClickedLine}>
              <div className="md-h2" style={{margin: 0, marginBottom: 12}}>
                <span className="hash">##</span> Honors
              </div>
            </ContentLine>
            {honorTeaser.map((t, i) => (
              <ContentLine key={i} num={nextLine()} active={currentLine === lineNum} onHover={setActiveLine} onClick={setClickedLine}>
                <div className="pub-teaser-item honor-teaser" style={{marginLeft: 0, cursor: 'pointer'}} onClick={(e) => { e.stopPropagation(); if (onNavigateHonors) onNavigateHonors(); }}>
                  <span className="pub-teaser-year">{t.year}</span>
                  <span className="pub-teaser-title">{t.text}{t.sub ? <span className="honor-org"> {'\u00b7'} {t.sub}</span> : null}</span>
                </div>
              </ContentLine>
            ))}
            <ContentLine num={nextLine()} active={currentLine === lineNum} onHover={setActiveLine} onClick={setClickedLine}>
              <div className="pub-teaser-more">
                <span style={{cursor: 'pointer', color: 'var(--vscode-link)'}} onClick={(e) => { e.stopPropagation(); if (onNavigateHonors) onNavigateHonors(); }}>{'\u2192'} all honors and awards</span>
              </div>
            </ContentLine>
            <ContentLine num={nextLine()} active={currentLine === lineNum} onHover={setActiveLine} onClick={setClickedLine}>
              <span>&nbsp;</span>
            </ContentLine>
          </>
        )}

        {siteData.research_areas?.length > 0 && (
          <>
            <ContentLine num={nextLine()} active={currentLine === lineNum} onHover={setActiveLine} onClick={setClickedLine}>
              <div className="md-h2" style={{margin: 0, marginBottom: 12}}>
                <span className="hash">##</span> Research Areas
              </div>
            </ContentLine>
            {siteData.research_areas.map((a, i) => (
              <ContentLine key={i} num={nextLine()} active={currentLine === lineNum} onHover={setActiveLine} onClick={setClickedLine}>
                <ResearchAreas areas={[a]} onSelectTag={onSelectTag} />
              </ContentLine>
            ))}
            <ContentLine num={nextLine()} active={currentLine === lineNum} onHover={setActiveLine} onClick={setClickedLine}>
              <span>&nbsp;</span>
            </ContentLine>
          </>
        )}

        {featured.length > 0 && (
          <>
            <ContentLine num={nextLine()} active={currentLine === lineNum} onHover={setActiveLine} onClick={setClickedLine}>
              <div className="md-h2" style={{margin: 0, marginBottom: 12}}>
                <span className="hash">##</span> Recent Publications
              </div>
            </ContentLine>
            {featured.map((p, i) => (
              <ContentLine key={p.id} num={nextLine()} active={currentLine === lineNum} onHover={setActiveLine} onClick={setClickedLine}>
                <div className="pub-teaser-item" style={{marginLeft: 0, borderLeft: '1px solid var(--border)', paddingLeft: 8, cursor: 'pointer'}} onClick={(e) => { e.stopPropagation(); if (onSelectPaper) onSelectPaper(p.id); }}>
                  <span className="pub-teaser-year">{p.year}</span>
                  <span className="pub-teaser-title">{p.title}</span>
                </div>
              </ContentLine>
            ))}
            <ContentLine num={nextLine()} active={currentLine === lineNum} onHover={setActiveLine} onClick={setClickedLine}>
              <div className="pub-teaser-more">
                <span style={{cursor: 'pointer', color: 'var(--vscode-link)'}} onClick={(e) => { e.stopPropagation(); onNavigatePublications(); }}>{'\u2192'} view all publications</span>
              </div>
            </ContentLine>
          </>
        )}

        <ContentLine num={nextLine()} active={currentLine === lineNum} onHover={setActiveLine} onClick={setClickedLine}>
          <span>&nbsp;</span>
        </ContentLine>
        <ContentLine num={nextLine()} active={currentLine === lineNum} onHover={setActiveLine} onClick={setClickedLine}>
          <footer className="page-footer" style={{margin: 0}}>
            &copy; {new Date().getFullYear()} {siteData.name} — Research IDE v{window.__v || ''}
          </footer>
        </ContentLine>
      </div>
    </div>
  );
};
