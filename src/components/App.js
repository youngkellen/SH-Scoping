import React, { Component } from 'react';
import Entry from '../components/Entry';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import NotFound from './NotFound';
import Dashboard from './Dashboard';
import { connect } from 'react-redux';
import { SCOPE_DOWNLOAD, SCOPE_TREE, SCOPE_SELECT, SCOPE_SUMMARY, SCOPE_SEARCH, ACCESS_TOKEN, EXPORT_CSV } from "../constants/actionTypes";
import getEngineerHours from "../helper/scopeSummary"

import { store } from '../store';
import { push } from 'react-router-redux';
import '../styles/app.css';
import Papa from 'papaparse';
import scope from '../reducers/scope';
import elasticlunr from "elasticlunr";
import axios from "axios"

const mapStateToProps = state => ({scope: state.scope.scope})

class App extends Component {
  constructor(props){
    super(props)
    this.index = {};
    this.search = this.search.bind(this);
    this.reIndexSearch = this.reIndexSearch.bind(this);
    let { href}  = window.location;
    if (href.includes("accessToken")){
      // this is used to get the access Token for opening google sheets
      // console.log(href, "href bro")
      let token = href.split("=")[1]
      // console.log(token, "token bro")
      this.props.dispatch({type: ACCESS_TOKEN, payload: token})
      this.getGoogleSheet(token)
    }
  }
  componentWillMount() {
    let { scope } = this.props;

    let csv = require("../assets/Scope.csv")
    let config = {
      download: true,
      header: true,
      skipEmptyLines: true,
      delimiter: ",",
      preview: 200,
      complete: ({ data }) => this.call(data)
      // Here this is also available. So we can call our custom class method
    }
    // console.log(scope, "scope bro")
    if (Object.keys(scope).length === 0){
      Papa.parse(csv, config)
    } else {
      this.reIndexSearch(scope)
    }
    
  }

  async call(data) {
    const { dispatch } = this.props;
    // console.log(data, "csv data")
    let fields = Object.keys(data[0])
    data = data.map((d, i) => Object.assign({}, d, { id: i }))
    dispatch({ type: SCOPE_DOWNLOAD, payload: data })
    // dispatch({type: SCOPE_SELECT, payload: scope[id]})
    let types = {}
    let designHours = 0;
    let engineerHours = 0;

    let index = elasticlunr(function () {
      fields.map(f => {
        this.addField(f)
      })

    });

    data.forEach((s, i) => {
      index.addDoc(s);
      designHours += Number(s["Design Estimate (Resource Hours)"]) || 0
      engineerHours = getEngineerHours(engineerHours, s)
      if (!types.hasOwnProperty(s.SOURCE)) {
        types[s.SOURCE] = {
          featureSet: [
            {
              name: s["Feature set"],
              features: [
                {
                  feature: s.Feature, id: i
                }
              ]
            }
          ]
        };
      } else {
        let pos = types[s.SOURCE].featureSet.map(e => e.name).indexOf(s["Feature set"]);
        if (pos === -1) {
          types[s.SOURCE].featureSet = [...types[s.SOURCE].featureSet, { name: s["Feature set"], features: [{ feature: [s.Feature], id: i }] }]
        } else {
          types[s.SOURCE].featureSet[pos].features = [...types[s.SOURCE].featureSet[pos].features, { feature: s.Feature, id: i }]
        }
      }
    })
    this.index = index;
    await dispatch({ type: SCOPE_TREE, payload: types });
    await dispatch({ type: SCOPE_SUMMARY, payload: { designHours: Math.round(designHours * 100) / 100, engineerHours: Math.round(engineerHours * 100) / 100, billable: 0 } })
    // let unparse = Papa.unparse(data)
    // console.log(unparse, "unparse")
    // await dispatch({ type: SCOPE_TREE, payload: types })
    // await dispatch({ type: SCOPE_SUMMARY, payload: { designHours: Math.round(designHours * 100) / 100, engineerHours: Math.round(engineerHours * 100) / 100, billable: 0 } })
    // dispatch({type: SCOPE_SEARCH, payload: index})



    // console.log(this.index, "index in app")

    


    // var doc1 = {
    //   "id": 1,
    //   "title": "Oracle released its latest database Oracle 12g",
    //   "body": "Yestaday Oracle has released its new database Oracle 12g, this would make more money for this company and lead to a nice profit report of annual year."
    // }

    // var doc2 = {
    //   "id": 2,
    //   "title": "Oracle released its profit report of 2015",
    //   "body": "As expected, Oracle released its profit report of 2015, during the good sales of database and hardware, Oracle's profit of 2015 reached 12.5 Billion."
    // }


    // index.addDoc(doc2);

  }

  async getGoogleSheet(token){
    let { scope,dispatch } = this.props;
    let copyScope = scope.slice()
    let csv = Papa.unparse(scope)
    console.log(csv, "unparse")
    let postUrl = "https://us-central1-adept-coda-226322.cloudfunctions.net/createGoogleSheetFromCSV";
    let options = { accessToken: token, csvData: csv, clientName:"newClient" };
     
    let response = await axios.post(postUrl, options);
    // console.log(response, "response in get google")
    if (response){
      dispatch({type: EXPORT_CSV, payload: false})
      window.open(response.data.googleSheetUrl, "_blank" )
    }
    
  }

  reIndexSearch(scope){
    // passed down all the way to Variant.js
    let fields = Object.keys(scope[0])
    let index = elasticlunr(function () {
      fields.map(f => {
        this.addField(f)
      })

    });
    scope.forEach(s => {
        index.addDoc(s);
    })
    this.index = index;
  }


  search(term){
    // search needs to be passed down from app to prevent unneeded re rendering
    console.log(this.index, "index in search")
    let options = {
      expand:true
    }
   let result = this.index.search(term, options);
    console.log(result, "result")
    let match = result.map(r => {
      return this.index.documentStore.getDoc(r.ref)
    })
    return match
  }

  render() {
    return (
      <div>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Entry} />
            <Route 
              exact path="/dashboard" 
              component={() => <Dashboard search={this.search} reIndexSearch={this.reIndexSearch}/>} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
