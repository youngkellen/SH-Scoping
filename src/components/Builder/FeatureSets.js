import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStatetoProps = state => ({viewMode: state.viewMode})

class FeatureSets extends Component {
  
  getElementHeight(){
    // let height = document.getElementById("General").getBoundingClientRect().height
  }

    render() {
      let { viewMode } = this.props;
      let height = viewMode.split ? "40vh" : "76vh"
      return (
        <div className="row" style={{ minWidth: 400 }}>
          <div className="row column_head" style={{ textAlign: "center" }}>
            Feature Sets
          </div>
          <div className="col-md-12" style={{ height: height, overflow: "scroll" }}>
            <div className="row layout-pane-scroll" style={{ overflowY: "scroll" }}>
              <button className="collapsible" onClick={() => this.getElementHeight()}>
                General<div className="arrow-up" />
              </button>
              <div className="content">
                <ul>
                  <li>Content</li>
                  <li>Content</li>
                  <li>Content</li>
                </ul>
              </div>
              <button className="collapsible" onClick={() => this.getElementHeight()}>
                General<div className="arrow-up" />
              </button>
              <div className="content">
                <ul>
                  <li>Content</li>
                  <li>Content</li>
                  <li>Content</li>
                </ul>
              </div>
              <button className="collapsible" onClick={() => this.getElementHeight()}>
                General<div className="arrow-up" />
              </button>
              <div className="content">
                <ul>
                  <li>Content</li>
                  <li>Content</li>
                  <li>Content</li>
                </ul>
              </div>
              <button className="collapsible" onClick={() => this.getElementHeight()}>
                General<div className="arrow-up" />
              </button>
              <div className="content">
                <ul>
                  <li>Content</li>
                  <li>Content</li>
                  <li>Content</li>
                </ul>
              </div>
              <button className="collapsible" onClick={() => this.getElementHeight()}>
                General<div className="arrow-up" />
              </button>
              <div className="content">
                <ul>
                  <li>Content</li>
                  <li>Content</li>
                  <li>Content</li>
                </ul>
              </div>
              <button className="collapsible" onClick={() => this.getElementHeight()}>
                General<div className="arrow-up" />
              </button>
              <div className="content">
                <ul>
                  <li>Content</li>
                  <li>Content</li>
                  <li>Content</li>
                </ul>
              </div>
            </div>
            
            <div className="row" />
          </div>
        </div>
      )
    }
  }
  
  export default connect(mapStatetoProps)(FeatureSets);
  