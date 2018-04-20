import classNames from 'classnames';
import styles from './style.less';
import Avatar from '../Avatar';

export default function AvatarWithName({ user, size, className }) {
  return (
    <div className={classNames(styles.container, className)}>
      <Avatar user={user} size={size}/>
      {user.name}
    </div>
  );
}
