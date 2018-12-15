import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SplitterLayout from 'react-splitter-layout';
import Features from './Features';
import FeatureSets from './FeatureSets';
import FeatureVariants from './FeatureVariants'
import Footer from '../Footer';

const mapStatetoProps = state => ({viewMode: state.viewMode})

class Search extends Component {

    render() {
      return (
        <div className="builder row">
          <div className="col-md-12"  style={{height: "100vh"}}>
          <div className="row form-group" style={{ margin: 0, padding: 0 }}>
            <input type="search" className="form-control" placeholder="ENTER SEARCH TERMS" />
          </div>
            <div className="row" style={{margin: 0, padding: 0}}>
                <SplitterLayout
                  percentage
                  primaryIndex={0}
                  secondaryInitialSize={85}
                  
                >
                  <FeatureSets/>
                  <SplitterLayout
                    percentage
                    primaryIndex={1}
                    primaryInitialSize={80}
                    secondaryInitialSize={20}
                  >
                    <Features/>
                    <FeatureVariants/>
                  </SplitterLayout>
                </SplitterLayout>
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default connect(mapStatetoProps)(Search);
  