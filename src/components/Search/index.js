import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SplitterLayout from 'react-splitter-layout';
import Features from '../Shared/Features';
import FeatureSets from '../Shared/FeatureSets';
import FeatureVariants from '../Shared/FeatureVariants'
import Footer from '../Footer';
import elasticlunr from 'elasticlunr'


const mapStatetoProps = state => ({viewMode: state.viewMode})

class Search extends Component {
  constructor(){
    super()
  }

  componentWillMount(){
    console.log("search will mount", this.props)
    let { scope, search } = this.props
    // let fields = Object.keys(scope[0])
    // let index = elasticlunr(function () {
    //   fields.map(f => {
    //     this.addField(f)
    //   })
    // });
    // scope.map(s => {
    //   index.addDoc(s);
    // })

    // console.log(result, "result")
    // result.map(r => {
    // })

    
  //console.log(index, "index in search")
    
  }

  search(value){
    let match = this.props.search(value)
  }


    render() {
      return (
        <div className="builder row">
          <div className="col-md-12"  style={{height: "100vh"}}>
          <div className="row form-group" style={{ margin: 0, padding: 0 }}>
            <input type="search" className="form-control" placeholder="ENTER SEARCH TERMS" onChange={e => this.search(e.target.value)}/>
          </div>
          <div onClick={()=>this.search("contact")}>search</div>
            <div className="row" style={{margin: 0, padding: 0}}>
                <SplitterLayout
                  percentage
                  primaryIndex={0}
                  secondaryInitialSize={85}
                  
                >
                  <FeatureSets mode={"search"}/>
                  <SplitterLayout
                    percentage
                    primaryIndex={1}
                    primaryInitialSize={80}
                    secondaryInitialSize={20}
                  >
                    <Features mode={"search"}/>
                    <FeatureVariants mode={"search"}/>
                  </SplitterLayout>
                </SplitterLayout>
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default connect(mapStatetoProps)(Search);
  