import {
    LOADING,
    MODE_CHANGE,
    SPLIT_CHANGE
  } from '../constants/actionTypes';
  
  const defaultState = {
    mode: "builder",
    split: false
  }
  
  export default (state = defaultState, action) => {
    switch (action.type) {
      case MODE_CHANGE:
        return { ...state, mode: action.payload };
        case SPLIT_CHANGE:
        return { ...state, split: action.payload };
      default:
        return state;
    }
};
  