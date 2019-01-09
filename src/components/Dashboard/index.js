import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ProjectSelect from "./ProjectSelect";
import axios from "axios";





const mapStatetoProps = state => ({ viewMode: state.viewMode, token: state.token })

class Dashboard extends Component {
  async componentDidMount() {
    const { scopeToken, token } = this.props.token;
    let option = {
      headers: {
        Authorization: `Bearer ${scopeToken}`
      }
    }
    const bucket = 'sh-scoping-scopes';
    // let scopeObject = await axios.get(`https://www.googleapis.com/storage/v1/b/${bucket}/o/Dummy One/DummyOne.csv?alt=media`, option)
    // console.log(scopeObject, "scope object")
  }

  render() {
    return (
      <div className="dashboard">
        <div className="col-md-12" style={{ height: "100vh" }}>
          <div className="row">
            <p>+ NEW PROJECT</p>
            <input type="search" defaultValue="    Enter Search Term"></input>
          </div>
          <div className="row" style={{ marginTop: "30px" }}>
            <div className="col-md-10" style={{ paddingLeft: 0, overflow: "auto" }}>
              <ProjectSelect />
            </div>
            <div className="col-md-2 filter">
              <div className="row">
                <p>FILTER/SORT:</p>
                <div  >
                  <p><input type="radio" value="A-Z" name="filter" /> Alphabetical A-Z</p>
                  <p><input type="radio" value="Z-A" name="filter" /> Alphabetical Z-A</p>
                  <p><input type="radio" value="recent" name="filter" /> Most recent</p>
                  <p><input type="radio" value="latest" name="filter" /> Least recent</p>
                </div>
              </div>
              <div className="row" style={{marginTop: "30px"}}>
                <p>By platform</p>
                <div  >
                  <p><input type="radio" value="ios" name="platform" /> iOS</p>
                  <p><input type="radio" value="android" name="platform" /> Android</p>
                  <p><input type="radio" value="hybrid" name="platform" /> Hybrid</p>
                  <p><input type="radio" value="web" name="platform" /> Web</p>
                </div>
              </div>


            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStatetoProps)(Dashboard);
