import { Page, PageTitle, PageBody } from '../../layout/Page';
import List from '../../features/Praise/List';
import RecipientFilter from '../../features/Praise/RecipientFilter';
import CreateButton from '../../features/Praise/CreateButton';

export default function Praise() {
  return (
    <Page>
      <PageTitle>Praise</PageTitle>
      <PageBody>
        <CreateButton />
        <List />
      </PageBody>
    </Page>
  );
}
