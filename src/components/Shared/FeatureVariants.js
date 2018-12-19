import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Variant from './Variant';

const mapStatetoProps = state => ({ viewMode: state.viewMode, selected: state.scope.selected });

class FeatureVariants extends Component {
  constructor(){
    super()
    this.state = {
      variants: []
    }
  }

  componentDidMount(){
    let { selected } = this.props;
    this.setState({
      variants: [selected]
    })
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps, "next props")
    let { selected } = nextProps;
    this.setState({
      variants: [selected]
    })
  }

  addNewVariant(){
    this.setState(prevState => ({
      variants: [...prevState.variants, {id: 2}]
    }))
  }

  renderAddNew() {
    let {mode} = this.props
    if (mode === "builder"){
      return(
        <div className="add_new" onClick={() => this.addNewVariant()}>
          <img src={require("../../assets/plus-black.png")} />
          <p>Add New Variant</p>
        </div>
      )
    }
  }

  render() {
    let { viewMode, mode } = this.props;
    let { variants } = this.state;
    let height = viewMode.split ? "40vh" : "90vh";
    return (
      <div className="row">
        <div
          style={{ height: "100vh", minWidth: "550px" }}
        >
          <div className="row column_head" style={{ textAlign: "center" }}>
            <p>Feature Variants</p>
          </div>
          {this.renderAddNew()}
          <div className="col-md-12" style={{ height: height, overflow: "scroll" }}>
            <div className="row layout-pane-scroll" style={{ overflowY: "scroll" }}>
               {variants.map((v, i) => <Variant key={i} mode={mode} data={v}/>)}
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default connect(mapStatetoProps)(FeatureVariants);
