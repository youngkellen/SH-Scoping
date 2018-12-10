import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Builder from '../Builder';
import Search from '../Search';
import SplitterLayout from 'react-splitter-layout';

const mapStatetoProps = state => ({viewMode: state.viewMode})

class Dashboard extends Component {

renderMode() {
  const { mode } = this.props.viewMode;
  console.log(mode, "mode bro")
  if (mode === "builder") {
    return (
      <Builder/>
    )
  } else if (mode === "search") {
    return (
      <Search/>
    )
  }  else if (mode === "split"){
    return (
      <div  style={{height: "90vh"}}>
            <SplitterLayout
                vertical
            >
                 <Builder/>
                 <Search/>
            </SplitterLayout>
        </div>
    )
  } else {
    return (
      <div>
        <p>error</p>
      </div>
    )
     
  }
}
    render() {
      return (
        <div className="mode">
          <div className="row" style={{maxHeight: "90vh"}}>
            <div className="col-md-12" style={{maxHeight: "90vh"}}>
              {this.renderMode()}
            </div>
          </div>
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
      </div>
      );
    }
  }
  
  export default connect(mapStatetoProps)(Dashboard);
  