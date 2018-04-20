import { pick } from 'lodash/fp';
import classNames from 'classnames';

import { FORM_CONTEXT } from '..';
import StandardInput from '../../Input';
import StandardTextArea from '../../TextArea';
import StandardAutocompleteUser from '../../AutocompleteUser';

import styles from './style.less';

export function Input(props, context) {
    const { field, className } = props;
    const { form: { onFieldBlur, onChange, data } } = context;
    const handleChange = event => {
      event.stopPropagation();
      onChange(field)(event.target.value);
    };
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
    return <StandardInput {...inputProps} />;
}

Input.contextTypes = FORM_CONTEXT;

export function TextArea(props, context) {
    const { field, className } = props;
    const { form: { onFieldBlur, onChange, data } } = context;
    const handleChange = event => {
      event.stopPropagation();
      onChange(field)(event.target.value);
    }
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
            'rows',
            'columns'
        ])(props),
    };
    return <StandardTextArea {...inputProps} />;
}

TextArea.contextTypes = FORM_CONTEXT;

export function AutocompleteUser(props, context) {
    const { field, className } = props;
    const { form: { onFieldBlur, onChange, data } } = context;
    const user = data[field].value;
    return <StandardAutocompleteUser onSelect={onChange(field)} selectedUserIds={user ? [user.id] : []} />
}

AutocompleteUser.contextTypes = FORM_CONTEXT;

