import { XIcon, AwardIcon } from './Icons.jsx';

const PublicationModal = ({ publication, onClose }) => {
    if (!publication) return null;

    const details = publication.extracted_paper_info?.details;

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
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">{publication.title}</h2>
                    <button className="modal-close" onClick={onClose}>
                        <XIcon size={24} />
                    </button>
                    <div className="card-meta">
                        {publication.year} | {publication.under_submission ? (
                            <span className="badge-under-submission">[Under Submission]</span>
                        ) : (
                            getVenue()
                        )}
                    </div>
                    <div className="card-authors">{publication.authors.replace(/ and /g, ', ')}</div>
                    {publication.awards && publication.awards.length > 0 && (
                        <div className="awards" style={{ marginTop: 'var(--spacing-md)' }}>
                            {publication.awards.map((award, idx) => (
                                <span key={idx} className="award-badge">
                                    <AwardIcon size={14} /> {award}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div className="modal-body">
                    {publication.extracted_paper_info && (
                        <>
                            <div className="modal-section">
                                <p className="modal-section-title">TL;DR:</p>
                                <p>{publication.extracted_paper_info.tldr}</p>
                            </div>

                            {details && (
                                <>
                                    {details.topic && (
                                        <div className="modal-section">
                                            <p className="modal-section-title">Topic:</p>
                                            <p>{details.topic}</p>
                                        </div>
                                    )}

                                    {details.problem && (
                                        <div className="modal-section">
                                            <p className="modal-section-title">Problem:</p>
                                            <p>{details.problem}</p>
                                        </div>
                                    )}

                                    {details.approach && (
                                        <div className="modal-section">
                                            <p className="modal-section-title">Approach:</p>
                                            <p>{details.approach}</p>
                                        </div>
                                    )}

                                    {details.key_insights && details.key_insights.length > 0 && (
                                        <div className="modal-section">
                                            <p className="modal-section-title">Key Insights:</p>
                                            <ul className="modal-list">
                                                {details.key_insights.map((insight, idx) => (
                                                    <li key={idx}>{insight}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {details.implications && (
                                        <div className="modal-section">
                                            <p className="modal-section-title">Implications:</p>
                                            <p>{details.implications}</p>
                                        </div>
                                    )}
                                </>
                            )}

                            {publication.tags && publication.tags.length > 0 && (
                                <div className="modal-section">
                                    <p className="modal-section-title">Tags:</p>
                                    <div className="tags">
                                        {publication.tags.map((tag, idx) => (
                                            <span key={idx} className="tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {publication.mapped_pdf && (
                                <div className="modal-section">
                                    <a
                                        href={`pdfs/${publication.mapped_pdf}`}
                                        className="btn btn-primary"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View PDF
                                    </a>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PublicationModal;
