import { Page, PageTitle, PageBody } from '../../layout/Page';
import List from '../../features/Praise/List';
import RecipientFilter from '../../features/Praise/RecipientFilter';

export default function Praise() {
  return (
    <Page>
      <PageTitle>Praise</PageTitle>
      <PageBody>
        <List />
      </PageBody>
    </Page>
  );
}
