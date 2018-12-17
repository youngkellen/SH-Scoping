import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStatetoProps = state => ({ viewMode: state.viewMode })

class Feature extends Component {
  componentDidMount() {

  }

  renderAddNew() {
    let {mode} = this.props
    if (mode === "builder"){
      return (
        <div className="add_new">
          <img src={require("../../assets/plus-black.png")} />
          <p>Add New Feature</p>
        </div>
      )
    }
   
  }

  render() {
    return (
      <div className="row" style={{ minWidth: 200 }}>
        <div style={{ height: "100vh" }}>
          <div className="row column_head" style={{ textAlign: "center" }}>
            <p>Feature </p>
          </div>
          {this.renderAddNew()}
          <div className="row layout-pane-scroll">
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStatetoProps)(Feature);
