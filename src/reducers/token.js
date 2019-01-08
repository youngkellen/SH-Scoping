import {
    ACCESS_TOKEN,
    SCOPE_TOKEN
  } from '../constants/actionTypes';
  
  const defaultState = {
    token: "",
    scopeToken: ""
  }
  
  export default (state = defaultState, action) => {
    switch (action.type) {
      case ACCESS_TOKEN:
        // used for google sheet csv
        return { ...state, token: action.payload };
      case SCOPE_TOKEN:
        // used for scope read and write
        return { ...state, scopeToken: action.payload };
      default:
        return state;
    }
};
  