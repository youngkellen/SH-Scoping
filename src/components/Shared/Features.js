import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SCOPE_SELECT } from '../../constants/actionTypes';

const mapStatetoProps = state => ({ viewMode: state.viewMode, features: state.scope.features, scope: state.scope })

class Feature extends Component {
  componentDidMount() {

  }

  renderAddNew() {
    let { mode } = this.props
    if (mode === "builder") {
      return (
        <div className="add_new">
          <img src={require("../../assets/plus-black.png")} />
          <p>Add New Feature</p>
        </div>
      )
    }

  }

  handleClick(id){
    let { dispatch, scope } = this.props;
    // dispatch({type: SCOPE_SELECT, payload: scope[id]})
  }

  render() {
    let { features } = this.props;
    return (
      <div className="row" style={{ minWidth: 200 }}>
        <div style={{ height: "100vh" }}>
          <div className="row column_head" style={{ textAlign: "center" }}>
            <p>Feature </p>
          </div>
          {this.renderAddNew()}
          <div className="row layout-pane-scroll">
            <ul>
              {features.map(feature => <li onClick={() => this.handleClick(feature.id)}>{feature.feature}</li>)}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStatetoProps)(Feature);
