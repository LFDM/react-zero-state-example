import { withData } from 'ladda-react';
import api from '../../../api';
import LoadingBar from '../../../components/LoadingBar';
import List from './presenter';


export default withData({
  observe: {
    praises: ({ recipientId }) => api.praise.getAll.createObservable(recipientId)
  },
  pendingComponent: () => <LoadingBar />
})(List);

