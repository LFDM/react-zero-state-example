import { noop, omit, pick } from 'lodash/fp';
import { PropTypes } from 'prop-types';
import { Component } from 'react';
import classNames from 'classnames';

import Input from '../Input';
import TextArea from '../TextArea';

import styles from './style.less';

export const FORM_CONTEXT = {
  form: PropTypes.shape({
    data: PropTypes.object,
    onChange: PropTypes.func,
    onFieldBlur: PropTypes.func,
    onSubmit: PropTypes.func,
  }).isRequired,
};

export class Form extends Component {
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
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onFieldBlur: PropTypes.func,
  onSubmit: PropTypes.func,
};

Form.defaultProps = {
  onSubmit: noop,
  onFieldBlur: () => noop,
};

Form.childContextTypes = FORM_CONTEXT;

export function FormInput(props, context) {
    const { field, className } = props;
    const { form: { onFieldBlur, onChange, data } } = context;
    const handleChange = event => onChange(field)(event.target.value);
    const inputProps = {
        id: field,
        name: field,
        className: classNames(styles.formInput, className),
        value: data[field].value,
        error: data[field].error,
        onChange: handleChange,
        onBlur: onFieldBlur(field),
        ...pick([
            'autoFocus',
            'disabled',
            'maxLength',
            'minLength',
            'prefix',
            'prefixSize',
            'required',
            'style',
            'type',
        ])(props),
    };
    return <Input {...inputProps} />;
}

FormInput.contextTypes = FORM_CONTEXT;

export function FormTextArea(props, context) {
    const { field, className } = props;
    const { form: { onFieldBlur, onChange, data } } = context;
    const handleChange = event => onChange(field)(event.target.value);
    const inputProps = {
        id: field,
        name: field,
        className: classNames(styles.formTextArea, className),
        value: data[field].value,
        onChange: handleChange,
        onBlur: onFieldBlur(field),
        ...pick([
            'autoFocus',
            'disabled',
            'required',
            'style',
        ])(props),
    };
    return <TextArea {...inputProps} />;
}

FormTextArea.contextTypes = FORM_CONTEXT;


