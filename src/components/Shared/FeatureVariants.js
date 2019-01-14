import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Variant from './Variant';
import newRow from "../../helper/newRow";

const mapStatetoProps = state => ({ viewMode: state.viewMode, selected: state.scope.selected });

class FeatureVariants extends Component {
  constructor(){
    super()
    this.state = {
      variants: [],
      addedVariants: [],
      duplicatedVariants: []
    }
    this.duplicate = this.duplicate.bind(this)
  }

  componentDidMount(){
    let { selected } = this.props;
    this.setState({
      variants: [selected.data]
    })
  }

  componentWillReceiveProps(nextProps){
    // console.log(nextProps, "next props in fv")
    if (nextProps.selected.data.Feature !== this.props.selected.data.Feature){
      let { selected } = nextProps;
      this.setState({
        variants: [selected.data],
        addedVariants: [],
        duplicateVariant: []
      })
    }
   
  }

  addNewVariant(){
    let { selected } = this.props;
    if (selected.data){
      let newVariant = Object.assign({}, new newRow(), { id: null, SOURCE: selected.data.SOURCE, "Feature set": selected.data["Feature set"]  })

      this.setState(prevState => ({
        addedVariants: [...prevState.addedVariants, newVariant]
      }))
    }
  }

  duplicate(){
    let { selected } = this.props;
    if (selected.data){
      let newVariant = Object.assign({}, selected.data, { id: null, Feature: `${selected.data.Feature} -copy` })
    this.setState(prevState => ({
      duplicatedVariants: [...prevState.duplicatedVariants, newVariant]
    }))
    }
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
    let { variants, addedVariants, duplicatedVariants } = this.state;
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
               {variants.map((v, i) => <Variant key={i} mode={mode} data={v} reIndexSearch={this.props.reIndexSearch} duplicate={this.duplicate}/>)}
               {addedVariants.map((v, i) => <Variant key={i} mode={mode} data={v} reIndexSearch={this.props.reIndexSearch} added duplicate={this.duplicate}/>)}
               {duplicatedVariants.map((v, i) => <Variant key={i} mode={mode} data={v} reIndexSearch={this.props.reIndexSearch} duplicate={this.duplicate} added/>)}
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default connect(mapStatetoProps)(FeatureVariants);
