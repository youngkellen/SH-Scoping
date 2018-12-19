import React, { Component } from 'react';
import Entry from '../components/Entry';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import NotFound from './NotFound';
import Dashboard from './Dashboard';
import {connect} from 'react-redux';
import { SCOPE_DOWNLOAD } from "../constants/actionTypes";

import { store } from '../store';
import { push } from 'react-router-redux';
import '../styles/app.css';
import Papa from 'papaparse';

class App extends Component {
  componentWillMount(){
    let csv = require("../assets/Scope.csv")
    let config  = {
      download: true,
      header: true,
      skipEmptyLines: true,
      delimiter: ",",	
      preview: 100,
      complete: ({data}) => this.call(data)
      // Here this is also available. So we can call our custom class method
    }
    let parse = Papa.parse(csv, config)
  }

  call(data){
    console.log(data, "csv data")
    this.props.dispatch({ type: SCOPE_DOWNLOAD, payload: data})
  }
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

export default connect()(App);
