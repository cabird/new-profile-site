/* ─── Status Bar ─── */
const { useState, useEffect } = React;

IDE.StatusBar = function StatusBar({ paperCount, warningCount = 0, activeLine, activeTab, terminalOpen, onToggleTerminal, lightTheme, onToggleTheme }) {
  const fileType = activeTab === 'profile' ? 'JPEG' : 'Markdown';
  const [filteredCount, setFilteredCount] = useState(paperCount);
  const [tagFilteredCount, setTagFilteredCount] = useState(0);
  const [tagTotalCount, setTagTotalCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      if (window.__pubsFilteredCount !== undefined) {
        setFilteredCount(window.__pubsFilteredCount);
      }
      if (window.__tagFilteredCount !== undefined) {
        setTagFilteredCount(window.__tagFilteredCount);
      }
      if (window.__tagTotalCount !== undefined) {
        setTagTotalCount(window.__tagTotalCount);
      }
    }, 200);
    return () => clearInterval(id);
  }, []);

  const isTagTab = activeTab && activeTab.startsWith('tag:');

  const getPubsDisplay = () => {
    if (activeTab === 'publications') {
      return `${filteredCount}/${paperCount} pubs`;
    }
    if (isTagTab) {
      return `${tagFilteredCount}/${paperCount} pubs`;
    }
    return `${paperCount} pubs`;
  };

  return (
    <div className="statusbar">
      <div className="statusbar-left">
        <span className="statusbar-item">main</span>
        <span className="statusbar-item">{warningCount > 0 ? `0 errors ${warningCount} warnings` : '0 errors 0 warnings'}</span>
      </div>
      <div className="statusbar-right">
        <span className="statusbar-item">Ln {activeLine || 1}, Col 1</span>
        <span className="statusbar-item">UTF-8</span>
        <span className="statusbar-item">{fileType}</span>
        <span className="statusbar-item clickable" onClick={onToggleTerminal} title="Toggle Terminal (Ctrl+`)">{terminalOpen ? 'Terminal: On' : 'Terminal: Off'}</span>
        <span className="statusbar-item clickable" onClick={onToggleTheme} title="Toggle Light/Dark Theme">
          <IDE.Codicon name={lightTheme ? 'color-mode' : 'color-mode'} size={14} />
          {lightTheme ? ' Light' : ' Dark'}
        </span>
        <span className="statusbar-item" style={{ opacity: 0.6 }}>{window.__v || ''}</span>
      </div>
    </div>
  );
};
