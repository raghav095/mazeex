import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  const { volumeInfo } = book;
  const { title, authors, imageLinks, description } = volumeInfo;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:scale-[1.02] transition duration-300 flex flex-col">
      {imageLinks?.thumbnail ? (
        <img
          src={imageLinks.thumbnail}
          alt={title}
          className="w-full h-60 object-cover"
        />
      ) : (
        <div className="w-full h-60 bg-gray-200 flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}

      <div className="p-5 flex-1 flex flex-col">
        <h2 className="text-lg font-semibold text-gray-800 leading-tight mb-1 line-clamp-2">{title}</h2>
        <p className="text-sm text-gray-500 mb-3">
          by {authors ? authors.join(', ') : 'Unknown Author'}
        </p>
        {description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>
        )}
        <Link
          to={`/book/${book.id}`}
          className="mt-auto self-start px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
