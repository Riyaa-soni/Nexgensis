import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/" element={<BookList />} />
      </Routes>
    </Router>
  );
};

export default App;
