import { useEffect, useState } from 'react';
import MenuItem from 'components/MenuItem';
import Snackbar from 'components/Snackbar';
import { BASE_API_LINK } from 'constants/apiURL';
import Processing, { DeleteBook } from './PageProcessing';
import Link from 'components/Link';
import Button from 'components/Button';
import { useNavigate, useLocation } from 'react-router-dom';

const GET_LINK = BASE_API_LINK + '/all';

function BooksList() {
  const [books, setBooks] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFilter(params.get('filter') || '');
    setPage(parseInt(params.get('page')) || 1);
    setPerPage(parseInt(params.get('perPage')) || 10);
  
  }, [location.search]);

  useEffect(() => {
    fetch(`${GET_LINK}?filter=${filter}
                      &page=${page}
                      &perPage=${perPage}`)
        .then(response => response.json())
        .then(data => setBooks(data))
        .catch(error => console.error('Error - ', error));
  }, [filter, page, perPage]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    navigate(`?filter=${event.target.value}
            &page=${page}
            &perPage=${perPage}`);
  };

  const handleNextPage = () => {
    setPage(page + 1);
    navigate(`?filter=${filter}
              &page=${page + 1} 
              &perPage=${perPage}`);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
    navigate(`?filter=${filter}
              &page=${page - 1}
              &perPage=${perPage}`);
  };
  
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
          <input
            type='text'
            value={filter}
            onChange={handleFilterChange}
            placeholder='Filter books'
          />
        <Link href='/book/new'>
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
        <Button onClick={handlePrevPage}>Previous page</Button>
        <Button onClick={handleNextPage}>Next page</Button>
        <Snackbar 
          open={openSnackbar}
          handleClose={handleCloseSnackbar}
          message={snackbarMessage}
        />
    </div>
  );
}

export default BooksList;