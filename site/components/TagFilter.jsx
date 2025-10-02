const TagFilter = ({ allTags, selectedTags, onToggleTag, onClearTags, showAwardsOnly, onToggleAwards }) => {
    const hasFilters = selectedTags.length > 0 || showAwardsOnly;

    return (
        <div className="filter-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
                <h3 className="filter-title">Filter by Tags</h3>
                {hasFilters && (
                    <button className="btn btn-secondary btn-sm" onClick={onClearTags}>
                        Clear All
                    </button>
                )}
            </div>
            <div className="filter-tags">
                <button
                    className={`btn-pill-award ${showAwardsOnly ? 'active' : ''}`}
                    onClick={onToggleAwards}
                >
                    🏆 Awards
                </button>
                {allTags.map((tag) => (
                    <button
                        key={tag}
                        className={`btn-pill ${selectedTags.includes(tag) ? 'active' : ''}`}
                        onClick={() => onToggleTag(tag)}
                    >
                        {tag}
                    </button>
                ))}
            </div>
            {hasFilters && (
                <p style={{ marginTop: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                    Showing papers with all selected filters
                    {showAwardsOnly && <strong> Awards</strong>}
                    {selectedTags.length > 0 && <strong> {selectedTags.join(', ')}</strong>}
                </p>
            )}
        </div>
    );
};

export default TagFilter;
