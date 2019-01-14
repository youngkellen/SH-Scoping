import React, { Component, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SCOPE_SELECT, SCOPE_SEARCH, TEMPSCOPE_ADD, TEMPSCOPE_TREE } from '../../constants/actionTypes';
import Feature from './Feature';
import newRow from "../../helper/newRow"
import buildTree from "../../helper/buildTree"
import NewFeature from "../Builder/NewFeature"

const mapStatetoProps = state => ({ viewMode: state.viewMode, features: state.scope.features, scope: state.scope.scope, search: state.scope.search, selected: state.scope.selected, tempScope: state.tempScope, libraryScope: state.library })

class Features extends Component {
  constructor(){
    super()
    this.state = {
      tempNewFeatures: []
    }
    this.handleClick = this.handleClick.bind(this);
    this.renderAddNewFeatureInput = this.renderAddNewFeatureInput.bind(this);
    this.setToScope = this.setToScope.bind(this);
  }

  componentDidMount(){
    console.log(this.props, "features props")
    let { mode } = this.props
   
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps, "next props in type")
  //  if (this.props.tempScope.tempScope.length !== nextProps.tempScope.tempScope.length){
  //    this.props = nextProps;
  //  }
}
  

  renderAddNew() {
    let { mode } = this.props
    if (mode === "builder") {
      return (
        <div className="add_new" onClick={this.renderAddNewFeatureInput}>
          <img src={require("../../assets/plus-black.png")} />
          <p>Add New Feature</p>
        </div>
      )
    }
  }

  async renderAddNewFeatureInput() {
    this.setState(prevState=>({
      tempNewFeatures: [...prevState.tempNewFeatures, {}]
    }))
    
  }

  async setToScope(input){
    let { tempNewFeatures } = this.state
    console.log(this.props, "features props")
    tempNewFeatures.splice(0, 1)
    this.setState({
      tempNewFeatures: []
    })

    let { features, dispatch, tempScope } = this.props;
    if (features[0]) {
      let { type, fs } = features[0]
      if (input){
        await dispatch({type: TEMPSCOPE_ADD, payload: new newRow(tempScope.tempScope.length, type, fs, input)})
        await dispatch({ type: TEMPSCOPE_TREE, payload: buildTree([...tempScope.tempScope, new newRow(tempScope.tempScope.length, type, fs, input)])})
      }
    } else {
      alert("Please choose a Feature Set")
    }
   
  }

  handleClick(id, temp, library){
    let { dispatch, scope, tempScope, libraryScope } = this.props;
    if (!temp){
      dispatch({type: SCOPE_SELECT, payload: {data: scope[id], temp: false, library: false }})
    } else {
      if (library){
        dispatch({type: SCOPE_SELECT, payload: {data: libraryScope.scope[id], temp: true, library: true }})
      } else {
        dispatch({type: SCOPE_SELECT, payload: {data: tempScope.tempScope[id], temp: true, library: false }})
      }
    }
  }

  renderFeatures(){
    let { features, scope, search, selected } = this.props;
    console.log(features, "features in render features")
    if (features && features[0] && !features[0].temp  && features[0].feature && features[0].feature[0]){
      console.log(features[0].feature, "should not be empty")
      return (
        features.map(feature => <Feature key={feature.id} search={search} inScope={scope[feature.id]["Include in Scope?"]} id={feature.id} handleFeature={this.handleClick} feature={feature.feature} selectedId={selected.data.id} tempSelect={selected.temp} library={feature.library} temp={feature.library} inLibrary={selected.library} />)
      )
    } else {
      return null
    }
  }
s
  renderLibraryFeatures(){
    let { features, scope, search, selected } = this.props;
    console.log(features, "features in render features library")

    if (features && features[0] && features[0].library  && features[0].feature && features[0].feature[0]){
      console.log(features[0].feature, "should not be empty")
      return (
        features.map(feature => <Feature key={feature.id} search={search} inScope={false} id={feature.id} handleFeature={this.handleClick} feature={feature.feature} selectedId={selected.data.id} tempSelect={selected.temp} inLibrary={selected.library} library={feature.library} temp={feature.library}/>)
      )
    } else {
      return null
    }
  }

  renderTempFeatures(){
    // render temp features that are being made
    let { tempScope, features, search, selected } = this.props;
    if (features && features[0] && features[0].type && !features[0].library && tempScope.tempTree[features[0].type]){
      let { type, fs } = features[0]
      let { featureSet } = tempScope.tempTree[type]
      // console.log(featureSet, "feature set extracted")
      let index = featureSet.slice().map(f => f.name).indexOf(fs)
      // console.log(fs, "fs bro")
      // console.log(index, "index bro")
      if ( index !== -1){
        let { features } = featureSet[index]
        let check = features.filter(f => f.feature).length
        let checkTwo = features[features.length - 1].feature
        if (check && checkTwo && checkTwo[0]){
          return features.map(feature => <Feature key={feature.id} search={search} inScope={feature["Include in Scope?"]} id={feature.id} handleFeature={this.handleClick} feature={feature.feature} selectedId={selected.data.id} tempSelect={selected.temp} temp library={feature.library} inLibrary={selected.library} />)
        } else {
          return null
        }
      } else {
        return null
      }
    } else {
      return null
    }
  }

  renderEmpty(){
    if (!this.renderFeatures() && !this.renderTempFeatures() && !this.renderLibraryFeatures()){
      return <li>empty</li>
    } else {
      return null
    }
  }

  render() {
    console.log(this.props, "features props")
    let { tempNewFeatures } = this.state;
    let { features, scope, search, selected, viewMode } = this.props;
    let height = viewMode.split ? "40vh" : "90vh";
    return (
      <div className="row features" style={{ minWidth: 200 }}>
        <div style={{ height: "100vh" }}>
          <div className="row column_head" style={{ textAlign: "center" }}>
            <p>Feature </p>
          </div>
          {this.renderAddNew()}
          <div className="col-md-12" style={{ height: height, overflow: "auto", position: "relative" }}>
         
          <div className="row layout-pane-scroll" style={{overflow: "auto",}}>
            <ul style={{overflow: "auto",}}>
            {tempNewFeatures.map(i => <NewFeature key={i} id={i} setToTempScope={this.setToScope}/>) }
             {this.renderFeatures()}
             {this.renderTempFeatures()}
             {this.renderEmpty()}
             {this.renderLibraryFeatures()}
            </ul>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStatetoProps)(Features);
