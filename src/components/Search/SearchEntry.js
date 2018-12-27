import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SCOPE_SELECTED_FEATURES } from '../../constants/actionTypes';


class SearchEntry extends Component {
    constructor(props){
        super(props)
        this.state = {
            selected: false
        }
        this.handleClick = this.handleClick.bind(this);
        console.log(props, "props in search entry")
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
        let { handleClick, id, source} = this.props;
        handleClick(id, source)
    }

    render() {
        let { name} = this.props;
        let { selected } = this.state;
        return (
            <li onClick={()=>this.handleClick()} >
                {name}
            </li>
        )
    }
}

export default SearchEntry
