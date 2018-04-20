import { Fragment } from 'react';
import classNames from 'classnames';
import { find } from 'lodash/fp';
import { IconHeart } from 'featherico';
import { Dropdown, OptionWithModal } from '../../../components/Dropdown';
import { ButtonContainer, ButtonSecondary, ButtonDangerous, ButtonLink, ButtonInline } from '../../../components/Button';
import Avatar from '../../../components/Avatar';
import AvatarWithName from '../../../components/AvatarWithName';
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

const Heart = ({ label, fill }) => (
  <Fragment>
    <IconHeart className={classNames({ [styles.fillHeart]: fill })}/> {label}
  </Fragment>
);

const LikeButton = ({ hasLiked, like, unlike }) => (
  <PromiseTracker onTrigger={hasLiked ? unlike : like}>
    {({ trigger, status }) =>
      forStatus({
        [STATUS.IDLE]: (
          <ButtonLink onClick={trigger}>{ hasLiked ?
            <Heart label="Liked" fill={true} /> :
            <Heart label="Like" />
          }</ButtonLink>
        ),
        [STATUS.PENDING]: <ButtonInline disabled={true}>Saving...</ButtonInline>
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
            <AvatarWithName user={praise.author} size="SM" />
            <Dropdown>
              <OptionWithModal
                modalProps={{
                  title: 'Edit Praise',
                  size: 'SM_WIDTH',
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
                  size: 'SM_WIDTH',
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
