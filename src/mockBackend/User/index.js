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
}


const USERS = keyBy('id', [USER.CHRIS, USER.HEATHER, USER.MARK, USER.MARY, USER.FIONA]);

const _getById = (id) => USERS[id];

export getById = compose(withLatency, _getById);
export getByIds = compose(withLatency, filter(identity), map(_getById);
export getAll = () => withLatency(values(USERS));

