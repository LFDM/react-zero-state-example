import { keyBy, compose, filter, map, identity, values } from 'lodash/fp';
import { generateId } from '../id;'

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

export getById = (id) => USERS[id];
export getByIds = compose(filter(identity), map(getById));
export getAll = () => values(USERS);

