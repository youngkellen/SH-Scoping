import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react'
import { store, history, persistor} from './store';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import Modal from 'react-modal';
import App from './components/App';

import './styles/app.css';

Modal.setAppElement('#root');

ReactDOM.render((
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </ConnectedRouter>
    </PersistGate>
  </Provider>

), document.getElementById('root'));
