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

  if (!book) return <div className="text-center text-xl">Loading...</div>;

  const { volumeInfo, saleInfo } = book;
  const {
    title,
    authors,
    description,
    imageLinks,
    publisher,
    publishedDate,
    pageCount,
    categories,
    averageRating,
    ratingsCount,
  } = volumeInfo;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col lg:flex-row bg-white p-6 rounded-lg shadow-lg">
        {/* Book Image */}
        <div className="flex-shrink-0">
          <img
            src={imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
            alt={title}
            className="w-64 h-96 object-cover rounded-md shadow-md"
          />
        </div>

        {/* Book Information */}
        <div className="lg:ml-8 mt-6 lg:mt-0 max-w-2xl">
          <h1 className="text-4xl font-semibold text-gray-800 mb-4">{title}</h1>
          {authors && <p className="text-lg text-gray-600 mb-2">by {authors.join(', ')}</p>}
          {publisher && <p className="text-lg text-gray-600 mb-2">Publisher: {publisher}</p>}
          {publishedDate && <p className="text-lg text-gray-600 mb-2">Published: {publishedDate}</p>}
          {categories && <p className="text-lg text-gray-600 mb-2">Category: {categories.join(', ')}</p>}
          {pageCount && <p className="text-lg text-gray-600 mb-2">Pages: {pageCount}</p>}

          {averageRating && (
            <p className="text-lg text-gray-600 mb-2">Average Rating: {averageRating} / 5</p>
          )}
          {ratingsCount && (
            <p className="text-lg text-gray-600 mb-4">Total Ratings: {ratingsCount}</p>
          )}

          {/* Description */}
          {description && (
            <div
              className="text-lg text-gray-800 mb-6"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}

          {/* Buy Button */}
          {saleInfo?.saleability === 'FOR_SALE' && saleInfo?.buyLink && (
            <a
              href={saleInfo.buyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
            >
              Buy Now
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
