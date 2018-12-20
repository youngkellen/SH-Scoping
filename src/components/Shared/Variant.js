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
            addNotes: false,
            buttonData:[
            ],
            data: []
        }
        this.renderEstimateButtons = this.renderEstimateButtons.bind(this);
    }

    componentDidMount(){
        this.setState({
            data: this.props.data,
            buttonData: [{hours: this.props.data["iOS Engineering Estimate (Resource Days)"] || 0, platform: "iOS"}, 
            {hours: this.props.data["Android Engineering Estimate (Resource Days)"] || 0, platform: "Android"},
            {hours: this.props.data["Hybrid Engineering"] || 0, platform: "Hybrid"},
            {hours: this.props.data["Web Engineering Estimate (Resource Days)"] || 0, platform: "Web"},
            {hours: this.props.data["Backend Engineering Estimate (Resource Days)"] || 0, platform: "Backend"},
            {hours: this.props.data["QA Estimate (Resource Days)"] || 0, platform: "QA"},
            {hours: this.props.data["Design estimate (Resource Days)"] || 0, platform: "Design"}]
        })
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps, "variant props")
        console.log(nextProps.data, "next props data" )
        this.setState({
            data: nextProps.data,
            buttonData: [
                {hours: nextProps.data["iOS Engineering Estimate (Resource Days)"] || 0, platform: "iOS"}, 
                {hours: nextProps.data["Android Engineering Estimate (Resource Days)"] || 0, platform: "Android"},
                {hours: nextProps.data["Hybrid Engineering"] || 0, platform: "Hybrid"},
                {hours: nextProps.data["Web Engineering Estimate (Resource Days)"] || 0, platform: "Web"},
                {hours: nextProps.data["Backend Engineering Estimate (Resource Days)"] || 0, platform: "Backend"},
                {hours: nextProps.data["QA Estimate (Resource Days)"] || 0, platform: "QA"},
                {hours: nextProps.data["Design estimate (Resource Days)"] || 0, platform: "Design"}
            ],
            //addNotes: false
        })
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
        console.log(buttonData, "render estimate buttons")
      
        return buttonData.map((data, i) => {
            return (
                <div className="col-md-1 content_row" key={i}>
                        <div>
                            <img 
                                src={require(`../../assets/${data.select ? `check-black` : `empty`}.png`)}
                                onClick={() => this.selectEstimate(data)}
                             />
                        </div>
                        <div style={data.select ? {color: "black"} : {color: "lightgray"}}>
                            <input 
                                style={data.select && !data.hours ? {backgroundColor: "#ffc2c2"}: {}} 
                                placeholder={Number(data.hours)} 
                                type="number"
                                step="0.01"
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

    renderNotes(d){
        if (this.state.addNotes){
            return (
                <div >
                     <p>N:</p>
                     <input className="Rectangle" defaultValue={d.Notes}></input>
                </div>
            )
        } else {
            return (
                <div >
                    <img src={require("../../assets/plus-black.png")} onClick={()=>this.setState({addNotes: true})}/>
                    <p>Notes</p>
                </div>
            )
        }
    }

    renderQuote(quote){
        if (quote){
            return (
                <div>
                    <img src={require("../../assets/check-black.png")} />
                    <p >Include in Quote</p>
                </div>
            )
        } else {
            return (
                <div>
                    <img src={require("../../assets/check-gray.png")} />
                    <p style={{color: "lightgray"}}>Include in Quote</p>
                </div>
               
            )
        }
    }

    searchVariant(){
        let { menuClick, estimate, data } = this.state;
        let dropDownColor = "#656565"
        console.log(data, "data variant")
        if (data){
            return (
                <div className="feature_variant">
                    <div className="row variant_row">
                        <div className="col-md-6">
                            <p>T:</p>
                            <div className="Rectangle">{data.SOURCE}</div>
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
                            <div className="Rectangle">{data["Feature description"]}</div>
                        </div>
                        <div className="col-md-6">
                            <p>A:</p>
                            <div className="Rectangle">{data.Assumptions}</div>
                        </div>
                    </div>
                    <div className="row variant_row">
                        <div className="col-md-10">
                            <p>N:</p>
                            <input className="Rectangle" defaultValue={data.Notes}></input>
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
        } else {
            return (
                <div className="feature_variant">
                    <div className="row variant_row">
                        <div className="col-md-6">
                            <p>T:</p>
                            <div className="Rectangle">Title</div>
                        </div>
                        <div className="col-md-3">
                            <img src={require("../../assets/check-black.png")} />
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
                            <p>{data.Notes}</p>
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

    builderVariant(){
        let { menuClick, estimate } = this.state;
        let { data } = this.state;
        let dropDownColor = "#656565"
        let inQuote = data["Include in Scope?"]
        console.log(data, "data variant")
        if (data){
            return (
                <div  className={`feature_variant ${inQuote ? "in-quote" : ""}`}>
                    <div className="row variant_row">
                        <div className="col-md-3">
                            <p>T:</p>
                            <input className="Rectangle" defaultValue={data.SOURCE} />
                        </div>
                        <div className="col-md-3">
                           {this.renderQuote(inQuote)}
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
                                    <div className="dropdown-menu dropdown-menu-right" style={menuClick ? { display: "block" } : { display: "none" }}>
                                        <a className="dropdown-item">Add To Library</a>
                                        <a className="dropdown-item">Update in Library</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row variant_row">
                        <div className="col-md-6">
                            <p>FD:</p>
                            <input className="Rectangle" defaultValue={data["Feature description"]}></input>
                        </div>
                        <div className="col-md-6">
                            <p>A:</p>
                            <input className="Rectangle" defaultValue={data.Assumptions}></input>
                        </div>
                    </div>
                    <div className="row variant_row">
                        <div className="col-md-10">
                            {this.renderNotes(data)}
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
        } else {
            return (
                <div className="feature_variant">
                    <div className="row variant_row">
                        <div className="col-md-3">
                            <p>T:</p>
                            <input className="Rectangle" placeholder={"Title"}/>
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
                                    <div className="dropdown-menu dropdown-menu-right" style={menuClick ? { display: "block" } : { display: "none" }}>
                                        <a className="dropdown-item">Add To Library</a>
                                        <a className="dropdown-item">Update in Library</a>
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
                            <input className="Rectangle" placeholder={"Assumptions"}></input>
                        </div>
                    </div>
                    <div className="row variant_row">
                        <div className="col-md-10">
                            {this.renderNotes()}
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
