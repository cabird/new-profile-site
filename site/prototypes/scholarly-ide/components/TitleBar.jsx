/* ─── Title Bar ─── */

IDE.TitleBar = function TitleBar({ name, activeTab, onCommandPalette, papersById }) {
  let fileLabel;
  if (activeTab === 'profile') {
    fileLabel = 'profile.jpg';
  } else if (activeTab === 'publications') {
    fileLabel = 'publications.md';
  } else if (activeTab && activeTab.startsWith('tag:')) {
    fileLabel = activeTab.slice(4) + '.md';
  } else if (activeTab && activeTab.startsWith('paper:')) {
    const paperId = activeTab.slice(6);
    const paper = papersById && papersById[paperId];
    const title = paper ? paper.title : paperId;
    fileLabel = (title.length > 40 ? title.substring(0, 38) + '…' : title) + '.md';
  } else {
    fileLabel = 'home.md';
  }
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
