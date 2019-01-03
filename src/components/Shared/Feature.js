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
        let { tempSelect } = this.props;
        if (this.props.selectedId === this.props.id && !tempSelect) {
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
        let { temp } = nextProps;
        if (nextProps.selectedId === nextProps.id && !temp) {
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
        if (feature && feature[0]){
            return (
                <li 
                    onClick={() => this.handleClick()} 
                    style={selected ? { backgroundColor: "white" } : {} }
                    className={this.props.temp ? "temp-background" : ""}
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
