import React, { useEffect, useState } from 'react';
import BookCarousel from '../components/BookCarousel';

// Define the categories for the books.
const categories = [
  { title: 'New Releases', query: 'new book releases' },
  { title: 'Best Sellers', query: 'bestseller' },
  { title: 'Science Fiction', query: 'science fiction' },
  { title: 'Mystery & Thriller', query: 'thriller' },
  { title: 'Romance', query: 'romantic novels' },
  { title: 'Crime', query: 'crime novels' },
];

const HomePage = ({ searchResults }) => {
  const [booksByCategory, setBooksByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch books for each category on component mount.
  useEffect(() => {
    // Set the loading state to true while fetching the data
    setLoading(true);

    // Fetch data for each category
    const fetchBooks = async () => {
      const newBooksByCategory = {};

      for (const cat of categories) {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${cat.query}`);
        const data = await res.json();
        newBooksByCategory[cat.title] = data.items || [];
      }

      // Once all categories are fetched, update the state and set loading to false
      setBooksByCategory(newBooksByCategory);
      setLoading(false);
    };

    fetchBooks();
  }, []);

  return (
    <div className="p-6">
      {/* Search results section */}
      {searchResults?.length > 0 && (
        <BookCarousel title="Search Results" books={searchResults} />
      )}

      {/* Categories section */}
      {loading ? (
        <p>Loading categories...</p>
      ) : (
        categories.map(cat => (
          <BookCarousel key={cat.title} title={cat.title} books={booksByCategory[cat.title] || []} />
        ))
      )}
    </div>
  );
};

export default HomePage;
