import {
  FETCH_HOME_ITEM_LIST_LOADING,
  REFRESH_HOME_ITEM_LIST_LOADING,
} from './types';

export const loadItemList = (limit, offset) => {
  return {
    type: FETCH_HOME_ITEM_LIST_LOADING,
    limit: limit,
    offset: offset
  };
};

export const refreshItemList = (limit, offset) => {
  return {
    type: REFRESH_HOME_ITEM_LIST_LOADING,
    limit: limit,
    offset: offset
  };
};