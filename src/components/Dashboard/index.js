import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Builder from '../Builder';
import Search from '../Search';
import Excel from '../Excel';
import SplitterLayout from 'react-splitter-layout';
import Footer from '../Footer.js'
import { SCOPE_TREE, EXPORT_CSV } from '../../constants/actionTypes';

const mapStatetoProps = state => ({viewMode: state.viewMode, scope: state.scope, exportCSV: state.exportCSV })

class Dashboard extends Component {
  constructor(props){
    super(props)
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
  const { exportCSV, dispatch } = this.props;
  console.log(mode, "mode bro")

  if (mode === "builder" && !split) {
    return (
      <Builder/>
    )
  } else if (mode === "search"  && !split) {
    return (
      <Search search={this.props.search}/>
    )
  }  else if (split){

    return (
      <div  style={{height: "95vh"}}>
            <SplitterLayout
                vertical
                onDragEnd={()=> this.getHeight()}
                secondaryInitialSize={full ? 100 : 50}
                percentage
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
          <div className="row" style={{maxHeight: "95vh"}}>
            <div className="col-md-12" style={{maxHeight: "95vh"}}>
              {this.renderMode()}
            </div>
          </div>
      </div>
      );
    }
  }
  
  export default connect(mapStatetoProps)(Dashboard);
  