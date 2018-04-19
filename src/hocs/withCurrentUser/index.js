import { pick } from 'lodash/fp';
import { getContext } from 'recompose';
import { CONTEXT } from '../../context';

export getContext(pick(['currentUser'], CONTEXT));
