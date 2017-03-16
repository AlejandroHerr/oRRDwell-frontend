import { format, timeFormat } from 'd3';
import { identityFn as absolute } from './helpers';

/**
 * Common formatters for every kind of data.
 */
const units = ['B', 'kB', 'MB', 'GB', 'TB'];
const bytes = (value, fmt = ',.1f', idx = 0) => {
  if (value > 1024) {
    return bytes(value / 1024, fmt, idx + 1);
  }
  return format(fmt)(value) + units[idx];
};
const kiloBytes = (value, fmt) => bytes(value, fmt, 1);

const degrees = value => `${format(',.1f')(value)}ºC`;

const percentage = value => `${format(',.1f')(value)}%`;
const load = value => `${format(',.2f')(value)}`;

const time = timeFormat('%H:%M');

export default { absolute, bytes, kiloBytes, degrees, load, percentage, time };
