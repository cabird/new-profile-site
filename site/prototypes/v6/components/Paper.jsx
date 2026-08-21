/* Per-paper page (/papers/<slug>): rendered from window.__PAPER__, which the
   server inlines along with SEO meta. Full text is fetched lazily; the chat
   FAB on this page is primed with this paper (see ChatFab paperId prop). */
const { useState, useEffect } = React;
const { TopNav, Footer, Icon, fetchPapers, parseTags, fmtAuthors, slugOf } = V6;

const P = window.__PAPER__ || {};

function CopyBibtex({ bibtex }) {
  const [copied, setCopied] = useState(false);
  if (!bibtex) return null;
  const copy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(bibtex).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }).catch(() => {});
  };
  return (
    <a href="#" onClick={copy}>
      <Icon name={copied ? 'Check' : 'Quote'} size={13} /> {copied ? 'copied' : 'copy BibTeX'}
    </a>
  );
}

function FullText({ paperId }) {
  const [state, setState] = useState({ status: 'loading', html: '' });
  useEffect(() => {
    let alive = true;
    fetch(`/api/papers/${paperId}/markdown`)
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
  if (state.status === 'error') return (
    <p className="loading">The readable version isn&rsquo;t available for this one{P.pdf && <span>; try the <a href={P.pdf}>PDF</a></span>}.</p>
  );
  return <div className="mdfull" dangerouslySetInnerHTML={{ __html: state.html }} />;
}

function Related({ paperId, tags }) {
  const [rel, setRel] = useState(null);
  useEffect(() => {
    const mine = parseTags(tags);
    if (!mine.length) return;
    fetchPapers().then(papers => {
      const scored = papers
        .filter(p => p.id !== paperId)
        .map(p => ({ p, n: parseTags(p.tags).filter(t => mine.includes(t)).length }))
        .filter(x => x.n > 0)
        .sort((a, b) => b.n - a.n || (b.p.year || 0) - (a.p.year || 0))
        .slice(0, 4)
        .map(x => x.p);
      setRel(scored);
    });
  }, [paperId]);
  if (!rel || !rel.length) return null;
  return (
    <section id="related">
      <h2>Related papers</h2>
      <ul className="hang">
        {rel.map(p => (
          <li key={p.id}>
            <span className="hangdate">{p.year}</span>
            <span><a href={`/papers/${slugOf(p.id)}`}>{String(p.title || '').replace(/[{}]/g, '')}</a></span>
          </li>
        ))}
      </ul>
    </section>
  );
}

V6.Paper = function Paper() {
  return (
    <div className="page">
      <header>
        <h1 className="paper-h1">{P.title}</h1>
        <p className="paper-authors">{fmtAuthors(P.authors)}</p>
        <p className="paper-pagemeta">{P.venue}{P.venue && P.year ? ' · ' : ''}{P.year}
          {(P.awards || []).map(a => <span className="tag" key={a}>{a.toLowerCase()}</span>)}
        </p>
      </header>

      <TopNav here="pubs" />

      {P.tldr && <p className="paper-note paper-takeaway">{P.tldr}</p>}

      <p className="paper-actions">
        {P.pdf && <a href={P.pdf}><Icon name="FileDown" size={13} /> PDF</a>}
        <CopyBibtex bibtex={P.bibtex} />
        {P.doi && <a href={`https://doi.org/${P.doi}`}><Icon name="ExternalLink" size={13} /> DOI</a>}
        <a href="#fulltext"><Icon name="BookOpen" size={13} /> jump to full text</a>
      </p>

      {(P.problem || P.approach || P.findings || P.implications) && (
        <section id="brief">
          <h2>In brief</h2>
          {[['Problem', P.problem], ['Approach', P.approach],
            ['Key insights', P.findings], ['Implications', P.implications]]
            .filter(([, v]) => v && (!Array.isArray(v) || v.length))
            .map(([label, v]) => (
              <div className="brief-block" key={label}>
                <span className="brief-label">{label}</span>
                {Array.isArray(v)
                  ? <ul className="brief-list">{v.map((x, i) => <li key={i}>{x}</li>)}</ul>
                  : <p>{v}</p>}
              </div>
            ))}
        </section>
      )}

      <section id="fulltext">
        <h2>Full text</h2>
        <FullText paperId={P.id} />
      </section>

      <Related paperId={P.id} tags={P.tags} />

      <p className="aside">Questions about this paper? The chat in the corner is primed
        with its full text; ask it about the methods, the numbers, or how to cite it.</p>

      <Footer />
    </div>
  );
};
