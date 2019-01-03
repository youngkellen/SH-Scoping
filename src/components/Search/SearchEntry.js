import React, { Component } from 'react';
import searchHighlight from "../../helper/searchHighlight"


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
        let { name, search} = this.props;
        return (
            <li onClick={()=>this.handleClick()} >
                <span dangerouslySetInnerHTML={{ __html:searchHighlight(name, search)}}/>
            </li>
        )
    }
}

export default SearchEntry
