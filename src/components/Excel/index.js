import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import shortenText from '../../helper/shortenText';
import { SCOPE_SELECT, SCOPE_SELECTED_FEATURES } from '../../constants/actionTypes';

const mapStatetoProps = state => ({ viewMode: state.viewMode, scope: state.scope, tree: state.scope.tree, selected: state.scope.selected })

class Excel extends Component {
    constructor(){
        super()
        this.state = {
            selected: ""
        }
        this.selectRow = this.selectRow.bind(this);
    }

    componentDidMount() {
        // if (selected.id){
        //     this.selectRow(selected.id, selected)
        // }
        let { id } = this.props.selected;
        let { selected } = this.state;
        if (id && id !== selected) {
            let remove = document.getElementById(`tr${id}`)
            if (remove){
                remove.classList.remove(("selected"))
            }
            let row = document.getElementById(`tr${id}`)
           
            row.classList.add(("selected"))
            this.setState({
                selected: `tr${id}`,
            })
        }
    }
    
    componentWillReceiveProps(nextProps){
        let { id } = nextProps.selected;
        let { selected } = this.state;
        if (id && selected && id !== selected) {
            let remove = document.getElementById(selected)
            remove.classList.remove(("selected"))
            let row = document.getElementById(`tr${id}`)
            row.classList.add(("selected"))
            this.setState({
                selected: `tr${id}`,
            })
        }
    }

    componentWillUnmount(){
        // needed to reset the table size on re opening this component
        this.props.resetHeight()
    }

    selectRow(id, data){
        const { dispatch,tree } = this.props
        let { selected } = this.state
            if (selected === id){
                let remove = document.getElementById(selected)
                remove.classList.remove(("selected"))
                this.setState({
                    selected: ""
                })
                dispatch({type: SCOPE_SELECT, payload: {}})
                dispatch({type: SCOPE_SELECTED_FEATURES, payload: []})
            } else if (selected && selected !== id) {
                let { featureSet } = tree[data.SOURCE]
                let index = featureSet.map(e => e.name).indexOf(data["Feature set"])
                let features = featureSet[index]
                let remove = document.getElementById(selected)
                remove.classList.remove(("selected"))
                let row = document.getElementById(id)
                row.classList.add(("selected"))
                this.setState({
                    selected: id
                })
                dispatch({type: SCOPE_SELECT, payload: data})
                dispatch({type: SCOPE_SELECTED_FEATURES, payload: features.features})
            } else {
                let { featureSet } = tree[data.SOURCE]
                let index = featureSet.map(e => e.name).indexOf(data["Feature set"])
                let features = featureSet[index]
                let row = document.getElementById(id)
                row.classList.add(("selected"))
                this.setState({
                    selected: id
                })
                dispatch({type: SCOPE_SELECT, payload: data})
                dispatch({type: SCOPE_SELECTED_FEATURES, payload: features.features})
            }
      
    }

    renderRows() {
        const { full } = this.props.viewMode;
        const { scope } = this.props;
        // let data = [
        //     { id: 1, inQuote: "x", platform: "iOS", featureSet: "User Account fdsafdsafasddfsafdsafadsafsdafdsafsd", feature: "Log In/Email", featureDescription: "whatever ", assumptions: "", notes: "" },
        //     { id: 2, inQuote: "x", platform: "Android", featureSet: "Stuff", feature: "Goku", featureDescription: "Supercalifragilisticexpealidoscious blah blah blah blah blah", assumptions: "", notes: "" },
        //     { id: 3, inQuote: "x", platform: "iOS", featureSet: "User Account", feature: "Log In/Email", featureDescription: "whatever ", assumptions: "", notes: "" },
        //     { id: 4, inQuote: "x", platform: "Android", featureSet: "Stuff", feature: "Goku", featureDescription: "Supercalifragilisticexpealidoscious", assumptions: "", notes: "" },
        //     { id: 5, inQuote: "x", platform: "iOS", featureSet: "User Account", feature: "Log In/Email", featureDescription: "whatever ", assumptions: "", notes: "" },
        //     { id: 6, inQuote: "x", platform: "Android", featureSet: "Stuff", feature: "Goku", featureDescription: "Supercalifragilisticexpealidoscious", assumptions: "", notes: "" },
        //     { id: 7, inQuote: "x", platform: "Android", featureSet: "Stuff", feature: "Goku", featureDescription: "Supercalifragilisticexpealidoscious", assumptions: "", notes: "" },
        //     { id: 8, inQuote: "x", platform: "iOS", featureSet: "User Account", feature: "Log In/Email", featureDescription: "whatever ", assumptions: "", notes: "" },
        //     { id: 9, inQuote: "x", platform: "Android", featureSet: "Stuff", feature: "Goku", featureDescription: "Supercalifragilisticexpealidoscious", assumptions: "", notes: "" },
        //     { id: 10, inQuote: "x", platform: "Android", featureSet: "Stuff", feature: "Goku", featureDescription: "Supercalifragilisticexpealidoscious", assumptions: "", notes: "" },
        //     { id: 11, inQuote: "x", platform: "iOS", featureSet: "User Account", feature: "Log In/Email", featureDescription: "whatever ", assumptions: "", notes: "" },
        //     { id: 12, inQuote: "x", platform: "Android", featureSet: "Stuff", feature: "Goku", featureDescription: "Supercalifragilisticexpealidoscious", assumptions: "", notes: "" }
        // ]
        if (scope && scope.scope) {
            return scope.scope.map(d => {
                return (
                    <tr key={d.id} id={`tr${d.id}`} onClick={() =>this.selectRow(`tr${d.id}`, d)}>
                        <td scope="row" className={ full ? "full_view id" : "id"} >
                            <a data-tip data-for={`${d.id}i`}>{d.id}</a>
                            <ReactTooltip id={`${d.id}i`} place="bottom" type='light' effect='solid'>
                                {d.id}
                            </ReactTooltip>
                        </td>
                        <td className={ full ? "full_view scope" : "scope"}>
                            <a data-tip data-for={`${d.id}q`}>{d["Include in Scope?"]}</a>
                            <ReactTooltip id={`${d.id}q`} place="bottom" type='light' effect='solid'>
                                {d["Include in Scope?"]}
                            </ReactTooltip>
                        </td>
                        <td className={ full ? "full_view platform" : "platform"}>
                            <a data-tip data-for={`${d.id}p`}>{d.Platform}</a>
                            <ReactTooltip id={`${d.id}p`} place="bottom" type='light' effect='solid'>
                                {d.Platform}
                            </ReactTooltip>
                        </td>
                        <td className={ full ? "full_view fs" : "fs"}>
                            <a data-tip data-for={`${d.id}fs`}>{d["Feature set"]}</a>
                            <ReactTooltip id={`${d.id}fs`} place="bottom" type='light' effect='solid'>
                                {d["Feature set"]}
                            </ReactTooltip>
                        </td>
                        <td className={ full ? "full_view feature" : "feature"}>
                            <a data-tip data-for={`${d.id}f`}>{d.Feature}</a>
                            <ReactTooltip id={`${d.id}f`} place="bottom" type='light' effect='solid'>
                                {d.Feature}
                            </ReactTooltip>
                        </td>
                        <td className={ full ? "full_view fd" : "fd"}>
                            <a data-tip data-for={`${d.id}fd`}>{d["Feature description"]}</a>
                            <ReactTooltip id={`${d.id}fd`} place="bottom" type='light' effect='solid'>
                                {d["Feature description"]}
                            </ReactTooltip>
                        </td>
                        <td className={ full ? "full_view assumptions" : "assumptions"}>
                            <a data-tip data-for={`${d.id}a`}>{d.Assumptions}</a>
                            <ReactTooltip id={`${d.id}a`} place="bottom" type='light' effect='solid'>
                                {d.Assumptions}
                            </ReactTooltip>
                        </td>
                        <td className={ full ? "full_view notes" : "notes"}>
                            <a data-tip data-for={`${d.id}n`}>{d.Notes}</a>
                            <ReactTooltip id={`${d.id}n`} place="bottom" type='light' effect='solid'>
                                {d.Notes}
                            </ReactTooltip>
                        </td>
                    </tr>
                )
            })
        }
    }

    render() {
        let { excelHeight, viewMode } = this.props;
        let { full } = viewMode;
        console.log(excelHeight, "excel Height")
        // let height = excelHeight ? parseInt(excelHeight.replace(/px/,"")) * 0.8 : full ? 500 : 250
        let height = excelHeight ? excelHeight * 0.8 : full ? 80 : 40
        console.log(height, "new height")
        return (
            <div className="excel_table" id="excel_table">
                <div className="row" >
                    <div className="col-md-12" style={{height: `${height}%`,  maxHeight: `${height}%`, paddingBottom: "20px"}}>
                        <table className="table table-bordered table-hover">
                            <thead >
                                <tr className="head">
                                    <th scope="col" className="id">ID</th>
                                    <th scope="col" className="scope">In Quote</th>
                                    <th scope="col" className="platform">Platform</th>
                                    <th scope="col" className="fs">Feature Set</th>
                                    <th scope="col" className="feature">Feature</th>
                                    <th scope="col" className="fd">Feature Description</th>
                                    <th scope="col" className="assumptions">Assumptions</th>
                                    <th scope="col" className="notes">Notes</th>
                                </tr>
                            </thead>
                            <tbody style={{borderTop: "solid white 20px"}}>
                                {this.renderRows()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStatetoProps)(Excel);
