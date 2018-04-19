import { find } from 'lodash/fp';
import { Dropdown, OptionWithModal } from '../../../components/Dropdown';
import AvatarListStacked from '../../../components/AvatarListStacked';
import PromiseTracker, { STATUS, forStatus } from '../../../components/PromiseTracker';
import styles from './style.less'


const hasLiked = (user, likes) => !!find(u => user.id === u.id, likes);

const LikeButton = ({ hasLiked, like, unlike }) => (
  <PromiseTracker onTrigger={hasLiked ? unlike : like}>
    {({ trigger, status }) =>
      forStatus({
        [STATUS.IDLE]: <button onClick={trigger}>{hasLiked ? 'Liked' : 'Like'}</button>,
        [STATUS.PENDING]: <span>Saving...</span>
      }, status)
    }
  </PromiseTracker>
);

export default ({
  praise: { id, title, body, author, recipient, likes },
  currentUser,
  edit,
  remove,
  like,
  unlike
}) => (
  <div>
    <div className={styles.container}>
      <div className={styles.recipient}>
        <img className={styles.recipientAvatar} src={recipient.avatar} />
        <div className={styles.recipientName}>{recipient.name}</div>
      </div>

      <div className={styles.body}>
        <div className={styles.content}>
          <div className={styles.title}>
            <h2>{title}</h2>
            <Dropdown>
              <OptionWithModal>Edit</OptionWithModal>
              <OptionWithModal>Delete</OptionWithModal>
            </Dropdown>
          </div>
          <div>{body}</div>
        </div>
      </div>

      <div className={styles.footer}>
        <AvatarListStacked users={likes} />
        <LikeButton
          hasLiked={hasLiked(currentUser, likes)}
          like={like}
          unlike={unlike}
        />
      </div>
    </div>
  </div>
);
