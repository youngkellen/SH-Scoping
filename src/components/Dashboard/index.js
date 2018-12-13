import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Builder from '../Builder';
import Search from '../Search';
import Excel from '../Excel';
import SplitterLayout from 'react-splitter-layout';
import Footer from '../Footer.js'

const mapStatetoProps = state => ({viewMode: state.viewMode})

class Dashboard extends Component {
  constructor(){
    super()
    this.state = {
      excelHeight: 0,
      split: false,
      full: false
    }
    this.getHeight = this.getHeight.bind(this);
    this.resetHeight = this.resetHeight.bind(this);
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps, "dashboard will props")
    const { split, full } = nextProps.viewMode;
    this.setState({
      split,
      full
    })
  }

  getHeight(){
    let length = document.getElementsByClassName("layout-pane").length
    console.log(length, "length")
    let height = document.getElementsByClassName("layout-pane")[length - 1].style.height
    console.log(height, "height")
    this.setState({
      excelHeight: height
    })
  }

  resetHeight(){
    this.setState({
      excelHeight: 0
    })
  }

renderMode() {
  const { mode, split, full } = this.props.viewMode;
  console.log(mode, "mode bro")

  if (mode === "builder" && !split) {
    return (
      <Builder/>
    )
  } else if (mode === "search"  && !split) {
    return (
      <Search/>
    )
  }  else if (split){

    return (
      <div  style={{height: "90vh"}}>
            <SplitterLayout
                vertical
                onDragEnd={()=> this.getHeight()}
                secondaryInitialSize={full ? 10000 : 400}
            >
                 <Builder/>
                 <Excel excelHeight={this.state.excelHeight} resetHeight={this.resetHeight} />
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
      </div>
      );
    }
  }
  
  export default connect(mapStatetoProps)(Dashboard);
  