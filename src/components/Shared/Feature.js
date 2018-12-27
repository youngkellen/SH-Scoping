import React, { PureComponent } from 'react';
import searchHighlight from "../../helper/searchHighlight"


class Feature extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            selected: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        if (this.props.selectedId === this.props.id) {
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
        if (nextProps.selectedId === nextProps.id) {
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
        let { handleFeature, id } = this.props;
        handleFeature(id)
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
        return (
            <li 
                onClick={() => this.handleClick()} 
                style={selected ? { backgroundColor: "white" } : {} }
            >
            {this.renderDot()}
            <span dangerouslySetInnerHTML={{ __html:searchHighlight(feature, search)}}/>
            </li>
        )
    }
}

export default Feature
