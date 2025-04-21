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
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
      {/* Left Logo and Links */}
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-2xl font-bold text-white hover:text-indigo-300 transition duration-200">
          BookMaze
        </Link>
        <Link to="/about" className="text-sm font-medium hover:text-indigo-400 transition duration-200 hidden md:block">
          About
        </Link>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="relative w-1/2 max-w-lg flex items-center justify-between">
        <input
          type="text"
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-4 pr-12 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-1.5 rounded-full transition duration-200"
        >
          Search
        </button>
      </form>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-gray-800 p-4 md:hidden">
          <Link to="/about" className="text-sm font-medium text-white block mb-4">
            About
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
