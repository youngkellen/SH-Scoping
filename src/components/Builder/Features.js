import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStatetoProps = state => ({viewMode: state.viewMode})

class Feature extends Component {
  componentDidMount(){
    let coll = document.getElementsByClassName("collapsible");
    let i;

    for (let i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        console.log(content, "content bro")
        let arrow = this.children[0]
        if (content.style.display === "block") {
          content.style.display = "none";
         arrow.classList.remove("arrow-down")
         arrow.classList.add("arrow-up")
        } else {
          content.style.display = "block";
          arrow.classList.remove("arrow-up")
          arrow.classList.add("arrow-down")
        }
      });
    }
  }

    render() {
      return (
        <div className="row" style={{minWidth: "400px"}}>
          <div className="col-md-12"  style={{height: "100vh"}}>
            <div className ="row column_head" style={{textAlign: "center"}}>
              Feature 
            </div>
            <div className="row layout-pane-scroll">
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default connect(mapStatetoProps)(Feature);
  