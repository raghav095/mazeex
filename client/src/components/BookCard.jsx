import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  const { title, authors, imageLinks } = book.volumeInfo;

  return (
    <div className="min-w-[160px] max-w-[160px] bg-gray-300 shadow rounded p-2 mr-4 hover:scale-105 transition">
      <Link to={`/book/${book.id}`}>
        <img
          src={imageLinks?.thumbnail}
          alt={title}
          className="w-full h-40 object-cover rounded mb-2"
        />
        <h3 className="text-sm font-semibold line-clamp-2">{title}</h3>
        <p className="text-xs text-gray-500">{authors?.join(', ') || 'Unknown'}</p>
      </Link>
    </div>
  );
};

export default BookCard;
