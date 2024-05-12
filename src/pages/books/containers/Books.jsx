import { useIntl } from 'react-intl';
import React from 'react';
import Typography from 'components/Typography';
import BooksList from '../components/BooksList';

function Books() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Typography>
        <h2>{formatMessage({ id: 'title' })}</h2>
      </Typography>
      
      <BooksList />
    </>
   
  );
}

export default Books;
