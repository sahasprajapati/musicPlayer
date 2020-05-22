import {
  FETCH_PLAYLIST_ITEM_LIST_SUCCESS,
  FETCH_PLAYLIST_ITEM_LIST_ERROR,
  FETCH_PLAYLIST_ITEM_LIST_LOADING,
} from '../actions/types';

const initialState = {
  playlists: [],
  loading: false,
  error: '',
};

const playlistReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLAYLIST_ITEM_LIST_SUCCESS:
      let ret = {
        ...state,
        loading: false,
        error: '',
      };
      action.refresh
        ? (ret = {
            ...ret,
            playlists: action.payload,
          })
        : (ret = {
            ...ret,
            playlists: [...ret.playlists, ...action.payload],
          });
      //console.log('Returning data');
      //ret.map(x => console.log(x));
      return ret;
    case FETCH_PLAYLIST_ITEM_LIST_ERROR:
      return {...state, error: action.error, loading: false};
    case FETCH_PLAYLIST_ITEM_LIST_LOADING:
      return {...state, loading: true, error: ''};
    default:
      return state;
  }
};

export default playlistReducers;
