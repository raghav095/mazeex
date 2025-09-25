// src/context/FavoritesContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (book) => {
    if (!favorites.some((fav) => fav.id === book.id)) {
      setFavorites([...favorites, book]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((book) => book.id !== id));
  };

  const isInFavorites = (id) => {
    return favorites.some((book) => book.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isInFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
