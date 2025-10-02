import { AwardIcon } from './Icons.jsx';

const PublicationCard = ({ publication, onViewDetails, onViewBibtex, onChatWithPaper }) => {
    console.log('PublicationCard rendered for:', publication.id, 'chat_available:', publication.chat_available, 'onChatWithPaper:', typeof onChatWithPaper);

    // Determine venue based on publication type
    const getVenue = () => {
        if (publication.type === 'inproceedings') {
            return publication.booktitle || publication.venue;
        } else if (publication.type === 'article') {
            return publication.journal || publication.venue;
        }
        return publication.venue;
    };

    return (
        <div className="card">
            <div className="card-meta">
                {publication.year} | {publication.under_submission ? (
                    <span className="badge-under-submission">[Under Submission]</span>
                ) : (
                    getVenue()
                )}
            </div>
            <h3 className="card-title">{publication.title}</h3>
            <div className="card-authors">{publication.authors.replace(/ and /g, ', ')}</div>

            {publication.awards && publication.awards.length > 0 && (
                <div className="awards">
                    {publication.awards.map((award, idx) => (
                        <span key={idx} className="award-badge">
                            <AwardIcon size={14} /> {award}
                        </span>
                    ))}
                </div>
            )}

            {publication.tags && publication.tags.length > 0 && (
                <div className="tags">
                    {publication.tags.map((tag, idx) => (
                        <span key={idx} className="tag">{tag}</span>
                    ))}
                </div>
            )}

            {publication.extracted_paper_info && (
                <p className="card-description">{publication.extracted_paper_info.tldr}</p>
            )}

            <div className="card-actions">
                <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                        // Log to Google Analytics
                        if (window.gtag) {
                            window.gtag('event', 'view_publication_summary', {
                                paper_id: publication.id,
                                paper_title: publication.title,
                                event_category: 'publications'
                            });
                        }
                        onViewDetails(publication);
                    }}
                >
                    View Summary
                </button>
                {publication.mapped_pdf && (
                    <a
                        href={`pdfs/${publication.mapped_pdf}`}
                        className="btn btn-secondary btn-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                            // Log to Google Analytics
                            if (window.gtag) {
                                window.gtag('event', 'download_pdf', {
                                    paper_id: publication.id,
                                    paper_title: publication.title,
                                    event_category: 'publications'
                                });
                            }
                        }}
                    >
                        PDF
                    </a>
                )}
                {publication.raw_bibtex && (
                    <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                            // Log to Google Analytics
                            if (window.gtag) {
                                window.gtag('event', 'view_bibtex', {
                                    paper_id: publication.id,
                                    paper_title: publication.title,
                                    event_category: 'publications'
                                });
                            }
                            onViewBibtex(publication);
                        }}
                    >
                        BibTeX
                    </button>
                )}
                {publication.chat_available ? (
                    <button
                        className="btn btn-secondary btn-sm btn-chat"
                        onClick={() => {
                            // Log to Google Analytics
                            if (window.gtag) {
                                window.gtag('event', 'open_chat', {
                                    paper_id: publication.id,
                                    paper_title: publication.title,
                                    event_category: 'publications'
                                });
                            }
                            console.log('CHAT BUTTON CLICKED!', publication.id);
                            if (onChatWithPaper) {
                                onChatWithPaper(publication);
                            } else {
                                console.error('onChatWithPaper is not defined!');
                            }
                        }}
                    >
                        Chat
                    </button>
                ) : (
                    <button
                        className="btn btn-secondary btn-sm"
                        disabled
                        title="Chat unavailable - markdown not found"
                    >
                        Chat
                    </button>
                )}
            </div>
        </div>
    );
};

export default PublicationCard;
