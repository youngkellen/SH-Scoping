import React, { Component, PureComponent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const mapStatetoProps = state => ({ viewMode: state.viewMode });

class Variant extends PureComponent {
    constructor() {
        super()
        this.state = {
            addToScope: false
        }
    }

    renderAddToScope() {
        let { addToScope } = this.state;
        if (addToScope) {
            return (
                <div style ={{cursor: "pointer"}} onClick={() => this.setState({ addToScope: false })} >
                    <img src={require("../../assets/remove-red.png")} />
                    <p style={{color: "red"}}>Remove from Scope</p>
                </div>
            )
        } else {
            return (
                <div style ={{cursor: "pointer"}} onClick={() => this.setState({addToScope: true})}>
                    <img src={require("../../assets/plus-blue.png")} />
                    <p style={{color: "blue"}}>Add to Scope</p>
                </div>
            )
        }

    }


    render() {
        return (
            <div className="feature_variant">
                <div className="row variant_row">
                    <div className="col-md-6">
                        <p>T:</p>
                        <div className="Rectangle">Feature </div>
                    </div>
                    <div className="col-md-3">
                        <img src={require("../../assets/check-gray.png")} />
                        <p>Include in Quote</p>
                    </div>
                    <div className="col-md-3">
                        {this.renderAddToScope()}
                    </div>
                </div>
                <div className="row variant_row">
                    <div className="col-md-6">
                        <p>FD:</p>
                        <div className="Rectangle">Feature Description</div>
                    </div>
                    <div className="col-md-6">
                        <p>A:</p>
                        <div className="Rectangle">Add to Scope</div>
                    </div>
                </div>
                <div className="row variant_row">
                    <div className="col-md-10">
                        <img src={require("../../assets/plus-black.png")} />
                        <p>notes</p>
                    </div>
                    <div className="col-md-2">estimates</div>
                </div>
            </div>
        )
    }
}

export default connect(mapStatetoProps)(Variant);
