import {combineReducers} from 'redux';

import tracksReducers from './tracksReducers';
import playlistReducers from './playlistReducers';
import genreReducers from './genreReducers';

const rootReducer = combineReducers({
  tracks: tracksReducers,
  playlist: playlistReducers,
  genre: genreReducers,
});

export {rootReducer};
