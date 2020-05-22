import {
  FETCH_GENRE_ITEM_LIST_LOADING
} from './types';

const loadGenre = (offset, refresh, limit) => ({
  type: FETCH_GENRE_ITEM_LIST_LOADING,
  offset: offset,
  limit: limit,
  refresh: refresh,
});

export {loadGenre};
