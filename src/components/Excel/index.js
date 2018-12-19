import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import shortenText from '../../helper/shortenText';
import { SCOPE_SELECT } from '../../constants/actionTypes';

const mapStatetoProps = state => ({ viewMode: state.viewMode, scope: state.scope })

class Excel extends Component {
    constructor(){
        super()
        this.state = {
            selected: ""
        }
        this.selectRow = this.selectRow.bind(this);
    }

    componentDidMount() {
        const { selected } = this.props.scope
        if (selected.id){
            this.selectRow(selected.id, selected)
        }
    }

    componentWillUnmount(){
        // needed to reset the table size on re opening this component
        this.props.resetHeight()
    }

    selectRow(id, data){
        const { dispatch } = this.props
        console.log(data, "data bro")
        data.id = id;
        let { selected } = this.state
            if (selected === id){
                let remove = document.getElementById(selected)
                remove.classList.remove(("selected"))
                this.setState({
                    selected: ""
                })
                dispatch({type: SCOPE_SELECT, payload: {}})
            } else if (selected && selected !== id) {
                let remove = document.getElementById(selected)
                remove.classList.remove(("selected"))
                let row = document.getElementById(id)
                row.classList.add(("selected"))
                this.setState({
                    selected: id
                })
                dispatch({type: SCOPE_SELECT, payload: data})
            } else {
                let row = document.getElementById(id)
                row.classList.add(("selected"))
                this.setState({
                    selected: id
                })
                dispatch({type: SCOPE_SELECT, payload: data})
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
            return scope.scope.map((d, i) => {
                return (
                    <tr key={i} id={`tr${i}`} onClick={() =>this.selectRow(`tr${i}`, d)}>
                        <td scope="row" className={ full ? "full_view" : ""} >
                            <a data-tip data-for={`${i}i`}>{i}</a>
                            <ReactTooltip id={`${i}i`} place="bottom" type='light' effect='solid'>
                                {i}
                            </ReactTooltip>
                        </td>
                        <td className={ full ? "full_view" : ""}>
                            <a data-tip data-for={`${i}q`}>{d["Include in Scope?"]}</a>
                            <ReactTooltip id={`${i}q`} place="bottom" type='light' effect='solid'>
                                {d["Include in Scope?"]}
                            </ReactTooltip>
                        </td>
                        <td className={ full ? "full_view" : ""}>
                            <a data-tip data-for={`${i}p`}>{d.Platform}</a>
                            <ReactTooltip id={`${i}p`} place="bottom" type='light' effect='solid'>
                                {d.Platform}
                            </ReactTooltip>
                        </td>
                        <td className={ full ? "full_view" : ""}>
                            <a data-tip data-for={`${i}fs`}>{d["Feature set"]}</a>
                            <ReactTooltip id={`${i}fs`} place="bottom" type='light' effect='solid'>
                                {d["Feature set"]}
                            </ReactTooltip>
                        </td>
                        <td className={ full ? "full_view" : ""}>
                            <a data-tip data-for={`${i}f`}>{d.Feature}</a>
                            <ReactTooltip id={`${i}f`} place="bottom" type='light' effect='solid'>
                                {d.Feature}
                            </ReactTooltip>
                        </td>
                        <td className={ full ? "full_view" : ""}>
                            <a data-tip data-for={`${i}fd`}>{d["Feature description"]}</a>
                            <ReactTooltip id={`${i}fd`} place="bottom" type='light' effect='solid'>
                                {d["Feature description"]}
                            </ReactTooltip>
                        </td>
                        <td className={ full ? "full_view" : ""}>
                            <a data-tip data-for={`${i}a`}>{d.Assumptions}</a>
                            <ReactTooltip id={`${i}a`} place="bottom" type='light' effect='solid'>
                                {d.Assumptions}
                            </ReactTooltip>
                        </td>
                        <td className={ full ? "full_view" : ""}>
                            <a data-tip data-for={`${i}n`}>{d.Notes}</a>
                            <ReactTooltip id={`${i}n`} place="bottom" type='light' effect='solid'>
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
        let height = excelHeight ? parseInt(excelHeight.replace(/px/,"")) * 0.8 : full ? 500 : 250
        console.log(height, "new height")
        return (
            <div className="excel_table" id="excel_table">
                <div className="row" >
                    <div className="col-md-12 table-area" style={{height: `${height}px`, minHeight: `${height}px`,  maxHeight: `${height}px`,overflow: "auto"}}>
                        <table className="table table-bordered table-hover">
                            <thead >
                                <tr >
                                    <th scope="col" width="50">ID</th>
                                    <th scope="col" width="50">In Quote</th>
                                    <th scope="col" width="50">Platform</th>
                                    <th scope="col" width="100">Feature Set</th>
                                    <th scope="col" width="100">Feature</th>
                                    <th scope="col" width="500">Feature Description</th>
                                    <th scope="col" width="250">Assumptions</th>
                                    <th scope="col">Notes</th>
                                </tr>
                            </thead>
                            <tbody style={{maxHeight: "300px", overflow: "auto"}}>
                                {this.renderRows()}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div style={height > 200 ? {display: "flex"} : {display: "none"}}className="row excel_export">
                    <button className="btn btn-primary">EXPORT</button>
                </div>
            </div>
        );
    }
}

export default connect(mapStatetoProps)(Excel);
