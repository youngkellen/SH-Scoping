import {
    EXPORT_CSV
  } from '../constants/actionTypes';
  
  const defaultState = {
    exportCSV: false
  }
  
  export default (state = defaultState, action) => {
    switch (action.type) {
      case EXPORT_CSV:
        return { ...state, exportCSV: action.payload };
      default:
        return state;
    }
};
  