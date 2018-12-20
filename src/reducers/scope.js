import {
    SCOPE_DOWNLOAD,
    SCOPE_SELECT,
    SCOPE_TREE,
    SCOPE_SELECTED_FEATURES
  } from '../constants/actionTypes';
  
  const defaultState = {
    scope: [{}],
    selected: {},
    tree: {},
    features: []
  }
  
  export default (state = defaultState, action) => {
    switch (action.type) {
      case SCOPE_DOWNLOAD:
        return { ...state, scope: action.payload };
      case SCOPE_SELECT:
        return { ...state, selected: action.payload };
      case SCOPE_TREE: {
        return { ...state, tree: action.payload };
      }
      case SCOPE_SELECTED_FEATURES: {
        return { ...state, features: action.payload };
      }
      default:
        return state;
    }
};
  