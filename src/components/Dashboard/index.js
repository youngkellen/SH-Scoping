import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ProjectSelect from "./ProjectSelect";
import axios from "axios";
import scope from '../../reducers/scope';
import { platform } from 'os';





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
    projectTypes: "",
    sortProject: "",
    platformFilter: [],
    search: ""
  }

  handleSubmit = this.handleSubmit.bind(this);
  handlePlatformFilter = this.handlePlatformFilter.bind(this);

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
    // console.log(scopeVersions, "scope Versions")
    // console.log(jsonVersions, "json Versions")

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
    // console.log(this.state)
    this.setState({
      projectPlatforms: val
    })
  }

  handleProjectTypes(val){
    this.setState({
      projectTypes: val
    })
  }

  async handleSubmit(){
    let { projectDescription, projectName, projectPlatforms, approve, projectTypes} = this.state;
    const { scopeToken, token } = this.props.token;
    if ( projectDescription && projectName && projectPlatforms && projectTypes) {
      let json = {
        "Platforms" : projectPlatforms.split(" ").filter(p => p),
        "Types" : projectTypes.split(" ").filter(t => t),
        "Approve": approve,
        "Description": projectDescription,
        "Project": projectName
      }
      let csv = "SOURCE,Include in Scope?,Platform,Feature set,Feature,Feature description,Design Estimate (Resource Hours),Hybrid Engineering,Web Engineering Estimate (Resource Hours),iOS Engineering Estimate (Resource Hours),Android Engineering Estimate (Resource Hours),Backend Engineering Estimate (Resource Hours),Magento Engineering,QA Estimate (Resource Hours),Assumptions,Notes,Type"
      
      let folderName = projectName
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
      
      let path = `${folderName}/scope.csv`
      // let csvContent = "data:text/csv;charset=utf-8," + csv
      // let encodedUri = encodeURI(csvContent);
  
      let link = `https://www.googleapis.com/upload/storage/v1/b/${bucket}/o?uploadType=media&name=${path}`
      let jsonLink = `https://www.googleapis.com/upload/storage/v1/b/${bucket}/o?uploadType=media&name=${folderName}/scope.json`
      let post = await axios.post(link, csv, option)
      let jsonPost = await axios.post(jsonLink, json, jsonOption)
      if (post && jsonPost){
        alert("Submitted. Please allow up to a minute to see the new project.")
        // window.location.reload(); 
        this.setState({ newProject: false })
      }
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
                    <input type="radio" value={!approve} name="approve"  style={{width: 10}} onChange={()=>this.changeApprove(false)} defaultChecked/>no
                  </span>
            </div>
            <div className="row">
              <p style={{display: "inline-block", width: 80, marginRight: 20}}>Platforms</p>
              <input type="text" className="Rectangle" onChange={e=>this.handleProjectPlatforms(e.target.value)} placeholder="space delimited"/>
            </div>
            <div className="row">
              <p style={{display: "inline-block", width: 80, marginRight: 20}}>Types</p>
              <input type="text" className="Rectangle" onChange={e=>this.handleProjectTypes(e.target.value)} placeholder="space delimited"/>
            </div>
            <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
          </div>
      </div>
    )
  }

  handlePlatformFilter(val){
    val = val.toLowerCase()
    let { platformFilter } = this.state;

    if (platformFilter.includes(val)){
      this.setState({
        platformFilter:  platformFilter.filter(p => p !== val)
      })
     
    } else {
      this.setState({
        platformFilter : [...platformFilter, val]
      })
    }
  }

  render() {
    let { scopeVersions, jsonVersions, newProject, sortProject, platformFilter, search } = this.state;
    console.log(scopeVersions, "scope v")
    console.log(jsonVersions, "json v")
    return (
      <div className="dashboard">
        <div className="col-md-12" style={{ height: "100vh" }}>
          <div className="row">
            <p onClick={() => this.setState(prevState =>({newProject: !prevState.newProject}))} style={{cursor: "pointer", color: "dodgerblue", fontSize: 16}}>+ NEW PROJECT</p>
            {newProject ? this.renderNewProjectInput(): null}
            <input type="search" placeholder="Enter Search Term" onChange={e=>this.setState({search: e.target.value})}></input>
          </div>
          <div className="row" style={{ marginTop: "30px" }}>
            <div className="col-md-10" style={{ paddingLeft: 0, overflow: "auto" }}>
              <ProjectSelect scopeVersions={scopeVersions} jsonVersions={jsonVersions} call={this.props.call} sortProject={sortProject} platformFilter={platformFilter} search={search}/>
            </div>
            <div className="col-md-2 filter">
              <div className="row">
                <p>FILTER/SORT:</p>
                <div  >
                  <p><input type="radio" value="A-Z" name="filter" onChange={()=>this.setState({ sortProject: "A-Z"})}/> Alphabetical A-Z</p>
                  <p><input type="radio" value="Z-A" name="filter" onChange={()=>this.setState({ sortProject: "Z-A"})}/> Alphabetical Z-A</p>
                  <p><input type="radio" value="recent" name="filter" onChange={()=>this.setState({ sortProject: "recent"})}/> Most recent</p>
                  <p><input type="radio" value="latest" name="filter" onChange={()=>this.setState({ sortProject: "latest"})}/> Least recent</p>
                </div>
              </div>
              <div className="row" style={{marginTop: "30px"}}>
                <p>By platform</p>
                <div  >
                  <p><input type="checkbox" value="ios" name="iOS" onChange={(e) => this.handlePlatformFilter(e.target.value)}/> iOS</p>
                  <p><input type="checkbox" value="android" name="Android" onChange={(e) => this.handlePlatformFilter(e.target.value)}/> Android</p>
                  <p><input type="checkbox" value="hybrid" name="Hybrid" onChange={(e) => this.handlePlatformFilter(e.target.value)}/> Hybrid</p>
                  <p><input type="checkbox" value="web" name="Web" onChange={(e) => this.handlePlatformFilter(e.target.value)}/> Web</p>
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
