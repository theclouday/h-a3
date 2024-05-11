import { useIntl } from 'react-intl';
import React from 'react';
import Typography from 'components/Typography';

function Book () {
  const { formatMessage } = useIntl();

  return (
    <Typography>
      {formatMessage({ id: 'title' })}
    </Typography>
  );
}

<div>
  Hallo
</div>

export default Book;
