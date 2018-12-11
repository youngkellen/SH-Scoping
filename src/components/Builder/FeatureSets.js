import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStatetoProps = state => ({viewMode: state.viewMode})

class FeatureSets extends Component {

  getElementHeight(){
    let height = document.getElementById("General").getBoundingClientRect().height
    console.log(height, "height")
  }

    render() {
      return (
        <div className="row">
          <div className="col-md-12"  style={{height: "100vh"}}>
          <div className ="row column_head" style={{textAlign: "center"}}>
            Feature Sets
          </div>
          <div className="row ">
              <button className="collapsible" onClick={() => this.getElementHeight()}>General</button>
              
              <div className="content" id="General">
                <ul>
                  <li>Content</li>
                  <li>Content</li>
                  <li>Content</li>
                </ul>
              </div>
              <button className="collapsible">E-Commerce</button>
              <div className="content">
                <ul>
                  <li>Content</li>
                  <li>Content</li>
                  <li>Content</li>
                </ul>
              </div>
            </div>
          <div className ="row">
          
          </div>
          </div>
        </div>
      );
    }
  }
  
  export default connect(mapStatetoProps)(FeatureSets);
  