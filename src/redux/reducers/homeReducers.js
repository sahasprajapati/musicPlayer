import {
  FETCH_ITEM_LIST_ERROR,
  FETCH_ITEM_LIST_SUCCESS,
  FETCH_ITEM_LIST_LOADING,
} from '../actions/types';
const initialState = {
  items: [],
  loading: false,
  error: '',
};

const homeReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEM_LIST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case FETCH_ITEM_LIST_SUCCESS:
      //console.log(action.payload);
      let ret;
      action.refresh
        ? (ret = {
            ...state,
            items: action.payload,
            loading: false,
          })
        : (ret = {
            ...state,
            items: [...state.items, ...action.payload],
            loading: false,
          });
      return ret;
    case FETCH_ITEM_LIST_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default homeReducers;
