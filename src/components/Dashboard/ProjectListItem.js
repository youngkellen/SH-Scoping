import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProjectVersion from './ProjectVersion'





const mapStatetoProps = state => ({ viewMode: state.viewMode, scopeToken: state.token.scopeToken })

class ProjectListItem extends Component {
    state = {
        selected: false
    }

    render() {
        let { title, versions } = this.props;
        let { selected } = this.state
        // console.log(versions, "versions in pli")
        return (
            <li>
                <div className={`row`} style={{ cursor: "pointer" }} onClick={() => this.setState(prevState => ({ selected: !prevState.selected }))}>

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
                    {selected ? versions.map((v,i) => <ProjectVersion key={i} call={this.props.call} title={title} v={v.v} approve={v.approve} platforms={v.platforms} types={v.types} description={v.description} mediaLink={v.mediaLink} fileName={v.fileName} json={v.json} lastEdit={v.lastEdit} />) : null}
                </ul>
            </li>
        );
    }
}

export default connect(mapStatetoProps)(ProjectListItem);
