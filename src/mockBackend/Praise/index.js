import moment from 'moment';
import { compose, orderBy, keyBy, values, uniq, filter, identity } from 'lodash/fp';
import { generateId } from '../id';
import { withLatency } from '../latency';
import { USER, getCurrentUser } from '../User';

const PRAISES = keyBy('id', [
  {
    id: generateId(),
    title: '',
    body: '',
    author: USER.MARK,
    recipient: USER.MARY,
    likes: [USER.FIONA, USER.CHRIS],
    createdAt: moment().subtract(1, 'day').valueOf()
  },
  {
    id: generateId(),
    title: '',
    body: '',
    author: USER.MARY,
    recipient: USER.FIONA,
    likes: [USER.CHRIS, USER.MARK, USER.HEATHER, USER.MARY],
    createdAt: moment().subtract(2, 'day').valueOf()
  },
  {
    id: generateId(),
    title: '',
    body: '',
    author: USER.HEATHER,
    recipient: USER.CHRIS,
    likes: [USER.MARY, USER.MARK],
    createdAt: moment().subtract(3, 'day').valueOf()
  },
  {
    id: generateId(),
    title: '',
    body: '',
    author: USER.CHRIS,
    recipient: USER.FIONA,
    likes: [USER.MARY, USER.MARK],
    createdAt: moment().subtract(4, 'day').valueOf()
  },
]);

const _getById = (id) => PRAISES[id];

export const getById = compose(withLatency, _getById);
export const getAll = (recipientId = null) => compose(
  withLatency,
  recipientId ? filter(p => p.recipient.id === recipientId) : identity,
  orderBy(['createdAt'], ['desc']),
  values
)(PRAISES);
export const create = (praiseData) => {
  return getCurrentUser().then(currentUser => {
    const id = generateId();
    const praise = {
      ...praiseData,
      id,
      author: currentUser,
      likes: [],
      createdAt: moment().valueOf()
    };
    PRAISES[id] =  praise;
    return withLatency(praise);
  });
}

export const edit = (praise) => {
  PRAISES[praise.id] =  praise;
  return withLatency(praise);
}

export const remove = (id) => withLatency(delete PRAISES[id]);

export const like = (id) => getCurrentUser().then(u => {
  const praise = _getById(id);
  return {
    ...praise,
    likes: uniq([...praise.likes, u])
  };
});

export const unlike = (id) => getCurrentUser().then(u => {
  const praise = _getById(id);
  return {
    ...praise,
    likes: filter(l => l !== u, praise.likes)
  };
});

