import React from 'react';
import Modal from 'react-modal';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import {
  MODE_CHANGE
} from '../constants/actionTypes';

const imagePlaceholder = require('../assets/plus.png');
const removeImage = require('../assets/remove.png')

class CreateModal extends React.Component {
  constructor() {
    super();
    this.state = {
      choosePlatform: true,
      projectInfo: false,
      projectImage: "",
      referenceFiles: [1,2],
      selected: {
        iOS: false,
        Android: false,
        ReactNative: false,
        Web: false,
        BE: false,
        Design: false,
        QA: false
      }
    }
    this.choosePlatform = this.choosePlatform.bind(this);
    this.selectPlatform = this.selectPlatform.bind(this);
    this.requestClose = this.requestClose.bind(this);
    this.onDrop = this.onDrop.bind(this);
   
  }
  

  async componentWillMount() {
  }


  componentDidMount() {
    console.log(this.props, "create modal props")
    console.log(this.state, "state create modal")
    let { iOS, Android, React, Web, BE, Design, QA } = this.state.selected;
  }

  selectPlatform(platform){
    this.setState(prevState => ({
      selected: Object.assign({}, prevState.selected, { [platform]: !prevState.selected[platform]} )
    }))
  }

  finishTask(task){
    if (task === "choosePlatform") {
      this.setState({
        choosePlatform: false,
        projectInfo: true
      })
    } else if (task == "projectInfo") {
       this.setState({
         projectInfo: false
       })
    }
  }

  onDrop(files){
    console.log(files, "files")
    let ext = files[0].type.split("/").pop()
    this.setState({
      projectImage: files[0]
    })
  }

  choosePlatform(){
    console.log(this.state, "asf")
    let { iOS, Android, Web, QA, BE, ReactNative, Design } = this.state.selected
    if (this.state.choosePlatform){
      return (
        <div className="container modal-platform" style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
          <div className="row" style={{ marginBottom: "100px"}}>
            <h2>PLATFORM(S)</h2>
          </div>
          <div className="row">
            <div className="row">
              <div className="col-md-3">
                <img src={iOS ? require("../assets/ios-s.png") : require("../assets/ios.png")} onClick={() => this.selectPlatform("iOS")} />
                <p>iOs</p>
              </div>
              <div className="col-md-3">
                <img src={Android ? require("../assets/android-s.png") : require("../assets/android.png")} onClick={() => this.selectPlatform("Android")} ></img>
                <p>Android</p>
              </div>
              <div className="col-md-3">
                <img src={ReactNative ? require("../assets/react-s.png") : require("../assets/react.png")} onClick={() => this.selectPlatform("ReactNative")} ></img>
                <p>React-Hybrid</p>
              </div>
              <div className="col-md-3">
                <img src={Web ? require("../assets/web-s.png") : require("../assets/web.png")} onClick={() => this.selectPlatform("Web")} ></img>
                <p>Web</p>
              </div>
            </div>
            <div className="row" style={{margin: "auto", textAlign: "center"}}>
              <div className="col-md-4 text-center">
                <img src={BE ? require("../assets/backend-s.png") : require("../assets/backend.png")} onClick={() => this.selectPlatform("BE")} ></img>
                <p>Back End</p>
              </div>
              <div className="col-md-4">
                <img src={Design ? require("../assets/design-s.png") : require("../assets/design.png")} onClick={() => this.selectPlatform("Design")} ></img>
                <p>Design</p>
              </div>
              <div className="col-md-4">
                <img src={QA ? require("../assets/qa-s.png") : require("../assets/qa.png")} onClick={() => this.selectPlatform("QA")} ></img>
                <p>QA</p>
              </div>
            </div>
          </div>
          <div className="row">
            <button type="button" className="btn btn-lg btn-outline-primary" onClick={() => this.finishTask("choosePlatform")}>Next</button>
          </div>
        </div>
      )
    }
  }

  renderReferenceFiles(){
    let { referenceFiles } = this.state;
    return referenceFiles.map(file => {
      return (
        <div style={{marginBottom: "10px"}}>
         <input style={{display:"inline", width: "240px", margin: "0 10px 0 0"}} type="text" className="Rectangle"></input> 
          <img src={removeImage}  style={{display: "inline", height: "30px", width: "30px", margin: 0}}></img>
        </div>
       
      )
    })
  }

  projectInfo(){
    let { projectImage } = this.state;
    if (this.state.projectInfo){
      return (
        <div className="container modal-platform ">
          <div className="row" style={{ marginBottom: "50px"}}>
            <h2>Project Information</h2>
          </div>
          <div className="row">
            <div className="col-md-5 project-info" style={{marginRight: "50px"}}>
              <div className="row">
                <p>Name</p> 
                <input type="text" className="Rectangle"></input>
              </div>
              <div className="row">
                <p>Description</p>
                <textarea className="Rectangle_Big"></textarea>
              </div>
              <div className="row">
                <p>Client Name</p> 
                <input type="text" className="Rectangle"></input>
              </div>
              <div className="row">
                <p>Notes </p>
                <textarea className="Rectangle_Big"></textarea>
              </div>
            </div>
            <div className="col-md-5 project-info" >
              <div className="row">
                <p>LOGO </p>
                <Dropzone className="Square" style={{border: "none", cursor: "pointer" }} onDrop={this.onDrop}>
                  <img src={ projectImage ? projectImage.preview : imagePlaceholder } 
                    style={{height: "32px", margin: "auto"}}
                    onError={e => { 
                    e.target.src = imagePlaceholder}}
                  />
                </Dropzone>
              </div>
              <div className="row ">
                <p>PROJECT CREATOR </p>
                <input type="text" className="Rectangle"></input>
              </div>
              <div className="row">
                 <p>OPPURTUNITY</p> 
                <input type="text" className="Rectangle"></input>
              </div>
              <div className="row">
                  <p>REFERENCE FILES</p>
                  <input style={{display:"inline", width: "240px", margin: "0 10px 0 0", marginBottom: "10px"}} type="text" className="Rectangle"></input> 
                  <img src={imagePlaceholder}  style={{display: "inline", height: "30px", width: "30px", margin: 0}}></img>
                  {this.renderReferenceFiles()}
              </div>
          </div>
        </div>
      </div>
      )
    }
   
   
  }

  requestClose(){
    this.setState({
      choosePlatform: true,
      projectInfo: false,
      projectImage: "",
      selected: {
        iOS: false,
        Android: false,
        ReactNative: false,
        Web: false,
        BE: false,
        Design: false,
        QA: false
      }
    }, () => {this.props.closeModal()})
  }

  render() {
      return (
        <Modal
          isOpen={this.props.createModalOpen}
          onRequestClose={this.requestClose}
          className="modal-create"
          overlayClassName="modal-overlay"
        >
          {this.choosePlatform()}
          {this.projectInfo()}
        </Modal>
      )
  }
}

const mapStateToProps = state => ({
  viewMode: state.viewMode
  // schedules
});


export default connect(mapStateToProps, null)(CreateModal);
