import BooksPage from 'pages/allBooksList';
import React from 'react';

import PageContainer from './components/PageContainer';

const BooksList = (props) => {
  return (
    <PageContainer>
      <BooksPage {...props} />
    </PageContainer>
  );
};

export default BooksList;