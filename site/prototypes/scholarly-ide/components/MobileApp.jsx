/* ─── Mobile App Shell ─── */
const { useState: useStateM, useEffect: useEffectM, useMemo: useMemoM, useCallback: useCallbackM, useRef: useRefM } = React;
const { logEvent: logEventM, parseTags: parseTagsM } = IDE;

/* ─── Markdown rendering helper (mirrors PaperView but cleaner for mobile) ─── */
const renderMobileMarkdown = (markdown, imageBase) => {
  if (!markdown) return '';
  try {
    const md = window.markdownit({ html: true, linkify: true, typographer: true });
    let raw = md.render(markdown);
    if (imageBase) {
      raw = raw.replace(/src="(?!https?:\/\/|\/)(.*?)"/g, `src="${imageBase}/$1"`);
    }
    if (window.DOMPurify) {
      return DOMPurify.sanitize(raw, { ADD_TAGS: ['img'], ADD_ATTR: ['src', 'alt'] });
    }
    return raw;
  } catch (e) {
    return '<p style="color:#d32f2f">Failed to render content</p>';
  }
};

/* ─── Mobile Header ─── */
IDE.MobileHeader = function MobileHeader({ navigateTo, currentTab }) {
  const items = [
    { tab: 'home', label: 'Home' },
    { tab: 'posts', label: 'Posts' },
    { tab: 'publications', label: 'Publications' },
    { tab: 'honors', label: 'Honors' },
    { tab: 'cv', label: 'CV' },
  ];
  const isActive = (tab) => {
    if (currentTab === tab) return true;
    if (tab === 'posts' && currentTab && currentTab.startsWith('blog:')) return true;
    if (tab === 'publications' && currentTab && currentTab.startsWith('paper:')) return true;
    return false;
  };
  return (
    <header className="mob-header">
      <button type="button" className="mob-brand" onClick={() => navigateTo('home')}>Christian Bird</button>
      <nav className="mob-nav">
        {items.map(item => {
          const active = isActive(item.tab);
          return (
            <button
              key={item.tab}
              type="button"
              className={`mob-nav-link ${active ? 'active' : ''}`}
              onClick={() => navigateTo(item.tab)}
              aria-current={active ? 'page' : undefined}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
};

/* ─── Mobile Home ─── */
IDE.MobileHome = function MobileHome({ siteData }) {
  if (!siteData) return <div className="mob-loading">Loading…</div>;
  const aboutParagraphs = (siteData.about || siteData.bio || '').split('\n\n').filter(Boolean);
  return (
    <article className="mob-article">
      <h1>{siteData.name}</h1>
      <div className="mob-subtitle">{[siteData.distinction?.label, [siteData.title, siteData.affiliation].filter(Boolean).join(', ')].filter(Boolean).join(' \u00b7 ')}</div>
      {aboutParagraphs.map((p, i) => <p key={i}>{p}</p>)}
    </article>
  );
};

/* ─── Mobile Honors ─── */
IDE.MobileHonors = function MobileHonors({ siteData, papersById, navigateToPaper }) {
  if (!siteData) return <div className="mob-loading">Loading…</div>;
  const groups = siteData.honors || [];
  return (
    <article className="mob-article">
      <h1>Honors and Recognition</h1>
      {siteData.distinction && <div className="mob-subtitle">{siteData.distinction.label} ({siteData.distinction.year})</div>}
      {groups.map(g => (
        <section key={g.key || g.group} className="mob-honor-group">
          <h2>{g.group}</h2>
          {g.desc && <p className="mob-list-meta">{g.desc}</p>}
          <ul className="mob-list">
            {(g.items || []).map((item, i) => {
              const paper = item.paper_id ? papersById?.[item.paper_id] : null;
              const body = (
                <>
                  <div className="mob-list-meta-year">{item.year}</div>
                  <div className="mob-list-title">{item.title}</div>
                  {item.org && <div className="mob-list-subtitle">{item.org}</div>}
                  {paper && <div className="mob-list-meta">for “{paper.title}”</div>}
                </>
              );
              return (
                <li key={i} className="mob-list-item">
                  {paper && navigateToPaper
                    ? <button type="button" className="mob-list-hit" onClick={() => navigateToPaper(paper.id)}>{body}</button>
                    : <div className="mob-list-hit mob-list-static">{body}</div>}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </article>
  );
};

/* ─── Mobile Posts List ─── */
IDE.MobilePostsList = function MobilePostsList({ posts, navigateToPost }) {
  if (!posts) return <div className="mob-loading">Loading…</div>;
  if (posts.length === 0) {
    return (
      <article className="mob-article">
        <h1>Posts</h1>
        <p>No posts yet.</p>
      </article>
    );
  }
  return (
    <article className="mob-article">
      <h1>Posts</h1>
      <ul className="mob-list">
        {posts.map(post => (
          <li key={post.slug} className="mob-list-item">
            <button type="button" className="mob-list-hit" onClick={() => navigateToPost(post.slug)}>
              <div className="mob-list-title">{post.title}</div>
              {post.subtitle && <div className="mob-list-subtitle">{post.subtitle}</div>}
              {post.authors && <div className="mob-list-meta">{post.authors}</div>}
              <div className="mob-list-meta">
                {post.date}
                {post.tags && post.tags.length > 0 && ' · ' + post.tags.join(' · ')}
              </div>
              {post.description && <div className="mob-list-desc">{post.description}</div>}
            </button>
          </li>
        ))}
      </ul>
    </article>
  );
};

/* ─── Mobile Post Detail ─── */
IDE.MobilePostDetail = function MobilePostDetail({ post, markdown, loadState, imageBase }) {
  const html = useMemoM(() => renderMobileMarkdown(markdown, imageBase), [markdown, imageBase]);

  if (!loadState || loadState.status === 'loading') {
    return <div className="mob-loading">Loading post…</div>;
  }
  if (loadState.status === 'error') {
    return <div className="mob-error">Failed to load post: {loadState.error}</div>;
  }
  return (
    <article className="mob-article">
      <h1>{post?.title || 'Post'}</h1>
      {post?.subtitle && <div className="mob-subtitle mob-subtitle-italic">{post.subtitle}</div>}
      {post?.authors && <div className="mob-subtitle">{post.authors}</div>}
      <div className="mob-meta">
        {post?.date}
        {post?.tags && post.tags.length > 0 && ' · ' + post.tags.join(' · ')}
      </div>
      <div className="mob-prose" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
};

/* ─── Mobile Publications List ─── */
IDE.MobilePublicationsList = function MobilePublicationsList({ papers, navigateToPaper }) {
  if (!papers) return <div className="mob-loading">Loading…</div>;
  return (
    <article className="mob-article">
      <h1>Publications</h1>
      <ul className="mob-list">
        {papers.map(paper => (
          <li key={paper.id} className="mob-list-item">
            <button type="button" className="mob-list-hit" onClick={() => navigateToPaper(paper.id)}>
              <div className="mob-list-meta-year">{paper.year || '—'}</div>
              <div className="mob-list-title">{paper.title}</div>
              {Array.isArray(paper.awards) && paper.awards.length > 0 && (
                <div className="mob-award">{'\u2605'} {paper.awards.join(' \u00b7 ')}</div>
              )}
              {(paper.venue || paper.journal) && (
                <div className="mob-list-subtitle">{paper.venue || paper.journal}</div>
              )}
              {paper.authors && <div className="mob-list-meta">{paper.authors}</div>}
            </button>
          </li>
        ))}
      </ul>
    </article>
  );
};

/* ─── Mobile Paper Detail ─── */
IDE.MobilePaperDetail = function MobilePaperDetail({ paper, markdown, loadState, imageBase }) {
  const html = useMemoM(() => renderMobileMarkdown(markdown, imageBase), [markdown, imageBase]);

  if (!loadState || loadState.status === 'loading') {
    return <div className="mob-loading">Loading paper…</div>;
  }
  if (loadState.status === 'error') {
    return <div className="mob-error">Failed to load paper: {loadState.error}</div>;
  }
  return (
    <article className="mob-article">
      <h1>{paper?.title || 'Paper'}</h1>
      {(paper?.venue || paper?.journal) && (
        <div className="mob-subtitle">{paper.venue || paper.journal}{paper?.year ? `, ${paper.year}` : ''}</div>
      )}
      {paper?.authors && <div className="mob-meta">{paper.authors}</div>}
      {paper?.doi && (
        <div className="mob-actions">
          <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener" className="mob-btn">DOI</a>
        </div>
      )}
      <div className="mob-prose" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
};

/* ─── Mobile CV ─── */
IDE.MobileCV = function MobileCV({ markdown, loadState }) {
  const html = useMemoM(() => renderMobileMarkdown(markdown), [markdown]);
  if (!loadState || loadState.status === 'loading') {
    return <div className="mob-loading">Loading CV…</div>;
  }
  if (loadState.status === 'error') {
    return <div className="mob-error">Failed to load CV: {loadState.error}</div>;
  }
  return (
    <article className="mob-article">
      <div className="mob-prose" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
};

/* ─── Mobile App (top-level) ─── */
IDE.MobileApp = function MobileApp() {
  const [siteData, setSiteData] = useStateM(null);
  const [papers, setPapers] = useStateM([]);
  const [blogPosts, setBlogPosts] = useStateM([]);
  const [loadError, setLoadError] = useStateM(null);

  // Initial tab — also resolve legacy ?open=paperid query param
  const [currentTab, setCurrentTab] = useStateM(() => {
    const params = new URLSearchParams(window.location.search);
    const openId = params.get('open');
    if (openId) return 'paper:' + openId;
    return IDE.pathToTab(window.location.pathname);
  });

  // Markdown caches (state) + refs for stale-closure-safe reads
  const [paperMd, setPaperMd] = useStateM({});       // id -> markdown
  const [paperState, setPaperState] = useStateM({}); // id -> { status, imageBase, error }
  const [blogMd, setBlogMd] = useStateM({});
  const [blogState, setBlogState] = useStateM({});
  const [cvMd, setCvMd] = useStateM(null);
  const [cvState, setCvState] = useStateM(null);

  const paperMdRef = useRefM(paperMd);
  const paperStateRef = useRefM(paperState);
  const blogMdRef = useRefM(blogMd);
  const blogStateRef = useRefM(blogState);
  const cvMdRef = useRefM(cvMd);
  const cvStateRef = useRefM(cvState);
  useEffectM(() => { paperMdRef.current = paperMd; }, [paperMd]);
  useEffectM(() => { paperStateRef.current = paperState; }, [paperState]);
  useEffectM(() => { blogMdRef.current = blogMd; }, [blogMd]);
  useEffectM(() => { blogStateRef.current = blogState; }, [blogState]);
  useEffectM(() => { cvMdRef.current = cvMd; }, [cvMd]);
  useEffectM(() => { cvStateRef.current = cvState; }, [cvState]);

  // Load core data
  useEffectM(() => {
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
    }).catch(e => {
      setLoadError('Failed to load site data. Please refresh.');
      logEventM('error', 'Failed to load data');
    });
  }, []);

  // Seed history.state and canonicalize the URL on first mount
  useEffectM(() => {
    const params = new URLSearchParams(window.location.search);
    const openId = params.get('open');
    const tab = openId ? 'paper:' + openId : IDE.pathToTab(window.location.pathname);
    const canonical = IDE.tabToPath(tab);
    window.history.replaceState({ tab }, '', canonical);
  }, []);

  // Mark body as mobile-active so CSS can override desktop body overflow
  useEffectM(() => {
    document.body.classList.add('mobile-active');
    return () => { document.body.classList.remove('mobile-active'); };
  }, []);

  // Lookup maps
  const papersById = useMemoM(() => {
    const m = {};
    papers.forEach(p => { m[p.id] = p; });
    return m;
  }, [papers]);

  const blogPostsBySlug = useMemoM(() => {
    const m = {};
    blogPosts.forEach(p => { m[p.slug] = p; });
    return m;
  }, [blogPosts]);

  // Document title
  useEffectM(() => {
    const base = 'Christian Bird';
    let title = base;
    if (currentTab === 'publications') title = `Publications — ${base}`;
    else if (currentTab === 'honors') title = `Honors — ${base}`;
    else if (currentTab === 'cv') title = `CV — ${base}`;
    else if (currentTab === 'posts') title = `Posts — ${base}`;
    else if (currentTab.startsWith('paper:')) {
      const p = papersById[currentTab.slice(6)];
      title = (p?.title ? p.title + ' — ' : '') + base;
    } else if (currentTab.startsWith('blog:')) {
      const p = blogPostsBySlug[currentTab.slice(5)];
      title = (p?.title ? p.title + ' — ' : '') + base;
    }
    document.title = title;
  }, [currentTab, papersById, blogPostsBySlug]);

  // Lazy fetchers — guards read from refs so the callbacks are stable and don't churn
  const fetchPaper = useCallbackM((id) => {
    if (paperMdRef.current[id]) return;
    const s = paperStateRef.current[id];
    if (s && s.status === 'loading') return;
    setPaperState(prev => ({ ...prev, [id]: { status: 'loading' } }));
    fetch(`/api/papers/${encodeURIComponent(id)}/markdown`)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(data => {
        setPaperMd(prev => ({ ...prev, [id]: data.markdown }));
        setPaperState(prev => ({ ...prev, [id]: { status: 'loaded', imageBase: data.image_base } }));
      })
      .catch(err => setPaperState(prev => ({ ...prev, [id]: { status: 'error', error: err.message } })));
  }, []);

  const fetchBlog = useCallbackM((slug) => {
    if (blogMdRef.current[slug]) return;
    const s = blogStateRef.current[slug];
    if (s && s.status === 'loading') return;
    setBlogState(prev => ({ ...prev, [slug]: { status: 'loading' } }));
    fetch(`/api/blog/${encodeURIComponent(slug)}?v=${window.__v}`)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(data => {
        setBlogMd(prev => ({ ...prev, [slug]: data.markdown }));
        setBlogState(prev => ({ ...prev, [slug]: { status: 'loaded', imageBase: data.image_base } }));
      })
      .catch(err => setBlogState(prev => ({ ...prev, [slug]: { status: 'error', error: err.message } })));
  }, []);

  const fetchCv = useCallbackM(() => {
    if (cvMdRef.current) return;
    const s = cvStateRef.current;
    if (s && s.status === 'loading') return;
    setCvState({ status: 'loading' });
    fetch('/cv/cv_academic.md')
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.text(); })
      .then(text => { setCvMd(text); setCvState({ status: 'loaded' }); })
      .catch(err => setCvState({ status: 'error', error: err.message }));
  }, []);

  // Trigger fetch when current tab needs it
  useEffectM(() => {
    if (currentTab.startsWith('paper:')) fetchPaper(currentTab.slice(6));
    else if (currentTab.startsWith('blog:')) fetchBlog(currentTab.slice(5));
    else if (currentTab === 'cv') fetchCv();
  }, [currentTab, fetchPaper, fetchBlog, fetchCv]);

  // Navigation: update URL + tab
  const navigateTo = useCallbackM((tab) => {
    setCurrentTab(tab);
    const url = IDE.tabToPath(tab);
    if (window.location.pathname !== url) {
      window.history.pushState({ tab }, '', url);
    }
    window.scrollTo(0, 0);
  }, []);

  const navigateToPost = useCallbackM((slug) => navigateTo('blog:' + slug), [navigateTo]);
  const navigateToPaper = useCallbackM((id) => navigateTo('paper:' + id), [navigateTo]);

  // popstate listener for back/forward
  useEffectM(() => {
    const onPop = () => {
      const tab = IDE.pathToTab(window.location.pathname);
      // Canonicalize if the URL is malformed
      const canonical = IDE.tabToPath(tab);
      if (window.location.pathname !== canonical) {
        window.history.replaceState({ tab }, '', canonical);
      }
      setCurrentTab(tab);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Render the right content based on tab
  let content;
  if (loadError) {
    content = <div className="mob-error">{loadError}</div>;
  } else if (currentTab === 'home') {
    content = <IDE.MobileHome siteData={siteData} />;
  } else if (currentTab === 'posts') {
    content = <IDE.MobilePostsList posts={blogPosts} navigateToPost={navigateToPost} />;
  } else if (currentTab === 'publications') {
    content = <IDE.MobilePublicationsList papers={papers} navigateToPaper={navigateToPaper} />;
  } else if (currentTab === 'honors') {
    content = <IDE.MobileHonors siteData={siteData} papersById={papersById} navigateToPaper={navigateToPaper} />;
  } else if (currentTab === 'cv') {
    content = <IDE.MobileCV markdown={cvMd} loadState={cvState} />;
  } else if (currentTab.startsWith('blog:')) {
    const slug = currentTab.slice(5);
    content = (
      <IDE.MobilePostDetail
        post={blogPostsBySlug[slug]}
        markdown={blogMd[slug]}
        loadState={blogState[slug]}
        imageBase={blogState[slug]?.imageBase}
      />
    );
  } else if (currentTab.startsWith('paper:')) {
    const id = currentTab.slice(6);
    content = (
      <IDE.MobilePaperDetail
        paper={papersById[id]}
        markdown={paperMd[id]}
        loadState={paperState[id]}
        imageBase={paperState[id]?.imageBase}
      />
    );
  } else {
    content = <IDE.MobileHome siteData={siteData} />;
  }

  return (
    <div className="mobile-shell">
      <IDE.MobileHeader navigateTo={navigateTo} currentTab={currentTab} />
      <main className="mob-main">
        {content}
      </main>
      <footer className="mob-footer">
        © {new Date().getFullYear()} {siteData?.name || 'Christian Bird'} · v{window.__v || ''}
      </footer>
    </div>
  );
};
