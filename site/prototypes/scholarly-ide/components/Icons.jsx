/* ─── Icon wrapper components ─── */

/* Codicon wrapper – renders a VS Code codicon via CSS icon font */
IDE.Codicon = function Codicon({ name, size = 16, color = 'currentColor', className = '', style = {}, ...props }) {
  return (
    <span
      className={`codicon codicon-${name} ${className}`}
      style={{ fontSize: size, color, lineHeight: 1, ...style }}
      {...props}
    />
  );
};

/* Lucide wrapper – injects Lucide SVG via useRef/useEffect */
IDE.LucideIcon = function LucideIcon({ name, size = 16, color = 'currentColor', className = '', style = {}, ...props }) {
  const iconRef = React.useRef(null);
  React.useEffect(() => {
    if (iconRef.current && window.lucide) {
      const iconDef = window.lucide[name];
      if (!iconDef) { console.error(`Lucide icon "${name}" not found`); return; }
      const el = window.lucide.createElement(iconDef);
      if (el) {
        el.setAttribute('width', size);
        el.setAttribute('height', size);
        iconRef.current.innerHTML = '';
        iconRef.current.appendChild(el);
      }
    }
  }, [name, size]);
  return <span ref={iconRef} className={className} style={{ display: 'inline-flex', alignItems: 'center', color, ...style }} {...props} />;
};

/* ─── File type icons ─── */

IDE.FileIconSvg = function FileIconSvg({ color = '#569cd6' }) {
  return <IDE.Codicon name="file" size={16} color={color} />;
};

IDE.FileMdIcon = function FileMdIcon() {
  return <IDE.Codicon name="file-code" size={16} color="#3794ff" />;
};

IDE.FilePdfIcon = function FilePdfIcon() {
  return <IDE.Codicon name="file-pdf" size={16} color="#e06c75" />;
};

IDE.FileTxtIcon = function FileTxtIcon() {
  return <IDE.Codicon name="file" size={16} color="#858585" />;
};

IDE.FileImgIcon = function FileImgIcon() {
  return <IDE.Codicon name="file-media" size={16} color="#a074c4" />;
};

/* ─── Folder ─── */

IDE.FolderIcon = function FolderIcon({ open }) {
  return <IDE.Codicon name={open ? "folder-opened" : "folder"} size={16} color="#dcb67a" />;
};

/* ─── Sidebar / tree icons ─── */

IDE.LinkIcon = function LinkIcon() {
  return <IDE.Codicon name="link-external" size={16} color="#3794ff" />;
};

IDE.MailIcon = function MailIcon() {
  return <IDE.LucideIcon name="Mail" size={16} color="#4ec9b0" />;
};

IDE.ChartIcon = function ChartIcon() {
  return <IDE.Codicon name="graph" size={16} color="#4ec9b0" />;
};

IDE.TagIcon = function TagIcon({ color = '#4ec9b0' }) {
  return <IDE.Codicon name="tag" size={16} color={color} />;
};

IDE.TabTagIcon = function TabTagIcon({ color = '#4ec9b0' }) {
  return <IDE.Codicon name="tag" size={14} color={color} />;
};

/* ─── Search ─── */

IDE.SearchIconSmall = function SearchIconSmall() {
  return <IDE.Codicon name="search" size={14} />;
};

/* ─── Activity bar icons (24px) ─── */

IDE.ExplorerIcon = function ExplorerIcon() {
  return <IDE.Codicon name="files" size={24} />;
};

IDE.SearchIcon = function SearchIcon() {
  return <IDE.Codicon name="search" size={24} />;
};

IDE.PubsIcon = function PubsIcon() {
  return <IDE.Codicon name="book" size={24} />;
};

IDE.ChatIcon = function ChatIcon() {
  return <IDE.Codicon name="comment-discussion" size={24} />;
};

IDE.TerminalIcon = function TerminalIcon() {
  return <IDE.Codicon name="terminal" size={24} />;
};

/* ─── Tab file icon ─── */

IDE.TabFileIcon = function TabFileIcon({ color = '#569cd6' }) {
  return <IDE.Codicon name="file" size={14} color={color} />;
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
