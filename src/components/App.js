import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Entry from '../components/Entry';
import Header from './Header';
import NotFound from './NotFound';
import Project from './Project';
import Dashboard from './Dashboard';
import { connect } from 'react-redux';
import {
  SCOPE_DOWNLOAD, SCOPE_TREE, SCOPE_SELECT, SELECT_FEATURE_SET, SCOPE_SELECTED_FEATURES, SCOPE_SUMMARY, SCOPE_SEARCH, ACCESS_TOKEN, EXPORT_CSV, SCOPE_TOKEN, DASHBOARD_GET_SCOPES, DASHBOARD_GET_SCOPEJSON
} from '../constants/actionTypes';
import getEngineerHours from '../helper/scopeSummary';

import { store } from '../store';
import { push } from 'react-router-redux';
import '../styles/app.css';
import Papa from 'papaparse';
import scope from '../reducers/scope';
import elasticlunr from 'elasticlunr';
import axios from 'axios';


const mapStateToProps = state => ({ scope: state.scope.scope, token: state.token });
const MODE = process.env.NODE_ENV;


class App extends Component {
  constructor(props) {
    super(props);
    this.index = {};
    this.search = this.search.bind(this);
    this.reIndexSearch = this.reIndexSearch.bind(this);
    this.call = this.call.bind(this);
    const { href } = window.location;

    this.state = {
      getScopeToken: href.includes('access_token')
    }
    console.log(href, 'look bro');

    if (href.includes('accessToken')) {
      // this is used to get the access Token for opening google sheets
      const token = href.split('=')[1];
      // console.log(token, "token bro")
      this.props.dispatch({ type: ACCESS_TOKEN, payload: token });
      this.getGoogleSheet(token);
    } else if (href.includes('access_token')) {
      // used for getting scopes from gcp
      const token = href.split('=')[1].split('&')[0];
      this.getScopes(token)
      this.props.dispatch({ type: SCOPE_TOKEN, payload: token });
    }

  }

  componentWillMount() {
    const { scope } = this.props;

    // const csv = require('../assets/Scope.csv');
    // const config = {
    //   download: true,
    //   header: true,
    //   skipEmptyLines: true,
    //   delimiter: ',',
    //   preview: 100,
    //   complete: ({ data }) => this.call(data),
    //   // Here this is also available. So we can call our custom class method
    // };
    // console.log(scope, "scope bro")
    if (Object.keys(scope).length === 0) {
      // Papa.parse(csv, config);
    } else {
      this.reIndexSearch(scope);
    }
  }



  async componentDidMount() {
    const { dispatch } = this.props;
    const { scopeToken } = this.props.token;
    const { getScopeToken } = this.state;
    const bucket = 'sh-scoping-scopes';
    const redirectUrl = MODE === 'development' ? 'http://localhost:3000/dashboard' : 'https://sh-scoping.appspot.com/dashboard';
    const clientId = '941945287972-ve1u0pp1qs7glbj57rqfd4s7qp7al57o.apps.googleusercontent.com';

    const scope = 'https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/devstorage.read_write';
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=token&scope=${scope}&include_granted_scopes=true`;
    if (!scopeToken && !getScopeToken) {
      window.open(url, '_self');
    } else {
      this.getScopes(scopeToken)
    }


    // window.open("https://accounts.google.com/o/oauth2/v2/auth", params)
    // console.log(pleaseWork, "please work ")
  }

  async getScopes(scopeToken) {
    const { dispatch } = this.props;

    const bucket = 'sh-scoping-scopes';
    const redirectUrl = MODE === 'development' ? 'http://localhost:3000/dashboard' : 'https://sh-scoping.appspot.com/dashboard';
    const clientId = '941945287972-ve1u0pp1qs7glbj57rqfd4s7qp7al57o.apps.googleusercontent.com';
    let option = {
      headers: {
        Authorization: `Bearer ${scopeToken}`
      }
    }
    console.log(scopeToken, "scope token man")
    let scopeList = await axios.get(`https://www.googleapis.com/storage/v1/b/${bucket}/o?access_token=${scopeToken}`)
    console.log(scopeList, "scope list")
    // Filter the folder and get the files in the folder
    let scopes = scopeList.data.items.filter(i => i.size != "0" && !i.name.includes("json"))
    let scopeJSON = scopeList.data.items.filter(i => i.size != "0" && i.name.includes("json"))
    // scopeJSON = Promise.all(scopeJSON.map(async (s) => {
    //   s = await axios.get(s.mediaLink, option)
    //   return s.data
    // })
    // )
    console.log(scopeJSON, "scope json")
    dispatch({ type: DASHBOARD_GET_SCOPES, payload: scopes })
    dispatch({ type: DASHBOARD_GET_SCOPEJSON, payload: scopeJSON })
  }



  async getGoogleSheet(token) {
    const { scope, dispatch } = this.props;
    const copyScope = scope.slice();
    const csv = Papa.unparse(scope);
    console.log(csv, 'unparse');
    const postUrl = 'https://us-central1-adept-coda-226322.cloudfunctions.net/createGoogleSheetFromCSV';
    const options = { accessToken: token, csvData: csv, clientName: 'newClient' };

    const response = await axios.post(postUrl, options);
    // console.log(response, "response in get google")
    if (response) {
      dispatch({ type: EXPORT_CSV, payload: false });
      window.open(response.data.googleSheetUrl, '_blank');
    }
  }
  async call(data) {
    const { dispatch } = this.props;
    // console.log(data, "csv data")
    const fields = Object.keys(data[0]);
    data = data.map((d, i) => Object.assign({}, d, { id: i }));
    dispatch({ type: SCOPE_DOWNLOAD, payload: data });
    dispatch({type: SCOPE_SELECTED_FEATURES, payload: [] })
    dispatch({type: SCOPE_SELECT, payload: {data: {}, temp: false }})
    dispatch({type: SELECT_FEATURE_SET, payload: {}})

    // dispatch({type: SCOPE_SELECT, payload: scope[id]})
    const types = {};
    let designHours = 0;
    let engineerHours = 0;

    const index = elasticlunr(function () {
      fields.map((f) => {
        this.addField(f);
      });
    });

    data.forEach((s, i) => {
      index.addDoc(s);
      designHours += Number(s['Design Estimate (Resource Hours)']) || 0;
      engineerHours = getEngineerHours(engineerHours, s);
      if (!types.hasOwnProperty(s.SOURCE)) {
        types[s.SOURCE] = {
          featureSet: [
            {
              name: s['Feature set'],
              features: [
                {
                  feature: s.Feature, id: i,
                },
              ],
            },
          ],
        };
      } else {
        const pos = types[s.SOURCE].featureSet.map(e => e.name).indexOf(s['Feature set']);
        if (pos === -1) {
          types[s.SOURCE].featureSet = [...types[s.SOURCE].featureSet, { name: s['Feature set'], features: [{ feature: [s.Feature], id: i }] }];
        } else {
          types[s.SOURCE].featureSet[pos].features = [...types[s.SOURCE].featureSet[pos].features, { feature: s.Feature, id: i }];
        }
      }
    });
    this.index = index;
    await dispatch({ type: SCOPE_TREE, payload: types });
    await dispatch({ type: SCOPE_SUMMARY, payload: { designHours: Math.round(designHours * 100) / 100, engineerHours: Math.round(engineerHours * 100) / 100, billable: 0 } });
  }

  reIndexSearch(scope) {
    // passed down all the way to Variant.js
    const fields = Object.keys(scope[0]);
    const index = elasticlunr(function () {
      fields.map((f) => {
        this.addField(f);
      });
    });
    scope.forEach((s) => {
      index.addDoc(s);
    });
    this.index = index;
  }


  search(term) {
    // search needs to be passed down from app to prevent unneeded re rendering
    console.log(this.index, 'index in search');
    const options = {
      expand: true,
    };
    const result = this.index.search(term, options);
    console.log(result, 'result');
    const match = result.map((r) => this.index.documentStore.getDoc(r.ref));
    return match;
  }

  render() {
    return (
      <div>
        <div>
          <Header location={this.props.location} />
          <Switch>
            <Route exact path="/" component={Entry} />
            <Route
              exact
              path="/project"
              component={() => <Project search={this.search} reIndexSearch={this.reIndexSearch} />}
            />
            <Route
              exact
              path="/dashboard"
              component={() => <Dashboard call={this.call}/>}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
