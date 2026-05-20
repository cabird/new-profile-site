/* ─── Root App ─── */
/* Chooses between the desktop IDE shell and the mobile reader shell
   based on viewport width. */

IDE.RootApp = function RootApp() {
  const MOBILE_QUERY = '(max-width: 767px)';

  // Initialize synchronously from matchMedia to avoid first-render flicker
  const [isMobile, setIsMobile] = React.useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(MOBILE_QUERY).matches;
  });

  React.useEffect(() => {
    if (!window.matchMedia) return;
    const mql = window.matchMedia(MOBILE_QUERY);
    const onChange = (e) => setIsMobile(e.matches);
    // Newer browsers expose addEventListener; older Safari uses addListener.
    if (mql.addEventListener) mql.addEventListener('change', onChange);
    else if (mql.addListener) mql.addListener(onChange);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', onChange);
      else if (mql.removeListener) mql.removeListener(onChange);
    };
  }, []);

  return isMobile ? <IDE.MobileApp /> : <IDE.App />;
};
