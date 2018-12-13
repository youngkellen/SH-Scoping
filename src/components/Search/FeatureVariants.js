import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStatetoProps = state => ({viewMode: state.viewMode})

class FeatureVariants extends Component {

    render() {
      return (
        <div className="row">
          <div className="col-md-12"  style={{height: "100vh"}}>
          <div className ="row column_head" style={{textAlign: "center"}}>
            Feature Variants
          </div>
          <div className="row layout-pane-scroll">

          </div>
          </div>
        </div>
      );
    }
  }
  
  export default connect(mapStatetoProps)(FeatureVariants);
  