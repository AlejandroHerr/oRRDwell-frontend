import { handleActions } from 'redux-actions';
import { Map, List, Record } from 'immutable';
import { SHAPE_SELECTED, SHAPE_UNSELECTED } from '../actions/charts';
import { RRD_FETCH_SUCCESS } from '../actions/fetcher';
import { ChartRecord, DataSource } from '../react-d3/models';
import { RrdDataSource, RrdModule } from '../models/rrd';

const ChartStoreRecord = new Record({
  canvas: new Map(),
  selected: new Map(),
});

export default handleActions(
  {
    [RRD_FETCH_SUCCESS]: (state, { payload: { view, canvas } }) =>
      state
        .setIn(['canvas', canvas], view)
        .setIn(['selected', canvas], new Map()),
    [SHAPE_SELECTED]: (state, { payload: { canvas, chart, set } }) => state.setIn(['selected', canvas, chart], set),
    [SHAPE_UNSELECTED]: (state, { payload: { canvas, chart } }) => state.setIn(['selected', canvas, chart], null),
  },
  new ChartStoreRecord());
