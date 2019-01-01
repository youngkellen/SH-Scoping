import {
    TEMPSCOPE_DOWNLOAD,
    TEMPSCOPE_SELECT,
    TEMPSCOPE_TREE,
    TEMPSCOPE_SELECTED_FEATURES,
    TEMPSCOPE_ADD
  } from '../constants/actionTypes';
  
  const defaultState = {
    tempScope: [],
    tempSelected: {},
    tempTree: {},
    tempFeatures: []
  }
  
  export default (state = defaultState, action) => {
    switch (action.type) {
      case TEMPSCOPE_DOWNLOAD:
        return { ...state, tempScope: action.payload };
      case TEMPSCOPE_SELECT:
        return { ...state, tempSelected: action.payload };
      case TEMPSCOPE_TREE: {
        return { ...state, tempTree: action.payload };
      }
      case TEMPSCOPE_SELECTED_FEATURES: {
        return { ...state, tempFeatures: action.payload };
      }
      case TEMPSCOPE_ADD: {
          console.log(action.payload, "payload bro")
        return { ...state, tempScope: [...state.tempScope, action.payload] };
      }
      default:
        return state;
    }
};
  