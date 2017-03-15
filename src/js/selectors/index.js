import { List, Map } from 'immutable';
import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import { DataRecord, ChartRecord } from '../react-d3/models';
import { toChartRecord } from './reducers';

export const selectViews = createSelector(
  ({ views }) => views,
  views => views.map((view, id) => new Map({
    id,
    name: view.hname,
    modules: view
        .charts.map(chart => chart.module).toSet().toJS(),
  })).toList(),
);

export const selectView = createCachedSelector(
  ({ charts }, canvas) => charts.getIn(['canvas', canvas], null),
  ({ views }) => views,
  (selected, views) => views.get(selected, null),
  )((state, canvas) => canvas);

export const selectSelected = createCachedSelector(
  ({ charts }, canvas) => charts.getIn(['selected', canvas], new Map()),
  selected => selected,
  )((state, canvas) => canvas);

export const selectCharts = createCachedSelector(
  ({ rrd }) => rrd,
  (state, canvas) => selectView(state, canvas),
  (rrdData, view) => ((view === null) ?
    new List() :
    toChartRecord(view.charts, rrdData)),
  )((state, canvas) => canvas);
