import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStatetoProps = state => ({viewMode: state.viewMode})

class Search extends Component {

    render() {
      return (
        <div className="row">
          <div className="col-md-12">
             Search
          </div>
        </div>
      );
    }
  }
  
  export default connect(mapStatetoProps)(Search);
  