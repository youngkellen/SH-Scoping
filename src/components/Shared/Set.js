import React, { Component, PureComponent } from 'react';
import searchHighlight from "../../helper/searchHighlight"

class Set extends Component {
    constructor(props){
        super(props)
        this.state = {
            selected: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        // console.log(this.props, "set props")
        if (this.props.selectedSet === this.props.name && this.props.type === this.props.selectedType) {
            this.setState({
                selected: true
            })
            this.handleClick()
        } else {
         this.setState({
             selected: false,
             temp: false
         })
        }
    }
    
    componentWillReceiveProps(nextProps){
        // console.log(nextProps, "next bro")
       if (nextProps.selectedSet === nextProps.name && nextProps.type === nextProps.selectedType && (nextProps.library && nextProps.library === nextProps.inLibrary || (!nextProps.library && !nextProps.inLibrary) ) ) {
           this.setState({
               selected: true,
               temp: false
           })
       } else {
            this.setState({
                selected: false
            })
       }
    }

    handleClick(){
        let { handleFeature, id, temp, features, name, library} = this.props;
        this.setState({
            temp: true
        })
        // console.log(this.props, "set props")
        handleFeature(features, temp, name, library)
       
    }

    renderClassName(){
        let { selected, temp} = this.state;
        let { clicked, name, type, library, inLibrary } = this.props;
        let nameOfClass = ""
        if (temp) {
            // nameOfClass = "temp-select"
            nameOfClass="not-selected"
        } else if (selected) {
            nameOfClass="selected"
        } else {
            nameOfClass="not-selected"
        }
        if (clicked && clicked.fs === name && clicked.type === type) {
            if ( (library && inLibrary === library) || (!library && !inLibrary)){
                nameOfClass+=" clicked"
            } 
           
        }
        return nameOfClass
    }

    render() {
        let { name, search } = this.props;
        let { selected, temp} = this.state;
        if ( !name ){
            return null
        }
        return (
            <li 
                onClick={()=>this.handleClick()} 
                className={this.renderClassName()}
                style={this.props.temp ?  this.props.library ? {backgroundColor: "orange"} : {backgroundColor: "yellow"} : {}}
            >
                <span dangerouslySetInnerHTML={{ __html:searchHighlight(name, search)}}/>
            </li>
        )
    }
}

export default Set
