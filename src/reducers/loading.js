import {
    LOADING
  } from '../constants/actionTypes';
  
  const defaultState = {
    loading: false
  }
  
  export default (state = defaultState, action) => {
    switch (action.type) {
      case LOADING:
        return { ...state, loading: action.payload };
      default:
        return state;
    }
};
  