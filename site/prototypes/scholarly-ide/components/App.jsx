/* ─── Main App ─── */
const { useState, useEffect, useCallback, useMemo } = React;
const {
  TitleBar, ActivityBar, Sidebar, StatusBar,
  HomeView, PublicationsView, TerminalPanel, CommandPalette,
  TabFileIcon, FileImgIcon, FileMdIcon, FileIconSvg,
  buildVirtualFS, logEvent
} = IDE;

IDE.App = function App() {
  const [siteData, setSiteData] = useState(null);
  const [papers, setPapers] = useState([]);
  const [error, setError] = useState(null);
  const [activeActivity, setActiveActivity] = useState('explorer');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Tab management
  const [openTabs, setOpenTabs] = useState(['home']);
  const [activeEditorTab, setActiveEditorTab] = useState('home');

  // Home view line state
  const [homeActiveLine, setHomeActiveLine] = useState(1);
  const [homeClickedLine, setHomeClickedLine] = useState(null);

  // Publications view state
  const [expandedId, setExpandedId] = useState(null);
  const [chatPaper, setChatPaper] = useState(null);
  const [pubHoveredLine, setPubHoveredLine] = useState(null);

  // Open a tab (add if not already open, switch to it)
  const openTab = useCallback((tab) => {
    setOpenTabs(prev => prev.includes(tab) ? prev : [...prev, tab]);
    setActiveEditorTab(tab);
    logEvent('tab', `Open: ${tab}`);
  }, []);

  // Close a tab
  const closeTab = useCallback((tab) => {
    setOpenTabs(prev => {
      const next = prev.filter(t => t !== tab);
      // If we're closing the active tab, switch to an adjacent one
      if (tab === activeEditorTab) {
        const idx = prev.indexOf(tab);
        const newActive = next.length > 0
          ? (next[Math.min(idx, next.length - 1)])
          : null;
        setActiveEditorTab(newActive);
      }
      return next;
    });
    logEvent('tab', `Close: ${tab}`);
  }, [activeEditorTab]);

  // Alias for compatibility
  const setActiveTab = openTab;

  // Select paper by id — opens publications tab, expands peek, connects terminal
  const selectPaper = useCallback((paperId) => {
    openTab('publications');
    setExpandedId(paperId);
    // Find the paper object and connect terminal
    const paper = papers.find(p => p.id === paperId);
    if (paper) {
      setChatPaper(paper);
      setTerminalOpen(true);
      logEvent('chat', `Connected to paper: ${paper.title}`);
    }
    setTimeout(() => {
      const el = document.querySelector(`[data-paper-id="${paperId}"]`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 200);
  }, [papers, openTab]);

  // Load data
  useEffect(() => {
    Promise.all([
      fetch('/site_data.json').then(r => r.json()),
      fetch('/api/paper_data.json').then(r => r.json()),
    ]).then(([site, paperData]) => {
      setSiteData(site);
      const list = Object.entries(paperData.papers || {}).map(([id, p]) => ({ id, ...p }));
      list.sort((a, b) => (b.year || 0) - (a.year || 0));
      setPapers(list);
      logEvent('system', `Loaded ${list.length} papers from /api/paper_data.json`);
      logEvent('system', `Site data loaded: ${site.name}`);
    }).catch(e => { setError('Failed to load data'); logEvent('error', 'Failed to load data'); });
  }, []);

  // Handle ?open=paperid from URL
  useEffect(() => {
    if (papers.length === 0) return;
    const params = new URLSearchParams(window.location.search);
    const openId = params.get('open');
    if (openId) {
      setActiveTab('publications');
      selectPaper(openId);
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [papers, setActiveTab, selectPaper]);

  // Sync terminal height CSS variable
  useEffect(() => {
    const shell = document.querySelector('.vscode-shell');
    if (shell) {
      shell.style.setProperty('--terminal-current-h', terminalOpen ? '250px' : '0px');
    }
  }, [terminalOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        setTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const virtualFS = useMemo(() => buildVirtualFS(siteData, papers, { setActiveTab, selectPaper }), [siteData, papers, setActiveTab, selectPaper]);

  const handleActivitySelect = (id) => {
    if (id === 'publications') {
      setActiveTab('publications');
      return;
    }
    if (id === 'terminal') {
      setTerminalOpen(prev => !prev);
      return;
    }
    if (id === 'search') {
      setCommandPaletteOpen(true);
      logEvent('command', 'Command Palette opened');
      return;
    }
    if (id === activeActivity) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setActiveActivity(id);
      setSidebarOpen(true);
    }
  };

  const handleChatWithPaper = useCallback((paper) => {
    setChatPaper(paper);
    setTerminalOpen(true);
    logEvent('chat', `Connected to paper: ${paper.title}`);
  }, []);

  // Compute active line for status bar
  const activeLine = activeEditorTab === 'publications'
    ? (pubHoveredLine || 1)
    : (homeClickedLine || homeActiveLine);

  if (error) return (
    <div className="vscode-shell">
      <TitleBar name="" activeTab={activeEditorTab} onCommandPalette={() => setCommandPaletteOpen(true)} />
      <div className="activitybar"></div>
      <div className="sidebar"></div>
      <div className="editor-area">
        <div className="loading">{error}</div>
      </div>
      <StatusBar paperCount={0} activeLine={1} activeTab={activeEditorTab} terminalOpen={false} onToggleTerminal={() => {}} />
    </div>
  );

  const shellClasses = [
    'vscode-shell',
    !sidebarOpen ? 'sidebar-collapsed' : '',
    mobileSidebar ? 'mobile-sidebar-open' : '',
    terminalOpen ? 'terminal-open' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={shellClasses}>
      <button className="hamburger" onClick={() => setMobileSidebar(!mobileSidebar)}>{'\u2630'}</button>
      {mobileSidebar && <div className="mobile-overlay open" onClick={() => setMobileSidebar(false)}></div>}

      <TitleBar name={siteData?.name} activeTab={activeEditorTab} onCommandPalette={() => { setCommandPaletteOpen(true); logEvent('command', 'Command Palette opened'); }} />
      <ActivityBar active={activeActivity} onSelect={handleActivitySelect} />
      <Sidebar siteData={siteData} activeTab={activeEditorTab} onSetTab={openTab} openTabs={openTabs} />

      <div className="editor-area">
        {/* Tab Bar */}
        <div className="tabbar">
          {openTabs.map(tab => {
            const tabInfo = {
              home: { label: 'home.md', icon: <TabFileIcon color="#3794ff" /> },
              publications: { label: 'publications.md', icon: <TabFileIcon color="#3794ff" /> },
              profile: { label: 'profile.jpg', icon: <FileImgIcon /> },
            };
            const info = tabInfo[tab] || { label: tab, icon: <TabFileIcon /> };
            return (
              <div key={tab} className={`tab ${activeEditorTab === tab ? 'active' : ''}`} onClick={() => setActiveEditorTab(tab)}>
                <span className="tab-icon">{info.icon}</span>
                {info.label}
                <span className="tab-close" onClick={(e) => { e.stopPropagation(); closeTab(tab); }}>{'\u00D7'}</span>
              </div>
            );
          })}
        </div>

        {/* Breadcrumb */}
        {activeEditorTab && (
          <div className="breadcrumb">
            <span style={{cursor:'default'}}>cbird-site</span>
            <span className="breadcrumb-sep">{'\u203A'}</span>
            <span>{activeEditorTab === 'profile' ? 'profile.jpg' : activeEditorTab === 'publications' ? 'publications.md' : 'home.md'}</span>
          </div>
        )}

        {/* Welcome screen when no tabs are open */}
        {!activeEditorTab && (
          <div className="welcome-screen">
            <div className="welcome-title">Scholarly IDE</div>
            <div className="welcome-subtitle">{siteData?.name || ''}</div>
            <div className="welcome-actions">
              <div className="welcome-section">Start</div>
              <div className="welcome-link" onClick={() => openTab('home')}>
                <span className="welcome-link-icon"><FileMdIcon /></span>
                Open home.md
              </div>
              <div className="welcome-link" onClick={() => openTab('publications')}>
                <span className="welcome-link-icon"><FileMdIcon /></span>
                Open publications.md
              </div>
              <div className="welcome-link" onClick={() => openTab('profile')}>
                <span className="welcome-link-icon"><FileIconSvg color="#a074c4" /></span>
                Open profile.jpg
              </div>
              <div className="welcome-section" style={{marginTop: 16}}>Help</div>
              <div className="welcome-link" onClick={() => { setCommandPaletteOpen(true); }}>
                <span className="welcome-link-shortcut">Ctrl+P</span>
                Go to File...
              </div>
              <div className="welcome-link" onClick={() => setTerminalOpen(prev => !prev)}>
                <span className="welcome-link-shortcut">Ctrl+`</span>
                Toggle Terminal
              </div>
            </div>
          </div>
        )}

        {/* Image Viewer */}
        {activeEditorTab === 'profile' && (
          <div className="image-viewer">
            <div className="image-viewer-container">
              <img src="/images/profile_pic_medium.jpeg" alt="Profile" />
            </div>
            <div className="image-viewer-info">
              profile.jpg —
              <span style={{color: '#858585'}}> Click to zoom</span>
            </div>
          </div>
        )}

        {/* Home View */}
        {activeEditorTab === 'home' && (
          <HomeView
            siteData={siteData}
            papers={papers}
            activeLine={homeActiveLine}
            clickedLine={homeClickedLine}
            setActiveLine={setHomeActiveLine}
            setClickedLine={setHomeClickedLine}
            onNavigatePublications={() => openTab('publications')}
            onSelectPaper={selectPaper}
          />
        )}

        {/* Publications View */}
        {activeEditorTab === 'publications' && (
          <PublicationsView
            papers={papers}
            expandedId={expandedId}
            setExpandedId={setExpandedId}
            onChatWithPaper={handleChatWithPaper}
            hoveredLine={pubHoveredLine}
            setHoveredLine={setPubHoveredLine}
          />
        )}
      </div>

      {/* Terminal Panel — always mounted, hidden via CSS grid */}
      <TerminalPanel
        papers={papers}
        chatPaper={chatPaper}
        setChatPaper={setChatPaper}
        onClose={() => setTerminalOpen(false)}
        visible={terminalOpen}
      />

      <StatusBar
        paperCount={papers.length}
        activeLine={activeLine}
        activeTab={activeEditorTab}
        terminalOpen={terminalOpen}
        onToggleTerminal={() => setTerminalOpen(prev => !prev)}
      />

      {commandPaletteOpen && (
        <CommandPalette files={virtualFS} onClose={() => setCommandPaletteOpen(false)} />
      )}
    </div>
  );
};
