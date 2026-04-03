/* ─── Activity Bar ─── */
const { ExplorerIcon, SearchIcon, PubsIcon, ChatIcon } = IDE;

IDE.ActivityBar = function ActivityBar({ active, onSelect }) {
  const items = [
    { id: 'explorer', icon: <ExplorerIcon />, label: 'Explorer' },
    { id: 'search', icon: <SearchIcon />, label: 'Search' },
    { id: 'publications', icon: <PubsIcon />, label: 'Publications' },
    { id: 'terminal', icon: <ChatIcon />, label: 'Chat' },
  ];
  return (
    <div className="activitybar">
      {items.map(item => (
        <button
          key={item.id}
          className={`activity-icon ${active === item.id ? 'active' : ''}`}
          onClick={() => onSelect(item.id)}
          title={item.label}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
};
