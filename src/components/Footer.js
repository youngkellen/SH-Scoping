import React from 'react';
import { connect } from 'react-redux';
import { store } from '../store';
import { push } from 'react-router-redux';
import { MODE_CHANGE } from '../constants/actionTypes';

class Footer extends React.Component {
  constructor() {
    super();
  }

  handleFullView(){
    const { dispatch } = this.props;
    dispatch({ type: MODE_CHANGE, payload: "builder" })
  }

  handleSplitView(){
    const { dispatch } = this.props;
    dispatch({ type: MODE_CHANGE, payload: "split"})
  }

  componentDidMount() {
  }

  render() {
      let { mode } = this.props.viewMode;
      let buttonBlue = "#4990e2";
      return (
        <div className="footer">
            <div className="row" >
            <div className="col-md-2 text-center">
                SCOPE SUMMARY 
            </div>
            <div className="col-md-1">
                Design Hours
            </div>
            <div className="col-md-1">
                Engineer Hours
            </div>
            <div className="col-md-1">
                Total Hours
            </div>
            <div className="col-md-1">
                Billable
            </div>
            <div className="col-md-3">
            </div>
            <div className="col-md-3" id="view_settings">
                <div className="container row">
                <div className="col-md-4" >
                    <p onClick={() => this.handleFullView()} style={mode === "split" ? {} : {backgroundColor: buttonBlue}}>Full View</p> 
                </div>
                <div className="col-md-4">
                    <p onClick={() => this.handleSplitView()} style={mode === "split" ? {backgroundColor: buttonBlue} : {}}>Split View</p>
                </div>
                <div className="col-md-4">
                    <p>Collapsed</p>
                </div>
                </div>
            </div>      
            </div>
        </div>
      )
  }
}

const mapStateToProps = state => ({viewMode: state.viewMode})

export default connect(mapStateToProps, null)(Footer);


