import { Page, PageTitle, PageHeader, PageControls, PageBody } from '../../layout/Page';
import List from '../../features/Praise/List';
import RecipientFilter from '../../features/Praise/RecipientFilter';
import CreateButton from '../../features/Praise/CreateButton';

export default function Praise() {
  return (
    <Page>
      <PageHeader>
        <PageTitle>Praise</PageTitle>
        <PageControls>
          <RecipientFilter />
          <CreateButton />
        </PageControls>
      </PageHeader>

      <PageBody>
        <List />
      </PageBody>
    </Page>
  );
}
