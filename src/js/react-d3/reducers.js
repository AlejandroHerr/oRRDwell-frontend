import { List } from 'immutable';
import { scaleLinear, scaleTime, stack } from 'd3';
import createCachedSelector from 're-reselect';


/*
  Common reducers. They're expensive, so they're cached!
 */

export const selectMaxs = createCachedSelector(
  chart => chart.data,
  (chartData) => {
    const maxs = chartData.map(dataset => dataset.values.maxBy(v => v[1] || 0));

    return {
      rel: maxs,
      abs: maxs.maxBy(v => v[1] || 0),
      sum: maxs.reduce((r, t) => r + (t[1] || 0), 0),
    };
  },
)(
  (chart, style, canvas, idx) => `${canvas}${idx}`,
);
export const selectMins = createCachedSelector(
  chart => chart.data,
  (chartData) => {
    const mins = chartData
      .map(dataset => dataset.values.minBy(v => v[1] || Number.MAX_SAFE_INTEGER));

    return {
      rel: mins,
      abs: mins.minBy(v => v[1] || Number.MAX_SAFE_INTEGER),
    };
  },
)(
  (chart, style, canvas, idx) => `${canvas}${idx}`,
);
export const selectAverage = createCachedSelector(
  chart => chart.data,
  (chartData) => {
    const avg = chartData.map((data) => {
      const size = data.values.size;

      return data.values.reduce((r, t) => r + (t[1] || 0), 0) / size;
    });

    return {
      rel: avg,
    };
  },
)(
  (chart, style, canvas, idx) => `${canvas}${idx}`,
);

export const selectScale = createCachedSelector(
  ({ height, marginTop, marginBottom }) => height - marginTop - marginBottom,
  (geometry, chart, style, canvas, idx) => {
    if (style.low !== null) {
      return style.low;
    }
    return selectMins(chart, style, canvas, idx).abs[1] || 0;
  },
  (geometry, chart, style, canvas, idx) => style.high || (style.stacked ?
      selectMaxs(chart, style, canvas, idx).sum :
      selectMaxs(chart, style, canvas, idx).abs[1] || 0),
  (r0, d0, d1) => scaleLinear()
    .range([r0, 0])
    .domain([d0, d1]),
)(
  (geometry, chart, style, canvas, idx) => `${canvas}${idx}`,
);

export const selectTimeScale = createCachedSelector(
  ({ width, marginLeft, marginRight }) => width - marginLeft - marginRight,
  (geometry, end) => end,
  (geometry, end, start) => start,
  (r1, d0, d1) => scaleTime()
    .range([0, r1])
    .domain([d0 * 1000, d1 * 1000]),
)(
  (geometry, end, start, canvas) => canvas,
);


const toStack = (data, limit, idx = 0, stackArray = []) => {
  if (idx >= limit) {
    return stackArray;
  }
  const value = [];
  data.forEach((chart, id) => {
    value[id] = chart.values.get(idx)[1] || null;
  });
  stackArray.push(value);

  return toStack(data, limit, idx + 1, stackArray);
};

export const selectStack = createCachedSelector(
  data => data,
  (data) => {
    const stacker = stack().keys(Array.from(Array(data.size).keys()));
    const stackedData = stacker(toStack(data, data.first().values.size));

    return data.map((chart, idx) => chart.set('values', new List(stackedData[idx])));
  },
  )((data, canvas, idx) => `${canvas}${idx}`);
