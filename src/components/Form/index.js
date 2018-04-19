import { noop, omit } from 'lodash/fp';
import { PropTypes } from 'prop-types';
import { Component } from 'react';

export const FORM_CONTEXT = {
  form: PropTypes.shape({
    data: PropTypes.object,
    onChange: PropTypes.func,
    onFieldBlur: PropTypes.func,
    onSubmit: PropTypes.func,
  }).isRequired,
};

export default class Form extends Component {
  getChildContext() {
    const { data, onChange, onSubmit, onFieldBlur } = this.props;
    return {
      form: {
        data,
        onChange: field => value => {
          const nextData = {
            ...data,
            [field]: {
              ...data[field],
              value,
              dirty: true,
            },
          };
          onChange(nextData);
        },
        onFieldBlur: field => () => {
          const nextData = {
            ...data,
            [field]: {
              ...data[field],
              // Touched if it was touched before or if it contains a value.
              touched: !!data[field].touched || !!data[field].value,
            },
          };
          onFieldBlur(nextData);
        },
        onSubmit,
      },
    };
  }
  render() {
    const { onSubmit, children, ...otherProps } = omit('onFieldBlur')(this.props);
    return (
      <form noValidate onSubmit={event => onSubmit(event)} {...otherProps}>
        {children}
      </form>
    );
  }
}

Form.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func,
  onFieldBlur: PropTypes.func,
  onSubmit: PropTypes.func,
};

Form.defaultProps = {
  data: {},
  onChange: noop,
  onSubmit: noop,
  onFieldBlur: () => noop,
};

Form.childContextTypes = FORM_CONTEXT;


