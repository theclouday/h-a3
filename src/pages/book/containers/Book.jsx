import { useIntl } from 'react-intl';
import React from 'react';
import Typography from 'components/Typography';
import RenderDetails from '../сomponents/BookDetails';

function Book () {
  const { formatMessage } = useIntl();

  return (
    <>
      <Typography>
            {formatMessage({ id: 'title' })}
      </Typography>

      <RenderDetails />
    </>    
  );
}

<div>
  Hallo
</div>

export default Book;
