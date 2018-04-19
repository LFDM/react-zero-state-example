import { Fragment } from 'react';
import ReactModal from 'react-modal';
import classNames from 'classnames';
import { noop } from 'lodash/fp';

import styles from './style.less';

const TRANSITION_DURATION = 150;

const SIZES = {
  XS_WIDTH: 400,
  SM_WIDTH: 430,
  MD_WIDTH: 530,
  LG_WIDTH: 600,
  XL_WIDTH: 830,
  XXL_WIDTH: 990,
  AUTO: 'auto',
};

const parseMinHeight = minHeight =>
  typeof minHeight === 'number' ? `${minHeight}px` : minHeight || 'auto';

const asSizeValue = v => (typeof v === 'number' ? `${v}px` : v);

const ModalTitle = ({ children, className }) => (
  <h1 className={classNames(styles.title, className)}>
    {children}
  </h1>
);

export default ({ title, size, width, minHeight, isOpen, onClose, children }) => {
  const style = {
    overlay: {
      transitionDuration: TRANSITION_DURATION + 'ms',
    },
    content: {
      width: width || asSizeValue(SIZES[size]),
      minHeight: parseMinHeight(minHeight),
    },
  };

  const props = {
    isOpen,
    onRequestClose: onClose || noop,
    closeTimeoutMS: TRANSITION_DURATION,
    style,
    className: styles.content,
    overlayClassName: styles.overlay
  };

  return (
    <ReactModal {...props} ariaHideApp={false}>
      <Fragment>
        {title && <ModalTitle>{title}</ModalTitle>}
        {children}
      </Fragment>
    </ReactModal>
  );
}


