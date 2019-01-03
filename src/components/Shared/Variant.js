import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import searchHighlight from "../../helper/searchHighlight";
import newRow from "../../helper/newRow";
import buildTree from "../../helper/buildTree";
import { TEMPSCOPE_SCOPE_EDIT, SCOPE_SCOPE_EDIT, TEMPSCOPE_TREE, SCOPE_TREE } from "../../constants/actionTypes"

const mapStatetoProps = state => ({ viewMode: state.viewMode, search: state.scope.search, temp: state.scope.selected.temp, scope: state.scope, tempScope: state.tempScope });

class Variant extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addToScope: false,
            duplicate: false,
            menuClick: false,
            estimate: false,
            addNotes: false,
            buttonData:[],
            data: [],
            FD: "",
            Assumptions: "",
            Notes: "",
            Feature: "",
            editFeature: false,
            editFD: false,
            editAssumptions: false,
            editNotes: false
        }
        this.renderEstimateButtons = this.renderEstimateButtons.bind(this);
        this.handleAddToScope = this.handleAddToScope.bind(this);
        this.handleRemoveFromScope = this.handleRemoveFromScope.bind(this);
        this.handleFD = this.handleFD.bind(this);
        this.handleFeature = this.handleFeature.bind(this);
        this.handleNotes = this.handleNotes.bind(this);
        this.blurFD = this.blurFD.bind(this);
        this.blurFeature = this.blurFeature.bind(this);
        
    }

    componentDidMount(){
        // If a item was selected that is scope or library
        this.setState({
            data: this.props.data,
            buttonData: [{hours: this.props.data["iOS Engineering Estimate (Resource Hours)"] || 0, platform: "iOS"}, 
            {hours: this.props.data["Android Engineering Estimate (Resource Hours)"] || 0, platform: "Android"},
            {hours: this.props.data["Hybrid Engineering"] || 0, platform: "Hybrid"},
            {hours: this.props.data["Web Engineering Estimate (Resource Hours)"] || 0, platform: "Web"},
            {hours: this.props.data["Backend Engineering Estimate (Resource Hours)"] || 0, platform: "Backend"},
            {hours: this.props.data["QA Estimate (Resource Hours)"] || 0, platform: "QA"},
            {hours: this.props.data["Design Estimate (Resource Hours)"] || 0, platform: "Design"}]
        })
       
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps, "variant props")
        console.log(nextProps.data, "next props data" )
            // If a item was selected that is scope or library
            this.setState({
                data: nextProps.data,
                buttonData: [
                    {hours: nextProps.data["iOS Engineering Estimate (Resource Hours)"] || 0, platform: "iOS"}, 
                    {hours: nextProps.data["Android Engineering Estimate (Resource Hours)"] || 0, platform: "Android"},
                    {hours: nextProps.data["Hybrid Engineering"] || 0, platform: "Hybrid"},
                    {hours: nextProps.data["Web Engineering Estimate (Resource Hours)"] || 0, platform: "Web"},
                    {hours: nextProps.data["Backend Engineering Estimate (Resource Hours)"] || 0, platform: "Backend"},
                    {hours: nextProps.data["QA Estimate (Resource Hours)"] || 0, platform: "QA"},
                    {hours: nextProps.data["Design Estimate (Resource Hours)"] || 0, platform: "Design"}
                ],
                //addNotes: false
            })
    }


    renderAddToScope() {
        let { addToScope } = this.state;
        let { temp, data, scope } = this.props;
        if (!temp) {
            return (
                <div style={{ cursor: "pointer" }} onClick={this.handleRemoveFromScope} >
                    <img src={require("../../assets/remove-red.png")} />
                    <p style={{ color: "red" }}>Remove from Scope</p>
                </div>
            )
        } else {
            return (
                <div style={{ cursor: "pointer" }} onClick={this.handleAddToScope}>
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
                     <div className="Rectangle" onInput={this.handleNotes} contentEditable>{d.Notes}</div>
                     <img src={require("../../assets/remove.png")} style={{paddingLeft: "2px"}} onClick={()=>this.setState({addNotes: false})}/>
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
                    <p>Include in Quote</p>
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

    handleAddToScope(){
        let { temp, data, scope } = this.props;
        let { editAssumptions, editFD, editFeature, editNotes, buttonData } = this.state;
        this.setState({ addToScope: true })
        if (temp){
            console.log(data,  "use this")
            let feature = editFeature ? this.state.Feature : data.Feature;
            let FD = editFD ?  this.state.FD : data["Feature description"];
            let Notes = editNotes ? this.state.Notes : data.Notes;
            let Assumptions = editAssumptions ? this.state.Assumptions : data.Assumptions;
            let row = new newRow(scope.scope.length, data.SOURCE, feature, FD, Assumptions )
            console.log(row, "row bro")
        } else {

        }
    }

    handleRemoveFromScope(){
        this.setState({ addToScope: false })
    }
   

    handleFD(e){
        let { temp, data, scope, tempScope } = this.props;
        let text = e.target.innerText;
        console.log(text, "text")

        this.setState({
            FD: e.target.innerHTML,
            editFD: true
        })
        // if (temp){
        //     console.log(tempScope, "broh")
        //     tempScope.tempScope[data.id]["Feature description"] = text;
        // } else {
        //     scope.scope[data.id]["Feature description"] = text;
        // }
    }

    blurFD(e){
        let { temp, data, scope, tempScope, dispatch } = this.props;
        let text = e.target.innerText;
         if (temp){
            dispatch({type: TEMPSCOPE_SCOPE_EDIT, payload: {id: data.id, prop: "Feature description", value: text}})
        } else {
            dispatch({type: SCOPE_SCOPE_EDIT, payload: {id: data.id, prop: "Feature description", value: text}})
        }
    }

    handleFeature(e){
        console.log(e.target.innerHTML, "val bro")
        this.setState({
            Feature: e.target.innerHTML,
            editFeature: true
        })
    }

    async blurFeature(e){
        let { temp, data, scope, tempScope, dispatch } = this.props;
        let text = e.target.innerText;
         if (temp){
            await dispatch({type: TEMPSCOPE_SCOPE_EDIT, payload: {id: data.id, prop: "Feature", value: text}})
            await dispatch({ type: TEMPSCOPE_TREE, payload: buildTree(tempScope.tempScope) })

        } else {
            dispatch({type: SCOPE_SCOPE_EDIT, payload: {id: data.id, prop: "Feature", value: text}})
            await dispatch({ type: SCOPE_TREE, payload: buildTree(scope.scope) })

        }
    }

    handleAssumption(e){
        console.log(e.target.innerHTML, "val bro")
        this.setState({
            Assumptions: e.target.innerHTML,
            editAssumptions: true
        })
    }

    handleNotes(e){
        console.log(e.target.innerHTML, "val bro")
        this.setState({
            Assumptions: e.target.innerHTML,
            editAssumptions: true
        })
    }

    searchVariant(){
        let { menuClick, estimate, data } = this.state;
        let { search } = this.props;
        let dropDownColor = "#656565";
        let inQuote = data["Include in Scope?"]
        console.log(data, "data variant")
        if (data){
            return (
                <div className={`feature_variant ${inQuote ? "in-quote" : ""}`}>
                    <div className="row variant_row">
                        <div className="col-md-6">
                            <p>T:</p>
                            <div className="Rectangle" dangerouslySetInnerHTML={{ __html:searchHighlight(data.Feature, search)}}/>
                        </div>
                        <div className="col-md-3">
                        {this.renderQuote(inQuote)}
                        </div>
                        <div className="col-md-3">
                            {this.renderAddToScope()}
                        </div>
                    </div>
                    <div className="row variant_row">
                        <div className="col-md-6">
                            <p>FD:</p>
                            <div className="Rectangle" dangerouslySetInnerHTML={{ __html:searchHighlight(data["Feature description"], search)}}/>
                        </div>
                        <div className="col-md-6">
                            <p>A:</p>
                            <div className="Rectangle" dangerouslySetInnerHTML={{ __html:searchHighlight(data.Assumptions, search)}}/>
                        </div>
                    </div>
                    <div className="row variant_row">
                        <div className="col-md-10">
                            <p>N:</p>
                            <div className="Rectangle" dangerouslySetInnerHTML={{ __html:searchHighlight(data.Notes, search)}}/>
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
        let { menuClick, estimate, data } = this.state;
        let dropDownColor = "#656565"
        let inQuote = data["Include in Scope?"]
        console.log(data, "data variant")
        if (data){
            return (
                <div  className={`feature_variant ${inQuote ? "in-quote" : ""}`}>
                    <div className="row variant_row">
                        <div className="col-md-3">
                            <p>T:</p>
                            <div className="Rectangle" contentEditable onInput={this.handleFeature} onBlur={this.blurFeature}>{data.Feature}</div>
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
                            <div className="Rectangle" contentEditable onInput={this.handleFD} onBlur={this.blurFD}>{data["Feature description"]}</div>
                        </div>
                        <div className="col-md-6">
                            <p>A:</p>
                            <div className="Rectangle" contentEditable>{data.Assumptions}</div>
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
