import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import Papa from 'papaparse';
import { push } from 'react-router-redux';





const mapStatetoProps = state => ({ viewMode: state.viewMode, scopeToken: state.token.scopeToken })

class ProjectListItem extends Component {
    getCSV = this.getCSV.bind(this);
    state = {
        selected: false
    }

    async getCSV(link) {
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
            preview: 100,
            complete: ({data} ) => this.props.call(data)
        };
        // console.log(scope, "scope bro")

        // let csv = await axios.get(`https://www.googleapis.com/storage/v1/b/${bucket}/${name.split("/")[0]}/o/${name.split("/")[1]}?alt=media`)
        // console.log(csv, "please please")
        let csv = await axios.get(link, option)
        console.log(csv.data, "please work")
        Papa.parse(csv.data, config);
        dispatch(push('./project'))

        
    }

    renderVersions() {
        let { title, versions } = this.props;
        console.log(this.props, "ps props")
        return versions.map(v => {
            return (
                <li>
                    <div className="row">
                        <div className="col-md-2">
                            <div className="row" style={{ marginLeft: 0 }}>
                                <p className="title">{title}</p>
                            </div>
                            <div className="row" style={{ marginLeft: 0 }}>
                                <p className="description" style={{ paddingLeft: 0 }}>{v.description}</p>
                            </div>

                        </div>
                        <div className="col-md-1">
                            <p>V.{v.v}</p>
                        </div>
                        <div className={`col-md-1 ${v.approve ? "approve" : "unapprove"}`}>
                            <p>{v.approve ? "APPROVED" : "UNAPPROVED"}</p>
                        </div>
                        <div className="col-md-5">
                            <p > <strong>Platforms:</strong> {v.platforms.map(p => {
                                return (
                                    <button className="btn btn-primary btn-round btn-light-blue">{p}</button>
                                )
                            })
                            }
                            </p>
                            <p><strong>TYPES: </strong>{v.types.join(", ")}</p>
                        </div>
                        <div className="col-md-1">
                            {moment(v.lastEdit).format("MM-DD-YY")}
                        </div>
                        <div className="col-md-1">
                            <button className="btn btn-primary">Duplicate</button>
                        </div>
                        <div className="col-md-1">
                            <button className="btn btn-primary" onClick={() => this.getCSV(v.mediaLink)}>Edit</button>
                        </div>

                    </div>
                </li>
            )
        })
    }

    render() {
        let { title, versions } = this.props;
        let { selected } = this.state
        console.log(versions, "versions in pli")
        return (
            <li onClick={() => this.setState(prevState => ({ selected: !prevState.selected }))} style={{ cursor: "pointer" }}>
                <div className={`row`}>

                    <div className="col-md-2" >
                        <p>{title}</p>
                    </div>
                    <div className="col-md-9" >
                        <p style={{ paddingLeft: 0 }}>Versions: {versions.length}</p>
                    </div>
                    <div className={`col-md-1`} >
                        <div className={` ${selected ? "arrow-up" : "arrow-down"}`} />
                    </div>
                </div>
                <ul className={`scope-versions`} >
                    {selected ? this.renderVersions() : null}
                </ul>
            </li>
        );
    }
}

export default connect(mapStatetoProps)(ProjectListItem);
