import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Variant from './Variant';

const mapStatetoProps = state => ({ viewMode: state.viewMode });

class FeatureVariants extends Component {

  
  render() {
    return (
      <div className="row">
        <div
          className="col-md-12"
          style={{ height: "100vh", minWidth: "550px" }}
        >
          <div className="row column_head" style={{ textAlign: "center" }}>
            Feature Variants
          </div>
          <div className="row layout-pane-scroll ">
           <Variant/>
           <Variant/>
           <Variant/>
           <Variant/>
           
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStatetoProps)(FeatureVariants);
