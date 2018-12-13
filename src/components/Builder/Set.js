import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStatetoProps = state => ({ viewMode: state.viewMode })

class Set extends Component {
    constructor(){
        super()
        this.state = {
            selected: false
        }
    }

    render() {
        let { viewMode } = this.props;
        let { selected } = this.state
        return (
            <div className="row" >
                <button className="collapsible" onClick={() => this.setState(prevState =>({selected: !prevState.selected}))}>
                    General<div className={selected ? "arrow-down" : "arrow-up"} />
                </button>
                <div className="content" style={ selected ? {display: "block"} : {display: "none"}}>
                    <ul>
                        <li>Content</li>
                        <li>Content</li>
                        <li>Content</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default connect(mapStatetoProps)(Set);
