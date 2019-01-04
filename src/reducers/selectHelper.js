import {
    SELECT_FEATURE_SET,
    SELECT_SCROLL
  } from '../constants/actionTypes';
  
  const defaultState = {
    select: {},
    scroll: true
  }
  
  export default (state = defaultState, action) => {
    switch (action.type) {
      case SELECT_FEATURE_SET:
        return { ...state, select: action.payload };
      case SELECT_SCROLL:
        return { ...state, scroll: action.payload };
      default:
        return state;
    }
};
  