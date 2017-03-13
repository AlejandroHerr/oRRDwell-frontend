import { List, Map, Record } from 'immutable';
import { combineActions, handleActions } from 'redux-actions';
import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_MANY_SUCCESS, FETCH_VIEWS_SUCCESS } from '../actions/fetcher';
import { AxisView, ChartView, ShapeRecord, SourceRecord, View } from '../react-d3/models';

const ViewsStore = new Record({
  selected: new Map(),
  views: new Map(),
});

const createChartView = graph => new ChartView(graph)
  .update('axisX', axis => new AxisView(axis))
  .update('axisY', axis => new AxisView(axis))
  .update('probes', styles => new Map(styles).map(style => new ShapeRecord(style)))
  .update('source', source => new SourceRecord(source));

const createView = view => new View(view)
    .update('charts', (charts) => {
      if (charts.length) {
        return new List(charts).map(chart => createChartView(chart));
      }
      return List.of(createChartView(charts));
    });

const createViews = views => new Map(views).map(view => createView(view));

export default handleActions(
  {
    [FETCH_REQUEST]: (state, { payload: { canvas } }) => state.update('selected', selected => selected.delete(canvas)),
    [FETCH_VIEWS_SUCCESS]: (state, { payload }) => state.set('views', createViews(payload)),
    [combineActions(FETCH_SUCCESS, FETCH_MANY_SUCCESS)]:
      (state, { payload: { view, canvas } }) => state.setIn(['selected', canvas], view),
  },
  new ViewsStore(),
);
