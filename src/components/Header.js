import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { MODE_CHANGE, SPLIT_CHANGE, FULL_VIEW, SCOPE_SEARCH, EXPORT_CSV } from '../constants/actionTypes';
import CreateModal from './CreateModal.js';
import axios from 'axios';
import Papa from 'papaparse'

const mapStateToProps = state => ({
  viewMode: state.viewMode,
  exportCSV: state.exportCSV.exportCSV,
  scopeName: state.scope.scopeName,
  scopeToken: state.token.scopeToken,
  downloadLink: state.scope.downloadLink,
  scope: state.scope.scope,
  scopeJSON: state.scope.scopeJSON
})

let navBarColor = "#4a90e2";
class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: this.props.viewMode.mode === "search" ? "Search Mode" : "Builder Mode",
      createModalOpen: false
    }
    this.modalChange = this.modalChange.bind(this);
    this.saveCSV = this.saveCSV.bind(this);
  }




  renderMode() {
    let { mode } = this.state;
    let buttonColor = "#cee5ff";
    return (
      <div style={{ display: "flex" }}>
        <div onClick={() => this.changeMode()} style={{ position: "relative" }}>
          <p className="mode-btn" style={mode === "Search Mode" ? { backgroundColor: buttonColor } : {}}>Search Mode</p>
          <img className="navbar-image" src={require("../assets/search-icon.png")} />
        </div>
        <div onClick={() => this.changeMode()} style={{ position: "relative" }}>
          <p className="mode-btn" style={mode === "Builder Mode" ? { backgroundColor: buttonColor } : {}}>Builder Mode</p>
          <img className="navbar-image" src={require("../assets/builder-icon.png")} />
        </div>
      </div>
    )
  }

  async builderMode() {
    const { dispatch } = this.props;
    await dispatch({ type: SPLIT_CHANGE, payload: false })
    await dispatch({ type: FULL_VIEW, payload: false })
    await dispatch({ type: MODE_CHANGE, payload: "builder" })
  }

  async searchMode() {
    await this.props.dispatch({ type: SPLIT_CHANGE, payload: false })
    await this.props.dispatch({ type: MODE_CHANGE, payload: "search" })
  }


  changeMode() {
    let { mode } = this.props.viewMode;
    if (mode === "search") {
      this.setState({
        mode: "Builder Mode"
      }, async () => this.builderMode())
    } else {
      this.setState({
        mode: "Search Mode"
      }, async () => this.searchMode())
    }
  }

  modalChange() {
    let { dispatch, exportCSV } = this.props;
    this.setState(prevState => ({
      createModalOpen: exportCSV ? false : !prevState.createModalOpen
    }))
    dispatch({ type: EXPORT_CSV, payload: false })
  }

  async saveCSV() {
    const { scopeToken, dispatch, scope, downloadLink, scopeJSON } = this.props;
    const bucket = 'sh-scoping-scopes';
    let option = {
      headers: {
        Authorization: `Bearer ${scopeToken}`,
        "Content-Type": "text/csv"
      }
    }
    let jsonOption = {
      headers: {
        Authorization: `Bearer ${scopeToken}`,
        "Content-Type": "application/json"
      }
    }
    const csv = Papa.unparse(scope);
    console.log(downloadLink, "download link")
    // let csvContent = "data:text/csv;charset=utf-8," + csv
    // let encodedUri = encodeURI(csvContent);

    let link = `https://www.googleapis.com/upload/storage/v1/b/${bucket}/o?uploadType=media&name=${downloadLink}`
    let jsonLink = `https://www.googleapis.com/upload/storage/v1/b/${bucket}/o?uploadType=media&name=${downloadLink.split("/")[0]}/scope.json`
    let post = await axios.post(link, csv, option)
    let jsonPost = await axios.post(jsonLink, scopeJSON, jsonOption)
    // console.log(post, "post csv")
    // console.log(jsonPost,"json Post")
    if (post && jsonPost){
      alert("saved")
    }
  }

  renderNavBar() {
    let { exportCSV, location, scopeName, scopeJSON } = this.props;
    let path = location.pathname;

    let { Platforms } = scopeJSON
    if (path === "/project") {
      return (
        <nav className="navbar navbar-default">
          <CreateModal
            createModalOpen={this.state.createModalOpen || exportCSV}
            closeModal={this.modalChange}
          />
          <div className="navbar-brand">
            <ul className="nav navbar-nav">
              <li className="nav-item">
                <Link to="/dashboard" className="navbar-brand" >
                  <img src={require("../assets/sh-logo.png")}></img>
                </Link>
              </li>
              <li className="nav-item" >
                <p style={{ overflow: "hidden", maxWidth: "200px", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{scopeName || ""}</p>
              </li>
              {Platforms && Platforms.length ? Platforms.map(p => {
                return (
                  <li className="nav-item">
                    <button className="btn btn-primary btn-round btn-light-blue">{p}</button>
                  </li>
                )
              }) : null}

              <li className="nav-item">
                <button className="btn btn-outline-primary btn-round btn-white " onClick={this.saveCSV}>Save</button>
              </li>
              {/* <li className="nav-item">
                <button className="btn btn-outline-primary btn-round btn-white " onClick={() => this.modalChange()}>Create</button>
              </li> */}
            </ul>
          </div>
          <div className="navbar-brand navbar-right mode-select" style={{ marginLeft: "100px", position: "relative" }}>
            <ul className="nav navbar-nav">
              <Link to="/project">
                {this.renderMode()}
              </Link>
            </ul>
          </div>
        </nav>
      )
    } else {
      return (
        <nav className="navbar navbar-project" >
          <CreateModal
            createModalOpen={this.state.createModalOpen || exportCSV}
            closeModal={this.modalChange}
          />
          <div className="navbar-brand">
            <ul className="nav navbar-nav">
              <li className="nav-item">
                <Link to="/project" className="navbar-brand" >
                  <img src={require("../assets/sh-logo.png")}></img>
                </Link>
              </li>
              <li className="nav-item">
                <p>DASHBOARD</p>
              </li>
              <li className="nav-item selected" style={{ marginLeft: "100px" }}>
                <p>SCOPES</p>
              </li>
              {/* <li className="nav-item selected" style={{ marginLeft: "100px" }}>
                <p>TYPES</p>
              </li> */}
            </ul>
          </div>
        </nav>
      )

    }
  }

  render() {
    // console.log('header props', this.props)
    // console.log("head state", this.state)

    return (
      this.renderNavBar()
    );
  }
}

export default connect(mapStateToProps, null)(Header);
