import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Set from './Set';

const mapStatetoProps = state => ({ viewMode: state.viewMode })

class FeatureSets extends Component {

  getElementHeight() {
    // let height = document.getElementById("General").getBoundingClientRect().height
    // console.log(height, "height")
  }


  render() {
    let { viewMode } = this.props;
    let height = viewMode.split ? "40vh" : "76vh"
    return (
      <div className="row">
        <div className="row column_head" style={{ textAlign: "center" }}>
          Feature Sets
        </div>
        <div className="col-md-12" style={{ height: height, overflow: "scroll" }}>
          <div className="row layout-pane-scroll" style={{ overflowY: "scroll" }}>
            <Set />
          </div>
          <div className="row" />
        </div>
      </div>
    )
  }
}

export default connect(mapStatetoProps)(FeatureSets);
