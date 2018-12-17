import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const mapStatetoProps = state => ({ viewMode: state.viewMode });

class Variant extends Component {
    constructor() {
        super()
        this.state = {
            addToScope: false,
            duplicate: false,
            menuClick: false,
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

    selectEstimate(data){
        console.log(data, "data");
        let { buttonData } = this.state;
        let newData = Object.assign({}, data, {select: !data.select})
        let index = buttonData.map(e => e.platform).indexOf(data.platform);
        buttonData.splice(index, 1, newData)
        console.log(buttonData, "button Data")
        this.setState({
            buttonData
        })
    }

    changeEstimateHours(data, val){
        let { buttonData } = this.state;
        let newData = Object.assign({}, data, {hours: Number(val)})
        let index = buttonData.map(e => e.platform).indexOf(data.platform);
        buttonData.splice(index, 1, newData)
        console.log(buttonData, "button Data")
        this.setState({
            buttonData
        })

    }


    renderEstimateButtons() {
        let { buttonData } = this.state;
        return buttonData.map(data => {
            return (
                <div className="col-md-1 content_row" >
                        <div>
                            <img 
                                src={require(`../../assets/${data.select ? `check-black` : `empty`}.png`)}
                                onClick={() => this.selectEstimate(data)}
                             />
                        </div>
                        <div style={data.select ? {color: "black"} : {color: "lightgray"}}>
                            <input 
                                style={data.select && !data.hours ? {backgroundColor: "#ffc2c2"}: {}} 
                                defaultValue={Number(data.hours)} 
                                type="number"
                                onChange={e => this.changeEstimateHours(data, e.target.value)}
                                readOnly={data.select ? false : true}
                            />
                        </div>
                        <div style={data.select ? {color: "black"} : {color: "lightgray"}}>
                            <p>{data.platform}</p>
                        </div>
                </div>
            )
        })
    }

    searchVariant(){
        let { menuClick, estimate } = this.state;
        let dropDownColor = "#656565"
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

    builderVariant(){
        let { menuClick, estimate } = this.state;
        let dropDownColor = "#656565"
        return (
            <div className="feature_variant">
                <div className="row variant_row">
                    <div className="col-md-3">
                        <p>T:</p>
                        <input className="Rectangle" placeholder={"Feature"}></input>
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
                            <div className="col-md-3" style={{ cursor: "pointer" }} onClick={() => this.setState(prevState => ({ menuClick: !prevState.menuClick }))} >
                                <img
                                    style={{ width: "2px" }}
                                    src={require("../../assets/menu.png")}

                                />
                                <div class="dropdown-menu dropdown-menu-right" style={menuClick ? { display: "block" } : { display: "none" }}>
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
                        <input className="Rectangle" placeholder={"Feature Description"}></input>
                    </div>
                    <div className="col-md-6">
                        <p>A:</p>
                        <input className="Rectangle" placeholder={"Add to Scope"}></input>
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


    render() {
       let { mode } = this.props
        return (
            <div>
                 {mode === "builder" ? this.builderVariant() : this.searchVariant()}
            </div>
           
        )
       
    }
}

export default connect(mapStatetoProps)(Variant);
