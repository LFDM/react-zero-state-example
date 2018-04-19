import { build } from 'ladda-cache';
import { observable } from 'ladda-observable';
import { logger } from 'ladda-logger';

import * as praise from './Praise';
import * as user from './User';

const config = {
  praise: {
    api: praise
  },
  user; {
    api: user
  }
};

const plugins = [logger(), observable()];

export default build(config, plugins);

