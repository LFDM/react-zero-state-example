import moment from 'moment';
import { compose, orderBy, keyBy, values, uniq, filter, identity } from 'lodash/fp';
import { generateId } from '../id';
import { withLatency } from '../latency';
import { USER, getCurrentUser } from '../User';

const PRAISES = keyBy('id', [
  {
    id: generateId(),
    title: 'Great job onboarding Fiona!',
    body: `Everyone loved how smoothly you lead Fiona's onboarding process.\nYou really set a great example for us all!`,
    author: USER.MARK,
    recipient: USER.MARY,
    likes: [USER.FIONA, USER.CHRIS],
    createdAt: moment().subtract(1, 'day').valueOf()
  },
  {
    id: generateId(),
    title: 'What a start!',
    body: `You've only been here for two months, but you're already making a huge difference. Can't imagine anymore how it was without you!`,
    author: USER.MARY,
    recipient: USER.FIONA,
    likes: [USER.CHRIS, USER.MARK, USER.HEATHER, USER.MARY],
    createdAt: moment().subtract(2, 'day').valueOf()
  },
  {
    id: generateId(),
    title: 'The strategy workshop worked wonders',
    body: 'Thank you for putting such an amazing workshop together.\nYou really made an effort to involve everyone - which really worked out well. Everyone seems super engaged and motivating to really bring our company to the next level in 2018!',
    author: USER.HEATHER,
    recipient: USER.CHRIS,
    likes: [USER.MARY, USER.MARK],
    createdAt: moment().subtract(3, 'day').valueOf()
  },
  {
    id: generateId(),
    title: 'Everyone loved the company trip',
    body: `Your organization of our last company trip was truly outstanding.\nWe've been doing this for several years by now and it wasn't always easy - but this time it was really just an awesome trip from start to finish! Keep it up!`,
    author: USER.CHRIS,
    recipient: USER.HEATHER,
    likes: [USER.MARY, USER.MARK, USER.FIONA],
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

