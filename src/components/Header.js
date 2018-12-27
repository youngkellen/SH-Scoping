import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { MODE_CHANGE, SPLIT_CHANGE, FULL_VIEW, SCOPE_SEARCH } from '../constants/actionTypes';
import CreateModal from './CreateModal.js'

const mapStateToProps = state => ({viewMode: state.viewMode})

class Header extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      mode: this.props.viewMode.mode === "search" ? "Search Mode" : "Builder Mode",
      projectName: "PROJECT NAME",
      createModalOpen: false
    }
    this.modalChange = this.modalChange.bind(this);
  }
   



    renderMode(){
      let { mode } = this.state;
      let buttonColor = "#cee5ff";
        return (
          <div style={{display: "flex"}}>
          <div onClick={() => this.changeMode()} style={{position: "relative"}}>
             <p className="mode-btn" style={mode === "Search Mode" ? {backgroundColor: buttonColor} : {} }>Search Mode</p>
             <img className="navbar-image" src={require("../assets/search-icon.png")}/>
          </div>
          <div onClick={() => this.changeMode()} style={{position: "relative"}}>
             <p className="mode-btn" style={mode === "Builder Mode" ? {backgroundColor: buttonColor} : {} }>Builder Mode</p>
             <img className="navbar-image" src={require("../assets/builder-icon.png")}/>
          </div>
          </div>
        )
    }

    async builderMode(){
      const { dispatch } = this.props;
      await dispatch({ type: SPLIT_CHANGE, payload: false })
      await dispatch({ type: FULL_VIEW, payload: false })
      await dispatch({ type: MODE_CHANGE, payload: "builder" })
    }

    async searchMode(){
      await this.props.dispatch({ type: SPLIT_CHANGE, payload: false })
      await this.props.dispatch({ type: MODE_CHANGE, payload: "search" })
    }


    changeMode() {
      let { mode } = this.props.viewMode;
      if (mode === "search" ) {
        this.setState({
          mode: "Builder Mode"
        }, async () => this.builderMode() )
      } else {
        this.setState({
          mode: "Search Mode"
        }, async () => this.searchMode() )
      }
    }

    modalChange(){
      this.setState(prevState => ({
        createModalOpen: !prevState.createModalOpen
      }))
    }
  
    render() {
      console.log('header props', this.props)
      return (
        <nav className="navbar navbar-default" style={{width: "100%"}}>
         <CreateModal 
                    createModalOpen={this.state.createModalOpen}
                    closeModal={this.modalChange}
                  />
          <div className="navbar-brand">
            <ul className="nav navbar-nav">
              <li className="nav-item">
                <Link to="/" className="navbar-brand" >
                  <img src={require("../assets/sh-logo.png")}></img>
                </Link>
              </li>
              <li className="nav-item">
                <p>{this.state.projectName.substring(0, 15)}</p> 
              </li>
              <li className="nav-item">
                <button className="btn btn-primary btn-round btn-light-blue">iOS</button> 
              </li>
              <li className="nav-item">
                <button className="btn btn-primary btn-round btn-light-blue">Android</button> 
              </li>
              <li className="nav-item">
                <button className="btn btn-primary btn-round btn-light-blue">Web</button> 
              </li>
              <li className="nav-item">
                <button className="btn btn-primary btn-round btn-light-blue">Backend</button> 
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-primary btn-round btn-white ">Edit</button> 
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-primary btn-round btn-white " onClick={() => this.modalChange()}>Create</button> 
              </li>
            </ul>
          </div>
          <div className="navbar-brand navbar-right mode-select" style={{marginLeft: "100px", position: "relative"}}>
            <ul className="nav navbar-nav">
              <Link to="/">
                {this.renderMode()}
              </Link>
            </ul>
          </div>
        </nav>
      );
    }
  }
  
  export default connect(mapStateToProps, null)(Header);
  