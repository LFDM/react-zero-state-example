import classNames from 'classnames';
import styles from './style.less';

const divWithClassName = cN => ({ className, children }) =>
  <div className={classNames(className, cN)}>{children}</div>

export const Page = divWithClassName(styles.page);
export const PageHeader = divWithClassName(styles.header);
export const PageControls = divWithClassName(styles.controls);
export const PageTitle = divWithClassName(styles.title);
export const PageBody = divWithClassName(styles.body);
