import loading from './reducers/loading';
import viewMode from './reducers/viewMode'
;import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  viewMode,
  loading,
  router: routerReducer
});
