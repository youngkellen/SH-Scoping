import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SCOPE_SELECTED_FEATURES } from '../../constants/actionTypes';


class Set extends Component {
    constructor(props){
        super(props)
        this.state = {
            selected: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    
    componentWillReceiveProps(nextProps){
       if (nextProps.selectedSet === nextProps.name && nextProps.type === nextProps.selectedType) {
           this.setState({
               selected: true
           })
       } else {
        this.setState({
            selected: false
        })
       }
    }

    handleClick(){
        let { handleFeature, id} = this.props;
        handleFeature(id)
    }

    render() {
        let { name} = this.props;
        let { selected } = this.state;
        return (
            <li onClick={()=>this.handleClick()} style={selected ? {backgroundColor: "white"}: {opacity: 0.5}}>
                {name}
            </li>
        )
    }
}

export default Set
