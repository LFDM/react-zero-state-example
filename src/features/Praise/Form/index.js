import { Form } from '../'
import { Input, TextArea } from '../../../components/Form/Inputs';
import { ButtonContainer, ButtonSubmit, ButtonSecondary } from '../../../components/Button';

export default ({ praise, onSubmit, onCancel, label }) => (
  <Form data={praise} onSubmit={onSubmit}>
    <div>
      <Input field="title" />
      <TextArea field="body" />
    </div>
    <ButtonContainer>
      <ButtonSubmit>{ label }</ButtonSubmit>
      <ButtonSecondary onClick={onCancel}>Cancel</ButtonSecondary>
    </ButtonContainer>
  </Form>
);
