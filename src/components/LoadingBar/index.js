import styles from './style.m.less';
import PropTypes from 'prop-types';
import classNames from 'classnames';

LoadingBar.propTypes = {
  label: PropTypes.string,
  withLabel: PropTypes.bool,
  className: PropTypes.string,
};

LoadingBar.defaultProps = {
  label: 'Loading...',
  withLabel: true,
};
export default function LoadingBar({ label, withLabel, className }) {
  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.bar} />
      {withLabel && <small className={styles.label}>{label}</small>}
    </div>
  );
}


