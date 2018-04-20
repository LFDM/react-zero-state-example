import { withData } from 'ladda-react';
import api from '../../api';
import { Page, PageTitle, PageHeader, PageControls, PageBody } from '../../layout/Page';
import List from '../../features/Praise/List';
import RecipientFilter from '../../features/Praise/RecipientFilter';
import CreateButton from '../../features/Praise/CreateButton';

const TitleSuffix = withData({
  resolve: {
    user: ({ recipientId }) => recipientId ? api.user.getById(recipientId) : Promise.resolve(null)
  }
})(({ user }) => user ? <span>for {user.name}</span> : null);

export default function Praise({ recipientId, updateRecipientId }) {
  return (
    <Page>
      <PageHeader>
        <PageTitle>
          Praise <TitleSuffix recipientId={recipientId} />
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
