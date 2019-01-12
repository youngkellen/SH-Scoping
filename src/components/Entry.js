import React from 'react';
import { connect } from 'react-redux';
import { store } from '../store';
import { push } from 'react-router-redux';

class Entry extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    if (this.props) {
      // this will be used for login functionality
      store.dispatch(push('/project'));
    } else {
      store.dispatch(push('/dashboard'));
    }
  }

  render() {
      return (null)
  }
}

export default Entry;
