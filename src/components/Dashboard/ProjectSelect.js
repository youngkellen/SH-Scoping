import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectListItem from './ProjectListItem';


const mapStatetoProps = state => ({ viewMode: state.viewMode })

class ProjectSelect extends Component {
    async componentDidMount() {
    }

    renderList() {
        let projects = [
            { scope: "Power Music", versions: [{ v: "1", description: "test", approved: true, platforms: ["ios", "android"], lastEdit: "04/12/2018", types: ["E-commerce", "Digital Media"],date: "11/11/11"  }]},
            { scope: "Scotts gro App", versions: [{ v: "1", description: "gro app", approved: true, platforms: ["ios", "android"], lastEdit: "04/12/2018", types: ["E-commerce", "Digital Media"], date: "11/11/11" },  ]   },
            {
                scope: "Actually", versions: [{ v: "1", description: "act", approved: false, platforms: ["ios", "android"], lastEdit: "04/12/2018", types: ["E-commerce", "Digital Media"], date: "11/11/11"  },
                { v: "1", description: "act", approved: true, platforms: ["ios", "android"], lastEdit: "04/12/2018", types: ["E-commerce", "Digital Media"], date: "11/11/11"  }]
            },
            { scope: "OC", versions: [{ v: "1", description: "gro app", approved: true, platforms: ["ios", "android"], lastEdit: "04/12/2018", types: ["E-commerce", "Digital Media"],  date: "11/11/11" }]  },
        ]
        return (
            projects.map(p => {
                return <ProjectListItem title={p.scope} versions={p.versions} />
            })
        )
    }

    render() {
        return (
            <div className="project-select" style={{overflow: "auto"}}>
                <div style={{overflow: "auto"}}>
                    <ul className="scope">
                        {this.renderList()}
                    </ul>
                </div>
               
            </div>
        );
    }
}

export default connect(mapStatetoProps)(ProjectSelect);
