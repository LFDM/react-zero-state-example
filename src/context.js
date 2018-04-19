const context = {};
import { Component } from 'react';
import api from './api';

export const CONTEXT = {
  currentUser: PropTypes.object
};

export class ContextProvider extends Component {
  componentWillMount() {
    this.currentUserSubscriber = api.getCurrentUser.createObservable.subscribe(
      currentUser => this.setState({ currentUser });
    )
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

ContextProvider.contextTypes = CONTEXT;


