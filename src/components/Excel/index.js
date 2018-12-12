import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStatetoProps = state => ({viewMode: state.viewMode})

class Excel extends Component {

    renderRows(){
        let data = [{id: 1, inQuote: "x", platform: "iOS", featureSet: "User Account", feature: "Log In/Email", featureDescription: "whatever ", assumptions: "", notes: ""}]
        if (data) {
           return data.map((d,i) => {
            return (
                <tr key={i}>
                    <th scope="row">{d.id}</th>
                    <td>{d.inQuote}</td>
                    <td>{d.platform}</td>
                    <td>{d.featureSet}</td>
                    <td>{d.feature}</td>
                    <td>{d.featureDescription}</td>
                    <td>{d.assumptions}</td>
                    <td>{d.notes}</td>
                </tr>
            )
            })
        }
    }

    render() {
      return (
        <div className="row">
          <div className="col-md-12">
          <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">In Qoute</th>
                    <th scope="col">Platform</th>
                    <th scope="col">Feature Set</th>
                    <th scope="col">Feature</th>
                    <th scope="col"  width="130">Feature Description</th>
                    <th scope="col">Assumptions</th>
                    <th scope="col">Notes</th>
                </tr>
            </thead>
            <tbody>
               {this.renderRows()}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
  
  export default connect(mapStatetoProps)(Excel);
  