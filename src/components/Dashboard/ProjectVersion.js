import React, { Component } from 'react'
import moment from 'moment';
import axios from 'axios';
import Papa from 'papaparse';
import { push } from 'react-router-redux';
import { SCOPE_NAME, SCOPE_DOWNLOAD_LINK, SCOPE_JSON } from '../../constants/actionTypes';
import { connect } from 'react-redux';
import Project from '../Project';

const mapStatetoProps = state => ({ viewMode: state.viewMode, scopeToken: state.token.scopeToken })


class ProjectVersion extends Component {
    getCSV = this.getCSV.bind(this);
    duplicateCSV = this.duplicateCSV.bind(this);
    state = {
        selected: false,
        renderInputs: false,
        title: this.props.title,
        description: this.props.description,
        lastEdit: this.props.lastEdit,
        platforms: this.props.platforms,
        types: this.props.types,
        approve: this.props.approve
    }

    async getCSV(link, name, downloadLink, json) {
        const bucket = 'sh-scoping-scopes';
        const { scopeToken, dispatch } = this.props;
        let option = {
            headers: {
                Authorization: `Bearer ${scopeToken}`
            }
        }
        const config = {
            download: false,
            header: true,
            skipEmptyLines: true,
            delimiter: ',',
            // preview: 100,
            complete: ({ data }) => this.props.call(data)
        };
        // console.log(scope, "scope bro")

        // let csv = await axios.get(`https://www.googleapis.com/storage/v1/b/${bucket}/${name.split("/")[0]}/o/${name.split("/")[1]}?alt=media`)
        // console.log(csv, "please please")
        let csv = await axios.get(link, option)
        // console.log(csv, "please work")
        Papa.parse(csv.data, config);
        dispatch({ type: SCOPE_NAME, payload: name })
        dispatch({ type: SCOPE_DOWNLOAD_LINK, payload: downloadLink })
        dispatch({ type: SCOPE_JSON, payload: json })
        dispatch(push('./project'))


    }

    async duplicateCSV(link, name, downloadLink, json) {
        // console.log(link, "link zelda")
        // console.log(downloadLink, "download")
        // console.log(json, "json")
        const bucket = 'sh-scoping-scopes';
        const { scopeToken, dispatch } = this.props;
        let option = {
            headers: {
                Authorization: `Bearer ${scopeToken}`
            }
        }
        let jsonOption = {
            headers: {
                Authorization: `Bearer ${scopeToken}`,
                "Content-Type": "application/json"
            }
        }
        let csv = await axios.get(link, option)
        if (csv && csv.data) {
            let csvLink = `https://www.googleapis.com/upload/storage/v1/b/${bucket}/o?uploadType=media&name=${downloadLink}`
            let jsonLink = `https://www.googleapis.com/upload/storage/v1/b/${bucket}/o?uploadType=media&name=${downloadLink.split("/")[0]}/scope.json`
            // console.log(jsonLink, "json Link")
            // console.log(json, "json my son")
            let post = await axios.post(csvLink, csv.data, option)
            let jsonPost = await axios.post(jsonLink, json, jsonOption)
            if (post && jsonPost) {
                setTimeout(window.location.reload(), 1000)
            } else {
                alert("error")
            }
        }
    }

    renderTitle(input) {
        // let { renderInputs } = this.state;
        // let { title } = this.props;
        // if (renderInputs) {
        //     return (
        //         <input className="Rectangle title" style={{ maxWidth: 150 }} defaultValue={title} onChange={e => this.setState({ title: e.target.value })}></input>
        //     )
        // } else {
        return (
            <p className="title">{input}</p>
        )
        // }
    }

    renderDescription(input) {
        let { renderInputs } = this.state;
        let { description } = this.props;
        if (renderInputs) {
            return (
                <div className="Rectangle description" style={{ maxWidth: 150, backgroundColor: "#efefef", marginTop: 10 }} onInput={e => this.setState({ description: e.target.innerText })} contentEditable>{description}</div>
            )
        } else {
            return (
                <p className="description" style={{ paddingLeft: 0 }}>{input}</p>
            )
        }
    }

    renderPlatforms(input) {
        let { renderInputs } = this.state;
        let { platforms } = this.props;

        if (renderInputs) {
            return (
                <div>
                    <span>Space Delimited</span>
                    <div className="Rectangle " style={{ maxWidth: 150, backgroundColor: "#efefef", marginTop: 10 }} onInput={e => this.setState({ platforms: e.target.innerText })} contentEditable>{platforms.join(" ")}</div>
                </div>

            )
        } else {
            return (
                <p > <strong>Platforms:</strong> {input.map((p, i) => {
                    return (
                        <button key={i} className="btn btn-primary btn-round btn-light-blue">{p}</button>
                    )
                })
                }
                </p>
            )
        }
    }

    renderTypes(input) {
        let { renderInputs } = this.state;
        let { types } = this.props;

        if (renderInputs) {
            return (
                <div>
                    <span>Comma delimited</span>
                    <div className="Rectangle"
                        style={{ maxWidth: 150, backgroundColor: "#efefef", marginTop: 10 }}
                        onInput={e => this.setState({ types: e.target.innerText })}
                        contentEditable>{Array.isArray(types) ? types.join(", ") : types}
                    </div>
                </div>

            )
        } else {
            return (
                <p><strong>TYPES: </strong>{input.join(", ")}</p>
            )
        }
    }

    renderApprove(input) {
        let { renderInputs } = this.state;

        if (!renderInputs) {
            return <p>{input ? "APPROVED" : "UNAPPROVED"}</p>
        } else {
            return (
                <div className="row">
                    <p style={{ display: "inline-block", width: 80, marginRight: 20 }}>Approve?</p>
                    <span style={{ marginRight: 10 }}>
                        <input type="radio" value={input} name="approve" style={{ width: 10 }} onChange={() => this.setState({ approve: true })} defaultChecked={input} />yes
                      </span>
                    <span>
                        <input type="radio" value={!input} name="approve" style={{ width: 10 }} onChange={() => this.setState({ approve: false })} defaultChecked={!input} />no
                      </span>
                </div>
            )
        }


    }

    async edit(link, name, downloadLink) {
        const { scopeToken, dispatch } = this.props;
        let { renderInputs, title, platforms, description, types, approve } = this.state;
        if (!renderInputs) {
            this.setState({ renderInputs: true })
        } else {
            // submit
            console.log(this.state, "edit state")
            let json = {
                Platforms: Array.isArray(platforms) ? platforms : platforms.split(" "),
                Approve: approve,
                Types: Array.isArray(types) ? types : types.split(", "),
                Description: description

            }
            const bucket = 'sh-scoping-scopes';

            let option = {
                headers: {
                    Authorization: `Bearer ${scopeToken}`
                }
            }
            let jsonOption = {
                headers: {
                    Authorization: `Bearer ${scopeToken}`,
                    "Content-Type": "application/json"
                }
            }
            let csv = await axios.get(link, option)
            if (csv && csv.data) {
                let csvLink = `https://www.googleapis.com/upload/storage/v1/b/${bucket}/o?uploadType=media&name=${downloadLink}`
                let jsonLink = `https://www.googleapis.com/upload/storage/v1/b/${bucket}/o?uploadType=media&name=${downloadLink.split("/")[0]}/scope.json`
                // console.log(jsonLink, "json Link")
                // console.log(json, "json my son")
                let post = await axios.post(csvLink, csv.data, option)
                let jsonPost = await axios.post(jsonLink, json, jsonOption)
                if (post && jsonPost) {
                    setTimeout(window.location.reload(), 1000)
                } else {
                    alert("error")
                }
            }

        }
    }

    render() {
        let { v, mediaLink, fileName, json } = this.props;
        let { title, approve, platforms, types, lastEdit, description } = this.state;
        let { renderInputs } = this.state;
        return (
            <li className="project-item">
                <div className="row">
                    <div className="col-md-2" >
                        <div className="row" style={{ marginLeft: 0 }}>
                            {this.renderTitle(title)}
                        </div>
                        <div className="row" style={{ marginLeft: 0 }}>
                            {this.renderDescription(description)}
                        </div>

                    </div>
                    <div className="col-md-1">
                        <p>V.{v}</p>
                    </div>
                    <div className={`col-md-1 ${approve ? "approve" : "unapprove"}`}>
                        {this.renderApprove(approve)}
                    </div>
                    <div className="col-md-4">
                        {this.renderPlatforms(platforms)}
                        {this.renderTypes(types)}
                    </div>
                    <div className="row col-md-4">
                        <div className="col-md-3">
                            {moment(lastEdit).format("MM-DD-YY")}
                        </div>
                        <div className="col-md-3">
                            <button className="btn btn-primary" onClick={() => this.duplicateCSV(mediaLink, title, fileName, json)}>Duplicate</button>
                        </div>
                        <div className="col-md-3">
                            <button className="btn btn-primary" onClick={() => this.edit(mediaLink, title, fileName)}>{renderInputs ? "Submit" : "Edit"}</button>
                        </div>
                        <div className="col-md-3">
                            <button className="btn btn-primary" style={{ cursor: "pointer" }} onClick={() => this.getCSV(mediaLink, title, fileName, json)}>Open</button>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}

export default connect(mapStatetoProps)(ProjectVersion)