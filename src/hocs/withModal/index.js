import PropTypes from 'prop-types';
import { Component, Fragment } from 'react';
import Modal from '../../components/Modal';

/**
 * Component that manages open/closed state for a modal
 *
 * ```
 * <WithModal
 *     {...modalProps}
 *     onClose={handleClose}
 *     renderModalContent={({openModal, closeModal})=><ModalContent onCancel={closeModal} />}
 * >
 *   { ({closeModal, openModal}) => <ModalTriggerComponent onClick={openModal}/> }
 * </WithModal>
 * ```
 */
export class WithModal extends Component {
  state = {
    isOpen: false,
  };

  actions = {
    openModal: () => {
      this.setState({ isOpen: true });
    },
    closeModal: () => {
      this.setState({ isOpen: false });
      if (this.props.onClose) {
        this.props.onClose();
      }
    },
  };

  render() {
    const { onClose, renderModalContent, children: render, ...props } = this.props; // eslint-disable-line no-unused-vars
    return (
      <Fragment>
        <Modal
          {...props}
          isOpen={this.state.isOpen}
          onClose={this.actions.closeModal}
          >
          {renderModalContent(this.actions)}
        </Modal>
        {render(this.actions)}
      </Fragment>
    );
  }
}

const propTypes = {
  modalProps: PropTypes.shape({
    body: PropTypes.any.isRequired, // needs to be a component
  }),
  requireExplicitClose: PropTypes.bool,
};

/**
 * Decorator that wraps a component in a WithModal component.
 *
 * Usage:
 *
 * ```
 * const MyComponentWithModal = withModal(MyComponent)
 *
 * <MyComponentWithModal
 *      modalProps={{body: ModalBodyComponent, ...otherModalProps}}
 *      requireExplicitClose={boolean}
 *      {...propsForMyComponent}
 * />
 * ```
 *
 * It passes an `onClick` handler to MyComponent that opens the modal.
 * It doesn't forward any props to the Modalbody except for a `closeModal` callback
 */
export default function withModal(WrappedComponent) {
  function ComponentWithModal(allProps) {
    const { modalProps: { body: ModalBody, ...modalProps }, ...props } = allProps;
    return (
      <WithModal
        {...modalProps}
        renderModalContent={({ closeModal }) => <ModalBody closeModal={closeModal} />}
        >
        {({ openModal }) => <WrappedComponent {...props} onClick={openModal} />}
      </WithModal>
    );
  }

  ComponentWithModal.propTypes = propTypes;
  return ComponentWithModal;
}

