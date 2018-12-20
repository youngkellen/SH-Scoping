import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Set from './Set';

const mapStatetoProps = state => ({ viewMode: state.viewMode, scope: state.scope })

class FeatureSets extends Component {

  componentWillMount(){
    let { scope } = this.props.scope
    let types = {}
    // iterate through scope once to get the types, feature sets, and feature in a nice structure
    scope.forEach((s,i) => {
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
    console.log(types, "types bro")

  }

  getElementHeight() {
    // let height = document.getElementById("General").getBoundingClientRect().height
  }

  renderAddNew() {
    let {mode} = this.props
    if (mode === "builder"){
      return(
        <div className="add_new">
          <img src={require("../../assets/plus-black.png")} />
          <p>Add New Type</p>
        </div>
      )
    }
  }

  render() {
    let { viewMode } = this.props;
    let height = viewMode.split ? "40vh" : "90vh"
    return (
      <div className="row" style={{ minWidth: 200 }}>
        <div className="row column_head" style={{ textAlign: "center" }}>
          <p>Feature Sets</p>
        </div>
        {this.renderAddNew()}
        <div className="col-md-12" style={{ height: height, overflow: "scroll" }}>
          <div className="row layout-pane-scroll" style={{ overflowY: "scroll" }}>
            <Set />
            <Set />
            <Set />
            <Set />
            <Set />
            <Set />
            <Set />
            <Set />
            <Set />
          </div>
          <div className="row" />
        </div>
      </div>
    )
  }
}

export default connect(mapStatetoProps)(FeatureSets);
