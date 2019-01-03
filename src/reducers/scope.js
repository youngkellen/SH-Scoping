import {
    SCOPE_DOWNLOAD,
    SCOPE_SELECT,
    SCOPE_TREE,
    SCOPE_SELECTED_FEATURES,
    SCOPE_SUMMARY,
    SCOPE_SEARCH,
    SCOPE_ADD
  } from '../constants/actionTypes';
  
  const defaultState = {
    scope: [{}],
    selected: {temp: false, data: {}},
    tree: {},
    features: [],
    scopeSummary: { designHours: 0, engineerHours: 0, billable: 0 },
    search: ""

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
      case SCOPE_SUMMARY: {
        return { ...state, scopeSummary: action.payload };
      }
      case SCOPE_SEARCH: {
        return { ...state, search: action.payload };
      }
      case SCOPE_ADD:
        return { ...state, scope: [...state.scope, action.payload] };
      default:
        return state;
    }
};
  