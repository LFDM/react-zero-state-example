import { withData } from 'ladda-react';
import { IconX } from 'featherico'
import api from '../../api';
import { Page, PageTitle, PageHeader, PageControls, PageBody } from '../../layout/Page';
import List from '../../features/Praise/List';
import RecipientFilter from '../../features/Praise/RecipientFilter';
import CreateButton from '../../features/Praise/CreateButton';
import { ButtonInline } from '../../components/Button';

const TitleSuffix = withData({
  resolve: {
    user: ({ recipientId }) => recipientId ? api.user.getById(recipientId) : Promise.resolve(null)
  }
})(({ user, onClear }) => user ? (
  <span>for {user.name} <ButtonInline onClick={onClear}><IconX /></ButtonInline></span>
) : null);

export default function Praise({ recipientId, updateRecipientId }) {
  return (
    <Page>
      <PageHeader>
        <PageTitle>
          Praise <TitleSuffix recipientId={recipientId} onClear={() => updateRecipientId(undefined)}/>
        </PageTitle>
        <PageControls>
          <RecipientFilter recipientId={recipientId} onUpdate={updateRecipientId}/>
          <CreateButton />
        </PageControls>
      </PageHeader>

      <PageBody>
        <List recipientId={recipientId}/>
      </PageBody>
    </Page>
  );
}
