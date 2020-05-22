import {
  FETCH_TRACK_ITEM_LIST_SUCCESS,
  FETCH_TRACK_ITEM_LIST_ERROR,
  FETCH_TRACK_ITEM_LIST_LOADING,
} from '../actions/types';

const initialState = {
  tracks: [],
  loading: false,
  error: '',
};

const tracksReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRACK_ITEM_LIST_SUCCESS:
      if (action.refresh) {
        return {
          ...state,
          loading: false,
          error: '',
          tracks: action.payload,
        };
      }
      return {
        ...state,
        loading: false,
        error: '',
        tracks: [...state.tracks, ...action.payload],
      };
    case FETCH_TRACK_ITEM_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case FETCH_TRACK_ITEM_LIST_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
      };
    default:
      return state;
  }
};

export default tracksReducers;
