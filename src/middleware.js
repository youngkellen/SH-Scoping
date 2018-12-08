import {
  ASYNC_START,
  ASYNC_END,
  LOGIN,
  LOGOUT,
  REGISTER,
  LOADING
} from './constants/actionTypes';

const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    store.dispatch({ type: ASYNC_START, subtype: action.type });

    const currentView = store.getState().viewChangeCounter;
    const skipTracking = action.skipTracking;

    action.payload.then(
      res => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        action.payload = res;
        store.dispatch({ type: ASYNC_END, promise: action.payload });
        store.dispatch(action);
      },
      error => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        action.error = true;
        action.payload = {errors: "error"};
        if (!action.skipTracking) {
          store.dispatch({ type: ASYNC_END, promise: action.payload });
        }
        store.dispatch(action);
      }
    );

    return;
  }

  next(action);
};

const localStorageMiddleware = store => next => action => {
  if (action.type === REGISTER || action.type === LOGIN) {
    if (!action.error) {
      console.log(action, "action in local")
      window.localStorage.setItem('jwt', action.payload.token);
      // set token 
    }
  } else if (action.type === LOGOUT) {
    window.localStorage.setItem('jwt', '');
    store.dispatch({ type: LOGIN, payload: {}  })
    store.dispatch({ type: LOADING, payload: false })
  }

  next(action);
};

function isPromise(v) {
  return v && typeof v.then === 'function';
}


export { promiseMiddleware, localStorageMiddleware }
