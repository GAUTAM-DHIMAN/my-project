import React, { useState } from 'react';

const initialBooks = [
  { id: 1, title: '1984', author: 'George Orwell' },
  { id: 2, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
];

const LibraryManagement = () => {
  const [books, setBooks] = useState(initialBooks);
  const [searchTerm, setSearchTerm] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddBook = (e) => {
    e.preventDefault();
    if (newTitle && newAuthor) {
      const newBook = {
        id: Date.now(),
        title: newTitle,
        author: newAuthor,
      };
      setBooks([...books, newBook]);
      setNewTitle('');
      setNewAuthor('');
    }
  };

  const handleRemoveBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div className="library-container">
      <h2>Library Management</h2>

      <input
        type="text"
        placeholder="Search by title or author"
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <form className="add-book-form" onSubmit={handleAddBook}>
        <input
          type="text"
          placeholder="New book title"
          className="add-book-input"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="New book author"
          className="add-book-input"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
        />
        <button type="submit">Add Book</button>
      </form>

      <ul className="book-list">
        {filteredBooks.map((book) => (
          <li key={book.id} className="book-item">
            <div className="book-info">
              <span className="title">{book.title}</span> by <span>{book.author}</span>
            </div>
            <button className="remove-button" onClick={() => handleRemoveBook(book.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LibraryManagement;