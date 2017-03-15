import { scaleLinear, scaleTime } from 'd3';

export const createXScale = ({ width, marginLeft, marginRight }, { start, end }) => scaleTime()
    .range([0, width - marginLeft - marginRight])
    .domain([1000 * start, 1000 * end]);


export const createYScale = (
  { height, marginTop, marginBottom },
  { min, max, dataset },
  { stacked, high, low }) => {
  const r0 = height - marginTop - marginBottom;
  const d0 = low !== null ? low : min;
  const d1 = high !== null ? high : (stacked ? max.abs : max.rel);

  return scaleLinear()
    .range([r0, 0])
    .domain([d0, d1]);
};
