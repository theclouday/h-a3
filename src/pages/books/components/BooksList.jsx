import { useEffect, useState } from 'react';
import MenuItem from 'components/MenuItem';
import Snackbar from 'components/Snackbar';
import { BASE_API_LINK } from 'constants/apiURL';
import Processing, { DeleteBook } from './PageProcessing';
import Link from 'components/Link';
import Button from 'components/Button';

const GET_LINK = BASE_API_LINK + '/all';

function BooksList() {
  const [books, setBooks] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

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
        setSnackbarMessage('Done!');
    })
      .catch(error => console.error('Error when trying delete book: ', error))
        setSnackbarMessage('Error when trying delete book');
        setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
        <div className='book-list'>
        <Link href='book/new'>
          <Button>Додати книгу</Button>
        </Link>
        {books.map((book, index) => (
          <MenuItem key={index}>
              <Processing 
                book={book}
                onDelete={handleDelete}
                />
          </MenuItem>
        ))}
        <Snackbar 
          open={openSnackbar}
          handleClose={handleCloseSnackbar}
          message={snackbarMessage}
        />
    </div>
  );
}

export default BooksList;