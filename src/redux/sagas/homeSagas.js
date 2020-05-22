import {
  FETCH_ITEM_LIST_SUCCESS,
  FETCH_ITEM_LIST_ERROR,
  FETCH_ITEM_LIST_LOADING,
  REFRESH_ITEM_LIST_LOADING,
} from '../actions/types';

import {put, takeEvery} from 'redux-saga/effects';

async function fetchAsync(limit, offset) {
  console.log('Fetching...');
  // for tracks of playlist
  // /'https://api.napster.com/v2.0/playlists/' + id + '/tracks?apikey=ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm&limit=200'
  const response = await fetch(
    'https://api.napster.com/v2.0/playlists?apikey=NTk4ZmFhZjgtZWM0My00YTllLWI4ZDMtZWVhNWMyOTRkZTkx&limit='+{limit}+'&offset='+{offset});
  if (response.ok) {
    //console.log(response);
    let json = await response.json();
    //json.playlists.map(x => console.log(x));
    return json.playlists;
  }
  console.log('fail');
  throw new Error('Unexpected error!!');
}

function* fetchItemList(action) {
  console.log('fetching list..');
  try {
    const list = yield fetchAsync(action.limit, action.offset);
    console.log(action);
    yield put({type: FETCH_ITEM_LIST_SUCCESS, payload: list});
  } catch (e) {
    //console.log('error', e);
    yield put({type: FETCH_ITEM_LIST_ERROR, error: e.message});
  }
}

function* refreshItemList(action) {
  console.log('fetching list..');
  try {
    const list = yield fetchAsync(action.limit, action.offset);
    console.log(action);
    yield put({
      type: FETCH_ITEM_LIST_SUCCESS,
      payload: list,
      refresh: true,
    });
  } catch (e) {
    //console.log('error', e);
    yield put({type: FETCH_ITEM_LIST_ERROR, error: e.message});
  }
}
function* watchFetchItemList() {
  //console.log('watching fetch..');
  yield takeEvery(FETCH_ITEM_LIST_LOADING, fetchItemList);
  yield takeEvery(REFRESH_ITEM_LIST_LOADING, refreshItemList);
}

export default watchFetchItemList;
