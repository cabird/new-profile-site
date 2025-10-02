import SearchBar from './SearchBar.jsx';
import { AwardIcon } from './Icons.jsx';

const TagFilter = ({ allTags, selectedTags, onToggleTag, onClearTags, showAwardsOnly, onToggleAwards, searchQuery, onSearchChange }) => {
    const hasFilters = selectedTags.length > 0 || showAwardsOnly || searchQuery.trim();

    const handleToggleTag = (tag) => {
        onToggleTag(tag);

        // Log tag selection to Google Analytics
        const isActive = selectedTags.includes(tag);
        if (window.gtag) {
            window.gtag('event', 'filter_tag', {
                tag_name: tag,
                action: isActive ? 'remove' : 'add',
                event_category: 'publications'
            });
        }
    };

    const handleToggleAwards = () => {
        onToggleAwards();

        // Log awards filter toggle to Google Analytics
        if (window.gtag) {
            window.gtag('event', 'filter_awards', {
                action: showAwardsOnly ? 'remove' : 'add',
                event_category: 'publications'
            });
        }
    };

    const handleClearAll = () => {
        onClearTags();

        // Log clear all filters to Google Analytics
        if (window.gtag) {
            window.gtag('event', 'clear_all_filters', {
                event_category: 'publications'
            });
        }
    };

    return (
        <div className="filter-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
                <h3 className="filter-title">Filter Publications</h3>
                {hasFilters && (
                    <button className="btn btn-secondary btn-sm" onClick={handleClearAll}>
                        Clear All
                    </button>
                )}
            </div>

            <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} />

            <div className="filter-tags">
                <button
                    className={`btn-pill-award ${showAwardsOnly ? 'active' : ''}`}
                    onClick={handleToggleAwards}
                >
                     <AwardIcon size={14} /> Awards
                </button>
                {allTags.map((tag) => (
                    <button
                        key={tag}
                        className={`btn-pill ${selectedTags.includes(tag) ? 'active' : ''}`}
                        onClick={() => handleToggleTag(tag)}
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
