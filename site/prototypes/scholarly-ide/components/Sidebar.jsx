/* ─── Sidebar ─── */
const { useState } = React;
const { FileMdIcon, FileIconSvg, FilePdfIcon, FolderIcon, LinkIcon, MailIcon, ChartIcon } = IDE;

IDE.Sidebar = function Sidebar({ siteData, activeTab, onSetTab, openTabs }) {
  const [openSections, setOpenSections] = useState({ editors: true, project: true });
  const [openSubSections, setOpenSubSections] = useState({});

  const toggleSection = (key) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleSub = (key) => {
    setOpenSubSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const contact = siteData?.contact;

  return (
    <nav className="sidebar">
      <div className="sidebar-title">Explorer</div>
      <div className="sidebar-content">
        {/* Open Editors */}
        <div className="tree-section">
          <div className="tree-section-header" onClick={() => toggleSection('editors')}>
            <span className={`tree-chevron ${openSections.editors ? 'open' : ''}`}>{'\u25B8'}</span>
            Open Editors
          </div>
          <div className={`tree-section-body ${openSections.editors ? 'open' : ''}`}>
            {(openTabs || []).map(tab => {
              const info = {
                home: { label: 'home.md', icon: <FileMdIcon /> },
                publications: { label: 'publications.md', icon: <FileMdIcon /> },
                profile: { label: 'profile.jpg', icon: <FileIconSvg color="#a074c4" /> },
              };
              const t = info[tab] || { label: tab, icon: <FileMdIcon /> };
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
            {siteData?.cv_link && (
              <a href={siteData.cv_link} target="_blank" rel="noopener" className="tree-item">
                <span className="tree-item-icon file-pdf"><FilePdfIcon /></span>
                <span className="tree-item-label">cv.pdf</span>
              </a>
            )}
            <div className="tree-item" style={{cursor:'pointer'}} onClick={() => onSetTab('profile')}>
              <span className="tree-item-icon"><FileIconSvg color="#a074c4" /></span>
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

            {/* Research areas folder */}
            {siteData?.research_areas?.length > 0 && (
              <>
                <div className="tree-item" onClick={() => toggleSub('research')} style={{cursor:'pointer'}}>
                  <span className="tree-item-icon folder"><FolderIcon open={openSubSections.research} /></span>
                  <span className="tree-item-label">research_areas/</span>
                </div>
                {openSubSections.research && siteData.research_areas.map((area, i) => (
                  <div key={i} className="tree-item tree-sub-item" style={{cursor:'default'}}>
                    <span className="tree-item-icon file-chart"><ChartIcon /></span>
                    <span className="tree-item-label">{area.title}</span>
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
