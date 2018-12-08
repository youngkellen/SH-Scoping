import loading from './reducers/loading';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  loading,
  router: routerReducer
});
