import {
  FETCH_PLAYLIST_ITEM_LIST_LOADING
} from './types';

const loadPlaylist = (offset, refresh, limit) => ({
  type: FETCH_PLAYLIST_ITEM_LIST_LOADING,
  offset: offset,
  limit: limit,
  refresh: refresh,
});

export {loadPlaylist};
