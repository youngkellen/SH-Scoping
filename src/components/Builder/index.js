import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SplitterLayout from 'react-splitter-layout';
import Features from '../Shared/Features';
import FeatureSets from '../Shared/FeatureSets';
import FeatureVariants from '../Shared/FeatureVariants'
import Footer from '../Footer';

const mapStatetoProps = state => ({ viewMode: state.viewMode })

class Builder extends Component {

  render() {
    return (
      <div className="builder row">
        <div className="col-md-12" style={{ height: "100vh" }}>
          <div className="row" style={{ margin: 0, padding: 0 }}>
            <SplitterLayout
              percentage
              primaryIndex={0}
              secondaryInitialSize={85}
            >
              <FeatureSets mode={"builder"}/>
              <SplitterLayout
                percentage
                primaryIndex={1}
                primaryInitialSize={80}
                secondaryInitialSize={20}
              >
                <Features mode={"builder"}/>
                <FeatureVariants mode={"builder"}/>
              </SplitterLayout>
            </SplitterLayout>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default connect(mapStatetoProps)(Builder);
