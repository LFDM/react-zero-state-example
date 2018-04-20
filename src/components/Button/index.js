import classNames from 'classnames';
import styles from './style.less';

const factory = (className, type = 'button') => (props) => (
  <button
    {...props}
    type={props.type || type}
    className={classNames(className, props.className)}
  />
);

const buttonFactory = (className, type = 'button') =>
  factory(classNames(styles.button, className, type));

export const ButtonSubmit = buttonFactory(styles.primary, 'submit');
export const ButtonPrimary = buttonFactory(styles.primary);
export const ButtonSecondary =  buttonFactory(styles.secondary);
export const ButtonDangerous =  buttonFactory(styles.dangerous);
export const ButtonInline = factory();
export const ButtonLink = factory(styles.link);

export const ButtonContainer = ({ className, children }) => <div className={classNames(styles.container, className)}>{children}</div>;

