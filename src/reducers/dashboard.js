import {
    DASHBOARD_GET_SCOPES,
    DASHBOARD_GET_SCOPEJSON
  } from '../constants/actionTypes';
  
  const defaultState = {
    scopes: [],
    json: []
  }
  
  export default (state = defaultState, action) => {
    switch (action.type) {
      case DASHBOARD_GET_SCOPES:
        return { ...state, scopes: action.payload };
        case DASHBOARD_GET_SCOPEJSON:
        return { ...state, json: action.payload };
      default:
        return state;
    }
};
  