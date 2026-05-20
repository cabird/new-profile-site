/* ─── Sidebar ─── */
const { useState, useCallback } = React;
const { FileMdIcon, FileIconSvg, FilePdfIcon, FolderIcon, LinkIcon, MailIcon, TagIcon } = IDE;

IDE.Sidebar = function Sidebar({ siteData, activeTab, onSetTab, openTabs, allTags, papersById, blogPostsBySlug, blogPosts, onOpenPaper, onOpenBlogPost }) {
  const [openSections, setOpenSections] = useState({ editors: true, project: true });
  const [openSubSections, setOpenSubSections] = useState({});

  const handleResizeStart = useCallback((e) => {
    e.preventDefault();
    const startX = e.clientX;
    const shell = document.querySelector('.vscode-shell');
    const startWidth = parseInt(getComputedStyle(shell).getPropertyValue('--sidebar-w')) || 250;
    const onMove = (ev) => {
      const newWidth = Math.max(140, Math.min(startWidth + (ev.clientX - startX), 500));
      shell.style.setProperty('--sidebar-w', newWidth + 'px');
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

  const toggleSection = (key) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleSub = (key) => {
    setOpenSubSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const contact = siteData?.contact;

  // Helper to get tab display info
  const getTabInfo = (tab) => {
    const staticInfo = {
      home: { label: 'home.md', icon: <FileMdIcon /> },
      publications: { label: 'publications.md', icon: <FileMdIcon /> },
      cv: { label: 'cv.md', icon: <FileMdIcon /> },
      posts: { label: 'posts.md', icon: <FileMdIcon /> },
      profile: { label: 'profile.jpg', icon: <IDE.Codicon name="file-media" size={16} color="#a074c4" /> },
    };
    if (staticInfo[tab]) return staticInfo[tab];
    if (tab.startsWith('tag:')) {
      const tag = tab.slice(4);
      return { label: tag + '.md', icon: <TagIcon /> };
    }
    if (tab.startsWith('paper:') && papersById) {
      const paperId = tab.slice(6);
      const paper = papersById[paperId];
      const title = paper ? paper.title : paperId;
      const label = title.length > 24 ? title.substring(0, 22) + '….md' : title + '.md';
      return { label, icon: <FileMdIcon /> };
    }
    if (tab.startsWith('blog:') && blogPostsBySlug) {
      const slug = tab.slice(5);
      const post = blogPostsBySlug[slug];
      const name = (post && post.filename) ? post.filename : (post ? post.title : slug);
      const label = name.length > 24 ? name.substring(0, 22) + '….md' : name + '.md';
      return { label, icon: <FileMdIcon /> };
    }
    return { label: tab, icon: <FileMdIcon /> };
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-title">Explorer</div>
      <div className="sidebar-resize-handle" onMouseDown={handleResizeStart}></div>
      <div className="sidebar-content">
        {/* Open Editors */}
        <div className="tree-section">
          <div className="tree-section-header" onClick={() => toggleSection('editors')}>
            <span className={`tree-chevron ${openSections.editors ? 'open' : ''}`}>{'\u25B8'}</span>
            Open Editors
          </div>
          <div className={`tree-section-body ${openSections.editors ? 'open' : ''}`}>
            {(openTabs || []).map(tab => {
              const t = getTabInfo(tab);
              return (
                <div key={tab} className={`tree-item ${activeTab === tab ? 'active' : ''}`} style={{cursor:'pointer'}} onClick={() => onSetTab(tab)}>
                  <span className="tree-item-icon file-md">{t.icon}</span>
                  <span className="tree-item-label">{t.label}</span>
                </div>
              );
            })}
            {(!openTabs || openTabs.length === 0) && (
              <div className="tree-item" style={{color:'#858585', fontSize: 12}}>
                <span className="tree-item-label">No open editors</span>
              </div>
            )}
          </div>
        </div>

        {/* Project Tree */}
        <div className="tree-section">
          <div className="tree-section-header" onClick={() => toggleSection('project')}>
            <span className={`tree-chevron ${openSections.project ? 'open' : ''}`}>{'\u25B8'}</span>
            CBIRD-SITE
          </div>
          <div className={`tree-section-body ${openSections.project ? 'open' : ''}`}>
            <div className={`tree-item ${activeTab === 'home' ? 'active' : ''}`} style={{cursor:'pointer'}} onClick={() => onSetTab('home')}>
              <span className="tree-item-icon file-md"><FileMdIcon /></span>
              <span className="tree-item-label">home.md</span>
            </div>
            <div className={`tree-item ${activeTab === 'publications' ? 'active' : ''}`} style={{cursor:'pointer'}} onClick={() => onSetTab('publications')}>
              <span className="tree-item-icon file-md"><FileMdIcon /></span>
              <span className="tree-item-label">publications.md</span>
            </div>
            <div className={`tree-item ${activeTab === 'cv' ? 'active' : ''}`} style={{cursor:'pointer'}} onClick={() => onSetTab('cv')}>
              <span className="tree-item-icon file-md"><FileMdIcon /></span>
              <span className="tree-item-label">cv.md</span>
            </div>
            <div className={`tree-item ${activeTab === 'posts' ? 'active' : ''}`} style={{cursor:'pointer'}} onClick={() => onSetTab('posts')}>
              <span className="tree-item-icon file-md"><FileMdIcon /></span>
              <span className="tree-item-label">posts.md</span>
            </div>
            <div className="tree-item" style={{cursor:'pointer'}} onClick={() => onSetTab('profile')}>
              <span className="tree-item-icon"><IDE.Codicon name="file-media" size={16} color="#a074c4" /></span>
              <span className="tree-item-label">profile.jpg</span>
            </div>

            {/* Contact folder */}
            <div className="tree-item" onClick={() => toggleSub('contact')} style={{cursor:'pointer'}}>
              <span className="tree-item-icon folder"><FolderIcon open={openSubSections.contact} /></span>
              <span className="tree-item-label">contact/</span>
            </div>
            {openSubSections.contact && contact && (
              <>
                {contact.email && (
                  <a href={`mailto:${contact.email}`} className="tree-item tree-sub-item">
                    <span className="tree-item-icon file-mail"><MailIcon /></span>
                    <span className="tree-item-label">{contact.email}</span>
                  </a>
                )}
                {contact.links?.map((l, i) => (
                  <a key={i} href={l.url} target="_blank" rel="noopener" className="tree-item tree-sub-item">
                    <span className="tree-item-icon file-link"><LinkIcon /></span>
                    <span className="tree-item-label">{l.label}</span>
                  </a>
                ))}
              </>
            )}

            {/* Posts folder — shows recent blog posts */}
            {blogPosts && blogPosts.length > 0 && (
              <>
                <div className="tree-item" onClick={() => toggleSub('posts')} style={{cursor:'pointer'}}>
                  <span className="tree-item-icon folder"><FolderIcon open={openSubSections.posts} /></span>
                  <span className="tree-item-label">posts/</span>
                </div>
                {openSubSections.posts && blogPosts.slice(0, 10).map((post) => {
                  const tabId = 'blog:' + post.slug;
                  const name = post.filename || post.title || post.slug;
                  const label = name.length > 22 ? name.substring(0, 20) + '….md' : name + '.md';
                  return (
                    <div key={post.slug} className={`tree-item tree-sub-item ${activeTab === tabId ? 'active' : ''}`} style={{cursor:'pointer'}} onClick={() => onOpenBlogPost && onOpenBlogPost(post.slug)}>
                      <span className="tree-item-icon file-md"><FileMdIcon /></span>
                      <span className="tree-item-label">{label}</span>
                    </div>
                  );
                })}
              </>
            )}

            {/* Research areas folder — shows all unique tags from papers */}
            {allTags && allTags.length > 0 && (
              <>
                <div className="tree-item" onClick={() => toggleSub('research')} style={{cursor:'pointer'}}>
                  <span className="tree-item-icon folder"><FolderIcon open={openSubSections.research} /></span>
                  <span className="tree-item-label">research_areas/</span>
                </div>
                {openSubSections.research && allTags.map((tag, i) => (
                  <div key={i} className={`tree-item tree-sub-item ${activeTab === 'tag:' + tag ? 'active' : ''}`} style={{cursor:'pointer'}} onClick={() => onSetTab('tag:' + tag)}>
                    <span className="tree-item-icon file-chart"><TagIcon /></span>
                    <span className="tree-item-label">{tag}.md</span>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
