import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import shortenText from '../../helper/shortenText';

const mapStatetoProps = state => ({ viewMode: state.viewMode })

class Excel extends Component {

    componentDidMount() {
    }

    componentWillUnmount(){
        this.props.resetHeight()
    }

    renderRows() {
        let data = [
            { id: 1, inQuote: "x", platform: "iOS", featureSet: "User Account", feature: "Log In/Email", featureDescription: "whatever ", assumptions: "", notes: "" },
            { id: 2, inQuote: "x", platform: "Android", featureSet: "Stuff", feature: "Goku", featureDescription: "Supercalifragilisticexpealidoscious", assumptions: "", notes: "" },
            { id: 3, inQuote: "x", platform: "iOS", featureSet: "User Account", feature: "Log In/Email", featureDescription: "whatever ", assumptions: "", notes: "" },
            { id: 4, inQuote: "x", platform: "Android", featureSet: "Stuff", feature: "Goku", featureDescription: "Supercalifragilisticexpealidoscious", assumptions: "", notes: "" },
            { id: 5, inQuote: "x", platform: "iOS", featureSet: "User Account", feature: "Log In/Email", featureDescription: "whatever ", assumptions: "", notes: "" },
            { id: 6, inQuote: "x", platform: "Android", featureSet: "Stuff", feature: "Goku", featureDescription: "Supercalifragilisticexpealidoscious", assumptions: "", notes: "" },
            { id: 7, inQuote: "x", platform: "Android", featureSet: "Stuff", feature: "Goku", featureDescription: "Supercalifragilisticexpealidoscious", assumptions: "", notes: "" },
            { id: 8, inQuote: "x", platform: "iOS", featureSet: "User Account", feature: "Log In/Email", featureDescription: "whatever ", assumptions: "", notes: "" },
            { id: 9, inQuote: "x", platform: "Android", featureSet: "Stuff", feature: "Goku", featureDescription: "Supercalifragilisticexpealidoscious", assumptions: "", notes: "" },
            { id: 10, inQuote: "x", platform: "Android", featureSet: "Stuff", feature: "Goku", featureDescription: "Supercalifragilisticexpealidoscious", assumptions: "", notes: "" },
            { id: 11, inQuote: "x", platform: "iOS", featureSet: "User Account", feature: "Log In/Email", featureDescription: "whatever ", assumptions: "", notes: "" },
            { id: 12, inQuote: "x", platform: "Android", featureSet: "Stuff", feature: "Goku", featureDescription: "Supercalifragilisticexpealidoscious", assumptions: "", notes: "" }
        ]
        if (data) {
            return data.map((d, i) => {
                return (
                    <tr key={i} >
                        <td scope="row">
                            <a data-tip data-for={`${d.id}i`}>{d.id}</a>
                            <ReactTooltip id={`${d.id}i`} place="bottom" type='light' effect='solid'>
                                {d.id}
                            </ReactTooltip>
                        </td>
                        <td>
                            <a data-tip data-for={`${d.id}q`}>{d.inQuote}</a>
                            <ReactTooltip id={`${d.id}q`} place="bottom" type='light' effect='solid'>
                                {d.inQuote}
                            </ReactTooltip>
                        </td>
                        <td>
                            <a data-tip data-for={`${d.id}p`}>{d.platform}</a>
                            <ReactTooltip id={`${d.id}p`} place="bottom" type='light' effect='solid'>
                                {d.platform}
                            </ReactTooltip>
                        </td>
                        <td>
                            <a data-tip data-for={`${d.id}fs`}>{d.featureSet}</a>
                            <ReactTooltip id={`${d.id}fs`} place="bottom" type='light' effect='solid'>
                                {d.featureSet}
                            </ReactTooltip>
                        </td>
                        <td>
                            <a data-tip data-for={`${d.id}f`}>{d.feature}</a>
                            <ReactTooltip id={`${d.id}f`} place="bottom" type='light' effect='solid'>
                                {d.feature}
                            </ReactTooltip>
                        </td>
                        <td>
                            <a data-tip data-for={`${d.id}fd`}>{shortenText(d.featureDescription)}</a>
                            <ReactTooltip id={`${d.id}fd`} place="bottom" type='light' effect='solid'>
                                {d.featureDescription}
                            </ReactTooltip>
                        </td>
                        <td>
                            <a data-tip data-for={`${d.id}a`}>{d.assumptions}</a>
                            <ReactTooltip id={`${d.id}a`} place="bottom" type='light' effect='solid'>
                                {d.assumptions}
                            </ReactTooltip>
                        </td>
                        <td>
                            <a data-tip data-for={`${d.id}a`}>{d.notes}</a>
                            <ReactTooltip id={`${d.id}a`} place="bottom" type='light' effect='solid'>
                                {d.notes}
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
                                    <th scope="col">ID</th>
                                    <th scope="col" width="100">In Quote</th>
                                    <th scope="col">Platform</th>
                                    <th scope="col">Feature Set</th>
                                    <th scope="col">Feature</th>
                                    <th scope="col" width="300">Feature Description</th>
                                    <th scope="col">Assumptions</th>
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
