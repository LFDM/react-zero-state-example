import classNames from 'classnames';
import styles from './style.less';

export default ({ getRef, className, ...props}) =>
  <input ref={getRef} className={classNames(styles.input, className)} { ...props } />;
