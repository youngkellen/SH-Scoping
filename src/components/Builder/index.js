import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SplitterLayout from 'react-splitter-layout';
import Features from '../Shared/Features';
import FeatureSets from '../Shared/FeatureSets';
import FeatureVariants from '../Shared/FeatureVariants'
import Footer from '../Footer';
import { MODE_CHANGE, SPLIT_CHANGE, FULL_VIEW, SCOPE_SEARCH, EXPORT_CSV } from '../../constants/actionTypes';



const mapStatetoProps = state => ({ viewMode: state.viewMode })

class Builder extends Component {
  async componentDidMount(){
    await this.props.dispatch({type: SCOPE_SEARCH, payload: ""})
  }

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
                <FeatureVariants mode={"builder"} reIndexSearch={this.props.reIndexSearch}/>
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
