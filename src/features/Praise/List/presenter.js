import { map } from 'lodash/fp';
import Item from '../Item';

export default ({ praises }) => (
  <div>
    {map(praise => <Item key={praise.id} praise={praise} />, praises)}
  </div>
);
