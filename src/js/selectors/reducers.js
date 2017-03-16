import { AorB, pureTransformer, listTransformer } from '../utils';
import { DataRecord, ChartRecord } from '../react-d3/models';

export const toDataRecord = rrdModule => (probe, idx, output) => {
  const rrdDataSource = rrdModule.dataSources.get(probe.id, null);

  if (rrdDataSource === null) {
    return output;
  }
  const avg = rrdDataSource.data.reduce(
    (r, row) => (row[1] ? [r[0] + 1, r[1] + row[1]] : r),
    [0, 0]);
  const max = rrdDataSource.data.reduce((r, row) => (row[1] && row[1] > r[1] ? row : r), [0, 0]);
  const min = rrdDataSource.data.reduce(
    (r, row) => (row[1] && row[1] < r[1] ? row : r),
    [0, Number.MAX_SAFE_INTEGER]);

  return output
    .push(new DataRecord()
      .set('id', rrdDataSource.dsName)
      .set('data', rrdDataSource.data)
      .set('avg', avg[1] / avg[0])
      .set('max', max)
      .set('min', min));
};

const stackPrevious = (pair, idx, row, stack) => {
  if (idx === 0) {
    return pair[1] ? [pair[0], 0, pair[1]] : pair;
  }

  const prev = stack.get(idx - 1).data[row];
  if (pair[1] && prev[2]) {
    return [pair[0], prev[2], pair[1] + prev[2]];
  }
  return pair;
};
const stackMapper = (inputData, idx, stack) => inputData
  .update(idx, iData => iData
      .update('data', values => values
        .map((pair, row) => stackPrevious(pair, idx, row, stack))));

const stackSelector = (inputData, idx, stack) => stack;
export const stack = data => pureTransformer(data, data, stackMapper, stackSelector);

export const toChartMapper = rrdData => (chart, idx, output) => {
  const rrdModule = rrdData.get(chart.module, null);

  if (rrdModule === null) {
    return output;
  }

  const dataset = listTransformer(chart.probes, toDataRecord(rrdModule));

  const absoluteMax = dataset.reduce((r, { max }) =>
    (max[1] && max[1] > r.rel ?
      { rel: max[1], abs: r.abs + max[1] } :
      { rel: r.rel, abs: r.abs + (max[1] || 0) }),
    { abs: 0, rel: 0 });
  const absoluteMin = dataset.reduce(
    (r, { min }) => (min[1] && min[1] < r ? min[1] : r),
    Number.MAX_SAFE_INTEGER);

  return output
    .push(new ChartRecord(rrdModule)
      .set('id', `${chart.module}_${idx}`)
      .set('dataset', chart.stacked ? stack(dataset) : dataset)
      .set('max', absoluteMax)
      .set('min', absoluteMin));
};

export const toChartRecord = (charts, rrdData) => listTransformer(charts, toChartMapper(rrdData));
