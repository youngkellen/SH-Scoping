import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Type from './Type';
import NewType from "../Builder/NewType"
import { TEMPSCOPE_ADD, TEMPSCOPE_TREE } from '../../constants/actionTypes';
import newRow from "../../helper/newRow"
import buildTree from "../../helper/buildTree"

const mapStatetoProps = state => ({ viewMode: state.viewMode, scope: state.scope, tempScope: state.tempScope })

class FeatureSets extends Component {
  state = {
    tempRow: []
  }
  addNewType = this.addNewType.bind(this);
  setToTempScope = this.setToTempScope.bind(this);

  componentDidMount(){
   
  }

  addNewType(){
    // adds a input for creating a new type
    this.setState(prevState=>({
      tempRow: [...prevState.tempRow, {}]
    }))
  }

  async setToTempScope(id, source){
    let { tempRow } = this.state;
    let { dispatch, tempScope } = this.props;
    tempRow.splice(id, 1)
    console.log(tempRow, "temp Row")
    this.setState({
      tempRow
    })
    if (source){
      await dispatch({type: TEMPSCOPE_ADD, payload: new newRow(source)})
      await dispatch({ type: TEMPSCOPE_TREE, payload: buildTree([...tempScope.tempScope, new newRow(source)])})
    }
  }

  renderAddNew() {
    // add new type button on builder mode 
    let {mode} = this.props
    if (mode === "builder"){
      return(
        <div className="add_new" onClick={this.addNewType}>
          <img src={require("../../assets/plus-black.png")} />
          <p>Add New Type</p>
        </div>
      )
    }
  }

  render() {
    let { viewMode } = this.props;
    let { tempRow } = this.state;
    let { tree } = this.props.scope;
    let { tempTree } = this.props.tempScope;
    let height = viewMode.split ? "40vh" : "90vh";
    let types = Object.keys(tree)
    let tempTypes = Object.keys(tempTree)
    // console.log(types, "types sets")
    return (
      <div className="row" style={{ minWidth: 200 }}>
        <div className="row column_head">
          <p>Feature Sets</p>
        </div>
        {this.renderAddNew()}
        <div className="col-md-12" id="feature_set" style={{ height: height, overflow: "auto", position: "relative" }}>
          <div className="row layout-pane-scroll" style={{ overflowY: "auto" }}>
           {tempRow.map(i => <NewType key={i} id={i} setToTempScope={this.setToTempScope}/>) }
           {tempTypes.map((type,i) => <Type key={i} id={i} type={type} featureSets={tempTree[type]} temp/>)}
           {types.map((type,i) => <Type key={i} id={i} type={type} featureSets={tree[type]} />)}
          </div>

        </div>
      </div>
    )
  }
}

export default connect(mapStatetoProps)(FeatureSets);
