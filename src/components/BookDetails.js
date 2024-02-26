import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById } from '../services/Api';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    getBookById(id)
      .then((data) => setBook(data))
      .catch((error) => console.error('Error fetching book details:', error));
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Book Details</h2>
      {book ? (
        <div className="bg-white p-6 shadow-md rounded-md">
          <p className="text-lg mb-3">
            <span className="text-gray-600">ID:</span> {book.id}
          </p>
          <p className="text-lg mb-3">
            <span className="text-gray-600">Title:</span> {book.title}
          </p>
          <div className="card">
            <p className="text-lg font-semibold mb-3">
              <span className="text-gray-600">Description:</span>
            </p>
            <p className="text-lg">{book.description}</p>
          </div>
          <div className="card mt-4">
            <p className="text-lg font-semibold mb-3">
              <span className="text-gray-600">Page Count:</span> {book.pageCount}
            </p>
            <p className="text-lg font-semibold mb-3">
              <span className="text-gray-600">Excerpt:</span>
            </p>
            <p className="text-lg">{book.excerpt}</p>
          </div>
          <p className="text-lg mb-3">
            <span className="text-gray-600">Publish Date:</span> {book.publishDate}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BookDetails;








