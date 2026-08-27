/* ─── Main App ─── */
const { useState, useEffect, useCallback, useMemo, useRef } = React;
const {
  TitleBar, ActivityBar, Sidebar, StatusBar,
  HomeView, PublicationsView, TagView, PaperView, TerminalPanel, ChatPanel, CommandPalette,
  TabFileIcon, TabTagIcon, FileImgIcon, FileMdIcon, FileIconSvg,
  buildVirtualFS, parseTags, logEvent
} = IDE;

/* ─── Paper tab helpers ─── */
const isPaperTab = (tab) => tab && tab.startsWith('paper:');
const getPaperIdFromTab = (tab) => tab.slice(6);
const makePaperTabId = (paperId) => 'paper:' + paperId;

const isBlogTab = (tab) => tab && tab.startsWith('blog:');
const getBlogSlugFromTab = (tab) => tab.slice(5);
const makeBlogTabId = (slug) => 'blog:' + slug;

/* URL routing helpers live in utils/routing.js (IDE.tabToPath, IDE.pathToTab). */
const tabToPath = (tab) => IDE.tabToPath(tab);
const pathToTab = (pathname) => IDE.pathToTab(pathname);

IDE.App = function App() {
  const [siteData, setSiteData] = useState(null);
  const [papers, setPapers] = useState([]);
  const [error, setError] = useState(null);
  const [activeActivity, setActiveActivity] = useState('explorer');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [lightTheme, setLightTheme] = useState(true);

  // Tab management
  const [openTabs, setOpenTabs] = useState(['home']);
  const [activeEditorTab, setActiveEditorTab] = useState('home');

  // Home view line state
  const [homeActiveLine, setHomeActiveLine] = useState(1);
  const [homeClickedLine, setHomeClickedLine] = useState(null);

  // Publications view state
  const [pubHoveredLine, setPubHoveredLine] = useState(null);

  // Chat panel state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatPaper, setChatPaper] = useState(null);

  // Paper markdown cache
  const [paperMarkdownById, setPaperMarkdownById] = useState({});
  const [paperLoadStateById, setPaperLoadStateById] = useState({});

  // CV markdown
  const [cvMarkdown, setCvMarkdown] = useState(null);
  const [cvLoadState, setCvLoadState] = useState(null);

  // Blog posts (index + per-post cache)
  const [blogPosts, setBlogPosts] = useState([]);
  const [blogMarkdownBySlug, setBlogMarkdownBySlug] = useState({});
  const [blogLoadStateBySlug, setBlogLoadStateBySlug] = useState({});

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

  // Open a tab (add if not already open, switch to it). Pushes a new browser history entry.
  const openTab = useCallback((tab) => {
    setOpenTabs(prev => prev.includes(tab) ? prev : [...prev, tab]);
    setActiveEditorTab(tab);
    const url = tabToPath(tab);
    if (window.location.pathname !== url) {
      window.history.pushState({ tab }, '', url);
    }
    logEvent('tab', `Open: ${tab}`);
  }, []);

  // Switch to an already-open tab (no add). Pushes history entry.
  const switchToTab = useCallback((tab) => {
    setActiveEditorTab(tab);
    const url = tabToPath(tab);
    if (window.location.pathname !== url) {
      window.history.pushState({ tab }, '', url);
    }
  }, []);

  // Trigger CV fetch when cv tab opens
  useEffect(() => {
    if (activeEditorTab === 'cv') fetchCvMarkdown();
  }, [activeEditorTab, fetchCvMarkdown]);

  // Trigger blog post fetch when a blog tab opens
  useEffect(() => {
    if (activeEditorTab && activeEditorTab.startsWith('blog:')) {
      fetchBlogPost(activeEditorTab.slice(5));
    }
  }, [activeEditorTab, fetchBlogPost]);

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
        // Sync URL to the new active tab (or home if no tabs left).
        // Use replaceState — closing a tab isn't a forward navigation.
        const url = tabToPath(newActive || 'home');
        if (window.location.pathname !== url) {
          window.history.replaceState({ tab: newActive || 'home' }, '', url);
        }
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
    fetch('/cv/cv_academic.md')
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.text(); })
      .then(text => { setCvMarkdown(text); setCvLoadState({ status: 'loaded', error: null }); })
      .catch(err => { setCvLoadState({ status: 'error', error: err.message }); });
  }, [cvMarkdown, cvLoadState]);

  // Blog: lookup by slug
  const blogPostsBySlug = useMemo(() => {
    const map = {};
    blogPosts.forEach(p => { map[p.slug] = p; });
    return map;
  }, [blogPosts]);

  // Fetch blog post markdown on demand
  const fetchBlogPost = useCallback((slug) => {
    if (blogMarkdownBySlug[slug]) return;
    if (blogLoadStateBySlug[slug] && blogLoadStateBySlug[slug].status === 'loading') return;
    setBlogLoadStateBySlug(prev => ({ ...prev, [slug]: { status: 'loading', error: null } }));
    fetch(`/api/blog/${slug}?v=${window.__v}`)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(data => {
        setBlogMarkdownBySlug(prev => ({ ...prev, [slug]: data.markdown }));
        setBlogLoadStateBySlug(prev => ({ ...prev, [slug]: { status: 'loaded', error: null, imageBase: data.image_base } }));
      })
      .catch(err => {
        setBlogLoadStateBySlug(prev => ({ ...prev, [slug]: { status: 'error', error: err.message } }));
      });
  }, [blogMarkdownBySlug, blogLoadStateBySlug]);

  // Open a blog post as a file tab
  const openBlogTab = useCallback((slug) => {
    const tabId = makeBlogTabId(slug);
    openTab(tabId);
    fetchBlogPost(slug);
  }, [openTab, fetchBlogPost]);

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
      fetch(`/site_data.json?v=${window.__v}`).then(r => r.json()),
      fetch(`/api/paper_data.json?v=${window.__v}`).then(r => r.json()),
      fetch(`/api/blog?v=${window.__v}`).then(r => r.json()).catch(() => ({ posts: [] })),
    ]).then(([site, paperData, blogData]) => {
      setSiteData(site);
      const list = Object.entries(paperData.papers || {}).map(([id, p]) => ({ id, ...p }));
      list.sort((a, b) => (b.year || 0) - (a.year || 0) || (a.priority || 50) - (b.priority || 50));
      setPapers(list);
      setBlogPosts(blogData.posts || []);
      logEvent('system', `Loaded ${list.length} papers from /api/paper_data.json`);
      logEvent('system', `Loaded ${(blogData.posts || []).length} blog posts`);
      logEvent('system', `Site data loaded: ${site.name}`);
    }).catch(e => { setError('Failed to load data'); logEvent('error', 'Failed to load data'); });
  }, []);

  // Handle initial URL on mount: open the tab corresponding to the current path
  const didInitRoute = useRef(false);
  useEffect(() => {
    if (didInitRoute.current) return;

    const params = new URLSearchParams(window.location.search);
    const openId = params.get('open');
    const initialTab = openId ? makePaperTabId(openId) : pathToTab(window.location.pathname);

    // Only block on paper data if the initial route actually needs it
    const needsPapers = !!openId || initialTab.startsWith('paper:');
    if (needsPapers && papers.length === 0) return;

    didInitRoute.current = true;

    if (openId) {
      openPaperTab(openId);
      const cleanUrl = tabToPath(makePaperTabId(openId));
      window.history.replaceState({ tab: makePaperTabId(openId) }, '', cleanUrl);
      return;
    }

    if (initialTab && initialTab !== 'home') {
      // Add to open tabs and make active without pushing a new history entry
      setOpenTabs(prev => prev.includes(initialTab) ? prev : [...prev, initialTab]);
      setActiveEditorTab(initialTab);
      // Trigger lazy fetches if applicable
      if (initialTab.startsWith('paper:')) fetchPaperMarkdown(initialTab.slice(6));
      if (initialTab.startsWith('blog:')) fetchBlogPost(initialTab.slice(5));
      if (initialTab === 'cv') fetchCvMarkdown();
      window.history.replaceState({ tab: initialTab }, '', tabToPath(initialTab));
    } else {
      window.history.replaceState({ tab: 'home' }, '', tabToPath('home'));
    }
  }, [papers, openPaperTab, fetchPaperMarkdown, fetchBlogPost, fetchCvMarkdown]);

  // Update document.title when active tab changes
  useEffect(() => {
    const base = 'Christian Bird';
    let title = base;
    if (!activeEditorTab || activeEditorTab === 'home') title = base;
    else if (activeEditorTab === 'publications') title = `Publications — ${base}`;
    else if (activeEditorTab === 'honors') title = `Honors — ${base}`;
    else if (activeEditorTab === 'cv') title = `CV — ${base}`;
    else if (activeEditorTab === 'posts') title = `Posts — ${base}`;
    else if (activeEditorTab === 'profile') title = `Profile — ${base}`;
    else if (activeEditorTab.startsWith('paper:')) {
      const p = papersById[activeEditorTab.slice(6)];
      title = (p?.title ? p.title + ' — ' : '') + base;
    } else if (activeEditorTab.startsWith('blog:')) {
      const p = blogPostsBySlug[activeEditorTab.slice(5)];
      title = (p?.title ? p.title + ' — ' : '') + base;
    } else if (activeEditorTab.startsWith('tag:')) {
      title = activeEditorTab.slice(4) + ' — ' + base;
    }
    document.title = title;
  }, [activeEditorTab, papersById, blogPostsBySlug]);

  // Browser back/forward: update active tab based on URL
  useEffect(() => {
    const onPop = () => {
      const tab = pathToTab(window.location.pathname);
      // If the URL doesn't match the canonical form for this tab, fix it up
      const canonical = tabToPath(tab);
      if (window.location.pathname !== canonical) {
        window.history.replaceState({ tab }, '', canonical);
      }
      setOpenTabs(prev => prev.includes(tab) ? prev : [...prev, tab]);
      setActiveEditorTab(tab);
      // Lazy fetch if needed
      if (tab.startsWith('paper:')) fetchPaperMarkdown(tab.slice(6));
      if (tab.startsWith('blog:')) fetchBlogPost(tab.slice(5));
      if (tab === 'cv') fetchCvMarkdown();
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [fetchPaperMarkdown, fetchBlogPost, fetchCvMarkdown]);

  // Sync terminal height CSS variable
  useEffect(() => {
    const shell = document.querySelector('.vscode-shell');
    if (shell) {
      shell.style.setProperty('--terminal-current-h', terminalOpen ? '250px' : '0px');
    }
  }, [terminalOpen]);

  // Sync chat panel width CSS variable
  useEffect(() => {
    const shell = document.querySelector('.vscode-shell');
    if (shell) {
      shell.style.setProperty('--chatpanel-w', chatOpen ? '340px' : '0px');
    }
  }, [chatOpen]);

  // Open chat for a paper
  const openChatForPaper = useCallback((paper) => {
    setChatPaper(paper);
    setChatOpen(true);
    logEvent('chat', `Chat opened: ${paper.title}`);
  }, []);

  // Open chat for a blog post — passes a blog target to ChatPanel
  const openChatForBlogPost = useCallback((post) => {
    setChatPaper({ kind: 'blog', id: post.slug, title: post.title });
    setChatOpen(true);
    logEvent('chat', `Chat opened: ${post.title}`);
  }, []);

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
    if (id === 'chat') {
      setChatOpen(prev => !prev);
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
      honors: { label: 'honors.md', icon: <TabFileIcon color="#3794ff" /> },
      cv: { label: 'cv.md', icon: <TabFileIcon color="#3794ff" /> },
      posts: { label: 'posts.md', icon: <TabFileIcon color="#3794ff" /> },
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
    if (isBlogTab(tab)) {
      const slug = getBlogSlugFromTab(tab);
      const post = blogPostsBySlug[slug];
      const name = (post && post.filename) ? post.filename : (post ? post.title : slug);
      const label = name.length > 30 ? name.substring(0, 28) + '….md' : name + '.md';
      return { label, icon: <TabFileIcon color="#dcb67a" /> };
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
    if (isBlogTab(activeEditorTab)) {
      const slug = getBlogSlugFromTab(activeEditorTab);
      const post = blogPostsBySlug[slug];
      const name = (post && post.filename) ? post.filename : (post ? post.title : slug);
      const label = name.length > 30 ? name.substring(0, 28) + '….md' : name + '.md';
      return (
        <>
          <span style={{cursor:'default'}}>cbird-site</span>
          <span className="breadcrumb-sep">{'\u203A'}</span>
          <span>posts</span>
          <span className="breadcrumb-sep">{'\u203A'}</span>
          <span>{label}</span>
        </>
      );
    }
    const staticBreadcrumb = {
      profile: 'profile.jpg',
      publications: 'publications.md',
      honors: 'honors.md',
      cv: 'cv.md',
      posts: 'posts.md',
    };
    return (
      <>
        <span style={{cursor:'default'}}>cbird-site</span>
        <span className="breadcrumb-sep">{'\u203A'}</span>
        <span>{staticBreadcrumb[activeEditorTab] || 'home.md'}</span>
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
    lightTheme ? 'light-theme' : '',
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
      <Sidebar siteData={siteData} activeTab={activeEditorTab} onSetTab={openTab} openTabs={openTabs} allTags={allTags} papersById={papersById} blogPostsBySlug={blogPostsBySlug} blogPosts={blogPosts} onOpenPaper={openPaperTab} onOpenBlogPost={openBlogTab} />

      <div className="editor-area">
        {/* Tab Bar */}
        <div className="tabbar">
          {openTabs.map(tab => {
            const info = getTabInfo(tab);
            return (
              <div key={tab} className={`tab ${activeEditorTab === tab ? 'active' : ''}`} onClick={() => switchToTab(tab)} title={isPaperTab(tab) ? (papersById[getPaperIdFromTab(tab)]?.title || '') : ''}>
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
            <div className="welcome-title">Research IDE</div>
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
              profile.jpg
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
            onNavigateHonors={() => openTab('honors')}
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

        {/* Honors View */}
        {activeEditorTab === 'honors' && IDE.HonorsView && (
          <IDE.HonorsView siteData={siteData} papersById={papersById} onSelectPaper={openPaperTab} />
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

        {/* Blog index */}
        {activeEditorTab === 'posts' && IDE.BlogListView && (
          <IDE.BlogListView
            posts={blogPosts}
            onOpenPost={openBlogTab}
          />
        )}

        {/* Blog post */}
        {isBlogTab(activeEditorTab) && (() => {
          const slug = getBlogSlugFromTab(activeEditorTab);
          const post = blogPostsBySlug[slug];
          const state = blogLoadStateBySlug[slug];
          return (
            <PaperView
              kind="blog"
              paper={post ? {
                title: post.title,
                subtitle: post.subtitle,
                authors: post.authors || '',
                year: post.date,
                venue: post.tags && post.tags.length ? post.tags.join(' · ') : ''
              } : { title: slug }}
              markdown={blogMarkdownBySlug[slug]}
              loadState={state}
              imageBase={state?.imageBase}
              onChat={post ? () => openChatForBlogPost(post) : null}
              onRetry={() => {
                setBlogMarkdownBySlug(prev => { const next = {...prev}; delete next[slug]; return next; });
                setBlogLoadStateBySlug(prev => { const next = {...prev}; delete next[slug]; return next; });
                fetchBlogPost(slug);
              }}
            />
          );
        })()}

        {/* Paper View */}
        {activePaperTab && (
          <PaperView
            paper={papersById[activePaperId]}
            markdown={paperMarkdownById[activePaperId]}
            loadState={paperLoadStateById[activePaperId]}
            imageBase={paperLoadStateById[activePaperId]?.imageBase}
            onChat={openChatForPaper}
            onRetry={() => {
              setPaperLoadStateById(prev => { const next = {...prev}; delete next[activePaperId]; return next; });
              setPaperMarkdownById(prev => { const next = {...prev}; delete next[activePaperId]; return next; });
              fetchPaperMarkdown(activePaperId);
            }}
          />
        )}
      </div>

      {/* Chat Panel — right sidebar */}
      <ChatPanel
        paper={chatPaper}
        onClose={() => setChatOpen(false)}
        visible={chatOpen}
      />

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
        warningCount={papers.filter(p => !p.doi || !p.mapped_pdf).length}
        activeLine={activeLine}
        activeTab={activeEditorTab}
        terminalOpen={terminalOpen}
        onToggleTerminal={() => setTerminalOpen(prev => !prev)}
        lightTheme={lightTheme}
        onToggleTheme={() => setLightTheme(prev => !prev)}
      />

      {commandPaletteOpen && (
        <CommandPalette files={virtualFS} onClose={() => setCommandPaletteOpen(false)} />
      )}
    </div>
  );
};
