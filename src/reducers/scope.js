import {
  SCOPE_DOWNLOAD,
  SCOPE_SELECT,
  SCOPE_TREE,
  SCOPE_SELECTED_FEATURES,
  SCOPE_SUMMARY,
  SCOPE_SEARCH,
  SCOPE_ADD,
  SCOPE_SCOPE_EDIT,
  SCOPE_SCOPE_REMOVE,
  SCOPE_PREVIOUS_SELECT,
  SCOPE_NAME,
  SCOPE_DOWNLOAD_LINK,
  SCOPE_JSON
} from '../constants/actionTypes';

const defaultState = {
  scope: [],
  selected: { temp: false, data: {} },
  tree: {},
  features: [],
  scopeSummary: { designHours: 0, engineerHours: 0, billable: 0 },
  search: "",
  scopeName: "",
  downloadLink: "",
  scopeJSON: {}

}

export default (state = defaultState, action) => {
  switch (action.type) {
    case SCOPE_DOWNLOAD:
      return { ...state, scope: action.payload };
    case SCOPE_SELECT:
      return { ...state, selected: action.payload };
    case SCOPE_PREVIOUS_SELECT:
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
    case SCOPE_SCOPE_REMOVE:
      return {
        ...state, scope: [...state.scope.filter(s => {
          if (s.id !== action.payload.id) {
            return s
          }
        })]
      };
    case SCOPE_SCOPE_EDIT:
      return {
        ...state, scope: state.scope.map(t => {
          if (t.id === action.payload.id) {
            t[action.payload.prop] = action.payload.value;
          }
          return t
        })
      }
    case SCOPE_NAME:
      return { ...state, scopeName: action.payload }
    case SCOPE_DOWNLOAD_LINK:
      return { ...state, downloadLink: action.payload }
    case SCOPE_JSON:
      return { ...state, scopeJSON: action.payload }
    default:
      return state;
  }
};
