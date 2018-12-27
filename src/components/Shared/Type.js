import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SCOPE_SELECTED_FEATURES } from '../../constants/actionTypes';
import Set from './Set';

const mapStatetoProps = state => ({ viewMode: state.viewMode, selected: state.scope.selected, scope: state.scope.scope })

class Type extends PureComponent {
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

   componentDidMount(){
    //    console.log(this.props, "props in type")
    let { id } = this.props;
   
       if (this.props.type === this.props.selected.SOURCE){
        console.log(this.props, "type props mount")
        let offSet = document.getElementById(`type${id}`).offsetTop
        console.log(offSet, "offSet" )
        let container = document.getElementById('feature_set');
        let { clientHeight, scrollHeight } = container
        console.log(clientHeight, "client height")
        console.log(scrollHeight, "scroll height")
            container.scroll({
                top: offSet,
                left: 0,
                behavior: 'smooth'
              });
      
           this.setState({
               selected: true
           })
       }
   }
   componentWillReceiveProps(nextProps){
    // console.log(nextProps, "next props in type")
    let { id } = this.props;
    
    if (nextProps.type === nextProps.selected.SOURCE ){
        console.log(nextProps, "next prop type")
        let offSet = document.getElementById(`type${id}`).offsetTop
        console.log(offSet, "offSet" )
        let container = document.getElementById('feature_set');
        let { clientHeight, scrollHeight } = container
        console.log(clientHeight, "client height")
        console.log(scrollHeight, "scroll height")
            container.scroll({
                top: offSet,
                left: 0,
                behavior: 'smooth'
              });
      
        this.setState({
            selected: true
        })
    }
}

    render() {
        let { viewMode, type, featureSets, id} = this.props;
        let { featureSet } = featureSets;
        let { selected } = this.state
        // console.log(featureSets, "feature sets")
        return (
            <div className="row" id={`type${id}`} >
                <button className="collapsible" onClick={() => this.setState({selected: !this.state.selected})}>
                    {type} {featureSet.length}<div className={selected ? "arrow-up" : "arrow-down"} />
                </button>
                <div className="content" style={ selected ? {display: "block"} : {display: "none"}}>
                    <ul>
                       {featureSet.map((set,i) => <Set key={set.id} id={set.id} type={type} selectedType={this.props.selected.SOURCE} name={set.name} selectedSet ={this.props.selected["Feature set"]} handleFeature={()=>this.handleFeatures(set.features)}/>)}
                    </ul>
                </div>
            </div>
        )
    }
}

export default connect(mapStatetoProps)(Type);
