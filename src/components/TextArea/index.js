import classNames from 'classnames';
import styles from './style.less';

export default ({ className, ...props }) =>
  <textarea className={classNames(styles.textArea, className)} { ...props } />;
