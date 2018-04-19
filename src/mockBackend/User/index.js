import { keyBy, compose, filter, map, identity, values } from 'lodash/fp';
import { generateId } from '../id;'
import { withLatency } from '../latency';

export const USER = {
  CHRIS: {
    id: generateId(),
    name: 'Chris the CEO',
    avatar: ''
  },
  MARK: {
    id: generateId(),
    name: 'Mark the Manager',
    avatar: ''
  },
  MARY: {
    id: generateId(),
    name: 'Mary the Manager',
    avatar: ''
  },
  HEATHER: {
    id: generateId(),
    name: 'Heather from HR',
    avatar: ''
  },
  FIONA: {
    id: generateId(),
    name: 'Fiona from Finance',
    avatar: ''
  },
  CHARLY: {
    id: generateId(),
    name: 'Charly the Coder'
  }
}

const CURRENT_USER = USER.CHARLY;


const USERS = keyBy('id', [USER.CHRIS, USER.HEATHER, USER.MARK, USER.MARY, USER.FIONA, USER.CHARLY]);

const _getById = (id) => USERS[id];

export getCurrentUser = compose(withLatency, () => CURRENT_USER);
export getById = compose(withLatency, _getById);
export getByIds = compose(withLatency, filter(identity), map(_getById);
export getAll = () => withLatency(values(USERS));

