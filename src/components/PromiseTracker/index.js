import { Component } from 'react';
import PropTypes from 'prop-types';

export const STATUS = {
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export const forStatus = (states, state) => (state in states ? states[state] : states[STATUS.IDLE]);

const propTypes = {
  onTrigger: PropTypes.func.isRequired, // () => Promise<T>
  timeout: PropTypes.number,
};

const defaultProps = {
  timeoutLength: 2000,
};

export default class PromiseTracker extends Component {
  constructor() {
    super();
    this.state = {
      status: STATUS.IDLE,
      error: null,
    };

    this.timeout = null;
    this.unmounted = false;
  }

  safeSetState = (...args) => {
    if (this.unmounted) {
      return;
    }
    this.setState(...args);
  };

  trigger = (...args) => {
    const { onTrigger } = this.props;
    this.setState({
      status: STATUS.PENDING,
    });

    const onSuccess = result => {
      this.safeSetState({ status: STATUS.SUCCESS });
      this.setTimeout();
      return result;
    };

    const onError = error => {
      this.safeSetState({ status: STATUS.ERROR, error });
      return Promise.reject(error);
    };

    return onTrigger(...args).then(onSuccess, onError);
  };

  setTimeout = () => {
    this.timeout = setTimeout(() => {
      this.safeSetState({ status: STATUS.IDLE, error: null });
      this.timeout = null;
    }, this.props.timeoutLength);
  };

  componentWillUnmount() {
    this.unmounted = true;
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  render() {
    const { children } = this.props;
    const { status, error } = this.state;
    return children({ trigger: this.trigger, status, error });
  }
}

PromiseTracker.propTypes = propTypes;
PromiseTracker.defaultProps = defaultProps;

