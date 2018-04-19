import { compose } from 'lodash/fp';
import { mapProps } from 'recompose';
import withCurrentUser from '../../../hocs/withCurrentUser'
import api from '../../../api';
import Item from './presenter';

export default compose(
  mapProps(p => ({
    ...p,
    edit: api.praise.edit,
    remove: api.praise.remove,
    like: api.praise.like,
    unlike: api.praise.unlike
  })),
  withCurrentUser
)(Item);

