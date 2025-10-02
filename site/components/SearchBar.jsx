import { SearchIcon, XIcon } from './Icons.jsx';

const SearchBar = ({ searchQuery, onSearchChange }) => {
    return (
        <div className="search-bar">
            <div className="search-input-wrapper">
                <SearchIcon size={20} className="search-icon" />
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search publications..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                {searchQuery && (
                    <button
                        className="search-clear"
                        onClick={() => onSearchChange('')}
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
