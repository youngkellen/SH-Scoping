import {
    LOADING,
    MODE_CHANGE,
    SPLIT_CHANGE,
    FULL_VIEW
  } from '../constants/actionTypes';
  
  const defaultState = {
    mode: "builder",
    split: false,
    full: false
  }
  
  export default (state = defaultState, action) => {
    switch (action.type) {
      case MODE_CHANGE:
        return { ...state, mode: action.payload };
      case SPLIT_CHANGE:
        return { ...state, split: action.payload };
      case FULL_VIEW:
        return { ...state, full: action.payload };
      default:
        return state;
    }
};
  