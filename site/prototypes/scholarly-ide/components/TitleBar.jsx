/* ─── Title Bar ─── */

IDE.TitleBar = function TitleBar({ name, activeTab, onCommandPalette }) {
  const fileLabel = activeTab === 'profile' ? 'profile.jpg' : activeTab === 'publications' ? 'publications.md' : 'home.md';
  return (
    <div className="titlebar">
      <div className="titlebar-dots">
        <span className="titlebar-dot red"></span>
        <span className="titlebar-dot yellow"></span>
        <span className="titlebar-dot green"></span>
      </div>
      <div className="titlebar-text" onClick={onCommandPalette}>{name || 'Scholarly IDE'} — {fileLabel}</div>
    </div>
  );
};
