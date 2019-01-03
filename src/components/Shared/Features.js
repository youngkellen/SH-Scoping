import React, { Component, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SCOPE_SELECT, SCOPE_SEARCH, TEMPSCOPE_ADD, TEMPSCOPE_TREE } from '../../constants/actionTypes';
import Feature from './Feature';
import newRow from "../../helper/newRow"
import buildTree from "../../helper/buildTree"
import NewFeature from "../Builder/NewFeature"

const mapStatetoProps = state => ({ viewMode: state.viewMode, features: state.scope.features, scope: state.scope.scope, search: state.scope.search, selected: state.scope.selected, tempScope: state.tempScope })

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

  handleClick(id, temp){
    let { dispatch, scope, tempScope } = this.props;
    if (!temp){
      dispatch({type: SCOPE_SELECT, payload: {data: scope[id], temp: false }})
    } else {
      dispatch({type: SCOPE_SELECT, payload: {data: tempScope.tempScope[id], temp: true }})
    }
  }

  renderFeatures(){
    let { features, scope, search, selected } = this.props;
    console.log(features, "boo")
    if (features && features[0] && features[0].feature && features[0].feature[0]){
      console.log(features[0].feature, "should not be empty")
      return (
        features.map(feature => <Feature key={feature.id} search={search} inScope={scope[feature.id]["Include in Scope?"]} id={feature.id} handleFeature={this.handleClick} feature={feature.feature} selectedId={selected.data.id} tempSelect={selected.temp}/>)
      )
    } else {
      return null
    }
  }

  renderTempFeatures(){
    // render temp features that are being made
    let { tempScope, features, search, selected } = this.props;
    if (features && features[0] && features[0].type && tempScope.tempTree[features[0].type]){
      let { type, fs } = features[0]
      let { featureSet } = tempScope.tempTree[type]
      console.log(featureSet, "feature set extracted")
      let index = featureSet.slice().map(f => f.name).indexOf(fs)
      console.log(fs, "fs bro")
      console.log(index, "index bro")
      if ( index !== -1){
        let { features } = featureSet[index]
        let check = features.filter(f => f.feature).length
        let checkTwo = features[features.length - 1].feature
        if (check && checkTwo && checkTwo[0]){
         console.log(features, " you need this")
          return features.map(feature => <Feature key={feature.id} search={search} inScope={false} id={feature.id} handleFeature={this.handleClick} feature={feature.feature} selectedId={selected.data.id} tempSelect={selected.temp} temp/>)
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
    if (!this.renderFeatures() && !this.renderTempFeatures()){
      return <li>empty</li>
    } else {
      return null
    }
  }

  render() {
    console.log(this.props, "features props")
    let { tempNewFeatures } = this.state;
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
            {tempNewFeatures.map(i => <NewFeature key={i} id={i} setToTempScope={this.setToScope}/>) }
             {this.renderFeatures()}
             {this.renderTempFeatures()}
             {this.renderEmpty()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStatetoProps)(Features);
