import React, { PureComponent, Component } from 'react';
import searchHighlight from "../../helper/searchHighlight"


class Feature extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        let { tempSelect,temp, selectedId, id } = this.props;
        if (tempSelect && temp && selectedId === id){
            this.setState({selected: true})
        } else if (selectedId === id ) {
            this.setState({
                selected: true
            })
        } else {
            this.setState({
                selected: false
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        let { tempSelect,temp, selectedId, id  } = nextProps;
        if (tempSelect && temp && selectedId === id){
            this.setState({selected: true})
        } else if (nextProps.selectedId === nextProps.id && !temp && !tempSelect) {
            this.setState({
                selected: true
            })
        } else {
            this.setState({
                selected: false
            })
        }
    }

    handleClick() {
        let { handleFeature, id, temp } = this.props;
        handleFeature(id, temp)
    }

    renderDot() {
        let { inScope } = this.props;
        if (inScope) {
            return (
                <div className="green-dot" />
            )
        } else {
            return null
        }
    }

    render() {
        console.log(this.props, "feature props ")
        let { feature, search } = this.props;
        let { selected } = this.state;
        console.log(selected, "selected in feature")
        if (feature && feature[0]){
            return (
                <li 
                    onClick={() => this.handleClick()} 
                    className={this.props.temp ? "temp-background" : ""}
                    style={selected ? { backgroundColor: "white" } : {} }
                >
                {this.renderDot()}
                <span dangerouslySetInnerHTML={{ __html:searchHighlight(feature, search)}}/>
                </li>
            )
        } else {
            return null
        }
       
    }
}

export default Feature
