/* ─── Inline SVG Icons ─── */

IDE.FileIconSvg = function FileIconSvg({ color = '#569cd6' }) {
  return (
    <svg viewBox="0 0 16 16" fill={color} width="16" height="16">
      <path d="M13.71 4.29l-3-3A1 1 0 0010 1H4a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V5a1 1 0 00-.29-.71zM12 14H4V2h5v3a1 1 0 001 1h3v8z"/>
    </svg>
  );
};

IDE.FileMdIcon = function FileMdIcon() {
  return <IDE.FileIconSvg color="#3794ff" />;
};

IDE.FilePdfIcon = function FilePdfIcon() {
  return <IDE.FileIconSvg color="#e06c75" />;
};

IDE.FileTxtIcon = function FileTxtIcon() {
  return <IDE.FileIconSvg color="#858585" />;
};

IDE.FileImgIcon = function FileImgIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="#a074c4" width="16" height="16">
      <path d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zm0 13H2V2h12v12zM4 12l2.5-4 1.5 2 2-3L13 12H4z"/>
    </svg>
  );
};

IDE.FolderIcon = function FolderIcon({ open }) {
  return (
    <svg viewBox="0 0 16 16" fill="#dcb67a" width="16" height="16">
      {open
        ? <path d="M1.5 13h12L15 6H5.5l-1-2H1v9zM1 3h3l1 2h10v9H1V3z"/>
        : <path d="M1 3h3l1 2h9v8H1V3zm1 1v8h11V6H4.5l-1-2H2z"/>
      }
    </svg>
  );
};

IDE.LinkIcon = function LinkIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="#3794ff" width="16" height="16">
      <path d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25z"/>
      <path d="M8.225 12.725a.75.75 0 01-1.06-1.06l-1.25 1.25a2 2 0 11-2.83-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25z"/>
    </svg>
  );
};

IDE.MailIcon = function MailIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="#4ec9b0" width="16" height="16">
      <path d="M1 4v8h14V4H1zm1.2 1h11.6L8 8.5 2.2 5zM2 11V5.9l6 3.6 6-3.6V11H2z"/>
    </svg>
  );
};

IDE.ChartIcon = function ChartIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="#4ec9b0" width="16" height="16">
      <path d="M2 14V2h1v11h11v1H2zM5 10h1v3H5v-3zm3-3h1v6H8V7zm3-2h1v8h-1V5zm3-3h1v11h-1V2z"/>
    </svg>
  );
};

IDE.SearchIconSmall = function SearchIconSmall() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
      <path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001l3.85 3.85a1 1 0 001.415-1.414l-3.867-3.834zM6.5 11a4.5 4.5 0 110-9 4.5 4.5 0 010 9z"/>
    </svg>
  );
};

/* ─── Activity bar SVG icons ─── */
IDE.ExplorerIcon = function ExplorerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>
    </svg>
  );
};

IDE.SearchIcon = function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
};

IDE.PubsIcon = function PubsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  );
};

IDE.ChatIcon = function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );
};

IDE.TerminalIcon = function TerminalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
    </svg>
  );
};

/* Tab file icon */
IDE.TabFileIcon = function TabFileIcon({ color = '#569cd6' }) {
  return (
    <svg viewBox="0 0 16 16" fill={color} width="14" height="14">
      <path d="M13.71 4.29l-3-3A1 1 0 0010 1H4a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V5a1 1 0 00-.29-.71zM12 14H4V2h5v3a1 1 0 001 1h3v8z"/>
    </svg>
  );
};

/* ─── File icon for command palette based on extension ─── */
IDE.PaletteFileIcon = function PaletteFileIcon({ ext }) {
  const { FileMdIcon, FilePdfIcon, FileTxtIcon, FileImgIcon, FileIconSvg } = IDE;
  if (ext === '.md') return <FileMdIcon />;
  if (ext === '.pdf') return <FilePdfIcon />;
  if (ext === '.txt') return <FileTxtIcon />;
  if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') return <FileImgIcon />;
  return <FileIconSvg color="#569cd6" />;
};
