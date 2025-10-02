const PublicationCard = ({ publication, onViewDetails, onViewBibtex }) => {
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
                        <span key={idx} className="award-badge">🏆 {award}</span>
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
                <button className="btn btn-primary btn-sm" onClick={() => onViewDetails(publication)}>
                    View Summary
                </button>
                {publication.mapped_pdf && (
                    <a
                        href={`pdfs/${publication.mapped_pdf}`}
                        className="btn btn-secondary btn-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        PDF
                    </a>
                )}
                {publication.raw_bibtex && (
                    <button className="btn btn-secondary btn-sm" onClick={() => onViewBibtex(publication)}>
                        BibTeX
                    </button>
                )}
            </div>
        </div>
    );
};

export default PublicationCard;
