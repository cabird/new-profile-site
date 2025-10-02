// Icon components using Lucide
const Icon = ({ name, size = 20, className = '', ...props }) => {
    const ref = React.useRef(null);

    React.useEffect(() => {
        if (ref.current && window.lucide) {
            const iconElement = window.lucide.createElement(window.lucide[name]);
            if (iconElement) {
                // Set size
                iconElement.setAttribute('width', size);
                iconElement.setAttribute('height', size);

                // Clear and append
                ref.current.innerHTML = '';
                ref.current.appendChild(iconElement);
            }
        }
    }, [name, size]);

    return <span ref={ref} className={className} {...props} />;
};

// Navigation icons
export const MenuIcon = (props) => <Icon name="Menu" {...props} />;
export const XIcon = (props) => <Icon name="X" {...props} />;

// Action icons
export const SearchIcon = (props) => <Icon name="Search" {...props} />;
export const DownloadIcon = (props) => <Icon name="Download" {...props} />;
export const FileTextIcon = (props) => <Icon name="FileText" {...props} />;
export const CodeIcon = (props) => <Icon name="Code" {...props} />;
export const MessageSquareIcon = (props) => <Icon name="MessageSquare" {...props} />;
export const SendIcon = (props) => <Icon name="Send" {...props} />;
export const Trash2Icon = (props) => <Icon name="Trash2" {...props} />;
export const CopyIcon = (props) => <Icon name="Copy" {...props} />;

// UI icons
export const ChevronDownIcon = (props) => <Icon name="ChevronDown" {...props} />;
export const ExternalLinkIcon = (props) => <Icon name="ExternalLink" {...props} />;
export const AwardIcon = (props) => <Icon name="Award" {...props} />;
export const UserIcon = (props) => <Icon name="User" {...props} />;
export const BotIcon = (props) => <Icon name="Bot" {...props} />;
export const AlertCircleIcon = (props) => <Icon name="AlertCircle" {...props} />;

// Social/Profile icons
export const GithubIcon = (props) => <Icon name="Github" {...props} />;
export const LinkedinIcon = (props) => <Icon name="Linkedin" {...props} />;
export const GraduationCapIcon = (props) => <Icon name="GraduationCap" {...props} />;
export const Building2Icon = (props) => <Icon name="Building2" {...props} />;

export default Icon;
