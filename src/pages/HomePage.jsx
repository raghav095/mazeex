import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    fetch('https://www.googleapis.com/books/v1/volumes?q=react')
      .then(response => response.json())
      .then(data => setBooks(data.items));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Book Library</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Home;
