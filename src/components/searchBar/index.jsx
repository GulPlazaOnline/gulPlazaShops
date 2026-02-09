// src/components/searchBar/index.jsx
const SearchBar = ({ search, setSearch }) => {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-muted" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
            </div>
            <input
                type="text"
                placeholder="Search shops, owners, or categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 bg-white dark:bg-card-dark text-charcoal dark:text-white placeholder-muted border border-gray-200 dark:border-gray-700 rounded-xl text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-commerce focus:border-commerce transition-all duration-200"
            />

            {/* Filter dropdown hint */}
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <select className="bg-transparent text-sm text-muted border-none focus:ring-0 cursor-pointer">
                    <option value="all">All</option>
                    <option value="shops">Shops</option>
                    <option value="victims">Victims</option>
                    <option value="missing">Missing</option>
                </select>
            </div>
        </div>
    );
};

export default SearchBar;
