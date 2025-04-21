import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/HomePage';
import About from './pages/About';
import BookDetails from './pages/BookDetails';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);

  // Function to handle search and update the books state
  const onSearch = (query) => {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      .then((res) => setBooks(res.data.items))
      .catch((err) => console.error('Error fetching books:', err));
  };

  return (
    <Router>
      <Navbar onSearch={onSearch} />
      <Routes>
        <Route path="/" element={<Home searchResults={books} />} />
        <Route path="/about" element={<About />} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
