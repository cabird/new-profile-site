/* ─── Helpers ─── */

IDE.slugify = function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
};

IDE.parseTags = function parseTags(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  try { return JSON.parse(raw); } catch { return []; }
};

IDE.parseTldr = function parseTldr(paper) {
  if (!paper.extracted_paper_info) return null;
  try {
    const info = typeof paper.extracted_paper_info === 'string'
      ? JSON.parse(paper.extracted_paper_info)
      : paper.extracted_paper_info;
    return info.tldr || null;
  } catch { return null; }
};

IDE.highlightMatch = function highlightMatch(text, query) {
  if (!query) return text;
  const lower = text.toLowerCase();
  const qLower = query.toLowerCase();
  const idx = lower.indexOf(qLower);
  if (idx === -1) return text;
  return (
    <span>
      {text.slice(0, idx)}
      <span className="match-char">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </span>
  );
};

IDE.buildVirtualFS = function buildVirtualFS(siteData, papers, callbacks) {
  const { slugify } = IDE;
  const files = [];

  files.push({ name: 'home.md', path: 'home.md', ext: '.md', action: () => callbacks.setActiveTab('home') });
  files.push({ name: 'publications.md', path: 'publications.md', ext: '.md', action: () => callbacks.setActiveTab('publications') });
  files.push({ name: 'profile.jpg', path: 'profile.jpg', ext: '.jpg', action: () => callbacks.setActiveTab('profile') });

  if (siteData?.cv_link) {
    files.push({ name: 'cv.pdf', path: 'cv.pdf', ext: '.pdf', action: () => { window.open(siteData.cv_link, '_blank'); } });
  }

  const contact = siteData?.contact;
  if (contact) {
    if (contact.email) {
      files.push({ name: 'email.txt', path: 'contact/email.txt', ext: '.txt', action: () => { window.location.href = `mailto:${contact.email}`; } });
    }
    if (contact.links) {
      contact.links.forEach(l => {
        const slug = slugify(l.label) + '.txt';
        files.push({ name: slug, path: `contact/${slug}`, ext: '.txt', action: () => { window.open(l.url, '_blank'); } });
      });
    }
  }

  if (papers) {
    papers.forEach(p => {
      const year = p.year || 'unknown';
      const slug = slugify(p.title || 'untitled') + '.md';
      files.push({
        name: slug,
        path: `publications/${year}/${slug}`,
        ext: '.md',
        paperId: p.id,
        action: () => {
          callbacks.setActiveTab('publications');
          callbacks.selectPaper(p.id);
        }
      });
    });
  }

  return files;
};
