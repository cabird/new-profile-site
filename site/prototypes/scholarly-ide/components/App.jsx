/* ─── Main App ─── */
const { useState, useEffect, useCallback, useMemo, useRef } = React;
const {
  TitleBar, ActivityBar, Sidebar, StatusBar,
  HomeView, PublicationsView, TagView, PaperView, TerminalPanel, CommandPalette,
  TabFileIcon, TabTagIcon, FileImgIcon, FileMdIcon, FileIconSvg,
  buildVirtualFS, parseTags, logEvent
} = IDE;

/* ─── Paper tab helpers ─── */
const isPaperTab = (tab) => tab && tab.startsWith('paper:');
const getPaperIdFromTab = (tab) => tab.slice(6);
const makePaperTabId = (paperId) => 'paper:' + paperId;

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
  const [chatPaper, setChatPaper] = useState(null);
  const [pubHoveredLine, setPubHoveredLine] = useState(null);

  // Paper markdown cache
  const [paperMarkdownById, setPaperMarkdownById] = useState({});
  const [paperLoadStateById, setPaperLoadStateById] = useState({});

  // CV markdown
  const [cvMarkdown, setCvMarkdown] = useState(null);
  const [cvLoadState, setCvLoadState] = useState(null);

  // Refs for stale-closure-safe access in fetchPaperMarkdown
  const markdownRef = useRef(paperMarkdownById);
  const loadStateRef = useRef(paperLoadStateById);
  useEffect(() => { markdownRef.current = paperMarkdownById; }, [paperMarkdownById]);
  useEffect(() => { loadStateRef.current = paperLoadStateById; }, [paperLoadStateById]);

  // Papers lookup map
  const papersById = useMemo(() => {
    const map = {};
    papers.forEach(p => { map[p.id] = p; });
    return map;
  }, [papers]);

  // Compute all unique tags from papers
  const allTags = useMemo(() => {
    const tagSet = new Set();
    papers.forEach(p => parseTags(p.tags).forEach(t => tagSet.add(t)));
    return [...tagSet].sort();
  }, [papers]);

  // Open a tab (add if not already open, switch to it)
  const openTab = useCallback((tab) => {
    setOpenTabs(prev => prev.includes(tab) ? prev : [...prev, tab]);
    setActiveEditorTab(tab);
    logEvent('tab', `Open: ${tab}`);
  }, []);

  // Trigger CV fetch when cv tab opens
  useEffect(() => {
    if (activeEditorTab === 'cv') fetchCvMarkdown();
  }, [activeEditorTab, fetchCvMarkdown]);

  // Close a tab
  const closeTab = useCallback((tab) => {
    setOpenTabs(prev => {
      const next = prev.filter(t => t !== tab);
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

  // Fetch CV markdown on first open
  const fetchCvMarkdown = useCallback(() => {
    if (cvMarkdown || (cvLoadState && cvLoadState.status === 'loading')) return;
    setCvLoadState({ status: 'loading', error: null });
    fetch('/cv/cv.md')
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.text(); })
      .then(text => { setCvMarkdown(text); setCvLoadState({ status: 'loaded', error: null }); })
      .catch(err => { setCvLoadState({ status: 'error', error: err.message }); });
  }, [cvMarkdown, cvLoadState]);

  // Open a tag tab
  const openTagTab = useCallback((tag) => {
    openTab('tag:' + tag);
  }, [openTab]);

  // Fetch paper markdown (reads cache via refs to avoid stale closures)
  const fetchPaperMarkdown = useCallback((paperId) => {
    if (markdownRef.current[paperId] || (loadStateRef.current[paperId] && loadStateRef.current[paperId].status === 'loading')) {
      return; // already cached or loading
    }
    setPaperLoadStateById(prev => ({ ...prev, [paperId]: { status: 'loading', error: null } }));
    fetch(`/api/papers/${paperId}/markdown`)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(data => {
        setPaperMarkdownById(prev => ({ ...prev, [paperId]: data.markdown }));
        setPaperLoadStateById(prev => ({ ...prev, [paperId]: { status: 'loaded', error: null, imageBase: data.image_base || null } }));
      })
      .catch(err => {
        setPaperLoadStateById(prev => ({ ...prev, [paperId]: { status: 'error', error: err.message } }));
      });
  }, []);

  // Open a paper as a file tab
  const openPaperTab = useCallback((paperId) => {
    const tabId = makePaperTabId(paperId);
    openTab(tabId);
    fetchPaperMarkdown(paperId);
  }, [openTab, fetchPaperMarkdown]);

  // Select paper by id — now opens paper tab instead of peek
  const selectPaper = useCallback((paperId) => {
    openPaperTab(paperId);
  }, [openPaperTab]);

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
      openPaperTab(openId);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [papers, openPaperTab]);

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

  // Helper: get short label for a paper tab
  const getPaperTabLabel = (paperId) => {
    const paper = papersById[paperId];
    if (!paper) return paperId + '.md';
    const title = paper.title || paperId;
    return title.length > 30 ? title.substring(0, 28) + '….md' : title + '.md';
  };

  // Helper: get tab display info for tab bar
  const getTabInfo = (tab) => {
    const staticInfo = {
      home: { label: 'home.md', icon: <TabFileIcon color="#3794ff" /> },
      publications: { label: 'publications.md', icon: <TabFileIcon color="#3794ff" /> },
      cv: { label: 'cv.md', icon: <TabFileIcon color="#3794ff" /> },
      profile: { label: 'profile.jpg', icon: <IDE.Codicon name="file-media" size={14} color="#a074c4" /> },
    };
    if (staticInfo[tab]) return staticInfo[tab];
    if (tab.startsWith('tag:')) {
      const tag = tab.slice(4);
      return { label: tag + '.md', icon: <TabTagIcon color="#4ec9b0" /> };
    }
    if (isPaperTab(tab)) {
      const paperId = getPaperIdFromTab(tab);
      return { label: getPaperTabLabel(paperId), icon: <TabFileIcon color="#e06c75" /> };
    }
    return { label: tab, icon: <TabFileIcon /> };
  };

  // Helper: get breadcrumb for active tab
  const getBreadcrumb = () => {
    if (!activeEditorTab) return null;
    if (activeEditorTab.startsWith('tag:')) {
      const tag = activeEditorTab.slice(4);
      return (
        <>
          <span style={{cursor:'default'}}>cbird-site</span>
          <span className="breadcrumb-sep">{'\u203A'}</span>
          <span>research_areas</span>
          <span className="breadcrumb-sep">{'\u203A'}</span>
          <span>{tag}.md</span>
        </>
      );
    }
    if (isPaperTab(activeEditorTab)) {
      const paperId = getPaperIdFromTab(activeEditorTab);
      return (
        <>
          <span style={{cursor:'default'}}>cbird-site</span>
          <span className="breadcrumb-sep">{'\u203A'}</span>
          <span>papers</span>
          <span className="breadcrumb-sep">{'\u203A'}</span>
          <span>{getPaperTabLabel(paperId)}</span>
        </>
      );
    }
    return (
      <>
        <span style={{cursor:'default'}}>cbird-site</span>
        <span className="breadcrumb-sep">{'\u203A'}</span>
        <span>{activeEditorTab === 'profile' ? 'profile.jpg' : activeEditorTab === 'publications' ? 'publications.md' : activeEditorTab === 'cv' ? 'cv.md' : 'home.md'}</span>
      </>
    );
  };

  // Compute active line for status bar
  const isTagTab = activeEditorTab && activeEditorTab.startsWith('tag:');
  const activeLine = activeEditorTab === 'publications' || isTagTab
    ? (pubHoveredLine || 1)
    : (homeClickedLine || homeActiveLine);

  if (error) return (
    <div className="vscode-shell">
      <TitleBar name="" activeTab={activeEditorTab} onCommandPalette={() => setCommandPaletteOpen(true)} papersById={papersById} />
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

  // Determine if active tab is a paper tab
  const activePaperTab = isPaperTab(activeEditorTab);
  const activePaperId = activePaperTab ? getPaperIdFromTab(activeEditorTab) : null;

  return (
    <div className={shellClasses}>
      <button className="hamburger" onClick={() => setMobileSidebar(!mobileSidebar)}>{'\u2630'}</button>
      {mobileSidebar && <div className="mobile-overlay open" onClick={() => setMobileSidebar(false)}></div>}

      <TitleBar name={siteData?.name} activeTab={activeEditorTab} onCommandPalette={() => { setCommandPaletteOpen(true); logEvent('command', 'Command Palette opened'); }} papersById={papersById} />
      <ActivityBar active={activeActivity} onSelect={handleActivitySelect} />
      <Sidebar siteData={siteData} activeTab={activeEditorTab} onSetTab={openTab} openTabs={openTabs} allTags={allTags} papersById={papersById} onOpenPaper={openPaperTab} />

      <div className="editor-area">
        {/* Tab Bar */}
        <div className="tabbar">
          {openTabs.map(tab => {
            const info = getTabInfo(tab);
            return (
              <div key={tab} className={`tab ${activeEditorTab === tab ? 'active' : ''}`} onClick={() => setActiveEditorTab(tab)} title={isPaperTab(tab) ? (papersById[getPaperIdFromTab(tab)]?.title || '') : ''}>
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
            {getBreadcrumb()}
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
            onSelectPaper={openPaperTab}
            onSelectTag={openTagTab}
          />
        )}

        {/* Publications View */}
        {activeEditorTab === 'publications' && (
          <PublicationsView
            papers={papers}
            onOpenPaper={openPaperTab}
            hoveredLine={pubHoveredLine}
            setHoveredLine={setPubHoveredLine}
          />
        )}

        {/* Tag Views */}
        {isTagTab && (
          <TagView
            papers={papers}
            tag={activeEditorTab.slice(4)}
            onOpenPaper={openPaperTab}
            hoveredLine={pubHoveredLine}
            setHoveredLine={setPubHoveredLine}
          />
        )}

        {/* CV View */}
        {activeEditorTab === 'cv' && (
          <PaperView
            paper={{ title: 'Curriculum Vitae — Christian Bird' }}
            markdown={cvMarkdown}
            loadState={cvLoadState}
            onRetry={() => { setCvMarkdown(null); setCvLoadState(null); fetchCvMarkdown(); }}
          />
        )}

        {/* Paper View */}
        {activePaperTab && (
          <PaperView
            paper={papersById[activePaperId]}
            markdown={paperMarkdownById[activePaperId]}
            loadState={paperLoadStateById[activePaperId]}
            imageBase={paperLoadStateById[activePaperId]?.imageBase}
            onRetry={() => {
              setPaperLoadStateById(prev => { const next = {...prev}; delete next[activePaperId]; return next; });
              setPaperMarkdownById(prev => { const next = {...prev}; delete next[activePaperId]; return next; });
              fetchPaperMarkdown(activePaperId);
            }}
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
