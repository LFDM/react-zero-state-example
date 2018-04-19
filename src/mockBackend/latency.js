import { isArray, map, reduce } from 'lodash/fp';

const getDelay = () => Math.floor(Math.random() * 300) + 100;

const delay = (value, delay) => new Promise(
  resolve => setTimeout(() => resolve(value), delay)
);

export function withLatency(x) {
  if (x.then) {
    return x;
  }

  if (isArray(x)) {
    return delay(x, reduce((mem, d) => mem + d, 0, map(getDelay, x)));
  }

  return delay(x, getDelay());
}


