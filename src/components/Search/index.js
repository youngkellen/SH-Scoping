import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SplitterLayout from 'react-splitter-layout';
import Features from '../Shared/Features';
import FeatureSets from '../Shared/FeatureSets';
import FeatureVariants from '../Shared/FeatureVariants'
import SearchEntry from "../Search/SearchEntry";
import { SCOPE_SELECT, SCOPE_SELECTED_FEATURES } from "../../constants/actionTypes";


const mapStatetoProps = state => ({ viewMode: state.viewMode, scope: state.scope.scope, tree: state.scope.tree })

class Search extends Component {
  constructor() {
    super()
    this.state = {
      match: [],
      showResults: true
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

  search(value) {
    let match = this.props.search(value)
    console.log(match, "match")
    match = match.map(m => {
      return { key: m.id, source: m.SOURCE, featureSet: m["Feature set"], text: `${m.SOURCE} - ${m["Feature set"]} - ${m.Feature} - ${m["Feature description"]}` }
    })
    this.setState({
      match
    })
  }

  handleClick(id, source, set){
    let { dispatch, scope, tree } = this.props;
    console.log(id)
    let { featureSet } = tree[source]
    console.log(source, "source")
    console.log(tree[source], "tree")
    console.log(set, "feature")
    console.log(featureSet, "feature set in search index")
    let features;
    for (let i = 0; i < featureSet.length; i++){
      if (featureSet[i].name === set){
        features = featureSet[i];
        break
      }
    }
    console.log(features, "features in search inde")
    dispatch({type: SCOPE_SELECTED_FEATURES, payload: features.features})
    dispatch({type: SCOPE_SELECT, payload: scope[id]})
  }


  render() {
    let { match, showResults } = this.state;
    return (
      <div className="builder row">
        <div className="col-md-12" style={{ height: "100vh" }}>
          <div className="row form-group" style={{ margin: 0, padding: 0 }}>
            <input 
              type="search" 
              className="form-control" 
              placeholder="ENTER SEARCH TERMS" 
              onChange={e => this.search(e.target.value)} 
              onMouseEnter={() => this.setState({showResults: true})}
            />
            <div className="search-entries" style={showResults ? {display: "block"}: {display: "none"}} onMouseLeave={() => this.setState({showResults: false})} >
              <ul>
                {match.map(m => <SearchEntry key={m.key} featureSet={m.featureSet} source={m.source} name={m.text} id={m.key} handleClick={this.handleClick}/>)}
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
