/* ─── Terminal Panel (includes OutputLog and fake bash terminal) ─── */
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

/* ─── Terminal Spinner ─── */
IDE.TerminalSpinner = function TerminalSpinner() {
  const phases = [
    'Connecting to research-srv-01.internal...',
    'Authenticating session...',
    'Executing in sandbox...',
    'Waiting for response...',
  ];
  const [phase, setPhase] = React.useState(0);
  React.useEffect(() => {
    const delays = [600, 800, 1200, 2000];
    const timer = setTimeout(() => {
      setPhase(prev => Math.min(prev + 1, phases.length - 1));
    }, delays[phase] || 2000);
    return () => clearTimeout(timer);
  }, [phase]);
  return <span className="terminal-spinner-msg">{phases[phase]}</span>;
};

/* ─── Terminal Panel ─── */
IDE.TerminalPanel = function TerminalPanel({ papers, onClose, visible }) {
  const { OutputLog } = IDE;
  const [activeTab, setActiveTab] = useState('terminal');

  // Terminal state
  const [termLines, setTermLines] = useState([]);       // Array of {type: 'command'|'output'|'error'|'welcome', content: string}
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]); // {role, content} pairs
  const [commandCount, setCommandCount] = useState(0);
  const [remaining, setRemaining] = useState(20);
  const [cmdHistory, setCmdHistory] = useState([]);      // Command history for up/down
  const [cmdHistoryIdx, setCmdHistoryIdx] = useState(-1);
  const [cwd, setCwd] = useState('/home/cbird');
  const [dirListing, setDirListing] = useState([
    'papers/', 'cv.pdf', 'about.txt', 'README.md', '.bashrc', '.env', '.gitconfig',
    '.ssh/', '.git/', '.research_notes/', 'todo.txt', 'scripts/', 'data/', 'drafts/', 'playlists/'
  ]);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const abortRef = useRef(null);

  // Problems tab
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

  const welcomeBanner = useMemo(() => {
    return [
      '',
      'Welcome to cbird@research',
      "Christian Bird's Research Server",
      '',
      "Type 'help' for available commands.",
      '',
    ].join('\n');
  }, [papers]);

  // Show welcome banner on mount
  useEffect(() => {
    setTermLines([{ type: 'welcome', content: welcomeBanner }]);
  }, [welcomeBanner]);

  // Auto-scroll
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [termLines, streaming]);

  // Auto-focus
  useEffect(() => {
    if (activeTab === 'terminal' && visible && !streaming) {
      inputRef.current?.focus();
    }
  }, [activeTab, visible, streaming]);

  // Cleanup abort on unmount
  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  const sendCommand = useCallback(async (cmd) => {
    if (!cmd.trim() || streaming) return;
    const trimmed = cmd.trim();

    // Add to command history
    setCmdHistory(prev => {
      const next = [...prev, trimmed];
      return next.slice(-50); // Keep last 50 commands
    });
    setCmdHistoryIdx(-1);
    setInput('');

    logEvent('command', trimmed.substring(0, 80));

    // Add command line to display (store prompt at time of command)
    setTermLines(prev => [...prev, { type: 'command', content: trimmed, prompt }]);

    // Handle client-side commands
    if (trimmed === 'clear') {
      setTermLines([]);
      return;
    }

    setStreaming(true);
    setCommandCount(prev => prev + 1);

    // Add an empty output line that we'll stream into
    setTermLines(prev => [...prev, { type: 'output', content: '' }]);

    try {
      abortRef.current = new AbortController();

      // Build history: last 10 exchanges (20 messages)
      const historyToSend = conversationHistory.slice(-20);

      const resp = await fetch('/api/terminal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          command: trimmed,
          history: historyToSend,
          datetime: new Date().toString(),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
        signal: abortRef.current.signal,
      });

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP ${resp.status}`);
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let fullOutput = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine.startsWith('data:')) continue;
          const jsonStr = trimmedLine.slice(5).trim();
          if (!jsonStr || jsonStr === '[DONE]') continue;

          try {
            const evt = JSON.parse(jsonStr);
            if (evt.type === 'terminal_chunk') {
              fullOutput += evt.content;
              setTermLines(prev => {
                const next = [...prev];
                next[next.length - 1] = { type: 'output', content: fullOutput };
                return next;
              });
            } else if (evt.type === 'terminal_complete') {
              setRemaining(prev => Math.max(0, prev - 1));
            } else if (evt.type === 'error') {
              setTermLines(prev => [...prev, { type: 'error', content: evt.message }]);
            }
          } catch {}
        }
      }

      // Parse CWD and LS markers from output and strip them
      const cwdMatch = fullOutput.match(/__CWD__(.+?)__CWD__/);
      const lsMatch = fullOutput.match(/__LS__(.+?)__LS__/);
      if (cwdMatch) setCwd(cwdMatch[1]);
      if (lsMatch) setDirListing(lsMatch[1].split(',').filter(Boolean));
      // Strip markers from output
      const cleanOutput = fullOutput
        .replace(/__CWD__.*?__CWD__/g, '')
        .replace(/__LS__.*?__LS__/g, '')
        .trimEnd();
      setTermLines(prev => {
        const next = [...prev];
        for (let i = next.length - 1; i >= 0; i--) {
          if (next[i].type === 'output') {
            if (!cleanOutput) {
              // Empty output (e.g. cd command) — remove the output line entirely
              next.splice(i, 1);
            } else {
              next[i] = { type: 'output', content: cleanOutput };
            }
            break;
          }
        }
        return next;
      });
      fullOutput = cleanOutput;

      // Update conversation history
      setConversationHistory(prev => [
        ...prev,
        { role: 'user', content: trimmed },
        { role: 'assistant', content: fullOutput },
      ]);

    } catch (err) {
      if (err.name !== 'AbortError') {
        setTermLines(prev => [...prev, { type: 'error', content: err.message }]);
      }
    }

    setStreaming(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [streaming, conversationHistory]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const newIdx = cmdHistoryIdx === -1 ? cmdHistory.length - 1 : Math.max(0, cmdHistoryIdx - 1);
      setCmdHistoryIdx(newIdx);
      setInput(cmdHistory[newIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdHistoryIdx === -1) return;
      const newIdx = cmdHistoryIdx + 1;
      if (newIdx >= cmdHistory.length) {
        setCmdHistoryIdx(-1);
        setInput('');
      } else {
        setCmdHistoryIdx(newIdx);
        setInput(cmdHistory[newIdx] || '');
      }
    } else if (e.key === 'c' && e.ctrlKey) {
      // Ctrl+C to cancel streaming or clear input
      if (streaming && abortRef.current) {
        abortRef.current.abort();
        setStreaming(false);
        setTermLines(prev => [...prev, { type: 'output', content: '^C' }]);
      } else {
        setInput('');
        setTermLines(prev => [...prev, { type: 'command', content: input + '^C' }]);
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setTermLines([]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Tab completion on the last "word" (the part after the last space)
      const parts = input.split(' ');
      const partial = parts[parts.length - 1];
      if (!partial) return;
      const matches = dirListing.filter(f => f.startsWith(partial));
      if (matches.length === 1) {
        // Single match — auto-complete
        parts[parts.length - 1] = matches[0];
        setInput(parts.join(' '));
      } else if (matches.length > 1) {
        // Multiple matches — find common prefix and show options
        let common = matches[0];
        for (const m of matches) {
          while (!m.startsWith(common)) common = common.slice(0, -1);
        }
        if (common.length > partial.length) {
          parts[parts.length - 1] = common;
          setInput(parts.join(' '));
        }
        // Show matches in terminal
        setTermLines(prev => [...prev,
          { type: 'command', content: input, prompt },
          { type: 'output', content: matches.join('  ') },
        ]);
      }
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

  const cwdDisplay = cwd === '/home/cbird' ? '~' : cwd.replace('/home/cbird', '~');
  const prompt = `cbird@research:${cwdDisplay}$ `;

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
          {activeTab === 'terminal' && (
            <span className="terminal-rate-counter" title="Commands remaining this hour" style={{
              fontSize: '11px',
              marginRight: '8px',
              fontFamily: 'var(--ui-font)',
              color: remaining <= 3 ? 'var(--error)' : remaining <= 7 ? 'var(--warning)' : 'var(--text-muted)',
              fontWeight: remaining <= 3 ? 700 : 400,
            }}>
              {remaining} remaining
            </span>
          )}
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
          <div className="terminal-shell">
            {termLines.map((line, i) => {
              if (line.type === 'welcome') {
                return (
                  <pre className="terminal-welcome-banner" key={i}>{line.content}</pre>
                );
              }
              if (line.type === 'command') {
                return (
                  <div className="terminal-line" key={i}>
                    <span className="terminal-prompt-text">{line.prompt || prompt}</span>
                    <span className="terminal-cmd-text">{line.content}</span>
                  </div>
                );
              }
              if (line.type === 'output') {
                return (
                  <pre className="terminal-output-text" key={i}>{line.content}</pre>
                );
              }
              if (line.type === 'error') {
                return (
                  <div className="terminal-line error-line" key={i}>
                    <span className="terminal-text" style={{ color: 'var(--vscode-errorForeground, #f85149)' }}>
                      {line.content}
                    </span>
                  </div>
                );
              }
              return null;
            })}

            {streaming && (
              <div className="terminal-line" style={{ opacity: 0.7 }}>
                <IDE.TerminalSpinner />
              </div>
            )}

            {!streaming && remaining > 0 && (
              <div className="terminal-input-row">
                <span className="terminal-prompt-text">{prompt}</span>
                <input
                  ref={inputRef}
                  type="text"
                  className="terminal-shell-input"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                />
              </div>
            )}
            {!streaming && remaining <= 0 && (
              <div className="terminal-line" style={{ color: 'var(--error)', marginTop: 8, fontFamily: 'var(--ui-font)', fontSize: 12 }}>
                Session limit reached (20 commands/hour). Try again later.
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .terminal-shell {
          font-family: var(--font-mono, 'Cascadia Code', 'Fira Code', 'Consolas', monospace);
          font-size: 13px;
          line-height: 1.4;
          padding: 4px 8px;
          min-height: 100%;
        }
        .terminal-welcome-banner {
          color: var(--comment);
          margin: 0;
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
          white-space: pre-wrap;
        }
        .terminal-prompt-text {
          color: var(--comment);
          font-weight: bold;
          white-space: pre;
          user-select: none;
        }
        .terminal-cmd-text {
          color: var(--text);
        }
        .terminal-output-text {
          color: var(--text);
          margin: 0;
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .terminal-line {
          display: flex;
          flex-wrap: nowrap;
          align-items: baseline;
        }
        .terminal-input-row {
          display: flex;
          align-items: baseline;
          position: relative;
        }
        .terminal-shell-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text);
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
          padding: 0;
          margin: 0;
          caret-color: var(--text);
        }
        .terminal-cursor-blink {
          display: inline-block;
          width: 7px;
          height: 14px;
          background: var(--text-muted);
          animation: terminal-blink 1s step-end infinite;
          vertical-align: text-bottom;
          margin-left: -7px;
          pointer-events: none;
        }
        @keyframes terminal-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .terminal-spinner-msg {
          color: var(--text-muted);
          font-style: italic;
          font-size: 12px;
        }
        .terminal-spinner-msg::before {
          content: '⠋';
          margin-right: 6px;
          display: inline-block;
          animation: terminal-spin 0.6s steps(6) infinite;
        }
        @keyframes terminal-spin {
          0% { content: '⠋'; }
          16% { content: '⠙'; }
          33% { content: '⠹'; }
          50% { content: '⠸'; }
          66% { content: '⠼'; }
          83% { content: '⠴'; }
        }
        .terminal-rate-counter {
          color: var(--vscode-descriptionForeground, #858585);
        }
      `}</style>
    </div>
  );
};
