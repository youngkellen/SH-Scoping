import React from 'react';
import { connect } from 'react-redux';
import { store } from '../store';
import { push } from 'react-router-redux';
import { MODE_CHANGE, SPLIT_CHANGE, FULL_VIEW, EXPORT_CSV } from '../constants/actionTypes';
import axios from "axios";
import { stat } from 'fs';
import Papa from 'papaparse';


class Footer extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false
        }
    }

    componentDidMount() {
    }

    async handleCollapseView() {
        const { dispatch } = this.props;
        await dispatch({ type: FULL_VIEW, payload: false })
        await dispatch({ type: SPLIT_CHANGE, payload: false })
    }

    async handleSplitView() {
        const { dispatch } = this.props;
        // this works, idk why, but it does. don't touch
        await dispatch({ type: FULL_VIEW, payload: false })
        await dispatch({ type: SPLIT_CHANGE, payload: false })
        await dispatch({ type: FULL_VIEW, payload: false })
        await dispatch({ type: SPLIT_CHANGE, payload: true })
    }
    async handleFullView() {
        const { dispatch } = this.props;
        // this works, idk why, but it does. don't touch
        await dispatch({ type: FULL_VIEW, payload: false })
        await dispatch({ type: SPLIT_CHANGE, payload: false })
        await dispatch({ type: FULL_VIEW, payload: true })
        await dispatch({ type: SPLIT_CHANGE, payload: true })

    }

  
    
    handleExport(){
        let { dispatch, scope } = this.props;
        const csv = Papa.unparse(scope);
        console.log(csv, "csv")
        dispatch({type: EXPORT_CSV, payload: true})
        let csvContent = "data:text/csv;charset=utf-8," + csv
        let encodedUri = encodeURI(csvContent);
        window.open(encodedUri);  

    }

    render() {
        let { mode, split, full } = this.props.viewMode;
        let { scopeSummary } = this.props;
        console.log(this.props, "footer props")
        let buttonBlue = "#4990e2";
        return (
            <div className="footer">
                <div className="row" >
                    <div className="col-md-9 scope_summary">
                        <div className="col-md-2 text-center">
                            <p>SCOPE SUMMARY</p>
                        </div>
                        <div className="col-md-2">
                            <p>Design Hours: {scopeSummary.designHours}</p>
                        </div>
                        <div className="col-md-2">
                            <p>Engineer Hours: {scopeSummary.engineerHours}</p>
                        </div>
                        <div className="col-md-2">
                            <p>Total Hours: {Math.round((scopeSummary.designHours + scopeSummary.engineerHours) * 100) / 100}</p>
                        </div>
                        <div className="col-md-2">
                            <p>Billable: ${scopeSummary.billable}</p>
                        </div>
                        <div className="col-md-2" />
                    </div>
                    <div className="col-md-3 view_settings">
                        <div className="row">
                            <div className="col-md-3" >
                                <p onClick={() => this.handleFullView()} style={full ? { backgroundColor: buttonBlue } : {}}>Full View</p>
                            </div>
                            <div className="col-md-3">
                                <p onClick={() => this.handleSplitView()} style={split && !full ? { backgroundColor: buttonBlue } : {}}>Split View</p>
                            </div>
                            <div className="col-md-3">
                                <p onClick={() => this.handleCollapseView()} style={!full && !split ? { backgroundColor: buttonBlue } : {}}> Collapsed</p>
                            </div>
                            <div className="col-md-3">
                                <button className="btn btn-primary btn-sm" onClick={() => this.handleExport()}>EXPORT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({ viewMode: state.viewMode, scopeSummary: state.scope.scopeSummary, scope: state.scope.scope })

export default connect(mapStateToProps, null)(Footer);


