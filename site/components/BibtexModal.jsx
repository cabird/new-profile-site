const BibtexModal = ({ bibtex, onClose }) => {
    if (!bibtex) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(bibtex).then(() => {
            alert('BibTeX copied to clipboard!');
        });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">BibTeX Citation</h2>
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    <pre style={{
                        backgroundColor: 'var(--bg-secondary)',
                        padding: 'var(--spacing-md)',
                        borderRadius: 'var(--border-radius)',
                        overflow: 'auto',
                        fontSize: 'var(--font-size-sm)',
                        lineHeight: '1.4'
                    }}>
                        {bibtex}
                    </pre>
                    <button className="btn btn-primary" onClick={handleCopy}>
                        Copy to Clipboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BibtexModal;
