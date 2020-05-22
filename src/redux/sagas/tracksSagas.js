import {
  FETCH_TRACK_ITEM_LIST_SUCCESS,
  FETCH_TRACK_ITEM_LIST_ERROR,
  FETCH_TRACK_ITEM_LIST_LOADING,
} from '../actions/types';
import {put, takeEvery} from 'redux-saga/effects';

async function fetchAsync(offset, limit, playlistId) {
  //console.log('fetching data: offset' + offset + ' limit: ' +limit  + 'id' + playlistId );
  let response = await fetch(
    'https://api.napster.com/v2.0/playlists/'
    + playlistId
    + '/tracks?apikey=ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm&limit=200'
      /* +
      '&offset=' +
      {offset},*/,
  );
  if (response.ok) {
    let json = await response.json();
    //json.tracks.map(x => console.log(x.name));
    return json.tracks;
  }
  return new Error('Unknown Error in fetching track data');
}

function* fetchTrackList(action) {
  //console.log('fetchTrackList');
  let data = yield fetchAsync(action.offset, action.limit, action.playlistId);
  try {
    yield put({
      type: FETCH_TRACK_ITEM_LIST_SUCCESS,
      payload: data,
      refresh: action.refresh,
    });
  } catch (e) {
    yield put({type: FETCH_TRACK_ITEM_LIST_ERROR, error: e.message});
  }
}

function* watchFetchTrackList() {
  //console.log('Fetching Track ...' );
  yield takeEvery(FETCH_TRACK_ITEM_LIST_LOADING, fetchTrackList);
}
export default watchFetchTrackList;
