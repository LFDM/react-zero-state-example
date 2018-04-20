import { Fragment } from 'react';
import classNames from 'classnames';
import styles from './style.less';

const divWithClassName = cN => ({ className, children }) =>
  <div className={classNames(className, cN)}>{children}</div>

export const FormContainer = divWithClassName(styles.container);
export const FormGroup = divWithClassName(styles.group);

export const FormLabel = ({ label, children, className }) => (
  <div className={classNames(styles.label, className)}>
    <label>{label}</label>
    {children}
  </div>
);

