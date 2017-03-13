import { handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import { RRD_FETCH_SUCCESS, RRD_FETCH_REQUEST } from '../actions/fetcher';
import { ChartRecord, DataSource } from '../react-d3/models';
import { RrdDataSource, RrdModule } from '../models/rrd';

const toListDataSources = (list, keys, data, idx = 0) => {
  if (idx >= keys.size) {
    return list;
  }

  return toListDataSources(list.push(new DataSource({
    id: keys.get(idx),
    values: data[keys.get(idx)],
  })), keys, data, idx + 1);
};

/* const toChart = data => new ChartRecord(data)
  .update('data', dataSources => new Map(dataSources)
    .map((dataSource, key) => new DataSource({ id: key, values: new List(dataSource) })));
*/

const toRrdModule = rrdModule => new RrdModule(rrdModule)
  .set('dataSources', new Map(rrdModule.data)
    .map((dataSource, key) => new RrdDataSource({ dsName: key, data: dataSource })));
const mapRrdModule = (map, module) => map.set(module.path, toRrdModule(module));
const defaultMapper = (output, input, idx) => output.set(idx, input);

const toMap = (input, mapper = defaultMapper, output = new Map(), idx = 0) => {
  if (idx < Object.keys(input).length) {
    return toMap(input, mapper, mapper(output, input[idx], idx), idx + 1);
  }

  return output;
};
export default handleActions(
  {
    [RRD_FETCH_REQUEST]: (state, { payload: { canvas } }) => state.set(canvas, null),
    [RRD_FETCH_SUCCESS]: (state, { payload: { data, canvas } }) => toMap(data, mapRrdModule),
    /*[RRD_FETCH_MANY_SUCCESS]:
      (state, { payload: { data, canvas, idx } }) => state
        .update(canvas, chart => (List.isList(chart) ?
          chart.set(idx, toChart(data)) :
          new List().set(idx, toChart(data))),
        ),*/
  },
  new Map({ selected: new Map() }));
