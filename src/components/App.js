import React, { Component } from 'react';
import Entry from '../components/Entry';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import NotFound from './NotFound';
import Dashboard from './Dashboard';

import { store } from '../store';
import { push } from 'react-router-redux';
import '../styles/app.css';

class App extends Component {
  render() {
    return (
      <div>
          <div>
            <Header/>
            <Switch>
              <Route exact path="/" component={Entry}/>
              <Route exact path="/dashboard" component={Dashboard}/>
              <Route component={NotFound} />
            </Switch>
        </div>
      </div>
    );
  }
}

export default App;
