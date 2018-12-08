import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends React.Component {
    state = {
      mode: "Search Mode",
      projectName: "PROJECT NAME"
    }

    renderMode(){
      if (this.state.mode === "Search Mode") {
        return (
          <div onClick={() => this.changeMode()}>
             <p style={{display: "inline-block", backgroundColor: "white", width: "170px", margin: 0, textAlign: "center", fontSize: "18px"}}>{this.state.mode}</p>
             <img className="navbar-image" src={require("../assets/search-icon.png")}/>
          </div>
        )
      } else {
        return (
          <div onClick={() => this.changeMode()}>
             <p style={{display: "inline-block", backgroundColor: "white", width: "170px", margin: 0, textAlign: "center", fontSize: "18px"}}>{this.state.mode}</p>
             <img className="navbar-image" src={require("../assets/builder-icon.png")}/>
          </div>
        )
      }
    }

    changeMode() {
      if (this.state.mode === "Search Mode") {
        this.setState({
          mode: "Builder Mode"
        })
      } else {
        this.setState({
          mode: "Search Mode"
        })
      }
    }
  
    render() {
      console.log('header props', this.props)
      return (
        <nav className="navbar navbar-default" style={{width: "100%"}}>
          <div class="navbar-brand">
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
            </ul>
          </div>
          <div class="navbar-brand navbar-right mode-select" style={{marginLeft: "100px", position: "relative"}}>
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
  
  export default Header;
  