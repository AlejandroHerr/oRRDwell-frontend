import { handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import { RRD_FETCH_SUCCESS } from '../actions/fetcher';
import { ChartRecord, DataSource } from '../react-d3/models';
import { RrdDataSource, RrdModule } from '../models/rrd';

export default handleActions(
  {
    [RRD_FETCH_SUCCESS]: (state, { payload: { view, canvas } }) => state.set(canvas, view),
  },
  new Map());
