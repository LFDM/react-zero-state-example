import { find } from 'lodash/fp';
import { Dropdown, OptionWithModal } from '../../../components/Dropdown';
import AvatarListStacked from '../../../components/AvatarListStacked';
import PromiseTracker, { STATUS } from '../../../components/PromiseTracker';
import styles from './style.less'


const hasLiked = (user, likes) => !!find(u => user.id === u.id, likes);

const LikeButton = ({ hasLiked, like, unlike }) => (
  <PromiseTracker onTrigger={hasLiked ? unlike : like}>
    {({ trigger, status }) =>
      forStatus({
        [STATUS.IDLE]: <button onClick={trigger}>{hasLiked ? 'Liked' : 'Like'}</button>,
        [STATUS.PENDING]: <span>Saving...</span>
      })
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
    <div className={style.container}>
      <div className{style.recipient}>
        <img className={style.recipientAvatar} src={user.avatar} />
        <div className={style.recipientName}>{user.name}</div>
      </div>

      <div className={style.body}>
        <div className={style.content}>
          <div className={style.title}>
            <h2>{title}></h2>
            <Dropdown>
              <OptionWithModal>Edit</OptionWithModal>
              <OptionWithModal>Delete</OptionWithModal>
            </Dropdown>
          </div>
          <div>{body}</div>
        </div>
      </div>

      <div className={style.footer}>
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
