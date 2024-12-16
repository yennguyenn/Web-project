import React, { createContext, useContext, useState } from 'react';

// Create the context
const SearchContext = createContext();

// Custom hook to use the context
export const useSearch = () => useContext(SearchContext);

// Provider component
const SearchProvider = ({ children }) => {
    const [keyword, setKeyword] = useState('');

    const updateKeyword = (newKeyword) => {
        setKeyword(newKeyword);
    };

    return (
        <SearchContext.Provider value={{ keyword, updateKeyword }}>
            {children}
        </SearchContext.Provider>
    );
};

export { SearchContext, SearchProvider }; // Separate named exports
