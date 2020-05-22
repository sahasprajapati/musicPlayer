import {all, fork} from 'redux-saga/effects';
import watchFetchPlaylist from './playlistSagas';
import watchFetchTrackList from './tracksSagas';
import watchFetchGenreList from './genreSagas';
export function* rootSaga() {
  yield all([
    fork(watchFetchPlaylist),
    fork(watchFetchTrackList),
    fork(watchFetchGenreList),
  ]);
}
