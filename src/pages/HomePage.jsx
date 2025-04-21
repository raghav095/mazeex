import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import BookCarousel from '../components/BookCarousel';

const categories = [
  { title: 'Best Sellers', query: 'bestseller' },
  { title: 'Science Fiction', query: 'science fiction' },
  { title: 'Mystery & Thriller', query: 'thriller' },
  { title: 'New Releases', query: 'new book releases' },
  { title: 'Romance', query: 'romantic novels' },
];

const HomePage = () => {
  const [booksByCategory, setBooksByCategory] = useState({});
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    categories.forEach(async cat => {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${cat.query}`);
      const data = await res.json();
      setBooksByCategory(prev => ({ ...prev, [cat.title]: data.items || [] }));
    });
  }, []);

  const handleSearch = async query => {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    const data = await res.json();
    setSearchResults(data.items || []);
  };

  return (
    <div className="p-6">
      <SearchBar onSearch={handleSearch} />

      {searchResults.length > 0 && (
        <BookCarousel title="Search Results" books={searchResults} />
      )}

      {categories.map(cat => (
        <BookCarousel key={cat.title} title={cat.title} books={booksByCategory[cat.title] || []} />
      ))}
    </div>
  );
};

export default HomePage;
