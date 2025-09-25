import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = e => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="mb-6 flex items-center gap-4">
      <input
        type="text"
        placeholder="Search books..."
        className="p-2 border rounded w-full"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button className="px-4 py-2 bg-blue-600 text-white rounded">Search</button>
    </form>
  );
};

export default SearchBar;
