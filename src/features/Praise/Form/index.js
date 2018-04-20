import { withState } from 'recompose';
import { IconX } from 'featherico'
import Form, { createFormState, getValue, getValues, setValue } from '../../../components/Form';
import PromiseTracker, { STATUS } from '../../../components/PromiseTracker';
import { ButtonInline } from '../../../components/Button';
import AvatarWithName from '../../../components/AvatarWithName';
import { Input, TextArea, AutocompleteUser } from '../../../components/Form/Inputs';
import { FormContainer, FormGroup, FormLabel } from '../../../components/Form/Layout';
import { ButtonContainer, ButtonSubmit, ButtonSecondary } from '../../../components/Button';
import styles from './style.less';

const Recipient = ({ user, onClear }) => (
  <ButtonInline onClick={onClear} className={styles.selectedRecipient}>
    <AvatarWithName user={user} /> <IconX />
  </ButtonInline>
);

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
        <FormContainer>
          <FormGroup>
            <FormLabel label="Who do you want to praise?">
              { !!getValue('recipient', form) ?
                <Recipient user={getValue('recipient', form)} onClear={() => setForm(setValue('recipient', null, form))} /> :
                <AutocompleteUser field="recipient" />
              }
            </FormLabel>
          </FormGroup>
          <FormGroup>
            <FormLabel label="Title">
              <Input field="title" />
            </FormLabel>
          </FormGroup>
          <FormGroup>
            <FormLabel label="Description">
              <TextArea field="body" rows={5} />
            </FormLabel>
          </FormGroup>
        </FormContainer>

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

