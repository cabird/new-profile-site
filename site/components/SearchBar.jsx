import { SearchIcon, XIcon } from './Icons.jsx';

const SearchBar = ({ searchQuery, onSearchChange }) => {
    const handleSearchChange = (value) => {
        onSearchChange(value);

        // Log search to Google Analytics
        if (value.trim() && window.gtag) {
            window.gtag('event', 'search', {
                search_term: value,
                event_category: 'publications'
            });
        }
    };

    const handleClear = () => {
        onSearchChange('');

        // Log clear search to Google Analytics
        if (window.gtag) {
            window.gtag('event', 'clear_search', {
                event_category: 'publications'
            });
        }
    };

    return (
        <div className="search-bar">
            <div className="search-input-wrapper">
                <SearchIcon size={20} className="search-icon" />
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search publications..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                />
                {searchQuery && (
                    <button
                        className="search-clear"
                        onClick={handleClear}
                        aria-label="Clear search"
                    >
                        <XIcon size={18} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
