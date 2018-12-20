import React, { Component } from 'react';
import Entry from '../components/Entry';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import NotFound from './NotFound';
import Dashboard from './Dashboard';
import {connect} from 'react-redux';
import { SCOPE_DOWNLOAD, SCOPE_TREE, SCOPE_SELECT } from "../constants/actionTypes";

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
    const { dispatch } = this.props;
    console.log(data, "csv data")
    data = data.map((d,i) => Object.assign({}, d, {id: i}))
    dispatch({ type: SCOPE_DOWNLOAD, payload: data})
   // dispatch({type: SCOPE_SELECT, payload: scope[id]})
    let types = {}
    data.forEach((s,i) => {
      if (!types.hasOwnProperty(s.SOURCE)){
        types[s.SOURCE] = { 
          featureSet: [ 
            { 
              name: s["Feature set"], 
              features: [
                  { 
                    feature:s.Feature, id: i 
                  }
              ] 
            }
          ] 
        };
      } else {
        let pos = types[s.SOURCE].featureSet.map(e => e.name).indexOf(s["Feature set"]);
        if ( pos === -1 ) {
          types[s.SOURCE].featureSet = [...types[s.SOURCE].featureSet, { name: s["Feature set"], features: [s.Feature] }]
        } else {
          types[s.SOURCE].featureSet[pos].features = [...types[s.SOURCE].featureSet[pos].features, {feature: s.Feature, id: i}]
        }
      }
    })
    dispatch({type: SCOPE_TREE, payload: types})
    
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
