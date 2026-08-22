/* Shared: Icon, nav, footer, chat, data helpers */
const { useState, useRef, useEffect } = React;

/* Lucide wrapper (per IN_BROWSER_LUCIDE_ICONS_GUIDE) */
V6.Icon = function Icon({ name, size = 14, color = 'currentColor', className = '', ...props }) {
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

/* Quiet sentence-case text nav. Every link is a real page. */
V6.TopNav = function TopNav({ here }) {
  const pages = [
    ['Home', 'index.html', 'home'],
    ['Expertise', 'expertise.html', 'expertise'],
    ['Publications', 'publications.html', 'pubs'],
    ['Recognition', 'recognition.html', 'recognition'],
    ['Patents', 'patents.html', 'patents'],
    ['About', 'about.html', 'about'],
  ];
  return (
    <nav className="sitenav">
      {pages.map(([label, href, key]) => (
        <a key={key} href={href} className={here === key ? 'here' : ''}>{label}</a>
      ))}
      <a href="/cv/cv_academic.pdf">CV</a>
      <a className="ide" href="/ide/">This site as an IDE &rarr;</a>
    </nav>
  );
};

/* Footer: contact lives here on every page. */
V6.Footer = function Footer() {
  return (
    <footer>
      <h2>Contact &amp; elsewhere</h2>
      <div className="footer-links">
        <a href="mailto:chris@cabird.com">Email</a>
        <a href="https://scholar.google.com/citations?user=aDVlS-wAAAAJ">Google Scholar</a>
        <a href="https://github.com/cabird">GitHub</a>
        <a href="https://www.linkedin.com/in/christian-bird-1896494/">LinkedIn</a>
      </div>
      <p className="colophon">&copy; 2026 Christian Bird &middot; Redmond, WA &middot;
        Built with AI assistance. No analytics, nothing tracks you.</p>
    </footer>
  );
};

/* Fetch paper data with static fallback */
V6.fetchPapers = async function fetchPapers() {
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

V6.parseTags = function parseTags(t) {
  if (Array.isArray(t)) return t.map(x => String(x).replace(/[\[\]']/g, '').trim()).filter(Boolean);
  if (typeof t === 'string') return t.split(',').map(x => x.replace(/[\[\]']/g, '').trim()).filter(Boolean);
  return [];
};

V6.venueOf = function venueOf(p) {
  if (p.type === 'inproceedings') return p.booktitle || p.venue || '';
  if (p.type === 'article') return p.journal || p.venue || '';
  return p.venue || '';
};

V6.fmtAuthors = function fmtAuthors(a) {
  if (!a) return '';
  const list = String(a).split(/\s+and\s+/);
  return list.length > 1 ? list.slice(0, -1).join(', ') + ' & ' + list[list.length - 1] : list[0];
};

/* Stream a conversation to /api/chat (tool-using research assistant).
   messages: [{role:'user'|'assistant', content}] with the new question last.
   onChunk receives accumulated answer text; onActivity receives tool status lines. */
V6.streamChat = async function streamChat(messages, onChunk, onActivity, onDone) {
  try {
    const r = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });
    await pumpSse(r, onChunk, onActivity, onDone);
  } catch (_) {
    onChunk('The assistant could not be reached.');
    if (onDone) onDone();
  }
};

/* Per-paper chat: the server keeps the conversation; we send one message at a time. */
V6.streamPaperChat = async function streamPaperChat(paperId, message, onChunk, onActivity, onDone) {
  try {
    const r = await fetch(`/api/papers/${paperId}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    await pumpSse(r, onChunk, onActivity, onDone);
  } catch (_) {
    onChunk('The assistant could not be reached.');
    if (onDone) onDone();
  }
};

/* SSE pump shared by the site assistant and the per-paper chats. */
async function pumpSse(r, onChunk, onActivity, onDone) {
  let acc = '';
  if (!r.ok) {
    const e = await r.json().catch(() => ({}));
    onChunk(e.error || 'The assistant is not available right now.');
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
        else if (m.type === 'tool_activity') {
          console.log('[assistant] tool:', m.message);
          if (onActivity) onActivity(m.message);
        }
        else if (m.type === 'chat_complete') { console.log('[assistant] complete', m); }
        else if (m.type === 'error') {
          console.warn('[assistant] error:', m.message);
          acc += (acc ? '\n' : '') + m.message; onChunk(acc);
        }
      } catch (_) {}
    }
  }
  if (onDone) onDone();
}

/* Paper id -> URL slug, mirroring the server's safe_dirname(). */
V6.slugOf = function slugOf(id) {
  return String(id).replace(/[:/ ]/g, '_');
};

/* Floating chat: FAB bottom-right, panel streams answers from /api/ask.
   window.V6.openChat() opens it from anywhere (e.g. the bio's ask hint). */
const GREETING = { who: 'bot', text: "Hi. I can answer questions about Chris's research: papers, findings, methods, or how different threads of his work connect. What would you like to know?", greeting: true };

function loadTranscript(storageKey, greeting) {
  try {
    const raw = sessionStorage.getItem(storageKey);
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr) && arr.length) return arr;
    }
  } catch (_) {}
  return [greeting];
}

/* Without props: the site-wide research assistant. With paperId/paperTitle
   (the /papers/<slug> pages): a chat primed with that one paper. */
V6.ChatFab = function ChatFab({ paperId, paperTitle }) {
  const { streamChat, streamPaperChat } = V6;
  const storageKey = paperId ? `v6-chat-paper-${paperId}` : 'v6-chat-transcript';
  const greeting = paperId
    ? { who: 'bot', text: `This chat is primed with “${paperTitle || 'this paper'}”: the full text, metadata, and BibTeX. Ask about the methods, the findings, or how to cite it.`, greeting: true }
    : GREETING;
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState(() => loadTranscript(storageKey, greeting));
  const [busy, setBusy] = useState(false);
  const [canned, setCanned] = useState(paperId ? [] : [
    'What is his most influential work?',
    'What has he found about code review?',
    'What is he working on now?',
  ]);
  const [moreCanned, setMoreCanned] = useState(false);

  // Paper chats offer the curated question list the IDE also uses.
  useEffect(() => {
    if (!paperId) return;
    fetch('/api/canned_questions')
      .then(r => r.json())
      .then(d => setCanned(d.questions || []))
      .catch(() => {});
  }, [paperId]);
  const inputRef = useRef(null);
  const logRef = useRef(null);

  useEffect(() => { V6.openChat = () => setOpen(true); }, []);
  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
    // Keep the transcript across page navigations (the panel lives on every
    // page); sessionStorage so it dies with the tab, matching the no-tracking
    // posture. Pending status lines and streaming flags are not persisted.
    try {
      const clean = msgs.filter(m => !m.pending)
        .map(({ who, text, greeting }) => greeting ? { who, text, greeting } : { who, text });
      sessionStorage.setItem(storageKey, JSON.stringify(clean));
    } catch (_) {}
  }, [msgs]);

  const newChat = () => {
    if (busy) return;
    setMsgs([greeting]);
    try { sessionStorage.removeItem(storageKey); } catch (_) {}
    if (paperId) fetch(`/api/papers/${paperId}/chat`, { method: 'DELETE' }).catch(() => {});
    if (inputRef.current) inputRef.current.focus();
  };

  const sendText = (q) => {
    if (!q || busy) return;
    setBusy(true);
    setMsgs(prev => {
      // Site assistant: client keeps history and sends it whole.
      // Paper chat: the server keeps the conversation; send only the message.
      const history = prev
        .filter(m => !m.greeting && m.who !== 'activity')
        .map(m => ({ role: m.who === 'user' ? 'user' : 'assistant', content: m.text }));
      history.push({ role: 'user', content: q });
      const start = (onChunk, onActivity, onDone) => paperId
        ? streamPaperChat(paperId, q, onChunk, onActivity, onDone)
        : streamChat(history, onChunk, onActivity, onDone);

      start(
        acc => setMsgs(cur => {
          // stream the answer into the trailing bot bubble, adding it on first chunk
          const kept = cur.filter(m => !m.pending);
          const last = kept[kept.length - 1];
          if (last && last.who === 'bot' && last.streaming) {
            return kept.map((m, i) => i === kept.length - 1 ? { ...m, text: acc } : m);
          }
          return [...kept, { who: 'bot', text: acc, streaming: true }];
        }),
        activity => setMsgs(cur => [...cur.filter(m => !m.pending), { who: 'activity', text: activity }]),
        () => {
          setBusy(false);
          setMsgs(cur => cur.filter(m => !m.pending).map(m => m.streaming ? { ...m, streaming: false } : m));
        });

      return [...prev, { who: 'user', text: q },
        { who: 'activity', text: 'Thinking…', pending: true }];
    });
  };

  const send = (e) => {
    if (e) e.preventDefault();
    const q = inputRef.current.value.trim();
    if (!q) return;
    inputRef.current.value = '';
    sendText(q);
  };

  return (
    <React.Fragment>
      <button className="chat-fab" type="button" onClick={() => setOpen(!open)}
        aria-label="Open research assistant chat">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
      {open && (
        <div className="chat-panel" role="dialog" aria-label="Research assistant">
          <div className="chat-header">
            <span className="chat-title">{paperId ? 'Chat with this paper' : 'Research assistant'}</span>
            <span className="chat-header-actions">
              {msgs.length > 1 && (
                <button className="chat-new" type="button" onClick={newChat}
                  disabled={busy} title="Start a new conversation">new chat</button>
              )}
              <button className="chat-close" type="button" onClick={() => setOpen(false)}
                aria-label="Close chat">&times;</button>
            </span>
          </div>
          <div className="chat-log" ref={logRef}>
            {msgs.map((m, i) => {
              if (m.who === 'bot' && window.markdownit && window.DOMPurify) {
                // Model cites papers as [Title (year)](paper:ID). Rewrite the
                // scheme pre-render (runs per chunk, so streaming is untouched),
                // then decorate the sanitized anchors: deep page, new tab.
                const src = (m.text || '').replace(/\]\(paper:([^)\s]+)\)/g,
                  (_, id) => `](/papers/${V6.slugOf(id)})`);
                let html = window.DOMPurify.sanitize(
                  window.markdownit({ html: false, linkify: true }).render(src));
                html = html.replace(/<a href="\/papers\//g,
                  '<a target="_blank" rel="noopener" class="paper-link" ' +
                  'title="Opens the paper page in a new tab" href="/papers/');
                return <div key={i} className="msg bot md"
                  dangerouslySetInnerHTML={{ __html: html }} />;
              }
              return <div key={i} className={'msg ' + m.who}>{m.text}</div>;
            })}
          </div>
          {!busy && canned.length > 0 && msgs.every(m => m.who !== 'user') && (
            <div className="chat-suggest">
              {(moreCanned ? canned : canned.slice(0, 4)).map(q => (
                <button key={q} type="button" onClick={() => sendText(q)}>{q}</button>
              ))}
              {canned.length > 4 && (
                <button type="button" className="chat-suggest-more"
                  onClick={() => setMoreCanned(!moreCanned)}>
                  {moreCanned ? 'fewer' : 'more…'}
                </button>
              )}
            </div>
          )}
          {msgs.length > 1 && (
            <p className="chat-note">AI answers drawn from the CV and publication record. It hallucinates occasionally; the papers don&rsquo;t.</p>
          )}
          <form className="chat-input-row" onSubmit={send}>
            <input ref={inputRef} type="text" maxLength={500} autoComplete="off"
              placeholder="Ask about a paper or topic&hellip;" />
            <button className="chat-send" type="submit" disabled={busy}>Ask</button>
          </form>
        </div>
      )}
    </React.Fragment>
  );
};
