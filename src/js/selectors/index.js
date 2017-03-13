import { List, Map } from 'immutable';
import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';

export const selectViews = createSelector(
  ({ views }) => views.views,
  views => views.map((view, id) => new Map({ id, name: view.hname })).toList(),
);

export const selectTheView = createCachedSelector(
  ({ views: { selected, views } }, canvas) => views.get(selected.get(canvas), null),
  views => ((views === null) ? new List() : views.charts),
  )((state, canvas) => canvas);

export const selectSelected = createCachedSelector(
  ({ charts }) => charts.get('selected'),
  (state, canvas) => canvas,
  (selected, canvas) => selected.get(canvas, new List()),
  )((state, canvas) => canvas);

const toSortedArray = (source, keys, dest = new List(), idx = 0) => {
  if (idx < keys.size) {
    const el = source.get(keys.get(idx), false);
    if (el) {
      return toSortedArray(source, keys, dest.push(el), idx + 1);
    }
    return toSortedArray(source, keys, dest.push(el), idx + 1);
  }

  return dest;
};

export const selectCharts = createCachedSelector(
  ({ charts }, canvas) => charts.get(canvas, null),
  selectTheView,
  (charts, view) => {
    if (charts === null) {
      return new List();
    }
    let retCharts = charts;
    if (List.isList(charts) === false) {
      retCharts = List.of(charts);
    }
    return retCharts.map((chart, idx) => chart.update('data', values => toSortedArray(values, view.get(idx).probes.keySeq())));
  },
  )((state, canvas) => canvas);
