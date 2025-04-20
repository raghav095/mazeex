import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then(response => response.json())
      .then(data => setBook(data));
  }, [id]);

  if (!book) return <div>Loading...</div>;

  const { volumeInfo } = book;
  const { title, authors, description, imageLinks } = volumeInfo;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div className="flex">
        <img src={imageLinks?.thumbnail} alt={title} className="w-48 h-72 object-cover rounded-md mr-6" />
        <div>
          <p className="text-lg mb-4">{description}</p>
          <p className="text-gray-600">by {authors ? authors.join(', ') : 'Unknown'}</p>
          <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
