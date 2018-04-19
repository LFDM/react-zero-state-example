import api from '../../../api';
import { ButtonPrimary } from '../../../components/Button';
import { WithModal } from '../../../hocs/withModal';
import Form from '../Form';

const EMPTY_PRAISE = {
  title: '',
  body: ''
};

export default () => (
  <WithModal
    title="Praise someone"
    renderModalContent={
      ({ closeModal }) => (
        <Form
          label="Praise"
          praise={EMPTY_PRAISE}
          onSubmit={api.praise.create}
          onCancel={closeModal}
       />
      )
    }
  >
  {({ openModal }) => (
    <ButtonPrimary onClick={openModal}>
      Praise someone
    </ButtonPrimary>
  )}
  </WithModal>
)
