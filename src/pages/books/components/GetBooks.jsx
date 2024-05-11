import { useEffect, useState } from 'react';
import MenuItem from 'components/MenuItem';
import {BASE_API_LINK} from '../constants/url';
import ProceedDeleteBooks, { DeleteBook } from './ProceedDeleteBooks';

const GET_LINK = BASE_API_LINK + '/all';

function BooksList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(GET_LINK)
        .then(response => response.json())
        .then(data => setBooks(data))
        .catch(error => console.error('Error - ', error));
  }, []);
  
  const handleDelete = (id) => {
    DeleteBook(id)
      .then(() => {
        setBooks(books.filter(book => book.id !== id));
    })
      .catch(error => console.error('Error when trying delete book: ', error));
  }

  return (
        <div className='book-list'>
        {books.map((book, index) => (
          <MenuItem key={index}>
              <ProceedDeleteBooks 
                book={book}
                onDelete={handleDelete}
                />
          </MenuItem>
        ))}
    </div>
  );
}

export default BooksList;