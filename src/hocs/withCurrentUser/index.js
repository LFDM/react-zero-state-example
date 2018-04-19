import { pick } from 'lodash/fp';
import { getContext } from 'recompose';
import { CONTEXT } from '../../context';

export default getContext(pick(['currentUser'], CONTEXT));
