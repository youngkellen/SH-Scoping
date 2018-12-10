import React from 'react';
import { connect } from 'react-redux';
import { store } from '../store';
import { push } from 'react-router-redux';

class Footer extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
  }

  render() {
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
                <div className="col-md-4">
                <p>Full View</p> 
                </div>
                <div className="col-md-4">
                    <p>Split View</p>
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

export default Footer;


