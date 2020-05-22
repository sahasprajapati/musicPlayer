import {
  FETCH_GENRE_ITEM_LIST_SUCCESS,
  FETCH_GENRE_ITEM_LIST_ERROR,
  FETCH_GENRE_ITEM_LIST_LOADING,
} from '../actions/types';

const initialState = {
  genres: [],
  loading: false,
  error: '',
};

const genreReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GENRE_ITEM_LIST_SUCCESS:
      let ret = {
        ...state,
        loading: false,
        error: '',
      };
      action.refresh
        ? (ret = {
            ...ret,
            genres: action.payload,
          })
        : (ret = {
            ...ret,
            genres: [...ret.genres, ...action.payload],
          });
      //console.log('Returning data');
      //ret.map(x => console.log(x));
      return ret;
    case FETCH_GENRE_ITEM_LIST_ERROR:
      return {...state, error: action.error, loading: false};
    case FETCH_GENRE_ITEM_LIST_LOADING:
      return {...state, loading: true, error: ''};
    default:
      return state;
  }
};

export default genreReducers;
