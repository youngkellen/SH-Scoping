import React, { PureComponent, Component } from 'react';
import { SCOPE_SELECTED_FEATURES } from '../../constants/actionTypes';

class NewFS extends PureComponent {
    state = { input: ""}
    handleBlur = this.handleBlur.bind(this);
    handleChange = this.handleChange.bind(this);

    componentDidMount(){
        console.log(this.props, "new fs props")
        this.nameInput.focus();
    }

    handleBlur(){
        let { id, setToTempScope, type } = this.props;
        let { input } = this.state
        setToTempScope(id, type, input)
    }
    handleChange(val){
        console.log(val, "new type val")
        this.setState({
            input: val
        })
    }
    render() {
        console.log(this.props, "newFS props")
        return (
            <div className="row new-type">
            <li>
            <input 
                ref={(input) => { this.nameInput = input; }} 
                onBlur={this.handleBlur}
                onChange={e => this.handleChange(e.target.value)}
              />
            </li>
             
            </div>
        )
    }
}

export default NewFS;
