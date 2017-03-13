import { handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import { CHART_OVER, CHART_OUT } from '../actions/charts';
import { FETCH_SUCCESS, FETCH_MANY_SUCCESS, FETCH_REQUEST } from '../actions/fetcher';
import { ChartRecord, DataSource } from '../react-d3/models';

const toListDataSources = (list, keys, data, idx = 0) => {
  if (idx >= keys.size) {
    return list;
  }

  return toListDataSources(list.push(new DataSource({
    id: keys.get(idx),
    values: data[keys.get(idx)],
  })), keys, data, idx + 1);
};

const toChart = data => new ChartRecord(data)
  .update('data', dataSources => new Map(dataSources)
    .map((dataSource, key) => new DataSource({ id: key, values: new List(dataSource) })));

export default handleActions(
  {
    [CHART_OUT]: (state, { payload: { canvas } }) => state.setIn(['selected', canvas], new List()),
    [CHART_OVER]: (state, { payload: { canvas, idx, id } }) => state.setIn(['selected', canvas], new List().set(idx, id)),
    [FETCH_REQUEST]: (state, { payload: { canvas } }) => state.set(canvas, null),
    [FETCH_SUCCESS]: (state, { payload: { data, canvas } }) => state.set(canvas, toChart(data)),
    [FETCH_MANY_SUCCESS]:
      (state, { payload: { data, canvas, idx } }) => state
        .update(canvas, chart => (List.isList(chart) ?
          chart.set(idx, toChart(data)) :
          new List().set(idx, toChart(data))),
        ),
  },
  new Map({ selected: new Map() }));
