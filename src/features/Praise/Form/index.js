import { withState } from 'recompose';
import Form, { createFormState, getValues } from '../../../components/Form';
import PromiseTracker, { STATUS } from '../../../components/PromiseTracker';
import { Input, TextArea, AutocompleteUser } from '../../../components/Form/Inputs';
import { ButtonContainer, ButtonSubmit, ButtonSecondary } from '../../../components/Button';

export default withState(
  'form',
  'setForm',
  ({ praise }) => createFormState(praise)
)(({ form, setForm, onSubmit, onCancel, label }) => (
  <PromiseTracker onTrigger={onSubmit}>
    {({ trigger, status }) => (
      <Form
        data={form}
        onChange={setForm}
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          trigger(getValues(form)).then(onCancel);
        }}>
        <div>
          <AutocompleteUser field="recipient" />
          <Input field="title" />
          <TextArea field="body" />
        </div>
        <ButtonContainer>
          <ButtonSecondary
            disabled={status !== STATUS.IDLE}
            onClick={onCancel}>
            Cancel
          </ButtonSecondary>
          { status === STATUS.IDLE ?
            <ButtonSubmit>{ label }</ButtonSubmit> :
            <ButtonSecondary disabled={true}>Saving...</ButtonSecondary>
          }
        </ButtonContainer>
      </Form>
    )}
  </PromiseTracker>
));

