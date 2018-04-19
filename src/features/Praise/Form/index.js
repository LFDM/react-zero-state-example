import { withState } from 'recompose';
import Form, { createFormState, getValues } from '../../../components/Form';
import { Input, TextArea } from '../../../components/Form/Inputs';
import { ButtonContainer, ButtonSubmit, ButtonSecondary } from '../../../components/Button';

export default withState(
  'form',
  'setForm',
  ({ praise }) => createFormState(praise)
)(({ form, setForm, onSubmit, onCancel, label }) => (
  <Form
    data={form}
    onChange={setForm}
    onSubmit={(event) => {
      event.preventDefault();
      event.stopPropagation();
      onSubmit(getValues(form)).then(onCancel);
    }}>
    <div>
      <Input field="title" />
      <TextArea field="body" />
    </div>
    <ButtonContainer>
      <ButtonSubmit>{ label }</ButtonSubmit>
      <ButtonSecondary onClick={onCancel}>Cancel</ButtonSecondary>
    </ButtonContainer>
  </Form>
));

