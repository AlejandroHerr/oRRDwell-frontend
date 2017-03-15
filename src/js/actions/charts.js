import { createActions } from 'redux-actions';

export const SHAPE_SELECTED = 'SHAPE_SELECTED';
export const SHAPE_UNSELECTED = 'SHAPE_UNSELECTED';

export const {
  shapeSelected: selectShape,
  shapeUnselected: unselectShape,
} = createActions({
  [SHAPE_SELECTED]: (canvas, chart, set) => ({ canvas, chart, set }),
  [SHAPE_UNSELECTED]: (canvas, chart) => ({ canvas, chart }),
});
