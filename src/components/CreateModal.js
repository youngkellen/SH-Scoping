import React from 'react';
import Modal from 'react-modal';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  MODE_CHANGE,
  EXPORT_CSV
} from '../constants/actionTypes';

const imagePlaceholder = require('../assets/plus.png');
const removeImage = require('../assets/remove.png')
const MODE = process.env.NODE_ENV

class CreateModal extends React.Component {
  constructor() {
    super();
    this.state = {
      choosePlatform: false,
      projectInfoModal: true,
      typeSelectModal: false,
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
        referenceFiles: [{ value: "" }]
      },
      types: {
        selectedTypes: []
      },
      searchTerms: [{ term: "E-commerce", date: "10/10/10", content: "Blah blah blah" }, { term: "Bit Coin", date: "11/11/11", content: "Lorem Ipsum" }]
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

  selectPlatform(platform) {
    this.setState(prevState => ({
      selected: Object.assign({}, prevState.selected, { [platform]: !prevState.selected[platform] })
    }))
  }

  finishTask(task) {
    if (task === "choosePlatform") {
      this.setState({
        choosePlatform: true,
        projectInfoModal: false
      })
    } else if (task === "projectInfo") {
      this.setState({
        projectInfoModal: false
      })
    } else if (task === "typeSelect") {
      this.setState({
        choosePlatform: false,
        typeSelectModal: true
      })
    }
  }

  onDrop(files) {
    console.log(files, "files")
    let ext = files[0].type.split("/").pop()
    this.setState({
      projectInfo: Object.assign({}, this.state.projectInfo, { logo: files[0] })
    })
  }

  choosePlatform() {
    console.log(this.state, "asf")
    let { iOS, Android, Web, QA, BE, ReactNative, Design } = this.state.selected
    if (this.state.choosePlatform) {
      return (
        <div className="container modal-platform" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <div className="row" style={{ marginBottom: "100px" }}>
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
            <div className="row" style={{ margin: "auto", textAlign: "center" }}>
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
            <button type="button" className="btn btn-lg btn-outline-primary" onClick={() => this.finishTask("typeSelect")}>Next</button>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  renderReferenceFiles() {
    let { referenceFiles } = this.state.projectInfo;
    if (referenceFiles) {
      return referenceFiles.map((file, i) => {
        console.log(i)
        if (i > 0) {
          return (
            <div style={{ marginBottom: "10px" }} key={i}>
              <input
                style={{ display: "inline", width: "240px", margin: "0 10px 0 0" }}
                type="text"
                className="Rectangle"
                onChange={e => this.changeReferenceValue(i, e.target.value)}
                value={file.value}
              >
              </input>
              <img
                src={removeImage}
                style={{ display: "inline", height: "30px", width: "30px", margin: 0 }}
                onClick={() => this.removeReferenceFile(i)}
              >
              </img>
            </div>

          )
        }
      })

    }
  }

  addReferenceFile() {
    this.setState(prevState => ({
      projectInfo: Object.assign({}, prevState.projectInfo, { referenceFiles: [...prevState.projectInfo.referenceFiles, { value: "" }] })
    }))
    console.log(this.state.projectInfo.referenceFiles, "files before")

    //this.state.projectInfo.referenceFiles.push({id: 2})
    console.log(this.state.projectInfo.referenceFiles, "files after")
  }

  removeReferenceFile(index) {
    console.log(index, "remove input index")
    let files = [...this.state.projectInfo.referenceFiles];
    files.splice(index, 1)
    console.log(files, "new files")
    this.setState(prevState => ({
      projectInfo: Object.assign({}, prevState.projectInfo, { referenceFiles: files })
    }))
  }

  removeLogo() {
    this.setState(prevState => ({
      projectInfo: Object.assign({}, prevState.projectInfo, { logo: "" })
    }))
  }

  changeReferenceValue(index, value) {
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

  projectInfoModal() {
    let { name, description, clientName, notes, logo, projectCreator, opportunity, referenceFiles } = this.state.projectInfo;
    if (this.state.projectInfoModal) {
      return <div className="container modal-platform " style={{ padding: "15px" }}>
        <div className="row" style={{ marginBottom: "30px" }}>
          <h2>Project Information</h2>
        </div>
        <div className="row">
          <div className="col-md-5 project-info" style={{ marginRight: "50px" }}>
            <div className="row">
              <p>Name</p>
              <input type="text" className="Rectangle" onChange={e => this.changeName(e.target.value)} />
            </div>
            <div className="row">
              <p>Description</p>
              <textarea className="Rectangle_Big" onChange={e => this.changeDescription(e.target.value)} value={description} />
            </div>
            <div className="row">
              <p>Client Name</p>
              <input type="text" className="Rectangle" onChange={e => this.changeClientName(e.target.value)} value={clientName} />
            </div>
            <div className="row">
              <p>Notes </p>
              <textarea className="Rectangle_Big" onChange={e => this.changeNotes(e.target.value)} value={notes} />
            </div>
          </div>
          <div className="col-md-5 project-info">
            <div className="row" style={{ marginBottom: 0 }}>
              <p>LOGO </p>
              <div className="row" style={{ margin: 0, display: "flex", alignItems: "center" }}>
                <div className="col-md-9" style={{ padding: 0 }}>
                  <Dropzone className={logo ? "" : "Square"} style={{ border: "none", cursor: "pointer", marginBottom: 0 }} onDrop={this.onDrop}>
                    <img className={logo ? "Empty_Square" : ""} src={logo ? logo.preview : imagePlaceholder} style={logo ? { marginBottom: 0 } : { height: "32px", margin: "auto" }} onError={e => {
                      e.target.src = imagePlaceholder;
                    }} />
                  </Dropzone>
                </div>
                <div className="col-md-3">
                  <img src={removeImage} style={logo ? { height: "32px", display: "inline" } : { display: "none" }} onClick={() => this.removeLogo()} />
                </div>
              </div>
            </div>
            <div className="row ">
              <p>PROJECT CREATOR </p>
              <input type="text" className="Rectangle" onChange={e => this.changeProjectCreator(e.target.value)} value={projectCreator} />
            </div>
            <div className="row">
              <p>OPPORTUNITY</p>
              <input type="text" className="Rectangle" onChange={e => this.changeOpportunity(e.target.value)} value={opportunity} />
            </div>
            <div className="row">
              <p>REFERENCE FILES</p>
              <input style={{ display: "inline", width: "240px", margin: "0 10px 0 0", marginBottom: "10px" }} type="text" className="Rectangle" onChange={e => this.changeReferenceValue(0, e.target.value)} value={referenceFiles[0].value} />
              <img src={imagePlaceholder} style={{ display: "inline", height: "30px", width: "30px", margin: 0 }} onClick={() => this.addReferenceFile()} />
              {this.renderReferenceFiles()}
            </div>
          </div>
        </div>
        <div className="row">
          <button type="button" className="btn btn-lg btn-outline-primary" onClick={() => this.finishTask("choosePlatform")}>
            Next
            </button>
        </div>
      </div>
    } else {
      return null
    }
  }

  addSearchTerm(term) {
    console.log(term, "term bro")
    this.setState({
      types: Object.assign({}, this.state.types, { selectedTypes: [...this.state.types.selectedTypes, term] })
    })
  }

  removeTerm(index) {
    let terms = [...this.state.types.selectedTypes];
    console.log(terms, "terms before")
    terms.splice(index, 1)
    console.log(terms, "remove terms")
    this.setState(prevState => ({
      types: Object.assign({}, prevState.types, { selectedTypes: [...terms] })
    }))
  }

  addedTerms() {
    let { selectedTypes } = this.state.types;
    console.log(selectedTypes, "terms added")
    if (selectedTypes) {
      return selectedTypes.map((type, i) => {
        return (
          <div className="row" key={i}>
            <div className="col-md-7">
              <p style={{ fontSize: "12px", fontWeight: "bold" }}>{type.term}</p>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-4">
              <button className="btn btn-primary btn-sm type-btn" onClick={() => this.removeTerm(i)}>REMOVE</button>
            </div>

          </div>
        )
      })
    }
  }

  renderTermButton(term) {
    let { selectedTypes } = this.state.types;
    if (selectedTypes.includes(term)) {
      return (
        <button className="btn btn-primary btn-sm type-btn" onClick={() => this.removeTerm(term)}>Remove</button>
      )
    } else {
      return (
        <button className="btn btn-primary btn-sm type-btn" onClick={() => this.addSearchTerm(term)}>Add</button>
      )
    }
  }

  searchTerms() {
    let { searchTerms } = this.state;
    if (searchTerms) {
      return searchTerms.map((searchTerm, i) => {
        return (
          <div className="row search_terms" key={i}>
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-10">
                  <p style={{ fontSize: "12px", fontWeight: "bold" }}>{searchTerm.term}</p>
                </div>
                <div className="col-md-2">
                  <p className="search-dates">{searchTerm.date}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <p className="search-info">{searchTerm.content}</p>
                </div>
              </div>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-2">
              {this.renderTermButton(searchTerm)}
            </div>

          </div>
        )
      })
    } else {
      return null
    }

  }

  typeSelectModal() {
    if (this.state.typeSelectModal) {
      return (
        <div className="container modal-platform type_modal">
          <div className="row" style={{ marginBottom: "30px" }}>
            <h2>Type(s)</h2>
          </div>
          <div className="row" style={{ width: "90%" }}>
            <div className="col-md-8">
              <div className="row" style={{ marginBottom: "20px" }}>
                <input type="search" className="Rectangle_Full" placeholder="ENTER SEARCH TERMS" />
              </div>
              <div className="row type_left">
                {this.searchTerms()}
              </div>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-3 ">
              <p style={{ textAlign: "left" }}>Filter/Sort</p>
              <div className="row type_right_filter" >
                <p><input type="radio" value="A-Z" name="filter" /> Alphabetical A-Z</p>
                <p><input type="radio" value="Z-A" name="filter" /> Alphabetical Z-A</p>
                <p><input type="radio" value="recent" name="filter" /> Most recent</p>
              </div>
              <div className="row type_right">
                {this.addedTerms()}
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  changeName(name) {
    this.setState({
      projectInfo: Object.assign({}, this.state.projectInfo, { name: name })
    })
  }

  changeDescription(description) {
    this.setState({
      projectInfo: Object.assign({}, this.state.projectInfo, { description: description })
    })
  }

  changeClientName(clientName) {
    this.setState({
      projectInfo: Object.assign({}, this.state.projectInfo, { clientName: clientName })
    })
  }

  changeClientName(clientName) {
    this.setState({
      projectInfo: Object.assign({}, this.state.projectInfo, { clientName: clientName })
    })
  }

  changeNotes(notes) {
    this.setState({
      projectInfo: Object.assign({}, this.state.projectInfo, { notes: notes })
    })
  }

  changeOpportunity(opportunity) {
    this.setState({
      projectInfo: Object.assign({}, this.state.projectInfo, { opportunity: opportunity })
    })
  }

  changeProjectCreator(projectCreator) {
    this.setState({
      projectInfo: Object.assign({}, this.state.projectInfo, { projectCreator: projectCreator })
    })
  }

  requestClose() {
    this.setState({
      choosePlatform: false,
      projectInfoModal: true,
      typeSelectModal: false,
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
        referenceFiles: [{ value: "" }]
      },
      types: {
        selectedTypes: []
      }
    }, () => { this.props.closeModal() })
  }

  async getGoogleSheet(){
    let redirectUrl = MODE === "development" ? "localhost:3000" : "sh-scoping.appspot.com"
    window.open(`https://us-central1-adept-coda-226322.cloudfunctions.net/authorize?redirectUrl=http://${redirectUrl}`, "_self")

  }

  renderExport(){
    let { exportCSV, dispatch } = this.props;
    if (exportCSV) {
      return (
        <div className="container modal-platform export-csv">
          Would you like to open the csv in Google Sheets?
          <div className="row">
            <button className="btn btn-primary" onClick={()=> this.getGoogleSheet()}>Yes</button>
            <button className="btn btn-secondary" onClick={()=> dispatch({type: EXPORT_CSV, payload: false})}>No</button>
          </div>
         
        </div>
      )
    }
  }

  render() {
    console.log(this.state, "render state")
    let { exportCSV } = this.props;
    return (
      <Modal
        isOpen={this.props.createModalOpen}
        onRequestClose={this.requestClose}
        className="modal-create"
        overlayClassName="modal-overlay"
      >
        {exportCSV ? null : this.projectInfoModal()}
        {exportCSV ? null : this.choosePlatform()}
        {exportCSV ? null : this.typeSelectModal()}
        {exportCSV ? this.renderExport() : null}
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  viewMode: state.viewMode,
  exportCSV: state.exportCSV.exportCSV
  // schedules
});


export default connect(mapStateToProps, null)(CreateModal);
