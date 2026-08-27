/* ─── URL Routing Helpers ─── */
// Convert a tab id to a URL path under /ide/.
// Tab IDs use `:` separators (paper:xyz, blog:slug, tag:foo) but URLs use `/`.

IDE.BASE_PATH = '/ide';

IDE.tabToPath = function tabToPath(tab) {
  const BASE_PATH = IDE.BASE_PATH;
  if (!tab || tab === 'home') return BASE_PATH + '/';
  if (tab === 'publications') return BASE_PATH + '/publications';
  if (tab === 'honors') return BASE_PATH + '/honors';
  if (tab === 'cv') return BASE_PATH + '/cv';
  if (tab === 'posts') return BASE_PATH + '/posts';
  if (tab === 'profile') return BASE_PATH + '/profile';
  if (tab.startsWith('paper:')) return BASE_PATH + '/papers/' + encodeURIComponent(tab.slice(6));
  if (tab.startsWith('blog:')) return BASE_PATH + '/posts/' + encodeURIComponent(tab.slice(5));
  if (tab.startsWith('tag:')) return BASE_PATH + '/tags/' + encodeURIComponent(tab.slice(4));
  return BASE_PATH + '/';
};

IDE.pathToTab = function pathToTab(pathname) {
  const BASE_PATH = IDE.BASE_PATH;
  let p = pathname;
  if (p.startsWith(BASE_PATH)) p = p.slice(BASE_PATH.length);
  if (p.startsWith('/')) p = p.slice(1);
  if (p.endsWith('/')) p = p.slice(0, -1);
  if (!p) return 'home';
  const parts = p.split('/');
  const first = parts[0];
  const tail = parts.slice(1).join('/');
  if (first === 'publications' && parts.length === 1) return 'publications';
  if (first === 'honors' && parts.length === 1) return 'honors';
  if (first === 'cv' && parts.length === 1) return 'cv';
  if (first === 'posts' && parts.length === 1) return 'posts';
  if (first === 'profile' && parts.length === 1) return 'profile';
  if (first === 'papers' && tail) return 'paper:' + decodeURIComponent(tail);
  if (first === 'posts' && parts.length === 2) return 'blog:' + decodeURIComponent(parts[1]);
  if (first === 'tags' && parts.length === 2) return 'tag:' + decodeURIComponent(parts[1]);
  return 'home';
};
