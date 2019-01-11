import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectListItem from './ProjectListItem';
import newProject from '../../helper/newProject';
import axios from 'axios';


const mapStatetoProps = state => ({ json: state.dashboard.json, scopes: state.dashboard.scopes, scopeToken: state.token.scopeToken })

class ProjectSelect extends Component {
    state = {
        scopeJSON: [],
        jsonOtherVersions: []
    }
    renderList = this.renderList.bind(this)

    async componentWillMount(){
        let { scopes, json, scopeToken } = this.props;
        let option = {
            headers: {
              Authorization: `Bearer ${scopeToken}`
            }
          }
        let scopeJSON = await Promise.all(json.map(async (s) => {
                s = await axios.get(s.mediaLink, option)
                return s.data
              })
            )
            console.log(scopeJSON, "scopejson in willmount")
        this.setState({
            scopeJSON
        })
    }

    async componentWillReceiveProps(nextProps){
        let {  scopeToken } = this.props;

        let option = {
            headers: {
              Authorization: `Bearer ${scopeToken}`
            }
          }
         
        if (nextProps.jsonVersions.length > 0 && nextProps.jsonVersions.length !== this.props.jsonVersions.length){
            let jsonOtherVersions = await Promise.all(nextProps.jsonVersions.map(async (j) => {

                j = await axios.get(j.mediaLink, option)
                return j.data
              })
            )
            this.setState({
                jsonOtherVersions
            })
            console.log(jsonOtherVersions, "json other versions")

        }
    }

    async componentDidMount() {
        let { scopes, json, scopeToken, jsonVersions } = this.props;
      
        let option = {
            headers: {
              Authorization: `Bearer ${scopeToken}`
            }
          }
         

       
        const bucket = 'sh-scoping-scopes';
        console.log(this.props, "ps props mount")
        // let versions =  await axios.get(`https://www.googleapis.com/storage/v1/b/${bucket}/o?versions=true`, option)
        // console.log(versions, "versions bro")
      
        // if (scopes.length > 0 && json.length > 0){
        //     console.log(scopes, "scopes son")
           
        //     for (let i = 0; i < json.length; i++){
        //         let jsonVerions = await axios.get(`https://www.googleapis.com/${bucket}/${json[i].name}/o?generation=${json[i].generation}`, option)
        //         console.log(jsonVerions, "version son")

        //     }
       
       
        // }
    }

     renderList() {
        let projects = []
        let { scopes, json, scopeVersions } = this.props;
        let { scopeJSON, jsonOtherVersions } = this.state;

        console.log(this.props, "render list props")
        if (scopes.length > 0 && json.length > 0 && scopeJSON.length > 0 && jsonOtherVersions.length === scopeVersions.length){
            console.log(scopes, "scopes son")
            console.log(scopeJSON, "scope json")
           
            for (let i = 0; i < scopeJSON.length; i++){
                // let version = await axios.get(`https://storage.googleapis.com/${bucket}/${scopes[i].name}?generation=${scopes[i].generation}`)
                // console.log(version, "version son")
                let otherVersions = scopeVersions.filter(s => s.name === scopes[i].name).reverse()
                console.log(otherVersions, "other versions", scopes[i].name)
                // scopes[i] is the most recent version. other versions are older versions
                let project = new newProject([ scopes[i], ...otherVersions], [ scopeJSON[i], ...jsonOtherVersions])
                console.log(project, "project bro")
                if (project){
                    projects.push( project )
                }
               
            }
            console.log(projects, "projects bro")
            return (
                projects.map((p, i) => {
                    return <ProjectListItem key={i} title={p.scope} versions={p.versions} call={this.props.call}/>
                })
            )
        } else {
            return null
        }
        // let projects = [
        //     { scope: "Power Music", versions: [{ v: "1", description: "test", approved: true, platforms: ["ios", "android"], lastEdit: "04/12/2018", types: ["E-commerce", "Digital Media"],date: "11/11/11"  }]},
        //     { scope: "Scotts gro App", versions: [{ v: "1", description: "gro app", approved: true, platforms: ["ios", "android"], lastEdit: "04/12/2018", types: ["E-commerce", "Digital Media"], date: "11/11/11" },  ]   },
        //     {
        //         scope: "Actually", versions: [{ v: "1", description: "act", approved: false, platforms: ["ios", "android"], lastEdit: "04/12/2018", types: ["E-commerce", "Digital Media"], date: "11/11/11"  },
        //         { v: "1", description: "act", approved: true, platforms: ["ios", "android"], lastEdit: "04/12/2018", types: ["E-commerce", "Digital Media"], date: "11/11/11"  }]
        //     },
        //     { scope: "OC", versions: [{ v: "1", description: "gro app", approved: true, platforms: ["ios", "android"], lastEdit: "04/12/2018", types: ["E-commerce", "Digital Media"],  date: "11/11/11" }]  },
        // ]
       
    }

    render() {
        console.log(this.props, "scopes in ps")
        return (
            <div className="project-select" style={{overflow: "auto"}}>
                <div style={{overflow: "auto"}}>
                    <ul className="scope">
                        {this.renderList()}
                    </ul>
                </div>
               
            </div>
        );
    }
}

export default connect(mapStatetoProps)(ProjectSelect);
