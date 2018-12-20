import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SCOPE_SELECTED_FEATURES } from '../../constants/actionTypes';
import Set from './Set';

const mapStatetoProps = state => ({ viewMode: state.viewMode, selected: state.scope.selected, scope: state.scope })

class Type extends Component {
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

   componentDidMount(nextProps){
       console.log(this.props, "props in type")
       if (this.props.type === this.props.selected.SOURCE){
           this.setState({
               selected: true
           })
       }
   }

    render() {
        let { viewMode, type, featureSets} = this.props;
        let { featureSet } = featureSets;
        let { selected } = this.state
        console.log(featureSets, "feature sets")
        return (
            <div className="row" >
                <button className="collapsible" onClick={() => this.setState(prevState =>({selected: !prevState.selected}))}>
                    {type}<div className={selected ? "arrow-up" : "arrow-down"} />
                </button>
                <div className="content" style={ selected ? {display: "block"} : {display: "none"}}>
                    <ul>
                       {featureSet.map((set,i) => <Set key={set.id} id={set.id} name={set.name} selectedSet ={this.props.selected["Feature set"]} handleFeature={()=>this.handleFeatures(set.features)}/>)}
                    </ul>
                </div>
            </div>
        )
    }
}

export default connect(mapStatetoProps)(Type);
