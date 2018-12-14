import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStatetoProps = state => ({viewMode: state.viewMode})

class Feature extends Component {
  componentDidMount(){
   
  }

    render() {
      return (
        <div className="row" style={{minWidth: 200}}>
          <div className="col-md-12"  style={{height: "100vh"}}>
            <div className ="row column_head" style={{textAlign: "center"}}>
              Feature 
            </div>
            <div className="row layout-pane-scroll">
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default connect(mapStatetoProps)(Feature);
  