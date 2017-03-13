import { List, Map, Record } from 'immutable';
import { combineActions, handleActions } from 'redux-actions';
import { RRD_VIEWS_FETCH_REQUEST, VIEWS_FETCH_SUCCESS, VIEWS_FETCH_ERROR } from '../actions/fetcher';
import { AxisView, ChartView, ShapeRecord, SourceRecord, View } from '../react-d3/models';


const createChartView = graph => new ChartView(graph)
  .update('axisX', axis => new AxisView(axis))
  .update('axisY', axis => new AxisView(axis))
  .update('probes', styles => new Map(styles).map(style => new ShapeRecord(style)));

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
    // [VIEWS_FETCH_REQUEST]: (state, { payload: { canvas } }) => state.update('selected', selected => selected.delete(canvas)),
    [VIEWS_FETCH_SUCCESS]: (state, { payload }) => createViews(payload),
    /*[combineActions(VIEWS_FETCH_SUCCESS, VIEWS_FETCH_MANY_SUCCESS)]:
      (state, { payload: { view, canvas } }) => state.setIn(['selected', canvas], view),*/
  },
  new Map(),
);
