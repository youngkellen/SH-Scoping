import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Variant from './Variant';

const mapStatetoProps = state => ({ viewMode: state.viewMode });

class FeatureVariants extends Component {


  render() {
    let { viewMode } = this.props;
    let height = viewMode.split ? "40vh" : "76vh"
    return (
      <div className="row">
        <div
          className="col-md-12"
          style={{ height: "100vh", minWidth: "550px" }}
        >
          <div className="row column_head" style={{ textAlign: "center" }}>
            Feature Variants
          </div>
          <div className="col-md-12" style={{ height: height, overflow: "scroll" }}>
            <div className="row layout-pane-scroll" style={{ overflowY: "scroll" }}>
              <Variant />
              <Variant />
              <Variant />
              <Variant />
              <Variant />
              <Variant />
              <Variant />
              <Variant />

            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default connect(mapStatetoProps)(FeatureVariants);
