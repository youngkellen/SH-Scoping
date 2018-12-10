import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStatetoProps = state => ({viewMode: state.viewMode})

class FeatureSets extends Component {
  componentDidMount(){
    let coll = document.getElementsByClassName("collapsible");
    let i;

    for (let i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }
  }

    render() {
      return (
        <div className="row " >
          <div className="col-md-12"  style={{height: "100vh"}}>
            <div className ="row column_head" style={{textAlign: "center"}}>
              Feature Sets
            </div>
            <div className="row ">
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default connect(mapStatetoProps)(FeatureSets);
  