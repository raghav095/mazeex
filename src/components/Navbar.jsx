import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Book Library
        </Link>
        <div>
          <Link to="/" className="text-white mr-4">Home</Link>
          <Link to="/about" className="text-white">About</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
