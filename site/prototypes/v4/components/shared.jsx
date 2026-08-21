/* Shared: Icon, Nav, AskInline, data helpers ─── */
const { useState, useRef, useEffect } = React;

/* Lucide wrapper (per IN_BROWSER_LUCIDE_ICONS_GUIDE) */
V4.Icon = function Icon({ name, size = 14, color = 'currentColor', className = '', ...props }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && window.lucide) {
      const def = window.lucide[name];
      if (!def) { console.error(`Icon "${name}" not found`); return; }
      const el = window.lucide.createElement(def);
      el.setAttribute('width', size);
      el.setAttribute('height', size);
      ref.current.innerHTML = '';
      ref.current.appendChild(el);
    }
  }, [name, size]);
  return <span ref={ref} className={className}
    style={{ display: 'inline-flex', color, verticalAlign: 'text-bottom', ...props.style }} {...props} />;
};

/* Top nav: small caps, sticky. `base` prefixes anchor links when on a subpage. */
V4.TopNav = function TopNav({ here }) {
  const base = here === 'pubs' ? 'index.html' : '';
  return (
    <nav className="topnav">
      <a href={base + '#about'}>about</a>
      <a href={base + '#expertise'}>expertise</a>
      <a href="publications.html" className={here === 'pubs' ? 'here' : ''}>publications</a>
      <a href={base + '#patents'}>patents</a>
      <a href={base + '#honors'}>honors</a>
      <a href={base + '#service'}>service</a>
      <a href={base + '#cv'}>cv</a>
      <a href={base + '#contact'}>contact</a>
      <a className="ide" href="/ide/">this site as an IDE&thinsp;&rarr;</a>
    </nav>
  );
};

/* Fetch paper data with static fallback */
V4.fetchPapers = async function fetchPapers() {
  let data;
  try {
    const r = await fetch('/api/paper_data.json');
    if (!r.ok) throw new Error();
    data = await r.json();
  } catch (_) {
    data = await fetch('/paper_data.json').then(r => r.json()).catch(() => ({ papers: {} }));
  }
  const papers = Object.entries(data.papers || {}).map(([id, p]) => ({ id, ...p }));
  papers.sort((a, b) => (b.year || 0) - (a.year || 0) || (a.priority || 50) - (b.priority || 50));
  return papers;
};

V4.parseTags = function parseTags(t) {
  if (Array.isArray(t)) return t.map(x => String(x).replace(/[\[\]']/g, '').trim()).filter(Boolean);
  if (typeof t === 'string') return t.split(',').map(x => x.replace(/[\[\]']/g, '').trim()).filter(Boolean);
  return [];
};

V4.venueOf = function venueOf(p) {
  if (p.type === 'inproceedings') return p.booktitle || p.venue || '';
  if (p.type === 'article') return p.journal || p.venue || '';
  return p.venue || '';
};

V4.fmtAuthors = function fmtAuthors(a) {
  if (!a) return '';
  const list = String(a).split(/\s+and\s+/);
  return list.length > 1 ? list.slice(0, -1).join(', ') + ' & ' + list[list.length - 1] : list[0];
};

/* Stream a question to /api/ask; onChunk receives accumulated text */
V4.streamAsk = async function streamAsk(question, onChunk, onDone) {
  let acc = '';
  try {
    const r = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: question }),
    });
    if (!r.ok) {
      const e = await r.json().catch(() => ({}));
      onChunk(e.error || 'The service is not available right now.');
      if (onDone) onDone();
      return;
    }
    const reader = r.body.getReader();
    const dec = new TextDecoder();
    let buf = '';
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const parts = buf.split('\n\n');
      buf = parts.pop();
      for (const part of parts) {
        const line = part.split('\n').find(l => l.startsWith('data: '));
        if (!line) continue;
        try {
          const m = JSON.parse(line.slice(6));
          if (m.type === 'chat_chunk') { acc += m.content; onChunk(acc); }
          else if (m.type === 'error') { acc += (acc ? '\n' : '') + m.message; onChunk(acc); }
        } catch (_) {}
      }
    }
  } catch (_) {
    onChunk('The service could not be reached.');
  }
  if (onDone) onDone();
};

/* Unboxed Ask widget: a single italic line; answers set as Q./A. prose */
V4.AskInline = function AskInline() {
  const { streamAsk } = V4;
  const [turns, setTurns] = useState([]);   // {q, a}
  const [busy, setBusy] = useState(false);
  const inputRef = useRef(null);

  const ask = (q) => {
    if (!q || busy) return;
    setBusy(true);
    setTurns(prev => [...prev, { q, a: '' }]);
    streamAsk(q,
      acc => setTurns(prev => prev.map((t, i) => i === prev.length - 1 ? { ...t, a: acc } : t)),
      () => setBusy(false));
  };

  const submit = (e) => {
    e.preventDefault();
    const q = inputRef.current.value.trim();
    if (!q) return;
    inputRef.current.value = '';
    ask(q);
  };

  const tryQ = (e, q) => { e.preventDefault(); ask(q); };

  return (
    <div className="ask">
      {turns.length > 0 && (
        <div className="ask-log">
          {turns.map((t, i) => (
            <div className="ask-turn" key={i}>
              <div className="ask-q">{t.q}</div>
              <div className="ask-a">{t.a || '…'}</div>
            </div>
          ))}
        </div>
      )}
      <form className="ask-line" onSubmit={submit}>
        <input ref={inputRef} maxLength={500} autoComplete="off"
          placeholder="Or just ask my work a question&hellip;" />
        <button type="submit" disabled={busy}>ask</button>
      </form>
      <p className="ask-try">
        Try: <a href="#" onClick={e => tryQ(e, 'What is his most influential work?')}>his most influential work</a> &middot;{' '}
        <a href="#" onClick={e => tryQ(e, 'What has he studied about code review?')}>what he found about code review</a> &middot;{' '}
        <a href="#" onClick={e => tryQ(e, 'What are Test of Time awards and which papers won them?')}>what a Test of Time award is</a>
      </p>
      {turns.length > 0 && (
        <p className="ask-note">Answers are AI-generated from the CV and publication record. It hallucinates occasionally; the papers don&rsquo;t.</p>
      )}
    </div>
  );
};
