import {
  FETCH_GENRE_ITEM_LIST_LOADING,
  FETCH_GENRE_ITEM_LIST_SUCCESS,
  FETCH_GENRE_ITEM_LIST_ERROR,
} from '../actions/types';
import {takeEvery, put} from 'redux-saga/effects';

async function fetchAsync(offset, limit) {
  //console.log('Calling fetch' + offset + ' '+ limit); 
  let response = await fetch(
    'http://api.napster.com/v2.2/genres?apikey=NTk4ZmFhZjgtZWM0My00YTllLWI4ZDMtZWVhNWMyOTRkZTkx&limit=200' +
      {limit} /*+
      '&offset=' +
      {offset},*/,
  );
  if (response.ok) {
    let json = await response.json();
    //console.log('DATA');
    //json.Genres.map(x => console.log(x));
    return json.genres;
  }
  //console.log('error');
  return new Error('UnKnow Error');
}

function* fetchList(action) {
  //console.log('Calling Async fetch');
  let data = yield fetchAsync(action.offset, action.limit);
  try {
    yield put({
      type: FETCH_GENRE_ITEM_LIST_SUCCESS,
      payload: data,
      refresh: action.refresh,
    });
  } catch (e) {
    yield put({type: FETCH_GENRE_ITEM_LIST_ERROR, error: e.message});
  }
}

function* watchFetchGenreList() {
  //console.log('Fetching...');
  yield takeEvery(FETCH_GENRE_ITEM_LIST_LOADING, fetchList);
}

export default watchFetchGenreList;
