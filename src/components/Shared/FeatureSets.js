import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Set from './Set';

const mapStatetoProps = state => ({ viewMode: state.viewMode, scope: state.scope })

class FeatureSets extends Component {

  componentWillMount(){
   

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
    let { tree } = this.props.scope
    let height = viewMode.split ? "40vh" : "90vh";
    let types = Object.keys(tree)
    let featureSets = []
    console.log(types, "types sets")
    return (
      <div className="row" style={{ minWidth: 200 }}>
        <div className="row column_head" style={{ textAlign: "center" }}>
          <p>Feature Sets</p>
        </div>
        {this.renderAddNew()}
        <div className="col-md-12" style={{ height: height, overflow: "scroll" }}>
          <div className="row layout-pane-scroll" style={{ overflowY: "scroll" }}>
           {types.map((type,i) => <Set key={i} type={type} featureSets={tree[type]}/>)}
          </div>
          <div className="row" />
        </div>
      </div>
    )
  }
}

export default connect(mapStatetoProps)(FeatureSets);
