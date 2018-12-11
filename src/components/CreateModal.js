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
      projectInfoModal: false,
      selected: {
        iOS: false,
        Android: false,
        ReactNative: false,
        Web: false,
        BE: false,
        Design: false,
        QA: false
      },
      projectInfo: {
        name: "",
        description: "",
        clientName: "",
        notes: "",
        logo: "",
        projectCreator: "",
        opportunity: "",
        referenceFiles: [{value: ""}]
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
        projectInfoModal: true
      })
    } else if (task == "projectInfo") {
       this.setState({
         projectInfoModal: false
       })
    }
  }

  onDrop(files){
    console.log(files, "files")
    let ext = files[0].type.split("/").pop()
    this.setState({
      projectInfo: Object.assign({}, this.state.projectInfo, {logo: files[0]} )
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
    } else {
      return null
    }
  }

  renderReferenceFiles(){
    let { referenceFiles } = this.state.projectInfo;
    console.log(referenceFiles, "shit head")
    if (referenceFiles){
      return referenceFiles.map((file, i)=> {
        console.log(file, "file shit")
        console.log(i)
        if (i > 0){
          return (
            <div style={{marginBottom: "10px"}} key={i}>
              <input 
                style={{display:"inline", width: "240px", margin: "0 10px 0 0"}}
                type="text" 
                className="Rectangle"
                onChange={e => this.changeReferenceValue(i, e.target.value)}
                value={file.value}
              >
              </input> 
              <img 
                src={removeImage}  
                style={{display: "inline", height: "30px", width: "30px", margin: 0}} 
                onClick={()=>this.removeReferenceFile(i)}
              >
              </img>
            </div>
           
          )
        }
      })
   
    }
  }

  addReferenceFile(){
    this.setState(prevState => ({
      projectInfo: Object.assign({}, prevState.projectInfo, { referenceFiles: [ ...prevState.projectInfo.referenceFiles, {value: ""} ]})
    }))
    console.log(this.state.projectInfo.referenceFiles, "files before")

    //this.state.projectInfo.referenceFiles.push({id: 2})
    console.log(this.state.projectInfo.referenceFiles, "files after")
  }

  removeReferenceFile(index){
   console.log(index, "remove input index")
    let files = [...this.state.projectInfo.referenceFiles];
    files.splice(index, 1)
    console.log(files, "new files")
    this.setState(prevState => ({
      projectInfo: Object.assign({}, prevState.projectInfo, { referenceFiles: files })
    }))
  }

  removeLogo(){
    this.setState(prevState => ({
      projectInfo: Object.assign({}, prevState.projectInfo, { logo: "" })
    }))
  }

  changeReferenceValue(index, value){
    console.log(index, "index")
    console.log(value, "val")
    let { referenceFiles } = this.state.projectInfo;
    let file = referenceFiles[index];
    file.value = value;
    referenceFiles[index] = file
    this.setState(prevState => ({
      projectInfo: Object.assign({}, prevState.projectInfo, { referenceFiles })
    }))
  }

  projectInfoModal(){
    let { name, description, clientName, notes, logo, projectCreator, opportunity, referenceFiles } = this.state.projectInfo;
    if (this.state.projectInfoModal){
      return (
        <div className="container modal-platform ">
          <div className="row" style={{ marginBottom: "30px"}}>
            <h2>Project Information</h2>
          </div>
          <div className="row">
            <div className="col-md-5 project-info" style={{marginRight: "50px"}}>
              <div className="row">
                <p>Name</p> 
                <input
                  type="text"
                  className="Rectangle"
                  onChange={e => this.changeName(e.target.value)}
                >
                </input>
              </div>
              <div className="row">
                <p>Description</p>
                <textarea 
                  className="Rectangle_Big"
                  onChange={e => this.changeDescription(e.target.value)}
                  value={description}
                >
                 </textarea>
              </div>
              <div className="row">
                <p>Client Name</p> 
                <input 
                  type="text"
                  className="Rectangle"
                  onChange={e => this.changeClientName(e.target.value)}
                  value={clientName}
                >
                </input>
              </div>
              <div className="row">
                <p>Notes </p>
                <textarea 
                  className="Rectangle_Big"
                  onChange={e => this.changeNotes(e.target.value)}
                  value={notes}
                >
                </textarea>
              </div>
            </div>
            <div className="col-md-5 project-info" >
              <div className="row"  style={{marginBottom: 0}}>
                <p>LOGO </p>
                <div className="row" style={{margin: 0, display: "flex", alignItems: "center"}}>

                <div className="col-md-9">
                  <Dropzone className={ logo ? "" : "Square"} style={{border: "none", cursor: "pointer", marginBottom: 0 }} onDrop={this.onDrop}>
                    <img className = { logo ? "Empty_Square" : "" } src={ logo ? logo.preview : imagePlaceholder } 
                      style={ logo ? {marginBottom: 0 } : {height: "32px", margin: "auto"}}
                      onError={e => { 
                      e.target.src = imagePlaceholder}}
                    />
                  </Dropzone>
                </div>
               <div className="col-md-3"> 
               <img src={ removeImage } 
                    style={ logo ? {height: "32px", display: "inline"} : {display: "none"}}
                    onClick={() => this.removeLogo()}
                  />
               </div>
                
                
                   </div>
                
              </div>
              <div className="row ">
                <p>PROJECT CREATOR </p>
                <input 
                  type="text"
                  className="Rectangle"
                  onChange={e => this.changeProjectCreator(e.target.value)}
                  value={projectCreator}
                >
                </input>
              </div>
              <div className="row">
                 <p>OPPORTUNITY</p> 
                <input 
                  type="text"
                  className="Rectangle"
                  onChange={e => this.changeOpportunity(e.target.value)}
                  value={opportunity}
                >
                </input>
              </div>
              <div className="row">
                  <p>REFERENCE FILES</p>
                  <input 
                    style={{display:"inline", width: "240px", margin: "0 10px 0 0", marginBottom: "10px"}} 
                    type="text" 
                    className="Rectangle"
                    onChange={e => this.changeReferenceValue(0, e.target.value)}
                    value={referenceFiles[0].value}
                  >
                  </input> 
                  <img 
                    src={imagePlaceholder}
                    style={{display: "inline", height: "30px", width: "30px", margin: 0}}
                    onClick={()=>this.addReferenceFile()}
                  >
                    
                  </img>
                  {this.renderReferenceFiles()}
              </div>
          </div>
        </div>
      </div>
      )
    } else {
      return null
    }
  }

  changeName(name){
    this.setState({
      projectInfo: Object.assign({}, this.state.projectInfo, {name: name })
    })
  }
  
  changeDescription(description){
    this.setState({
      projectInfo: Object.assign({}, this.state.projectInfo, {description: description })
    })
  }

  changeClientName(clientName){
    this.setState({
      projectInfo: Object.assign({}, this.state.projectInfo, {clientName: clientName })
    })
  }

  changeClientName(clientName){
    this.setState({
      projectInfo: Object.assign({}, this.state.projectInfo, {clientName: clientName })
    })
  }

  changeNotes(notes){
    this.setState({
      projectInfo: Object.assign({}, this.state.projectInfo, {notes: notes })
    })
  }

  changeOpportunity(opportunity){
    this.setState({
      projectInfo: Object.assign({}, this.state.projectInfo, {opportunity: opportunity })
    })
  }

  changeProjectCreator(projectCreator){
    this.setState({
      projectInfo: Object.assign({}, this.state.projectInfo, {projectCreator: projectCreator })
    })
  }

  requestClose(){
    this.setState({
      choosePlatform: true,
      projectInfoModal: false,
      selected: {
        iOS: false,
        Android: false,
        ReactNative: false,
        Web: false,
        BE: false,
        Design: false,
        QA: false
      },
      projectInfo: {
        name: "",
        description: "",
        clientName: "",
        notes: "",
        logo: "",
        projectCreator: "",
        opportunity: "",
        referenceFiles: [{value: ""}]
      }
    }, () => {this.props.closeModal()})
  }

  render() {
    console.log(this.state, "render state")
      return (
        <Modal
          isOpen={this.props.createModalOpen}
          onRequestClose={this.requestClose}
          className="modal-create"
          overlayClassName="modal-overlay"
        >
          {this.choosePlatform()}
          {this.projectInfoModal()}
        </Modal>
      )
  }
}

const mapStateToProps = state => ({
  viewMode: state.viewMode
  // schedules
});


export default connect(mapStateToProps, null)(CreateModal);
