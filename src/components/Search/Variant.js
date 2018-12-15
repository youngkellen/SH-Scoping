import React, { Component, PureComponent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const mapStatetoProps = state => ({ viewMode: state.viewMode });

class Variant extends PureComponent {
    constructor() {
        super()
        this.state = {
            addToScope: false,
            estimate: false, 
            buttonData:[
                {hours: 2, platform: "iOS", select: true}, 
                {hours: 0, platform: "Android"},
                {hours: 2, platform: "Hybrid"},
                {hours: 1, platform: "Web"},
                {hours: 2, platform: "Backend"},
                {hours: 2, platform: "QA"},
                {hours: 0, platform: "Design", select: true}
            ]
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

    renderEstimateButtons() {
        let { buttonData } = this.state;
        return buttonData.map(data => {
            return (
                <div className="col-md-1 content_row" >
                        <div>
                            <img 
                                src={require(`../../assets/${data.select ? `check-black` : `empty`}.png`)}
                                style={{cursor: "auto"}}
                             />
                        </div>
                        <div style={data.select ? {color: "black"} : {color: "lightgray"}}>
                            <input 
                                defaultValue={Number(data.hours)} 
                                type="number"
                                readOnly
                            />
                        </div>
                        <div style={data.select ? {color: "black"} : {color: "lightgray"}}>
                            <p>{data.platform}</p>
                        </div>
                </div>
            )
        })
    }


    render() {
        let { menuClick, estimate } = this.state;
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
                    <div className="col-md-2" style={{ cursor: "pointer" }} onClick={() => this.setState(prevState => ({ estimate: !prevState.estimate }))} >
                        <p>Estimates</p>
                        <div className={estimate ? "arrow-up" : "arrow-down"}></div>
                    </div>
                </div>
                <div className="container row variant_row">
                    <div className="col-md-12 estimate_content" style={estimate ? { display: "block" } : { display: "none" }}>
                        <div className="row">
                            <p>Estimates (HOURS):</p>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                            {this.renderEstimateButtons()}
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStatetoProps)(Variant);
