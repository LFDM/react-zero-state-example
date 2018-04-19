import classNames from 'classnames';
import styles from './style.less';

export const Card = ({ children, className }) =>
  <div className={classNames(className, styles.card)}>{children}</div>;
