import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import searchHighlight from "../../helper/searchHighlight";
import newRow from "../../helper/newRow";
import buildTree from "../../helper/buildTree";
import { TEMPSCOPE_SCOPE_EDIT, SCOPE_SUMMARY, SCOPE_SCOPE_EDIT, TEMPSCOPE_TREE, SCOPE_TREE, SCOPE_SELECT, TEMPSCOPE_SCOPE_REMOVE, SCOPE_ADD, SCOPE_DOWNLOAD, SCOPE_SELECTED_FEATURES } from "../../constants/actionTypes"
import getEngineerHours from "../../helper/scopeSummary";

const mapStatetoProps = state => ({ viewMode: state.viewMode, search: state.scope.search, temp: state.scope.selected.temp, scope: state.scope, tempScope: state.tempScope, scopeSummary: state.scope.scopeSummary });

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
        this.handleDuplicate = this.handleDuplicate.bind(this);
        this.handleAddToScope = this.handleAddToScope.bind(this);
        this.handleRemoveFromScope = this.handleRemoveFromScope.bind(this);
        this.changeEstimateHours = this.changeEstimateHours.bind(this);
        this.renderEstimateButtons = this.renderEstimateButtons.bind(this);
        this.renderQuote = this.renderQuote.bind(this);
        this.handleFD = this.handleFD.bind(this);
        this.handleFeature = this.handleFeature.bind(this);
        this.handleNotes = this.handleNotes.bind(this);
        this.blurFD = this.blurFD.bind(this);
        this.blurFeature = this.blurFeature.bind(this);
        this.handleAssumption = this.handleAssumption.bind(this);
        this.blurAssumption = this.blurAssumption.bind(this);
        this.handleNotes = this.handleNotes.bind(this);
        this.blurNotes = this.blurNotes.bind(this);
        this.handleQuote = this.handleQuote.bind(this);
        this.handleAddSummary = this.handleAddSummary.bind(this);
        this.handleDeductSummary = this.handleDeductSummary.bind(this);
    }

    componentDidMount(){
        // If a item was selected that is scope or library
        console.log(this.props, "variant props on mount")
        this.setState({
            data: this.props.data,
            buttonData: [
                {hours: this.props.data["iOS Engineering Estimate (Resource Hours)"] || 0, platform: "iOS"}, 
                {hours: this.props.data["Android Engineering Estimate (Resource Hours)"] || 0, platform: "Android"},
                {hours: this.props.data["Hybrid Engineering"] || 0, platform: "Hybrid"},
                {hours: this.props.data["Web Engineering Estimate (Resource Hours)"] || 0, platform: "Web"},
                {hours: this.props.data["Backend Engineering Estimate (Resource Hours)"] || 0, platform: "Backend"},
                {hours: this.props.data["QA Estimate (Resource Hours)"] || 0, platform: "QA"},
                {hours: this.props.data["Design Estimate (Resource Hours)"] || 0, platform: "Design"}
            ]
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
        let { temp, data, scope, added } = this.props;
        if (!temp && !added) {
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
        return (
            <div style={{ cursor: "pointer" }} onClick={this.handleDuplicate}>
                <img src={require("../../assets/plus-blue.png")} />
                <p style={{ color: "blue" }}>Duplicate</p>
            </div>
        )
        // let { duplicate } = this.state;
        // if (duplicate) {
        // return (
        //     <div style={{ cursor: "pointer" }} onClick={this.handleDuplicate} >
        //         <img src={require("../../assets/remove-red.png")} />
        //         <p style={{ color: "red" }}>Duplicate</p>
        //     </div>
        // )
        // } else {
        //     return (
        //         <div style={{ cursor: "pointer" }} onClick={() => this.setState({ duplicate: true })}>
        //             <img src={require("../../assets/plus-blue.png")} />
        //             <p style={{ color: "blue" }}>Duplicate</p>
        //         </div>
        //     )
        // }

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

    async changeEstimateHours(changeData, val){
        let { buttonData, data } = this.state;
        let { temp, dispatch, added } = this.props;
        let newData = Object.assign({}, changeData, {hours: Number(val)})
        console.log(data, "i need this")
        console.log(newData, "new bro")
        let index = buttonData.map(e => e.platform).indexOf(changeData.platform);
        buttonData.splice(index, 1, newData)
        console.log(buttonData, "button Data")
        this.setState({
            buttonData
        })
        let prop = ""
        switch (changeData.platform) {
            case "iOS":
                prop = "iOS Engineering Estimate (Resource Hours)"
                break;
            case "Android":
                prop = "Android Engineering Estimate (Resource Hours)"
                break;
            case "Hybrid":
                prop = "Hybrid Engineering"
                break;
            case "Web":
                prop = "Web Engineering Estimate (Resource Hours)"
                break;
            case "Backend":
                prop = "Backend Engineering Estimate (Resource Hours)"
                break;
            case "QA":
                prop = "QA Estimate (Resource Hours)"
                break;
            case "Backend":
                prop = "Backend Engineering Estimate (Resource Hours)"
                break;
            case "Design": 
                prop = "Design Estimate (Resource Hours)"
                break;
            default:
                prop = ""

        }
        console.log(prop, "prop in button")

        data[prop] = val;
        
        if (temp){
            await dispatch({type: TEMPSCOPE_SCOPE_EDIT, payload: {id: data.id, prop, value: val}})
            await dispatch({type: SCOPE_SELECT, payload: {data, temp: true }})
        } else if (!added) {
            await dispatch({type: SCOPE_SCOPE_EDIT, payload: {id: data.id, prop, value: val}})
            await dispatch({type: SCOPE_SELECT, payload: {data, temp: false }})
        }

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
                                onBlur={e => this.changeEstimateHours(data, e.target.value)}
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
                     <div className="Rectangle" onInput={this.handleNotes} contentEditable onBlur={this.blurNotes}>{d.Notes}</div>
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
        let { mode } = this.props
        if (quote){
            return (
                <div>
                    <img src={require("../../assets/check-black.png")} onClick={mode === "builder" ? () => this.handleQuote(false) : null}/>
                    <p>Include in Quote</p>
                </div>
            )
        } else {
            return (
                <div>
                    <img src={require("../../assets/check-gray.png")} onClick={mode === "builder" ? () => this.handleQuote(true) : null}/>
                    <p style={{color: "lightgray"}}>Include in Quote</p>
                </div>
               
            )
        }
    }

    handleAddToScope(){
        let { temp, scope, dispatch, type, tempScope, added } = this.props;
        let { editAssumptions, editFD, editFeature, editNotes, buttonData, data } = this.state;
        this.setState({ addToScope: true })
        if (temp){
            // all of this is because of my mess of a code. If you are trying to refactor this, good luck!
            let fsCount = 0;
            let newTempScope = tempScope.tempScope.filter(t => {
                // console.log(t, "mr t")
              if (t.SOURCE === data.SOURCE && t["Feature set"] === data["Feature set"]) {
                fsCount += 1
              }
              if (t.Feature !== data.Feature){
                return t
              }
              if (t.id !== data.id){
                return t
              }
            })
            // console.log(fsCount, "fs count")
    
            if (fsCount === 2 ){
                // console.log(newTempScope, "filter pass 1")
                // console.log(data, "data")
              newTempScope = newTempScope.filter(t => {

                if (t.SOURCE === data.SOURCE && t["Feature set"] === data["Feature set"] ){
                    // console.log(t, "last delete row")
                    dispatch({type: SCOPE_SELECTED_FEATURES, payload: [] })
                }
                if ( t["Feature set"] && t["Feature set"] !== data["Feature set"] && t.SOURCE === data.SOURCE) {
                    return t
                }
                if (t.SOURCE !== data.SOURCE) {
                    return t
                }
              })
            }
    
            if (fsCount === 1 ) {

              newTempScope = newTempScope.filter(t => {
                if (t.SOURCE !== data.SOURCE ) {
                  return t
                }
              })
            }
            console.log(newTempScope, "final temp scope")
            dispatch({type: TEMPSCOPE_SCOPE_REMOVE, payload: newTempScope})
            dispatch({ type: TEMPSCOPE_TREE, payload: buildTree(newTempScope)})
            data.id = scope.scope.length
            this.setState({
                data
            })
            this.handleAddSummary()
            dispatch({type: SCOPE_SELECT, payload: {data, temp: false }})
            dispatch({ type: SCOPE_ADD, payload: data})
            dispatch({type: SCOPE_TREE, payload: buildTree([...scope.scope, data])})

           
        } else if (added) {
            // if adding from clicking add new variant or duplicate
            data.id = scope.scope.length
            this.setState({
                data
            })
            dispatch({type: SCOPE_SELECT, payload: {data, temp: false }})
            dispatch({ type: SCOPE_ADD, payload: data})
            dispatch({type: SCOPE_TREE, payload: buildTree([...scope.scope, data])})
        } else {
             // adding from library
        }
    }

    handleRemoveFromScope(){
        let { scope, reindexSearch, dispatch } = this.props;
        let { data } = this.state;
        let newScope = scope.scope.filter(s => s.id !== data.id)
        newScope = newScope.map((s,i) => {s.id = i; return s})
        this.handleDeductSummary()
        dispatch({ type: SCOPE_DOWNLOAD, payload: newScope})
        dispatch({type: SCOPE_TREE, payload: buildTree(newScope)})
        dispatch({type: SCOPE_SELECTED_FEATURES, payload: [] })
        dispatch({type: SCOPE_SELECT, payload: {data: {}, temp: false }})
        this.props.reIndexSearch(newScope)
        // this.setState({ addToScope: false })

    }

    handleDuplicate(){
        let {duplicate, data} = this.props;
        if (data){
            duplicate(data)
        }
    }
   

    handleFD(e){
        let text = e.target.innerText;
        this.setState({
            FD: text,
            editFD: true
        })
    }

    async blurFD(e){
        let { temp, data, scope, tempScope, dispatch, added } = this.props;
        let text = e.target.innerText;
        let prop = "Feature description";
        data[prop] = text;
         if (temp){
            await dispatch({type: TEMPSCOPE_SCOPE_EDIT, payload: {id: data.id, prop, value: text}})
            await dispatch({type: SCOPE_SELECT, payload: {data, temp: true }})
        } else if (!added){
            await dispatch({type: SCOPE_SCOPE_EDIT, payload: {id: data.id, prop, value: text}})
            await dispatch({type: SCOPE_SELECT, payload: {data, temp: false }})
        }
    }

    handleFeature(e){
        let text = e.target.innerText;
        this.setState({
            Feature: text,
            editFeature: true
        })
    }

    async blurFeature(e){
        let { temp, data, scope, tempScope, dispatch, added } = this.props;
        let text = e.target.innerText;
        let prop = "Feature"
        data[prop] = text;
         if (temp){
            await dispatch({type: TEMPSCOPE_SCOPE_EDIT, payload: {id: data.id, prop, value: text}})
            await dispatch({ type: TEMPSCOPE_TREE, payload: buildTree(tempScope.tempScope) })
            await dispatch({type: SCOPE_SELECT, payload: {data, temp: true }})

        } else if (!added){
            await dispatch({type: SCOPE_SCOPE_EDIT, payload: {id: data.id, prop, value: text}})
            await dispatch({ type: SCOPE_TREE, payload: buildTree(scope.scope) })
            await dispatch({type: SCOPE_SELECT, payload: {data, temp: false }})
        }

        
       
    }

    handleAssumption(e){
        let text = e.target.innerText;
        this.setState({
            Assumptions: text,
            editAssumptions: true
        })
    }

    async blurAssumption(e){
        let { temp, data, dispatch, added } = this.props;
        let text = e.target.innerText;
        let prop = "Assumptions"
        data[prop] = text;
         if (temp){
            await dispatch({type: TEMPSCOPE_SCOPE_EDIT, payload: {id: data.id, prop, value: text}})
            await dispatch({type: SCOPE_SELECT, payload: {data, temp: true }})
        } else if (!added){
            await dispatch({type: SCOPE_SCOPE_EDIT, payload: {id: data.id, prop, value: text}})
            await dispatch({type: SCOPE_SELECT, payload: {data, temp: false }})
        }
       
    }

    handleNotes(e){
        let text = e.target.innerText;
        this.setState({
            Notes: text,
            editNotes: true
        })
    }

    async blurNotes(e){
        let { temp, data, dispatch, added } = this.props;
        let text = e.target.innerText;
        let prop = "Notes";
        data[prop] = text;
         if (temp){
            await dispatch({type: TEMPSCOPE_SCOPE_EDIT, payload: {id: data.id, prop, value: text}})
            await dispatch({type: SCOPE_SELECT, payload: {data, temp: true }})
        } else if (!added){
            await dispatch({type: SCOPE_SCOPE_EDIT, payload: {id: data.id, prop, value: text}})
            await dispatch({type: SCOPE_SELECT, payload: {data, temp: false }})
        }
    }

    handleDeductSummary(){
        let { temp, data, dispatch, added, scopeSummary } = this.props;
        let { buttonData } = this.state;
        let index = buttonData.map(e => e.platform).indexOf("Design");
        let newDesignHours = scopeSummary.designHours - buttonData[index].hours
        let newEngineerHours = scopeSummary.engineerHours - getEngineerHours(0 , Object.assign({}, data, {"Include in Scope?": true}))
        dispatch({ type: SCOPE_SUMMARY, payload: { designHours: Math.round(newDesignHours * 100) / 100, engineerHours: Math.round(newEngineerHours * 100) / 100, billable: 0 } })
    }

    handleAddSummary() {
        let { temp, data, dispatch, added, scopeSummary } = this.props;
        let { buttonData } = this.state;
        let index = buttonData.map(e => e.platform).indexOf("Design");
        let newDesignHours = scopeSummary.designHours + buttonData[index].hours
        let newEngineerHours = getEngineerHours(scopeSummary.engineerHours, data)
        dispatch({ type: SCOPE_SUMMARY, payload: { designHours: Math.round(newDesignHours * 100) / 100, engineerHours: Math.round(newEngineerHours * 100) / 100, billable: 0 } })

    }

    async handleQuote(inQuote){
        let { temp, data, dispatch, added, scopeSummary } = this.props;
        let prop = "Include in Scope?";
        if (Object.keys(this.state.data).length > 0 ){
            if (inQuote){
                data[prop] = "x";
                this.setState({
                    data
                 })
                if (temp){
                    await dispatch({type: TEMPSCOPE_SCOPE_EDIT, payload: {id: data.id, prop, value: "x"}})
                    await dispatch({type: SCOPE_SELECT, payload: {data, temp: true }})
                } else if (!added) {
                    await dispatch({type: SCOPE_SCOPE_EDIT, payload: {id: data.id, prop, value: "x"}})
                    await dispatch({type: SCOPE_SELECT, payload: {data, temp: false }})
                    this.handleAddSummary()
                }
            } else {
                data[prop] = "";
                this.setState({
                    data
                 })
                if (temp){
                    await dispatch({type: TEMPSCOPE_SCOPE_EDIT, payload: {id: data.id, prop, value: ""}})
                    await dispatch({type: SCOPE_SELECT, payload: {data, temp: true }})
                } else if (!added){
                    await dispatch({type: SCOPE_SCOPE_EDIT, payload: {id: data.id, prop, value: ""}})
                    await dispatch({type: SCOPE_SELECT, payload: {data, temp: false }})
                    this.handleDeductSummary()
                }
            }
        }
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
                            <div className="Rectangle" onBlur={this.blurAssumption} onInput={this.handleAssumption} contentEditable>{data.Assumptions}</div>
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
