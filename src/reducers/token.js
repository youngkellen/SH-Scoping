import {
    ACCESS_TOKEN
  } from '../constants/actionTypes';
  
  const defaultState = {
    token: ""
  }
  
  export default (state = defaultState, action) => {
    switch (action.type) {
      case ACCESS_TOKEN:
        return { ...state, token: action.payload };
      default:
        return state;
    }
};
  