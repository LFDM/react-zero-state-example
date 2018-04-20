import AutocompleteUser from '../../../components/AutocompleteUser';

export default ({ recipientId, onUpdate }) => (
  <AutocompleteUser placeholder="Filter by recipient" onSelect={c => onUpdate(c.d)} selectedUserIds={[recipientId]} />
);
