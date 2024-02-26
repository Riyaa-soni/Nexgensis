import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllBooks, addBook, editBook, deleteBook } from '../services/Api';
import { validateBook } from '../services/Validations';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: '',
    description: '',
    pageCount: 0,
    excerpt: '',
  });
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editedBook, setEditedBook] = useState({
    id: null,
    title: '',
    description: '',
    pageCount: 0,
    excerpt: '',
  });

  useEffect(() => {
    getAllBooks()
      .then((data) => setBooks(data))
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

 
  const handleAddBook = () => {
    const errors = validateBook(newBook);

    if (Object.keys(errors).length === 0) {
      addBook(newBook)
        .then((data) => {
          setBooks([...books, data]);
          setNewBook({
            title: '',
            description: '',
            pageCount: 0,
            excerpt: '',
          });
        })
        .catch((error) => {
          console.error('Error adding book:', error);
          alert('Error adding book. Please try again.');
        });
    } else {
      Object.keys(errors).forEach((field) => {
        alert(errors[field]);
      });
      console.error('Validation errors:', errors);
    }
  };

  const openEditModal = (book) => {
    setEditedBook(book);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const handleEditBook = () => {
    const errors = validateBook(editedBook);

    if (Object.keys(errors).length === 0) {
      editBook(editedBook.id, editedBook)
        .then((data) => {
          setBooks(books.map((book) => (book.id === editedBook.id ? data : book)));
          closeEditModal();
        })
        .catch((error) => {
          console.error('Error editing book:', error);
          alert('Error editing book. Please try again.');
        });
    } else {
      alert('Please fill in all required fields.');
      console.error('Validation errors:', errors);
    }
  };

  const handleDeleteBook = (id) => {
    deleteBook(id)
      .then(() => {
        setBooks(books.filter((book) => book.id !== id));
      })
      .catch((error) => console.error('Error deleting book:', error));
  };


  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row">
      <div className="md:w-3/4 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">Book List</h2>
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-2 py-2">Description</th>
              <th className="border px-4 py-2">Page Count</th>
              <th className="border px-4 py-2">Excerpt</th>
              <th className="border px-4 py-2">Publish Date</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td className="border px-4 py-2">{book.id}</td>
                <td className="border px-4 py-2">{book.title}</td>
                <td className="border px-2 py-2 max-w-xs overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {book.description}
                </td>
                <td className="border px-4 py-2">{book.pageCount}</td>
                <td className="border px-4 py-2 max-w-xs overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {book.excerpt}
                </td>
                <td className="border px-4 py-2">{book.publishDate}</td>
                <td className="border px-4 py-2 flex space-x-2">
                  <Link
                    to={`/book/${book.id}`}
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                  >
                    Details
                  </Link>
                  <button
                    onClick={() => openEditModal(book)}
                    className="p-2 bg-green-500 text-white rounded hover:bg-green-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBook(book.id)}
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:w-1/4 md:ml-4 mt-4 md:mt-0">
        <h3 className="text-xl font-bold mb-2">Add New Book</h3>
        <input
          type="text"
          placeholder="Book Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          className="border px-4 py-2 w-full"
        />
        <input
          type="text"
          placeholder="Description"
          value={newBook.description}
          onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
          className="border px-4 py-2 mt-2 w-full"
        />
        <input
          type="number"
          placeholder="Page Count"
          value={newBook.pageCount}
          onChange={(e) => setNewBook({ ...newBook, pageCount: e.target.value })}
          className="border px-4 py-2 mt-2 w-full"
        />
        <input
          type="text"
          placeholder="Excerpt"
          value={newBook.excerpt}
          onChange={(e) => setNewBook({ ...newBook, excerpt: e.target.value })}
          className="border px-4 py-2 mt-2 w-full"
        />
        <button
          onClick={handleAddBook}
          className="p-2 bg-blue-500 text-white rounded mt-2 w-full hover:bg-blue-700"
        >
          Add Book
        </button>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-xl font-bold mb-2">Edit Book</h2>
            <label>Title:</label>
            <input
              type="text"
              value={editedBook.title}
              onChange={(e) => setEditedBook({ ...editedBook, title: e.target.value })}
              className="border px-4 py-2 w-full mb-2"
            />
            <label>Description:</label>
            <input
              type="text"
              value={editedBook.description}
              onChange={(e) => setEditedBook({ ...editedBook, description: e.target.value })}
              className="border px-4 py-2 w-full mb-2"
            />
            <label>Page Count:</label>
            <input
              type="number"
              value={editedBook.pageCount}
              onChange={(e) => setEditedBook({ ...editedBook, pageCount: e.target.value })}
              className="border px-4 py-2 w-full mb-2"
            />
            <label>Excerpt:</label>
            <input
              type="text"
              value={editedBook.excerpt}
              onChange={(e) => setEditedBook({ ...editedBook, excerpt: e.target.value })}
              className="border px-4 py-2 w-full mb-2"
            />
            <button
              onClick={handleEditBook}
              className="p-2 bg-green-500 text-white rounded mt-2 w-full hover:bg-green-700"
            >
              Save Changes
            </button>
            <button
              onClick={closeEditModal}
              className="p-2 bg-gray-500 text-white rounded mt-2 w-full hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;













