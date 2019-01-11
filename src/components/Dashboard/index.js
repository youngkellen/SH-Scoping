import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ProjectSelect from "./ProjectSelect";
import axios from "axios";
import scope from '../../reducers/scope';





const mapStatetoProps = state => ({ viewMode: state.viewMode, token: state.token, scopes: state.dashboard.scopes  })

class Dashboard extends Component {
  state = {
    scopeVersions: [],
    jsonVersions: [],
    newProject: false,
    projectName: "",
    approve: false,
    projectDescription: "",
    projectPlatforms: "",
    projectTypes: ""
  }

  handleSubmit = this.handleSubmit.bind(this);

  async componentWillMount() {
    const { scopeToken, token } = this.props.token;
    const { scopes } = this.props;
    let option = {
      headers: {
        Authorization: `Bearer ${scopeToken}`
      }
    }
    const bucket = 'sh-scoping-scopes';
    let scopeObject = await axios.get(`https://www.googleapis.com/storage/v1/b/${bucket}/o?versions=true`, option)
    console.log(scopeObject, "scope object")
    let scopeVersions = scopeObject.data.items.filter(i => i.size != "0" && !i.name.includes("json") && i.timeDeleted && i.name.split("/").length > 1)
    let jsonVersions = scopeObject.data.items.filter(i => i.size != "0" && i.name.includes("json") && i.timeDeleted && i.name.split("/").length > 1)

    // let deletedScopes = scopesFromObject.filter(({id}) => !scopes.map(s => s.id).includes(id))
    console.log(scopeVersions, "scope Versions")
    console.log(jsonVersions, "json Versions")

    if (scopeVersions.length > 0){
      this.setState({
        scopeVersions,
        jsonVersions
      })
    }
   
  }

  changeApprove(value){
    this.setState({
      approve: value
    })
  }

  handleProjectName(val){
    this.setState({
      projectName: val
    })
  }

  handleProjectDescription(val){
    this.setState({
      projectDescription: val
    })
  }

  handleProjectPlatforms(val){
    console.log(this.state)
    this.setState({
      projectPlatforms: val
    })
  }

  handleSubmit(){
    let { projectDescription, projectName, projectPlatforms, approve, projectTypes} = this.state;
    if ( projectDescription && projectName && projectPlatforms && projectTypes) {
      let json = {
        "Platforms" : projectPlatforms,
        "Types" : projectTypes,
        "Approve": approve,
        "Description": projectDescription
      }
      let folderName = projectName
    } else {
      alert("Please Complete Form")
    }
  }

  renderNewProjectInput(){
    let { approve } = this.state;
    return(
      <div className="container row">
        <div className="col-md-12 project-info" style={{ marginBottom: "50px" }}>
            <div className="row">
              <p style={{display: "inline-block", width: 80, marginRight: 20}}>Name </p>
              <input type="text" className="Rectangle" onChange={e=>this.handleProjectName(e.target.value)} />
            </div>
            <div className="row">
              <p style={{display: "inline-block", width: 80, marginRight: 20}}>Description</p>
              <input type="text" className="Rectangle" onChange={e=>this.handleProjectDescription(e.target.value)} />
            </div>
            <div className="row">
              <p style={{display: "inline-block", width: 80, marginRight: 20}}>Approve</p>
                  <span style={{marginRight: 10}}>
                    <input type="radio" value={approve} name="approve" style={{width: 10}} onChange={()=>this.changeApprove(true)}/>yes
                  </span>
                  <span>
                    <input type="radio" value={!approve} name="approve"  style={{width: 10}} onChange={()=>this.changeApprove(false)}/>no
                  </span>
            </div>
            <div className="row">
              <p style={{display: "inline-block", width: 80, marginRight: 20}}>Platforms</p>
              <input type="text" className="Rectangle" onChange={e=>this.handleProjectPlatforms(e.target.value)} />
            </div>
            <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
          </div>
      </div>
    )
  }

  render() {
    let { scopeVersions, jsonVersions, newProject } = this.state;
    return (
      <div className="dashboard">
        <div className="col-md-12" style={{ height: "100vh" }}>
          <div className="row">
            <p onClick={() => this.setState(prevState =>({newProject: !prevState.newProject}))} style={{cursor: "pointer", color: "dodgerblue", fontSize: 16}}>+ NEW PROJECT</p>
            {newProject ? this.renderNewProjectInput(): null}
            <input type="search" defaultValue="Enter Search Term"></input>
          </div>
          <div className="row" style={{ marginTop: "30px" }}>
            <div className="col-md-10" style={{ paddingLeft: 0, overflow: "auto" }}>
              <ProjectSelect scopeVersions={scopeVersions} jsonVersions={jsonVersions} call={this.props.call}/>
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
