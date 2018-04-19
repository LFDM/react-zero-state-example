import PropTypes from 'prop-types';
import { keys } from 'lodash/fp';
import classNames from 'classnames';
import Avatar from '../Avatar';
import styles from './style.less';

const SIZES = {
  XS: 'extraSmall',
  SM: 'small',
  MD: 'medium',
  LG: 'large',
};

const propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  max: PropTypes.number,
  size: PropTypes.oneOf(keys(SIZES)),
};

const defaultProps = {
  max: 7,
  size: 'XS',
};

const AdditionalCount = ({ value, size, isOnGreyBackground }) => {
  const sizeClass = SIZES[size];
  return (
    <Item isOnGreyBackground={isOnGreyBackground}>
      <span className={classNames(styles.additional, styles[sizeClass])}>+{value}</span>
    </Item>
  );
};

const Item = ({ children }) => (
  <div className={styles.item}>{children}</div>
);

export default function AvatarListStacked({ users, max, size }) {

  const maxToDisplay = users.length > max ? max - 2 : users.length;
  const additional = users.length - maxToDisplay;
  const usersToDisplay = users.slice(0, maxToDisplay);

  return (
    <div className={styles.container}>
      {usersToDisplay.map(u => (
        <Item key={u.id}>
          <Avatar size={size} user={u} className={styles.avatar} />
        </Item>
        ))}
        {additional ? (
          <AdditionalCount value={additional} size={size} />
          ) : null}
        </div>
  );
}

AvatarListStacked.defaultProps = defaultProps;
AvatarListStacked.propTypes = propTypes;

