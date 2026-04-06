/* ─── Chat Panel (right sidebar, like Copilot Chat) ─── */
const { useState, useEffect, useRef, useCallback } = React;
const { Codicon, logEvent } = IDE;

IDE.ChatPanel = function ChatPanel({ paper, onClose, visible }) {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  const handleResizeStart = useCallback((e) => {
    e.preventDefault();
    const startX = e.clientX;
    const shell = document.querySelector('.vscode-shell');
    const startWidth = parseInt(getComputedStyle(shell).getPropertyValue('--chatpanel-w')) || 340;
    const onMove = (ev) => {
      const newWidth = Math.max(200, Math.min(startWidth + (startX - ev.clientX), 600));
      shell.style.setProperty('--chatpanel-w', newWidth + 'px');
    };
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, []);
  const abortRef = useRef(null);
  const prevPaperIdRef = useRef(null);

  // Reset history when paper changes
  useEffect(() => {
    if (paper && paper.id !== prevPaperIdRef.current) {
      prevPaperIdRef.current = paper.id;
      setHistory([]);
      setInput('');
      if (abortRef.current) abortRef.current.abort();
    }
  }, [paper?.id]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history, streaming]);

  // Focus input when panel opens
  useEffect(() => {
    if (visible && paper) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [visible, paper]);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || streaming || !paper) return;

    setHistory(prev => [...prev, { type: 'user', content: text.trim() }]);
    setInput('');
    setStreaming(true);
    logEvent('chat', `Query: "${text.trim().substring(0, 60)}${text.trim().length > 60 ? '...' : ''}"`);

    let assistantContent = '';
    setHistory(prev => [...prev, { type: 'assistant', content: '' }]);

    try {
      abortRef.current = new AbortController();
      const resp = await fetch(`/api/papers/${paper.id}/chat`, {
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
              setHistory(prev => [...prev, { type: 'status', content: `${evt.remaining_messages} messages remaining` }]);
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
  }, [streaming, paper]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  if (!visible) return null;

  const shortTitle = paper ? (paper.title.length > 40 ? paper.title.substring(0, 38) + '…' : paper.title) : 'No paper';

  return (
    <div className="chat-panel">
      <div className="chat-resize-handle" onMouseDown={handleResizeStart}></div>
      <div className="chat-panel-header">
        <div className="chat-panel-title">
          <Codicon name="comment-discussion" size={14} />
          <span>Chat</span>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <button className="chat-panel-close" onClick={() => { setHistory([]); if (abortRef.current) abortRef.current.abort(); setStreaming(false); }} title="New chat">
            <Codicon name="add" size={14} />
          </button>
          <button className="chat-panel-close" onClick={onClose} title="Close chat">
            <Codicon name="close" size={14} />
          </button>
        </div>
      </div>

      {paper && (
        <div className="chat-panel-context">
          <Codicon name="file" size={12} />
          <span>{shortTitle}</span>
        </div>
      )}

      <div className="chat-panel-body" ref={bodyRef}>
        {!paper && (
          <div className="chat-empty">
            <Codicon name="comment-discussion" size={32} style={{ opacity: 0.3 }} />
            <div>Open a paper and click <strong>Chat</strong> to start a conversation.</div>
          </div>
        )}

        {paper && history.length === 0 && !streaming && (
          <div className="chat-empty">
            <Codicon name="comment-discussion" size={32} style={{ opacity: 0.3 }} />
            <div>Ask a question about this paper.</div>
            <div className="chat-suggestions">
              <button className="chat-suggestion" onClick={() => sendMessage('Explain this paper like I\'m a 5th grader')}>
                Explain like I'm a 5th grader
              </button>
              <button className="chat-suggestion" onClick={() => sendMessage('What\'s the surprising or counterintuitive finding in this paper?')}>
                What's the surprising part?
              </button>
              <button className="chat-suggestion" onClick={() => sendMessage('If I only have 30 seconds, what should I know about this paper?')}>
                30-second version
              </button>
              <button className="chat-suggestion" onClick={() => sendMessage('What real-world problem does this solve and who benefits?')}>
                Why should I care?
              </button>
              <button className="chat-suggestion" onClick={() => sendMessage('What would a good follow-up study look like?')}>
                What's next?
              </button>
            </div>
          </div>
        )}

        {history.map((entry, i) => {
          if (entry.type === 'user') {
            return (
              <div className="chat-msg chat-msg-user" key={i}>
                <div className="chat-msg-avatar"><Codicon name="account" size={16} /></div>
                <div className="chat-msg-content">{entry.content}</div>
              </div>
            );
          }
          if (entry.type === 'assistant') {
            return (
              <div className="chat-msg chat-msg-assistant" key={i}>
                <div className="chat-msg-avatar"><Codicon name="hubot" size={16} /></div>
                <div className="chat-msg-content">{entry.content}</div>
              </div>
            );
          }
          if (entry.type === 'error') {
            return (
              <div className="chat-msg chat-msg-error" key={i}>
                <Codicon name="error" size={14} />
                <span>{entry.content}</span>
              </div>
            );
          }
          if (entry.type === 'status') {
            return (
              <div className="chat-msg chat-msg-status" key={i}>{entry.content}</div>
            );
          }
          return null;
        })}

        {streaming && history.length > 0 && history[history.length - 1].content === '' && (
          <div className="chat-msg chat-msg-assistant">
            <div className="chat-msg-avatar"><Codicon name="hubot" size={16} /></div>
            <div className="chat-msg-content chat-typing">Thinking…</div>
          </div>
        )}
      </div>

      {paper && (
        <div className="chat-panel-input">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={streaming ? 'Waiting for response…' : 'Ask about this paper…'}
            disabled={streaming}
          />
          <button
            className="chat-send-btn"
            onClick={() => sendMessage(input)}
            disabled={streaming || !input.trim()}
            title="Send"
          >
            <Codicon name="send" size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
