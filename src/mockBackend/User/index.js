import { keyBy, compose, filter, map, identity, values } from 'lodash/fp';
import { generateId } from '../id'
import { withLatency } from '../latency';

export const USER = {
  CHRIS: {
    id: generateId(),
    firstName: 'Chris',
    name: 'Chris the CEO',
    avatar: '/images/chris.png'
  },
  MARK: {
    id: generateId(),
    firstName: 'Mark',
    name: 'Mark the Manager',
    avatar: '/images/mark.png'
  },
  MARY: {
    id: generateId(),
    firstName: 'Mary',
    name: 'Mary the Manager',
    avatar: '/images/mary.png'
  },
  HEATHER: {
    id: generateId(),
    firstName: 'Heather',
    name: 'Heather from HR',
    avatar: '/images/heather.png'
  },
  FIONA: {
    id: generateId(),
    firstName: 'Fiona',
    name: 'Fiona from Finance',
    avatar: '/images/fiona.png'
  },
  CHARLY: {
    id: generateId(),
    firstName: 'Charly',
    name: 'Charly the Coder',
    avatar: '/images/charly.png'
  }
}

const CURRENT_USER = USER.CHARLY;


const USERS = keyBy('id', [USER.CHRIS, USER.HEATHER, USER.MARK, USER.MARY, USER.FIONA, USER.CHARLY]);

const _getById = (id) => USERS[id];

export const getCurrentUser = compose(withLatency, () => CURRENT_USER);
export const getById = compose(withLatency, _getById);
export const getByIds = compose(withLatency, filter(identity), map(_getById));
export const getAll = () => withLatency(values(USERS));
export const searchByName = (query) => compose(
  (x) => Promise.resolve(x),
  filter(u => !!u.name.toLowerCase().match(query)),
  values,
)(USERS)

