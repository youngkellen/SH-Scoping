import React, { Component } from 'react';
import Entry from '../components/Entry';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import NotFound from './NotFound';
import Dashboard from './Dashboard';
import {connect} from 'react-redux';
import { SCOPE_DOWNLOAD, SCOPE_TREE, SCOPE_SELECT, SCOPE_SUMMARY } from "../constants/actionTypes";
import getEngineerHours from "../helper/scopeSummary"

import { store } from '../store';
import { push } from 'react-router-redux';
import '../styles/app.css';
import Papa from 'papaparse';
import scope from '../reducers/scope';

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
    let designHours = 0;
    let engineerHours = 0;
    data.forEach((s,i) => {
      designHours+= Number(s["Design estimate (resource days)"]) || 0
      engineerHours = getEngineerHours(engineerHours, s)
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
          types[s.SOURCE].featureSet = [...types[s.SOURCE].featureSet, { name: s["Feature set"], features: [{ feature:[s.Feature], id: i }] } ]
        } else {
          types[s.SOURCE].featureSet[pos].features = [...types[s.SOURCE].featureSet[pos].features, {feature: s.Feature, id: i}]
        }
      }
    })
    dispatch({type: SCOPE_TREE, payload: types})
    dispatch({type: SCOPE_SUMMARY, payload: {designHours: Math.round(designHours * 100) / 100, engineerHours: Math.round(engineerHours * 100) / 100, billable: 0} })
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
