export const validateBook = (book) => {
    const errors = {};
  
    if (!book.title) {
      errors.title = 'Title is required';
    }
  
    if (!book.description) {
      errors.description = 'Description is required';
    }
  
    if (book.pageCount <= 0) {
      errors.pageCount = 'Page Count must be greater than 0';
    }
  
    if (!book.excerpt) {
      errors.excerpt = 'Excerpt is required';
    }
  
    return errors;
  };
  