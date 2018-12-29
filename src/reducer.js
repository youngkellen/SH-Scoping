import loading from './reducers/loading';
import viewMode from './reducers/viewMode';
import scope from './reducers/scope';
import exportCSV from './reducers/exportCSV';
import token from './reducers/token';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  viewMode,
  loading,
  scope,
  exportCSV,
  token,
  router: routerReducer
});
