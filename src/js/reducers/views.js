import { List, Map } from 'immutable';
import { handleActions } from 'redux-actions';
import { VIEWS_FETCH_SUCCESS } from '../actions/fetcher';
import { AxisView, ChartView, ShapeRecord, View } from '../react-d3/models';


const createChartView = graph => new ChartView(graph)
  .update('axisX', axis => new AxisView(axis))
  .update('axisY', axis => new AxisView(axis))
  .update('probes', styles => new Map(styles).map((style, key) => new ShapeRecord({ id: key, ...style })).toList());

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
    [VIEWS_FETCH_SUCCESS]: (state, { payload }) => createViews(payload),
  },
  new Map(),
);
