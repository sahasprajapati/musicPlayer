import {
  FETCH_TRACK_ITEM_LIST_LOADING
} from './types';

const loadTracks = (limit, offset, playlistId, refresh) => ({
  type: FETCH_TRACK_ITEM_LIST_LOADING,
  refresh: refresh,
  offset: offset,
  limit: limit,
  playlistId: playlistId,
});

export {loadTracks};
