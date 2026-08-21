/* Publications page: full list with search, facets, PDF, BibTeX, readable text */
const { useState, useEffect, useMemo, useRef } = React;
const { TopNav, Icon, fetchPapers, parseTags, venueOf, fmtAuthors } = V4;

const SUBJECTS = [
  { key: 'ai',      label: 'AI & ML for code',       tags: ['ai-for-software-engineering'] },
  { key: 'review',  label: 'code review',            tags: ['code-review'] },
  { key: 'quality', label: 'defects & quality',      tags: ['defect-prediction-and-quality'] },
  { key: 'vcs',     label: 'version control',        tags: ['version-control-and-branching', 'repository-mining'] },
  { key: 'oss',     label: 'open source & networks', tags: ['open-source-software', 'developer-social-networks', 'network-analysis'] },
  { key: 'prod',    label: 'productivity & practice',tags: ['developer-productivity', 'engineering-management', 'tool-adoption-and-trust', 'release-engineering'] },
  { key: 'methods', label: 'methods & data',         tags: ['statistical-analysis', 'surveys', 'interviews', 'dataset-and-tooling', 'case-study'] },
];

function subjectsOf(tags) {
  const out = SUBJECTS.filter(s => s.tags.some(t => tags.includes(t))).map(s => s.key);
  return out.length ? out : ['methods'];
}

/* Renders fetched paper markdown safely; fixes relative image paths */
V4.MarkdownView = function MarkdownView({ paperId }) {
  const [state, setState] = useState({ status: 'loading', html: '' });
  useEffect(() => {
    let alive = true;
    fetch(`/api/papers/${encodeURIComponent(paperId)}/markdown`)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(d => {
        if (!alive) return;
        let md = d.markdown || '';
        if (d.image_base) {
          md = md.replace(/(!\[[^\]]*\]\()(?!https?:|\/)/g, `$1${d.image_base}/`);
        }
        const raw = window.markdownit({ html: false, linkify: true }).render(md);
        setState({ status: 'ok', html: window.DOMPurify.sanitize(raw) });
      })
      .catch(() => { if (alive) setState({ status: 'error', html: '' }); });
    return () => { alive = false; };
  }, [paperId]);
  if (state.status === 'loading') return <p className="loading">Fetching the full text&hellip;</p>;
  if (state.status === 'error') return <p className="loading">The readable version isn&rsquo;t available for this one; try the PDF.</p>;
  return <div className="mdview" dangerouslySetInnerHTML={{ __html: state.html }} />;
};

V4.BibtexView = function BibtexView({ bibtex }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(bibtex).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }).catch(() => {});
  };
  return (
    <div className="bibtex">
      <a href="#" className="panel-close" onClick={e => { e.preventDefault(); copy(); }}>
        <Icon name={copied ? 'Check' : 'Copy'} size={13} /> {copied ? 'copied' : 'copy'}
      </a>
      <pre>{bibtex}</pre>
    </div>
  );
};

V4.PubRow = function PubRow({ p }) {
  const { MarkdownView, BibtexView } = V4;
  const [open, setOpen] = useState(null); // null | 'read' | 'bibtex' | 'about'
  const toggle = (e, panel) => { e.preventDefault(); setOpen(open === panel ? null : panel); };
  const tldr = p.extracted_paper_info && p.extracted_paper_info.tldr;
  const title = String(p.title || '').replace(/``/g, '\u201C').replace(/''/g, '\u201D').replace(/[{}]/g, '');
  const venue = String(venueOf(p) || '').replace(/\.$/, '');
  return (
    <li>
      <span className="hangdate">{p.year}</span>
      <span style={{ minWidth: 0, flex: 1 }}>
        <span className="t">{title}</span>{' '}
        <span className="v">&middot; {venue}.</span>{' '}
        {p.awards && p.awards.length > 0 && <span className="honor">{p.awards.join(' · ').toLowerCase()}</span>}
        <span className="au">{fmtAuthors(p.authors)}</span>
        <span className="links">
          {p.mapped_pdf && <a href={`/pdfs/${encodeURIComponent(p.mapped_pdf)}`}><Icon name="FileDown" size={13} /> pdf</a>}
          <a href="#" className={open === 'read' ? 'on' : ''} onClick={e => toggle(e, 'read')}><Icon name="BookOpen" size={13} /> read</a>
          <a href="#" onClick={e => toggle(e, 'bibtex')}><Icon name="Quote" size={13} /> bibtex</a>
          {tldr && <a href="#" onClick={e => toggle(e, 'about')}><Icon name="Info" size={13} /> about</a>}
          {p.doi && <a href={`https://doi.org/${p.doi}`}><Icon name="ExternalLink" size={13} /> doi</a>}
        </span>
        {open === 'about' && tldr && (
          <span className="panel"><span className="note" style={{ marginTop: 0 }}>{tldr}</span></span>
        )}
        {open === 'bibtex' && p.raw_bibtex && (
          <div className="panel"><BibtexView bibtex={p.raw_bibtex} /></div>
        )}
        {open === 'read' && (
          <div className="panel">
            <a href="#" className="panel-close" onClick={e => toggle(e, 'read')}>close</a>
            <MarkdownView paperId={p.id} />
          </div>
        )}
      </span>
    </li>
  );
};

V4.Pubs = function Pubs() {
  const { PubRow } = V4;
  const [papers, setPapers] = useState(null);
  const [q, setQ] = useState('');
  const [subject, setSubject] = useState(null);
  const [awardsOnly, setAwardsOnly] = useState(false);

  useEffect(() => { fetchPapers().then(setPapers); }, []);

  const enriched = useMemo(() => {
    if (!papers) return [];
    return papers.map(p => {
      const tags = parseTags(p.tags);
      return {
        ...p, _tags: tags, _subs: subjectsOf(tags),
        _hay: (p.title + ' ' + (p.authors || '') + ' ' + venueOf(p) + ' ' +
          ((p.extracted_paper_info || {}).tldr || '') + ' ' + tags.join(' ')).toLowerCase(),
      };
    });
  }, [papers]);

  const visible = useMemo(() => enriched.filter(p => {
    if (awardsOnly && !(p.awards && p.awards.length)) return false;
    if (subject && !p._subs.includes(subject)) return false;
    if (q && !p._hay.includes(q.toLowerCase())) return false;
    return true;
  }), [enriched, q, subject, awardsOnly]);

  const byYear = useMemo(() => {
    const groups = [];
    let cur = null;
    for (const p of visible) {
      if (!cur || cur.year !== p.year) { cur = { year: p.year, items: [] }; groups.push(cur); }
      cur.items.push(p);
    }
    return groups;
  }, [visible]);

  const subjCounts = useMemo(() => {
    const c = {};
    for (const p of enriched) for (const s of p._subs) c[s] = (c[s] || 0) + 1;
    return c;
  }, [enriched]);

  const anyFilter = q || subject || awardsOnly;

  return (
    <div className="page">
      <header>
        <div className="mast">
          <div>
            <h1>Publications</h1>
            <p className="identity">Christian Bird. The complete list: {papers ? papers.length : '…'} papers, none omitted.<br />
              Every paper: PDF, BibTeX, and where available a readable full text and a one-paragraph summary.</p>
          </div>
        </div>
      </header>

      <TopNav here="pubs" />

      <section>
        <div className="pubctl">
          <div className="searchline">
            <input value={q} onChange={e => setQ(e.target.value)}
              placeholder="Search titles, authors, venues, findings&hellip;" autoComplete="off" />
            {q && <a href="#" onClick={e => { e.preventDefault(); setQ(''); }} style={{ fontSize: '.85rem', fontStyle: 'italic' }}>clear</a>}
          </div>
          <div className="facets">
            <span className="lbl">subject</span>
            {SUBJECTS.map(s => (
              <a key={s.key} href="#" className={subject === s.key ? 'on' : ''}
                onClick={e => { e.preventDefault(); setSubject(subject === s.key ? null : s.key); }}>
                {s.label} <span className="n">{subjCounts[s.key] || 0}</span>
              </a>
            ))}
            <br />
            <span className="lbl">show</span>
            <a href="#" className={awardsOnly ? 'on' : ''}
              onClick={e => { e.preventDefault(); setAwardsOnly(!awardsOnly); }}>award-winning only</a>
          </div>
          {anyFilter && papers && (
            <p className="matchline">{visible.length} of {papers.length} papers match.{' '}
              <a href="#" onClick={e => { e.preventDefault(); setQ(''); setSubject(null); setAwardsOnly(false); }}>show all</a>
            </p>
          )}
        </div>

        {!papers && <p className="loading">Opening the record&hellip;</p>}
        {papers && visible.length === 0 && <p className="loading">Nothing matches. Loosen a filter.</p>}

        {byYear.map(g => (
          <div key={g.year}>
            <div className="yearhead">{g.year}</div>
            <ul className="pubs">
              {g.items.map(p => <PubRow key={p.id} p={p} />)}
            </ul>
          </div>
        ))}
      </section>

      <footer>Citations follow the CV; the BibTeX is the authoritative form.
        <br />Built with AI assistance. No analytics, nothing tracks you.</footer>
    </div>
  );
};
