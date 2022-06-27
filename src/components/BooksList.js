import React, { useContext } from 'react';
import _ from 'lodash';
import { useCSVDownloader } from 'react-papaparse';
import Book from './Book';
import BooksContext from '../context/BooksContext';
import CSVImport from './CSVImport';
const BooksList = () => {
  const { CSVDownloader } = useCSVDownloader();
  const { books, setBooks } = useContext(BooksContext);

  const handleRemoveBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <React.Fragment>

      <CSVImport />
      {books.length > 0 && <div className='d-flex justify-content-center my-3'>
        <CSVDownloader
          className='btn btn-success'
          filename={`Books List ${new Date().toLocaleString()}`}
          data={books}
        >
          Download List
        </CSVDownloader>
      </div>}
      <div className="book-list">
        {!_.isEmpty(books) ? (
          <>
            {
              books.map((book) => (
                <Book key={book.id} {...book} handleRemoveBook={handleRemoveBook} />
              ))
            }
          </>

        ) : (
          <p className="message">No books available. Please add some books.</p>
        )}
      </div>
    </React.Fragment>
  );
};

export default BooksList;
