/* ─── Status Bar ─── */
const { useState, useEffect } = React;

IDE.StatusBar = function StatusBar({ paperCount, activeLine, activeTab, terminalOpen, onToggleTerminal }) {
  const fileType = activeTab === 'profile' ? 'JPEG' : 'Markdown';
  const [filteredCount, setFilteredCount] = useState(paperCount);

  useEffect(() => {
    const id = setInterval(() => {
      if (window.__pubsFilteredCount !== undefined) {
        setFilteredCount(window.__pubsFilteredCount);
      }
    }, 200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="statusbar">
      <div className="statusbar-left">
        <span className="statusbar-item">main</span>
        <span className="statusbar-item">0 errors 0 warnings</span>
      </div>
      <div className="statusbar-right">
        <span className="statusbar-item">Ln {activeLine || 1}, Col 1</span>
        <span className="statusbar-item">UTF-8</span>
        <span className="statusbar-item">{fileType}</span>
        <span className="statusbar-item">{activeTab === 'publications' ? `${filteredCount}/` : ''}{paperCount} pubs</span>
        <span className="statusbar-item clickable" onClick={onToggleTerminal} title="Toggle Terminal (Ctrl+`)">{terminalOpen ? 'Terminal: On' : 'Terminal: Off'}</span>
        <span className="statusbar-item">v2.0.0</span>
      </div>
    </div>
  );
};
