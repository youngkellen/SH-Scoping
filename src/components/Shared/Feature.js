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
        // console.log(this.props, "feature props in mount")
        let { tempSelect,temp, selectedId, id, library, inLibrary } = this.props;

        if (tempSelect && temp && selectedId === id && ( (library && library === inLibrary) || (!library && !inLibrary)) ){
            this.setState({selected: true})
        } else if (selectedId === id && !temp && !tempSelect && !library && !inLibrary) {
            this.setState({selected: true})
        } else {
            this.setState({selected: false})
        }
    }

    componentWillReceiveProps(nextProps) {
        let { tempSelect,temp, selectedId, id, inLibrary, library  } = nextProps;
        if (tempSelect && temp && selectedId === id ){
            // select if in library or temp
            this.setState({selected: true})
        } else if (nextProps.selectedId === nextProps.id && !temp && !tempSelect && !library && !inLibrary) {
            // select if in scope
            this.setState({selected: true})
        } else {
            this.setState({selected: false})
        }
    }

    handleClick() {
        let { handleFeature, id, temp, library } = this.props;
        handleFeature(id, temp, library)
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
        // console.log(this.props, "feature props ")
        let { feature, search } = this.props;
        let { selected } = this.state;
        // console.log(selected, "selected in feature")
        if (feature && feature[0]){
            return (
                <li 
                    onClick={() => this.handleClick()} 
                    className={this.props.temp ? this.props.library ? "library-background" : "temp-background" : ""}
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
