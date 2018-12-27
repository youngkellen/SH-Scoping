import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SCOPE_SELECTED_FEATURES } from '../../constants/actionTypes';


class Set extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            selected: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
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
       if (nextProps.selectedSet === nextProps.name && nextProps.type === nextProps.selectedType) {
           this.setState({
               selected: true,
               temp: false
           })
       } else {
            this.setState({
                selected: false,
                
            })
       
       }
    }

    handleClick(){
        let { handleFeature, id} = this.props;
        this.setState({
            temp: true
        })
        handleFeature(id)
       
    }

    renderClassName(){
        let { selected, temp} = this.state;
        let nameOfClass = ""
        if (temp) {
            // nameOfClass = "temp-select"
            nameOfClass="not-selected"
        } else if (selected) {
            nameOfClass="selected"
        } else {
            nameOfClass="not-selected"
        }
        return nameOfClass
    }

    render() {
        let { name } = this.props;
        let { selected, temp} = this.state;
        return (
            <li 
                onClick={()=>this.handleClick()} 
                className={this.renderClassName()}
                >
                {name}
            </li>
        )
    }
}

export default Set
