import React, { PureComponent, Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Set from './Set';
import searchHighlight from "../../helper/searchHighlight";
import { TEMPSCOPE_ADD, TEMPSCOPE_TREE, SELECT_SCROLL, SELECT_FEATURE_SET , SCOPE_SELECTED_FEATURES} from '../../constants/actionTypes';
import newRow from "../../helper/newRow";
import buildTree from "../../helper/buildTree";
import NewFS from "../Builder/NewFS"


const mapStatetoProps = state => (
    { 
        viewMode: state.viewMode, 
        selected: state.scope.selected, 
        scope: state.scope.scope, 
        search: state.scope.search, 
        tempScope: state.tempScope, 
        feature: state.scope.features,
        clicked: state.selectHelper.select,
        shouldScroll: state.selectHelper.scroll
    }
)

class Type extends PureComponent {
    constructor() {
        super()
        this.state = {
            selected: false,
            tempFS: []
        }
        this.handleFeatures = this.handleFeatures.bind(this);
        this.setToTempScope = this.setToTempScope.bind(this);
        this.addNewFS = this.addNewFS.bind(this);
    }

    componentDidMount() {
        //    console.log(this.props, "props in type")
        let { id } = this.props;

        if (this.props.type === this.props.selected.data.SOURCE && !this.props.selected.temp) {
            // console.log(this.props, "type props mount")
            let offSet = document.getElementById(`type${id}`).offsetTop
            // console.log(offSet, "offSet" )
            let container = document.getElementById('feature_set');
            // let { clientHeight, scrollHeight } = container
            // console.log(clientHeight, "client height")
            // console.log(scrollHeight, "scroll height")
            container.scroll({
                top: offSet,
                left: 0,
                behavior: 'smooth'
            });

            this.setState({
                selected: true
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps, "next props in type")
        let { id, shouldScroll } = this.props;
        // console.log(this.props, "features in scroll")
        // console.log(nextProps)
        if (shouldScroll && nextProps.type === nextProps.selected.data.SOURCE && JSON.stringify(this.props.feature) !== JSON.stringify(nextProps.feature)) {
            // console.log(nextProps, "next prop type")
            let offSet = document.getElementById(`type${id}`).offsetTop
            let container = document.getElementById('feature_set');
            let { clientHeight, scrollHeight } = container
            // console.log(clientHeight, "client height")
            // console.log(scrollHeight, "scroll height")
            container.scroll({
                top: offSet,
                left: 0,
                behavior: 'smooth'
            });

            this.setState({
                selected: true
            })
        }
    }

    handleFeatures(features, temp, name) {
        // passed down as prop to Set. Set handles the click event
        let { dispatch, type} = this.props;
        console.log(features, "features boss")
        if (!features){
            dispatch({ type: SCOPE_SELECTED_FEATURES, payload: [{feature: [], type, fs: name}] })
            return
        }
        if (temp){
            let tempFeatures = features.slice().map(f => Object.assign({}, f, {temp: true, type, fs: name}))
            console.log(tempFeatures, "temp features")
            dispatch({ type: SCOPE_SELECTED_FEATURES, payload: tempFeatures })
        } else {
            dispatch({ type: SCOPE_SELECTED_FEATURES, payload: features.map(f => Object.assign({}, f, {temp: true, type, fs: name})) })
        }
        dispatch({type: SELECT_FEATURE_SET, payload: {fs: name, type }})
        dispatch({type: SELECT_SCROLL, payload: false })

       
    }

    renderAddFS() {
        // renders add new feature set
        let { fs, viewMode } = this.props;
        if (fs && viewMode.mode === "builder") {
            return (
                <li className="add-new" onClick={this.addNewFS}>+ Add New Feature Set</li>
            )
        } else {
            return null
        }
    }

    async setToTempScope(id, source, fs) {
        console.log(source, "source fs")
        console.log(fs, "fs bro")
        let { tempFS } = this.state;
        let { dispatch, tempScope, temp } = this.props;
        tempFS.splice(id, 1)
        // console.log(tempFS, "temp Row")
        this.setState({
            tempFS: []
        })
        if (source && fs) {
            if (temp){
                // if adding a fs to a temp row
                await dispatch({ type: TEMPSCOPE_ADD, payload: new newRow(tempScope.tempScope.length, source, fs) })
                await dispatch({ type: TEMPSCOPE_TREE, payload: buildTree([...tempScope.tempScope, new newRow(tempScope.tempScope.length, source, fs)]) })

            } else {
                // if adding a fs to an existing row
                await dispatch({ type: TEMPSCOPE_ADD, payload: new newRow(tempScope.tempScope.length, source, fs) })
                await dispatch({ type: TEMPSCOPE_TREE, payload: buildTree([...tempScope.tempScope, new newRow(tempScope.tempScope.length, source, fs)]) })
            }
        }
    }

    addNewFS() {
        // adds a input for creating a new type
        let { type } = this.props;
        let { tempFS } = this.state;
        if (tempFS && tempFS.length < 2){
        this.setState(prevState => ({
            tempFS: [...prevState.tempFS, {type}]
        }))
    }
    }

    renderTempSet(){
        // if a row that is in scope contains a fs that is not in scope and is in the process of being created, render this
        let { tempSet, type, search, featureSets, clicked } = this.props;
        let { featureSet } = featureSets;
        if (tempSet){
            console.log(tempSet, "temp Set bro")
            console.log(featureSet, "feature set bro")
            let uniqueTempSet = tempSet.featureSet.filter(fs => {
                let test = featureSet.map(f=>f.name)
                console.log(test, "test")
                console.log(fs.name, "fs")
                console.log(test.includes(fs.name))
                if (!test.includes(fs.name)) {
                    return fs
                }
            })
            console.log(uniqueTempSet, "unique")
            if (uniqueTempSet.length > 0){
                return (
                    uniqueTempSet.map((set, i) => <Set key={i} id={set.id} type={type} search={search} clicked={clicked}selectedType={this.props.selected.data.SOURCE} name={set.name} selectedSet={this.props.selected.data["Feature set"]} features={tempSet.featureSet} handleFeature={this.handleFeatures} temp/>)
                )
            } else {
                return null
            }
            
        } else {
            return null
        }
    }


    render() {
        let { viewMode, type, featureSets, id, search, fs, tempSet, clicked } = this.props;
        let { featureSet } = featureSets;
        let { selected, tempFS } = this.state
        // console.log(featureSets, "feature sets")
        // if (tempSet){
        //     console.log(tempSet, "tempSet in render")
        // }

        // console.log(this.props, "type prosp bro")
        // console.log(tempFS, "temp fs")
        // console.log(type, "type o")
        if (!type){
            return null
        }
        return (
            <div className="row" id={`type${id}`} >
                <button style={this.props.temp ? { backgroundColor: "yellow" } : {}} className="collapsible" onClick={() => this.setState({ selected: !this.state.selected })}>
                    <span dangerouslySetInnerHTML={{ __html: searchHighlight(type, search) }} />
                    {`  ${featureSet.filter(f=>f.name).length}`}
                    <div className={selected ? "arrow-up" : "arrow-down"} />
                </button>
                <div className="content" style={selected ? { display: "block" } : { display: "none" }}>
                    <ul>
                        {featureSet.map((set, i) => <Set key={i} id={set.id} type={type} search={search} clicked={clicked} selectedType={this.props.selected.data.SOURCE} name={set.name} selectedSet={this.props.selected.data["Feature set"]} features={set.features} handleFeature={this.handleFeatures} temp={this.props.temp} />)}
                        {this.renderTempSet()}
                        {!tempFS > 1 ? "" : tempFS.map((t, i) => <NewFS key={i} id={i} type={t.type} setToTempScope={this.setToTempScope} />)}
                        {this.renderAddFS()}
                    </ul>
                </div>
            </div>
        )
    }
}

export default connect(mapStatetoProps)(Type);
