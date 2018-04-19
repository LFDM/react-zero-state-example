const context = {};
import { Component } from 'react';
import PropTypes from 'prop-types';
import api from './api';

export const CONTEXT = {
  currentUser: PropTypes.object
};

export class ContextProvider extends Component {
  constructor(){
    super();
    this.state = {};
  }

  componentWillMount() {
    this.currentUserSubscriber = api.user.getCurrentUser.createObservable().subscribe(
      currentUser => this.setState({ currentUser })
    );
  }

  componenWillUnmount() {
    this.currentUserSubscriber.unsubscribe();
  }

  getChildContext() {
    return { currentUser: this.state.currentUser };
  }

  render() {
    if (!this.state.currentUser) {
      return null;
    }

    return this.props.children;
  }
}

ContextProvider.childContextTypes = CONTEXT;


