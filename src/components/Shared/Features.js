import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SCOPE_SELECT } from '../../constants/actionTypes';
import Feature from './Feature'

const mapStatetoProps = state => ({ viewMode: state.viewMode, features: state.scope.features, scope: state.scope.scope, search: state.scope.search, selected: state.scope.selected })

class Features extends Component {
  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this);
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
    console.log(id)
    dispatch({type: SCOPE_SELECT, payload: scope[id]})
  }

  render() {
    console.log(this.props, "features props")
    let { features, scope, search, selected } = this.props;
    return (
      <div className="row features" style={{ minWidth: 200 }}>
        <div style={{ height: "100vh" }}>
          <div className="row column_head" style={{ textAlign: "center" }}>
            <p>Feature </p>
          </div>
          {this.renderAddNew()}
          <div className="row layout-pane-scroll">
            <ul>
              {features.map(feature => <Feature key={feature.id} search={search} inScope={scope[0]["Include in Scope?"]} id={feature.id} handleFeature={this.handleClick} feature={feature.feature} selectedId={selected.id}/>)}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStatetoProps)(Features);
