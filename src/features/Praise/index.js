import { Page, PageTitle, PageHeader, PageControls, PageBody } from '../../layout/Page';
import List from '../../features/Praise/List';
import RecipientFilter from '../../features/Praise/RecipientFilter';
import CreateButton from '../../features/Praise/CreateButton';

export default function Praise({ recipientId, updateRecipientId }) {
  return (
    <Page>
      <PageHeader>
        <PageTitle>Praise</PageTitle>
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
