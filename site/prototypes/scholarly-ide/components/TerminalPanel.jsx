/* ─── Terminal Panel (includes AsciiSpinner and OutputLog) ─── */
const { useState, useEffect, useRef, useCallback, useMemo } = React;
const { useEventLog, logEvent } = IDE;

/* ─── Output Log Component ─── */
IDE.OutputLog = function OutputLog() {
  const log = useEventLog();
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [log]);

  const typeColors = {
    system: '#569cd6',
    navigate: '#4ec9b0',
    explorer: '#dcb67a',
    tab: '#c586c0',
    paper: '#dcdcaa',
    search: '#ce9178',
    filter: '#b5cea8',
    chat: '#6a9955',
    command: '#d29922',
    error: '#f85149',
  };

  return (
    <div className="output-log">
      {log.map((entry, i) => (
        <div className="output-log-line" key={i}>
          <span className="output-log-ts">[{entry.ts}]</span>
          <span className="output-log-type" style={{color: typeColors[entry.type] || '#858585'}}>[{entry.type}]</span>
          <span className="output-log-detail">{entry.detail}</span>
        </div>
      ))}
      {log.length === 0 && <div style={{color:'#858585'}}>No output</div>}
      <div ref={bottomRef} />
    </div>
  );
};

/* ─── ASCII Spinner ─── */
IDE.AsciiSpinner = function AsciiSpinner() {
  const frames = ['\u280B','\u2819','\u2839','\u2838','\u283C','\u2834','\u2826','\u2827','\u2807','\u280F'];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % frames.length), 80);
    return () => clearInterval(id);
  }, []);
  return <span className="terminal-text" style={{ color: '#6a9955' }}>{frames[idx]} querying paper...</span>;
};

/* ─── Terminal Panel ─── */
IDE.TerminalPanel = function TerminalPanel({ papers, chatPaper, setChatPaper, onClose, visible }) {
  const { OutputLog, AsciiSpinner } = IDE;
  const [activeTab, setActiveTab] = useState('terminal');
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const abortRef = useRef(null);

  const warningCount = useMemo(() => {
    return papers.filter(p => !p.doi || !p.mapped_pdf).length;
  }, [papers]);

  const problemsList = useMemo(() => {
    const problems = [];
    papers.forEach(p => {
      if (!p.doi) problems.push({ text: `Missing DOI: ${p.title}`, source: p.id });
      if (!p.mapped_pdf) problems.push({ text: `Missing PDF: ${p.title}`, source: p.id });
    });
    return problems;
  }, [papers]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history, streaming]);

  useEffect(() => {
    if (activeTab === 'terminal' && visible) {
      inputRef.current?.focus();
    }
  }, [activeTab, visible]);

  // Reset history when paper changes
  useEffect(() => {
    setHistory([]);
    setInput('');
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [chatPaper?.id]);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || streaming) return;
    if (!chatPaper) return;

    setHistory(prev => [...prev, { type: 'user', content: text.trim() }]);
    setInput('');
    setStreaming(true);
    logEvent('chat', `Query: "${text.trim().substring(0, 60)}${text.trim().length > 60 ? '...' : ''}"`);

    let assistantContent = '';
    setHistory(prev => [...prev, { type: 'assistant', content: '' }]);

    try {
      abortRef.current = new AbortController();
      const resp = await fetch(`/api/papers/${chatPaper.id}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim() }),
        signal: abortRef.current.signal,
      });

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP ${resp.status}`);
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;
          const jsonStr = trimmed.slice(5).trim();
          if (!jsonStr || jsonStr === '[DONE]') continue;

          try {
            const evt = JSON.parse(jsonStr);
            if (evt.type === 'chat_chunk') {
              assistantContent += evt.content;
              setHistory(prev => {
                const next = [...prev];
                next[next.length - 1] = { type: 'assistant', content: assistantContent };
                return next;
              });
            } else if (evt.type === 'chat_complete') {
              setHistory(prev => [...prev, { type: 'status', content: `${evt.message_count} messages \u00B7 ${evt.remaining_messages} remaining` }]);
            } else if (evt.type === 'error') {
              setHistory(prev => [...prev, { type: 'error', content: evt.message }]);
            }
          } catch {}
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setHistory(prev => [...prev, { type: 'error', content: err.message }]);
      }
    }
    setStreaming(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [streaming, chatPaper]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const panelRef = useRef(null);
  const heightRef = useRef(250);

  useEffect(() => {
    const shell = document.querySelector('.vscode-shell');
    if (shell && visible) {
      shell.style.setProperty('--terminal-current-h', heightRef.current + 'px');
    }
  }, [visible]);

  const handleDragStart = useCallback((e) => {
    e.preventDefault();
    const startY = e.clientY;
    const startHeight = heightRef.current;
    const shell = document.querySelector('.vscode-shell');
    const onMove = (ev) => {
      const delta = startY - ev.clientY;
      const newHeight = Math.max(100, Math.min(startHeight + delta, window.innerHeight - 200));
      heightRef.current = newHeight;
      if (shell) shell.style.setProperty('--terminal-current-h', newHeight + 'px');
    };
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, []);

  return (
    <div className="terminal-panel" ref={panelRef}>
      <div className="terminal-resize-handle" onMouseDown={handleDragStart}></div>
      <div className="terminal-panel-header">
        <div className="terminal-panel-tabs">
          <button
            className={`terminal-panel-tab ${activeTab === 'problems' ? 'active' : ''}`}
            onClick={() => setActiveTab('problems')}
          >
            Problems
            {warningCount > 0 && <span className="tab-badge">{warningCount}</span>}
          </button>
          <button
            className={`terminal-panel-tab ${activeTab === 'output' ? 'active' : ''}`}
            onClick={() => setActiveTab('output')}
          >
            Output
          </button>
          <button
            className={`terminal-panel-tab ${activeTab === 'terminal' ? 'active' : ''}`}
            onClick={() => setActiveTab('terminal')}
          >
            Terminal
          </button>
        </div>
        <div className="terminal-panel-actions">
          <button className="terminal-panel-action-btn" onClick={onClose} title="Close panel">
            <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
              <path d="M8 8.71l3.65 3.64a.5.5 0 00.7-.7L8.71 8l3.64-3.65a.5.5 0 00-.7-.7L8 7.29 4.35 3.65a.5.5 0 00-.7.7L7.29 8l-3.64 3.65a.5.5 0 00.7.7L8 8.71z"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="terminal-panel-body" ref={bodyRef} onClick={() => { if (activeTab === 'terminal') inputRef.current?.focus(); }}>
        {activeTab === 'problems' && (
          <div className="terminal-problems">
            {problemsList.length === 0 ? (
              <div className="terminal-output-empty">No problems detected.</div>
            ) : (
              problemsList.map((prob, i) => (
                <div className="terminal-problem-row" key={i}>
                  <span className="terminal-problem-icon">{'\u26A0'}</span>
                  <span className="terminal-problem-text">{prob.text}</span>
                  <span className="terminal-problem-source">[{prob.source}]</span>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'output' && (
          <OutputLog />
        )}

        {activeTab === 'terminal' && (
          <>
            <div className="terminal-welcome">{`Welcome to Scholarly IDE Terminal\nChat with any paper — click a paper and select "Chat with Paper",\nor press Ctrl+P to search and open one.\n---`}</div>

            {chatPaper && (
              <div className="terminal-connected">Connected to: {chatPaper.title}</div>
            )}

            {!chatPaper && history.length === 0 && (
              <div className="terminal-line">
                <span className="terminal-text" style={{ color: '#858585' }}>No paper selected. Click a paper above and select "Chat with Paper", or press Ctrl+P to search.</span>
              </div>
            )}

            {history.map((entry, i) => {
              if (entry.type === 'user') {
                return (
                  <div className="terminal-line" key={i}>
                    <span className="terminal-prompt">{'\u276F'}</span>
                    <span className="terminal-text">{entry.content}</span>
                  </div>
                );
              }
              if (entry.type === 'assistant') {
                return (
                  <div className="terminal-line assistant-line" key={i}>
                    <span className="terminal-text">{entry.content}</span>
                  </div>
                );
              }
              if (entry.type === 'error') {
                return (
                  <div className="terminal-line error-line" key={i}>
                    <span className="terminal-text">Error: {entry.content}</span>
                  </div>
                );
              }
              if (entry.type === 'status') {
                return (
                  <div className="terminal-line" key={i} style={{ color: '#858585', fontSize: '11px' }}>
                    <span className="terminal-text">{entry.content}</span>
                  </div>
                );
              }
              return null;
            })}

            {streaming && (
              <div className="terminal-line">
                <span className="terminal-prompt">{'\u276F'}</span>
                <AsciiSpinner />
              </div>
            )}

            {chatPaper && !streaming && (
              <div className="terminal-input-row">
                <span className="terminal-prompt">{'\u276F'}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a question..."
                  disabled={streaming}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
