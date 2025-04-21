import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext'; // ✅ Make sure this is correct

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { addToFavorites, isInFavorites } = useFavorites(); // ✅ use context

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then(response => response.json())
      .then(data => setBook(data));
  }, [id]);

  if (!book) return <div className="text-center text-xl pt-32">Loading...</div>;

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

  const handleAddToFavorites = () => {
    const simplifiedBook = {
      id: book.id,
      title,
      authors,
      thumbnail: imageLinks?.thumbnail,
    };
    addToFavorites(simplifiedBook);
  };

  return (
    <div className="container mx-auto p-6 pt-20">
      <div className="flex flex-col lg:flex-row bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        {/* Book Image */}
        <div className="flex-shrink-0">
          <img
            src={imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
            alt={title}
            className="w-64 h-96 object-cover rounded-md shadow-md"
          />
        </div>

        {/* Book Information */}
        <div className="lg:ml-8 mt-6 lg:mt-0 max-w-2xl text-gray-800 dark:text-white">
          <h1 className="text-4xl font-semibold mb-4">{title}</h1>
          {authors && <p className="text-lg mb-2">by {authors.join(', ')}</p>}
          {publisher && <p className="text-lg mb-2">Publisher: {publisher}</p>}
          {publishedDate && <p className="text-lg mb-2">Published: {publishedDate}</p>}
          {categories && <p className="text-lg mb-2">Category: {categories.join(', ')}</p>}
          {pageCount && <p className="text-lg mb-2">Pages: {pageCount}</p>}
          {averageRating && <p className="text-lg mb-2">Average Rating: {averageRating} / 5</p>}
          {ratingsCount && <p className="text-lg mb-4">Total Ratings: {ratingsCount}</p>}

          {/* Description */}
          {description && (
            <div
              className="text-base mb-6"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Add to Favorites */}
            {!isInFavorites(book.id) ? (
              <button
                onClick={handleAddToFavorites}
                className="px-6 py-3 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition"
              >
                ❤️ Add to Favorites
              </button>
            ) : (
              <button
                disabled
                className="px-6 py-3 bg-gray-400 text-white rounded-lg shadow cursor-not-allowed"
              >
                ✅ Already in Favorites
              </button>
            )}

            {/* Buy Button */}
            {saleInfo?.saleability === 'FOR_SALE' && saleInfo?.buyLink && (
              <a
                href={saleInfo.buyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                Buy Now
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
