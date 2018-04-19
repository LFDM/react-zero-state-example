import PropTypes from 'prop-types';
import classNames from 'classnames';
import { keys } from 'lodash/fp';
import styles from './style.less';

const AVATAR_SIZES = {
  XS: 'extraSmall',
  SM: 'small',
  MD: 'medium',
  LG: 'large',
  XL: 'xLarge'
};

Avatar.propTypes = {
  user: PropTypes.object.isRequired,
  size: PropTypes.oneOf(keys(AVATAR_SIZES)),
  className: PropTypes.string,
};

Avatar.defaultProps = {
  size: 'MD',
};

export default function Avatar({ user, size, className }) {
  const sizeClass = AVATAR_SIZES[size];
  const alt = `Avatar for ${user.name}`;
  return <img src={user.avatar} className={classNames(styles.round, styles[sizeClass], className)} alt={alt} />;
}
