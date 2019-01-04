import React, { PureComponent } from 'react';
import { SCOPE_SELECTED_FEATURES } from '../../constants/actionTypes';

class NewType extends PureComponent {
    state = { input: ""}
    handleBlur = this.handleBlur.bind(this);
    handleChange = this.handleChange.bind(this);

    componentDidMount(){
        this.nameInput.focus();
    }

    handleBlur(){
        let { id, setToTempScope } = this.props;
        let { input } = this.state
        setToTempScope(id, input)
    }
    handleChange(val){
        console.log(val, "new type val")
        this.setState({
            input: val
        })
    }
    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          this.handleBlur()
        }
      }
    render() {
        console.log(this.props, "newType props")
        return (
            <div className="row new-type">
              <input 
                ref={(input) => { this.nameInput = input; }} 
                onBlur={this.handleBlur}
                onChange={e => this.handleChange(e.target.value)}
                onKeyPress={this._handleKeyPress}

              />
            </div>
        )
    }
}

export default NewType;
