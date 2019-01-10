import React, { Component } from 'react';
import { connect } from 'react-redux';



const mapStatetoProps = state => ({ viewMode: state.viewMode })

class ProjectSelect extends Component {
    state = {
        selected: false
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
                        <div className={`col-md-1 ${v.approved ? "approve" : "unapprove"}`}>
                            <p>{v.approved ? "APPROVED" : "UNAPPROVED"}</p>
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
                            {v.date}
                        </div>
                         <div className="col-md-1">
                         <button className="btn btn-primary">Duplicate</button>
                        </div>
                         <div className="col-md-1">
                            <button className="btn btn-primary">Edit</button>
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
            <li onClick={()=>this.setState(prevState => ({selected: !prevState.selected}))} style={{cursor: "pointer"}}>
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

export default connect(mapStatetoProps)(ProjectSelect);
