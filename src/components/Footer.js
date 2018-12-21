import React from 'react';
import { connect } from 'react-redux';
import { store } from '../store';
import { push } from 'react-router-redux';
import { MODE_CHANGE, SPLIT_CHANGE, FULL_VIEW } from '../constants/actionTypes';

class Footer extends React.Component {
    constructor() {
        super();
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

    componentDidMount() {
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
                            <p>Total Hours: {scopeSummary.designHours + scopeSummary.engineerHours}</p>
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
                                <button className="btn btn-primary btn-sm">EXPORT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({ viewMode: state.viewMode, scopeSummary: state.scope.scopeSummary })

export default connect(mapStateToProps, null)(Footer);


