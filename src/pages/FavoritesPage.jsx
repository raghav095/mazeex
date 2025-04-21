import React, { useEffect } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const FavouritePage = () => {
  const { favorites } = useFavorites();

  useEffect(() => {
    console.log('Favorites:', favorites); // Logs the favorites array on each render
  }, [favorites]);

  return (
    <>
      <Navbar />
      <div className="pt-24 px-6 min-h-screen bg-gray-300">
        <h1 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
          Your Favourite Books
        </h1>

        {favorites.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No favorites yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((book) => {
              if (!book || !book.thumbnail) return null; // Prevent crash if book data is incomplete

              const { id, title, authors, thumbnail } = book;

              return (
                <div
                  key={id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition"
                >
                  <img
                    src={thumbnail || 'https://via.placeholder.com/150'}
                    alt={title}
                    className="w-full h-60 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
                    {authors?.join(', ') || 'Unknown Author'}
                  </p>
                  <Link
                    to={`/book/${id}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View Details
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default FavouritePage;
