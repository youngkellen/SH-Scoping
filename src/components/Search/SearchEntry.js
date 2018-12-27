import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SCOPE_SELECTED_FEATURES } from '../../constants/actionTypes';


class SearchEntry extends Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this);
        console.log(props, "props in search entry")
    }


    handleClick(){
        let { handleClick, id, source, featureSet} = this.props;
        handleClick(id, source, featureSet)
    }

    render() {
        let { name} = this.props;
        return (
            <li onClick={()=>this.handleClick()} >
                {name}
            </li>
        )
    }
}

export default SearchEntry
