import {
    TEMPSCOPE_DOWNLOAD,
    TEMPSCOPE_SELECT,
    TEMPSCOPE_TREE,
    TEMPSCOPE_SELECTED_FEATURES,
    TEMPSCOPE_ADD,
    TEMPSCOPE_REMOVE,
    TEMPSCOPE_SCOPE_EDIT
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
        return { ...state, tempScope: [...state.tempScope, action.payload] };
      }
      case TEMPSCOPE_REMOVE: {
        return { ...state, tempScope: state.tempScope.filter(t => {
          if (t.id !== action.payload){
            return t
          }
        })}
      }
      case TEMPSCOPE_SCOPE_EDIT:
      return { ...state, tempScope: state.tempScope.map(t => {
        if (t.id === action.payload.id) {
          t[action.payload.prop] = action.payload.value;
        }
        return t
        })
      }
      default:
        return state;
    }
};
  