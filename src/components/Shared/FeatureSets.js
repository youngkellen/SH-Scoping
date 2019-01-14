import React, { Component, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Type from './Type';
import NewType from "../Builder/NewType"
import { TEMPSCOPE_ADD, TEMPSCOPE_TREE } from '../../constants/actionTypes';
import newRow from "../../helper/newRow"
import buildTree from "../../helper/buildTree"

const mapStatetoProps = state => ({ viewMode: state.viewMode, scope: state.scope, tempScope: state.tempScope, library: state.library})

class FeatureSets extends PureComponent {
  state = {
    tempType: []
  }
  addNewType = this.addNewType.bind(this);
  setToTempScope = this.setToTempScope.bind(this);

  componentDidMount(){
   
  }

  addNewType(){
    // adds a input for creating a new type
    let { tempType } = this.state;
    if (tempType && tempType.length < 2){
      this.setState(prevState=>({
        tempType: [...prevState.tempType, {}]
      }))
    }
    
  }

  async setToTempScope(id, source){
    let { tempType } = this.state;
    let { dispatch, tempScope } = this.props;
    tempType.splice(id, 1)
    console.log(tempType, "temp Row")
    this.setState({
      tempType: []
    })
    if (source){
      await dispatch({type: TEMPSCOPE_ADD, payload: new newRow(tempScope.tempScope.length, source)})
      await dispatch({ type: TEMPSCOPE_TREE, payload: buildTree([...tempScope.tempScope, new newRow(tempScope.tempScope.length, source)])})
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

  renderTempTypes(tempTypes, types){
    if (tempTypes){
      let { tempTree } = this.props.tempScope;
      // remove temp type row if a temp feature set was created to a type in scope
      let tempRows = tempTypes.slice().reverse();
      tempRows = tempRows.filter(t => !types.includes(t))
      console.log(tempRows, "temp rows")
      // console.log(tempTypes, "temp types in render temp type")
      // console.log(tempRows, "temp rows bro")
      return tempRows.map((type,i) => <Type key={i} id={i} type={type} featureSets={tempTree[type]} temp fs/>)
    } else {
      return null
    }
   
  }

  renderLibraryTypes(){
    let { mode, library } = this.props;
    if (mode === "search"){
      let libraryTypes = Object.keys(library.tree)
      console.log(library.scope, "library library")
      if (libraryTypes){
        return (
          libraryTypes.map((type, i)=> <Type key={i} id={i} type={type} featureSets={library.tree[type]} temp library fs/>)
        )
      }
     
    }
  }

  render() {
    let { viewMode } = this.props;
    let { tempType } = this.state;
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
           {tempType.length > 1 ? "" : tempType.map(i => <NewType key={i} id={i} setToTempScope={this.setToTempScope}/>) }
           {this.renderTempTypes(tempTypes, types)}
           {types.map((type,i) => <Type key={i} id={i} type={type} featureSets={tree[type]} tempSet={tempTree[type]} fs/>)}
           {this.renderLibraryTypes()}
          </div>

        </div>
      </div>
    )
  }
}

export default connect(mapStatetoProps)(FeatureSets);
