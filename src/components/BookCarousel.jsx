import React from 'react';
import BookCard from './BookCard';

const BookCarousel = ({ title, books }) => {
  return (
    <div className="mb-8 pt-10">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className="flex overflow-x-auto no-scrollbar pb-2">
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookCarousel;
