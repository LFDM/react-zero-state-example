import classNames from 'classnames';
import styles from './style.less';

const buttonFactory = (className, type = 'button') => (props) => (
  <button
    {...props}
    type={props.type || type}
    className={classNames(styles.button, className, props.className)}
  />
);


export const ButtonSubmit = buttonFactory(styles.primary, 'submit');
export const ButtonPrimary = buttonFactory(styles.primary);
export const ButtonSecondary =  buttonFactory(styles.secondary);
export const ButtonInline = buttonFactory(styles.inline);

export const ButtonContainer = ({ className, children }) => <div className={classNames(styles.container, className)}>{children}</div>;

