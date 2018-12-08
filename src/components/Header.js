import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends React.Component {
    state = {
      brand: {},
      spent_budget: 0,
      remaining_budget: 0
    }
  
    render() {
      console.log('header props', this.props)
      return (
        <nav className={`navbar navbar-white`}  style={{width: "100%"}}>
          <Link to="/" className="navbar-brand" >
            <p>Nav Bar</p>
          </Link>
        </nav>
      );
    }
  }
  
  export default Header;
  