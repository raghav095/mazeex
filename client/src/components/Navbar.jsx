import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
    navigate('/');
  };

  return (
    <nav className="bg-gray-900/80 backdrop-blur-md text-white px-6 py-3 shadow-lg fixed top-0 left-0 w-full z-50">
      {/* Main Navbar Container */}
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Brand Logo and Desktop Links */}
        <div className="flex items-center space-x-8">
          <Link
            to="/"
            className="text-3xl font-semibold tracking-wide hover:text-indigo-400 transition-all duration-200"
          >
            📚 BookMaze
          </Link>
        
        </div>

        {/* Desktop Search Bar */}
        <form
          onSubmit={handleSubmit}
          className="hidden lg:flex items-center relative w-full max-w-md"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find your next read..."
            className="w-full bg-gray-800 text-sm text-white py-2.5 px-5 pr-14 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 transition"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 px-4 py-1.5 rounded-full text-sm transition"
          >
            🔍
          </button>
        </form>
        <Link
  to="/favorites"
  className="hidden md:inline-block text-base font-medium hover:text-indigo-300 transition duration-150"
>
  Favorites 💖
</Link>

        <Link
            to="/about"
            className="hidden md:inline-block text-base font-medium hover:text-indigo-300 transition duration-150"
          >
            About
          </Link>
       

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="mt-4 bg-gray-800 rounded-lg shadow-inner px-6 py-4 md:hidden">
          <Link
            to="/about"
            className="block text-white text-base mb-3 hover:text-indigo-400 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>

          {/* Mobile Search */}
          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search books..."
              className="flex-1 py-2 px-4 rounded-l-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-full transition"
            >
              Search
            </button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
