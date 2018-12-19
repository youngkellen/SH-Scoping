import {
    SCOPE_DOWNLOAD,
    SCOPE_SELECT
  } from '../constants/actionTypes';
  
  const defaultState = {
    scope: [{}],
    selected: {}
  }
  
  export default (state = defaultState, action) => {
    switch (action.type) {
      case SCOPE_DOWNLOAD:
        return { ...state, scope: action.payload };
      case SCOPE_SELECT:
        return { ...state, selected: action.payload };
      default:
        return state;
    }
};
  