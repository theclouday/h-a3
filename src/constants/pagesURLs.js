import * as pages from './pages';
import config from 'config';

const result = {
  [pages.defaultPage]: `${config.UI_URL_PREFIX}/${pages.defaultPage}`,
  [pages.login]: `${config.UI_URL_PREFIX}/${pages.login}`,
  [pages.secretPage]: `${config.UI_URL_PREFIX}/${pages.secretPage}`,
  [pages.booksPage]: `${config.UI_URL_PREFIX}/${pages.booksPage}`,
  [pages.bookPage]: `${config.UI_URL_PREFIX}/${pages.bookPage}`,
  [pages.newBookPage]: `${config.UI_URL_PREFIX}/${pages.newBookPage}`
};

export default result;
