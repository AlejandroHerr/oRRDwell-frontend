import { format, timeFormat } from 'd3';
import { identityFn as absolute } from './helpers';

/**
 * Common formatters for every kind of data.
 */

const bytes = (value) => {
  const fmt = format(',.1f');
  if (value < 1024) {
    return `${fmt(value)}kB`;
  }
  if (value < 1024 * 1024) {
    return `${fmt(value / 1024)}MB`;
  }

  return `${fmt(value / 1024 / 1024)}GB`;
};

const degrees = value => `${format(',.1f')(value)}ºC`;

const percentage = value => `${format(',.1f')(value)}%`;
const load = value => `${format(',.2f')(value)}`;

const time = timeFormat('%H:%M');

export default { absolute, bytes, degrees, load, percentage, time };
