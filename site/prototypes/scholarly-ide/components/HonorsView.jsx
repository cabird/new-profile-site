/* ─── Honors View (honors.md): career recognition, lasting-impact awards, best papers ─── */
const { useState, useMemo } = React;

// Shared summary numbers, also used by the home page teaser.
IDE.honorStats = function honorStats(siteData) {
  const groups = siteData?.honors || [];
  const byKey = {};
  groups.forEach(g => { byKey[g.key] = g.items || []; });
  const span = (items) => {
    const ys = items.map(i => parseInt(String(i.year).slice(0, 4), 10)).filter(n => !isNaN(n));
    if (!ys.length) return '';
    const lo = Math.min(...ys), hi = Math.max(...ys);
    return lo === hi ? String(lo) : `${lo}–${String(hi).slice(2)}`;
  };
  return {
    career: byKey.career || [],
    impact: byKey.impact || [],
    best: byKey.best || [],
    impactSpan: span(byKey.impact || []),
    bestSpan: span(byKey.best || []),
    total: groups.reduce((n, g) => n + (g.items || []).length, 0),
  };
};

IDE.HonorRow = function HonorRow({ item, paper, onSelectPaper }) {
  const clickable = !!(paper && onSelectPaper);
  return (
    <div
      className={`honor-row ${clickable ? 'clickable' : ''}`}
      onClick={clickable ? (e) => { e.stopPropagation(); onSelectPaper(paper.id); } : undefined}
      title={clickable ? `Open: ${paper.title}` : (item.note || '')}
    >
      <span className="honor-year">{item.year}</span>
      <div className="honor-main">
        <div>
          <span className="honor-title">{item.title}</span>
          {item.org && <span className="honor-org"> {'·'} {item.org}</span>}
        </div>
        {item.note && !paper && <div className="honor-note">{item.note}</div>}
        {paper && (
          <div className="honor-paper">
            for <span className="honor-paper-title">{'“'}{paper.title}{'”'}</span>
            {paper.year ? <span className="honor-paper-year"> ({paper.year})</span> : null}
          </div>
        )}
      </div>
    </div>
  );
};

IDE.HonorsView = function HonorsView({ siteData, papersById, onSelectPaper }) {
  const { ContentLine, HonorRow, honorStats } = IDE;
  const [activeLine, setActiveLine] = useState(1);
  const [clickedLine, setClickedLine] = useState(null);
  const currentLine = clickedLine || activeLine;
  let lineNum = 0;
  const nextLine = () => ++lineNum;
  const lineProps = () => ({ num: nextLine(), active: currentLine === lineNum, onHover: setActiveLine, onClick: setClickedLine });

  const groups = siteData?.honors || [];
  const stats = useMemo(() => honorStats(siteData), [siteData]);
  const distinction = siteData?.distinction;

  if (!siteData) return <div className="loading">Loading...</div>;

  return (
    <div className="editor-content">
      <div className="editor-body" onMouseLeave={() => { if (!clickedLine) setActiveLine(1); }}>
        <ContentLine {...lineProps()}>
          <div className="md-h1"><span className="hash">#</span> Honors and Recognition</div>
        </ContentLine>
        <ContentLine {...lineProps()}>
          <div className="md-subtitle">
            {distinction ? `${distinction.label} (${distinction.year})` : null}
            {distinction ? ' · ' : ''}
            {stats.impact.length} test-of-time and impact awards {'·'} {stats.best.length} distinguished and best paper awards
          </div>
        </ContentLine>
        <ContentLine {...lineProps()}><span>&nbsp;</span></ContentLine>

        {groups.map((g) => (
          <React.Fragment key={g.key || g.group}>
            <ContentLine {...lineProps()}>
              <div className="md-h2" style={{ margin: 0, marginBottom: 8 }}>
                <span className="hash">##</span> {g.group}
                <span className="honor-count">{(g.items || []).length}</span>
              </div>
            </ContentLine>
            {g.desc && (
              <ContentLine {...lineProps()}>
                <div className="honor-group-desc">{'// '}{g.desc}</div>
              </ContentLine>
            )}
            {(g.items || []).map((item, i) => (
              <ContentLine key={i} {...lineProps()}>
                <HonorRow item={item} paper={item.paper_id ? papersById?.[item.paper_id] : null} onSelectPaper={onSelectPaper} />
              </ContentLine>
            ))}
            <ContentLine {...lineProps()}><span>&nbsp;</span></ContentLine>
          </React.Fragment>
        ))}

        <ContentLine {...lineProps()}>
          <footer className="page-footer" style={{ margin: 0 }}>
            {stats.total} entries {'·'} full list in cv.md
          </footer>
        </ContentLine>
      </div>
    </div>
  );
};
