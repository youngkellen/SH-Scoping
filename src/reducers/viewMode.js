import {
    LOADING,
    MODE_CHANGE
  } from '../constants/actionTypes';
  
  const defaultState = {
    mode: "builder"
  }
  
  export default (state = defaultState, action) => {
    switch (action.type) {
      case MODE_CHANGE:
        return { ...state, mode: action.payload };
      default:
        return state;
    }
};
  