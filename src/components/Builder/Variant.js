import React, { Component, PureComponent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const mapStatetoProps = state => ({ viewMode: state.viewMode });

class Variant extends PureComponent {
    constructor() {
        super()
        this.state = {
            addToScope: false,
            duplicate: false,
            menuClick: false
        }
    }

    renderAddToScope() {
        let { addToScope } = this.state;
        if (addToScope) {
            return (
                <div style={{ cursor: "pointer" }} onClick={() => this.setState({ addToScope: false })} >
                    <img src={require("../../assets/remove-red.png")} />
                    <p style={{ color: "red" }}>Remove from Scope</p>
                </div>
            )
        } else {
            return (
                <div style={{ cursor: "pointer" }} onClick={() => this.setState({ addToScope: true })}>
                    <img src={require("../../assets/plus-blue.png")} />
                    <p style={{ color: "blue" }}>Add to Scope</p>
                </div>
            )
        }

    }

    renderDuplicate() {
        let { duplicate } = this.state;
        if (duplicate) {
            return (
                <div style={{ cursor: "pointer" }} onClick={() => this.setState({ duplicate: false })} >
                    <img src={require("../../assets/remove-red.png")} />
                    <p style={{ color: "red" }}>Duplicate</p>
                </div>
            )
        } else {
            return (
                <div style={{ cursor: "pointer" }} onClick={() => this.setState({ duplicate: true })}>
                    <img src={require("../../assets/plus-blue.png")} />
                    <p style={{ color: "blue" }}>Duplicate</p>
                </div>
            )
        }

    }


    render() {
        let { menuClick } = this.state;
        let dropDownColor = "#656565"
        console.log(menuClick, "menu click")
        return (
            <div className="feature_variant">
                <div className="row variant_row">
                    <div className="col-md-3">
                        <p>T:</p>
                        <div className="Rectangle">Feature </div>
                    </div>
                    <div className="col-md-3">
                        <img src={require("../../assets/check-gray.png")} />
                        <p>Include in Quote</p>
                    </div>
                    <div className="col-md-6">
                        <div className="col-md-6">
                            {this.renderAddToScope()}
                        </div>
                        <div className="col-md-6" onMouseLeave={() => this.setState(prevState => ({ menuClick: false }))}>
                            <div className="col-md-9">
                                {this.renderDuplicate()}
                            </div>
                            <div className="col-md-3" >
                                <img 
                                    style={{ width: "2px" }}
                                    src={require("../../assets/menu.png")} 
                                    onClick={() => this.setState(prevState => ({ menuClick: !prevState.menuClick }))}
                                />
                                <div class="dropdown-menu dropdown-menu-right" style={menuClick ? {display: "block"} : {display: "none"}}>
                                    <a class="dropdown-item">Add To Library</a>
                                    <a class="dropdown-item">Update in Library</a>
                                </div>
                            </div>
                        </div>
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
