import { createAction, createActions } from 'redux-actions';
import { List } from 'immutable';

export const CHART_OVER = 'CHART_OVER';
export const CHART_OUT = 'CHART_OUT';

export const {
  chartOver,
  chartOut,
} = createActions({
  [CHART_OVER]: (canvas, idx, id) => ({ canvas, idx, id }),
  [CHART_OUT]: canvas => ({ canvas }),
});

