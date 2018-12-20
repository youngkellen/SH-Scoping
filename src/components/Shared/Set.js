import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SCOPE_SELECTED_FEATURES } from '../../constants/actionTypes';

const mapStatetoProps = state => ({ viewMode: state.viewMode })

class Set extends Component {
    constructor(){
        super()
        this.state = {
            selected: false
        }
        this.handleFeatures = this.handleFeatures.bind(this);
    }

    handleFeatures(features){
        let { dispatch } = this.props;
        dispatch({ type: SCOPE_SELECTED_FEATURES, payload: features})
    }

    render() {
        let { viewMode, type, featureSets} = this.props;
        let { featureSet } = featureSets;
        let { selected } = this.state
        console.log(featureSets, "shit")
        return (
            <div className="row" >
                <button className="collapsible" onClick={() => this.setState(prevState =>({selected: !prevState.selected}))}>
                    {type}<div className={selected ? "arrow-up" : "arrow-down"} />
                </button>
                <div className="content" style={ selected ? {display: "block"} : {display: "none"}}>
                    <ul>
                       {featureSet.map(set => <li onClick={() => this.handleFeatures(set.features)}>{set.name}</li>)}
                    </ul>
                </div>
            </div>
        )
    }
}

export default connect(mapStatetoProps)(Set);
