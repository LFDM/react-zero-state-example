import { map } from 'lodash/fp';
import Item from '../Item';

export default ({ praises }) => (
  return (
    <div>
      {map(praise => <Item key={praise.id} praise={praise} /> )}
    </div>
  );
)
