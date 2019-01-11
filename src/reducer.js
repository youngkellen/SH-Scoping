import loading from './reducers/loading';
import viewMode from './reducers/viewMode';
import scope from './reducers/scope';
import tempScope from './reducers/tempScope';
import exportCSV from './reducers/exportCSV';
import token from './reducers/token';
import selectHelper from './reducers/selectHelper';
import dashboard from './reducers/dashboard';

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  viewMode,
  loading,
  scope,
  tempScope,
  exportCSV,
  token,
  selectHelper,
  dashboard,
  router: routerReducer
});

