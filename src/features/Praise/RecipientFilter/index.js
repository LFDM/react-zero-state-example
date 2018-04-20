import AutocompleteUser from '../../../components/AutocompleteUser';

export default ({ recipientId, onUpdate }) => (
  <AutocompleteUser onSelect={c => onUpdate(c.id)} selectedUserIds={[recipientId]}/>
);
