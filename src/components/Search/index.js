import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SplitterLayout from 'react-splitter-layout';
import Features from '../Shared/Features';
import FeatureSets from '../Shared/FeatureSets';
import FeatureVariants from '../Shared/FeatureVariants'
import SearchEntry from "../Search/SearchEntry";
import { SCOPE_SELECT, SCOPE_SELECTED_FEATURES, SCOPE_SEARCH, SELECT_FEATURE_SET, SELECT_SCROLL } from "../../constants/actionTypes";


const mapStatetoProps = state => ({ viewMode: state.viewMode, scope: state.scope.scope, tree: state.scope.tree, searchText: state.scope.search, library: state.library })

class Search extends Component {
  constructor() {
    super()
    this.state = {
      match: [],
      showResults: true,
      inputValue: ""
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    console.log("search will mount", this.props)
    let { scope, search } = this.props
    // let fields = Object.keys(scope[0])
    // let index = elasticlunr(function () {
    //   fields.map(f => {
    //     this.addField(f)
    //   })
    // });
    // scope.map(s => {
    //   index.addDoc(s);
    // })

    // console.log(result, "result")
    // result.map(r => {
    // })


    //console.log(index, "index in search")

  }

  componentDidMount(){
    let { searchText, viewMode, dispatch } = this.props;
    if (searchText ){
      dispatch({type: SCOPE_SEARCH, payload: ""})
      // the set timeout is needed because of the search index load time. Don't touch
      // this.setState({
      //   inputValue: searchText
      // }, () => setTimeout(() =>this.search(searchText), 500))
    }
  }

  search(value) {
    let { dispatch } = this.props;
    console.log(value, "value bro")
    let match = this.props.search(value)
    dispatch({type: SCOPE_SEARCH, payload: value})
    console.log(match, "match")
    match = match.map(m => {
      return { key: m.id, source: m.SOURCE, featureSet: m["Feature set"], library: m.library, text: `${m.SOURCE} - ${m["Feature set"]} - ${m.Feature} - ${m["Feature description"]}` }
    })
    this.setState({
      match,
      inputValue: value
    })
    dispatch({type: SELECT_SCROLL, payload: true })

    
  }
  

  handleClick(id, source, set, inLibrary){
    let { dispatch, scope, tree, library } = this.props;
    //vconsole.log(id)
    let featureSet;
    if (inLibrary){
      featureSet = library.tree[source].featureSet
    } else {
      featureSet = tree[source].featureSet
    }
    // let { featureSet } = tree[source]
    // console.log(source, "source")
    // console.log(tree[source], "tree")
    // console.log(set, "feature")
    // console.log(featureSet, "feature set in search index")
    let features;
    for (let i = 0; i < featureSet.length; i++){
      if (featureSet[i].name === set){
        features = featureSet[i];
        break
      }
    }

    let data;

    if (inLibrary){
      data = library.scope[id]
      dispatch({type: SCOPE_SELECTED_FEATURES, payload: features.features.slice().map(f => Object.assign({}, f, {temp: true, library: true}))})
      dispatch({type: SCOPE_SELECT, payload: {data, temp: true, library: true }})
      dispatch({type: SELECT_FEATURE_SET, payload: {fs: data["Feature set"], type: data.SOURCE }})
    } else {
      data = scope[id]
      dispatch({type: SCOPE_SELECTED_FEATURES, payload: features.features})
      dispatch({type: SCOPE_SELECT, payload: {data, temp: false }})
      dispatch({type: SELECT_FEATURE_SET, payload: {fs: data["Feature set"], type: data.SOURCE }})
    }
    // console.log(features, "features in search inde")
    dispatch({type: SELECT_SCROLL, payload: true })

  

    this.setState({showResults: false})
  }


  render() {
    let { match, showResults, inputValue } = this.state;
    let { searchText } = this.props;
    return (
      <div className="builder row">
        <div className="col-md-12" style={{ height: "100vh" }}>
          <div className="row form-group" style={{ margin: 0, padding: 0 }}>
            <input 
              type="search" 
              className="form-control" 
              placeholder="ENTER SEARCH TERMS" 
              value={inputValue}
              onChange={e => this.search(e.target.value)} 
              onMouseEnter={() => this.setState({showResults: true})}
            />
            <div className="search-entries" style={showResults && inputValue && match.length ? {display: "block"}: {display: "none"}} onMouseLeave={() => this.setState({showResults: false})} >
              <ul>
                {match.map(m => <SearchEntry key={m.key} search={searchText} library={m.library} featureSet={m.featureSet} source={m.source} name={m.text} id={m.key} handleClick={this.handleClick}/>)}
              </ul>
            </div>
          </div>

          <div className="row" style={{ margin: 0, padding: 0 }}>
            <SplitterLayout
              percentage
              primaryIndex={0}
              secondaryInitialSize={85}

            >
              <FeatureSets mode={"search"} />
              <SplitterLayout
                percentage
                primaryIndex={1}
                primaryInitialSize={80}
                secondaryInitialSize={20}
              >
                <Features mode={"search"} />
                <FeatureVariants mode={"search"} />
              </SplitterLayout>
            </SplitterLayout>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStatetoProps)(Search);
