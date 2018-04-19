import { Fragment } from 'react';
import { find } from 'lodash/fp';
import { Dropdown, OptionWithModal } from '../../../components/Dropdown';
import { ButtonContainer, ButtonSecondary, ButtonDangerous, ButtonLink } from '../../../components/Button';
import Avatar from '../../../components/Avatar';
import AvatarListStacked from '../../../components/AvatarListStacked';
import PromiseTracker, { STATUS, forStatus } from '../../../components/PromiseTracker';
import { Card } from '../../../layout/Card';
import Form from '../Form';
import styles from './style.less'


const hasLiked = (user, likes) => !!find(u => user.id === u.id, likes);

const RemoveConfirmation = ({ onCancel, onConfirm }) => (

  <PromiseTracker onTrigger={onConfirm}>
    {({ trigger, status }) =>
      <Fragment>
        <p>This process cannot be reverted! </p>
        <ButtonContainer>
          <ButtonSecondary
            disabled={status !== STATUS.IDLE}
            onClick={onCancel}>
            Cancel
          </ButtonSecondary>

          { status === STATUS.IDLE ?
            <ButtonDangerous onClick={trigger}>Delete</ButtonDangerous> :
            <ButtonSecondary disabled={true}>Deleting...</ButtonSecondary>
          }
        </ButtonContainer>
      </Fragment>
    }
  </PromiseTracker>
);

const LikeButton = ({ hasLiked, like, unlike }) => (
  <PromiseTracker onTrigger={hasLiked ? unlike : like}>
    {({ trigger, status }) =>
      forStatus({
        [STATUS.IDLE]: <ButtonLink onClick={trigger}>{hasLiked ? 'Liked' : 'Like'}</ButtonLink>,
        [STATUS.PENDING]: <span>Saving...</span>
      }, status)
    }
  </PromiseTracker>
);

export default ({
  praise,
  currentUser,
  edit,
  remove,
  like,
  unlike
}) => (
  <Card className={styles.wrapper}>
    <div className={styles.container}>
      <div className={styles.recipient}>
        <Avatar user={praise.recipient} size="XL" />
        <div className={styles.recipientName}>{praise.recipient.name}</div>
      </div>

      <div className={styles.body}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.author}>
              <Avatar user={praise.author} size="SM"/>
              {praise.author.name}
            </div>
            <Dropdown>
              <OptionWithModal
                modalProps={{
                  title: 'Edit Praise',
                  size: 'M_WIDTH',
                  body: ({ closeModal }) =>
                    <Form
                      praise={praise}
                      label="Edit"
                      onCancel={closeModal}
                      onSubmit={p => edit({ ...praise, ...p })}
                    />
                }}
              >
                Edit
              </OptionWithModal>
              <OptionWithModal
                modalProps={{
                  title: 'Are you sure?',
                  size: 'S_WIDTH',
                  body: ({ closeModal }) =>
                    <RemoveConfirmation
                      onConfirm={() => remove(praise.id)}
                      onCancel={closeModal}
                    />
                }}
              >
                Delete
              </OptionWithModal>
            </Dropdown>
          </div>
          <h3>{praise.title}</h3>
          <div>{praise.body}</div>
        </div>

        <div className={styles.footer}>
          <AvatarListStacked users={praise.likes} size="SM"/>
          <LikeButton
            hasLiked={hasLiked(currentUser, praise.likes)}
            like={() => like(praise.id)}
            unlike={() => unlike(praise.id)}
          />
        </div>
      </div>
    </div>
  </Card>
);
