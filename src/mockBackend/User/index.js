import { keyBy, compose, filter, map, identity, values } from 'lodash/fp';
import { generateId } from '../id'
import { withLatency } from '../latency';

export const USER = {
  CHRIS: {
    id: generateId(),
    name: 'Chris the CEO',
    avatar: '/images/chris.png'
  },
  MARK: {
    id: generateId(),
    name: 'Mark the Manager',
    avatar: '/images/mark.png'
  },
  MARY: {
    id: generateId(),
    name: 'Mary the Manager',
    avatar: '/images/mary.png'
  },
  HEATHER: {
    id: generateId(),
    name: 'Heather from HR',
    avatar: '/images/heather.png'
  },
  FIONA: {
    id: generateId(),
    name: 'Fiona from Finance',
    avatar: '/images/fiona.png'
  },
  CHARLY: {
    id: generateId(),
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

