import {
   LIBRARY_DOWNLOAD,
   LIBRARY_SELECT,
   LIBRARY_SELECTED_FEATURES,
   LIBRARY_TREE
  } from '../constants/actionTypes';
  
  const defaultState = {
    scope: [],
    selected: { temp: true, data: {} },
    tree: {},
    features: [],
  }
  
  export default (state = defaultState, action) => {
    switch (action.type) {
      case LIBRARY_DOWNLOAD:
        return { ...state, scope: action.payload };
      case LIBRARY_SELECT:
        return { ...state, selected: action.payload };
      case LIBRARY_TREE: {
        return { ...state, tree: action.payload };
      }
      case LIBRARY_SELECTED_FEATURES: {
        return { ...state, features: action.payload };
      }
      default:
        return state;
    }
  };
  