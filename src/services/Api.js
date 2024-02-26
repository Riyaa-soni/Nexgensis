const apiUrl = 'https://fakerestapi.azurewebsites.net/api/v1/Books';

export const getAllBooks = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Error fetching books');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const getBookById = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`);
    if (!response.ok) {
      throw new Error('Error fetching books details');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching book details for ID ${id}:`, error);
    throw error;
  }
};

export const addBook = async (book) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });
    if (!response.ok) {
      throw new Error('Error adding book');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};

export const editBook = async (id, book) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });
    if (!response.ok) {
      throw new Error('Error editing book');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error editing book with ID ${id}:`, error);
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error deleting book');
    }
    return true; 
  } catch (error) {
    console.error(`Error deleting book with ID ${id}:`, error);
    throw error;
  }
};