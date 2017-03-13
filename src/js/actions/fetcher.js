import { createAction, createActions } from 'redux-actions';
import { List } from 'immutable';

export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_MANY_SUCCESS = 'FETCH_MANY_SUCCESS';
export const FETCH_VIEWS_SUCCESS = 'FETCH_VIEWS_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';

const {
  fetchSuccess,
  fetchManySuccess,
  fetchViewsSuccess,
  fetchError,
} = createActions({
  [FETCH_SUCCESS]: (data, { view, canvas }) => ({ data, view, canvas }),
  [FETCH_MANY_SUCCESS]: (data, { view, canvas }, idx) => ({ data, view, canvas, idx }),
}, FETCH_VIEWS_SUCCESS, FETCH_ERROR);

export const fetchRequest = createAction(
  FETCH_REQUEST,
  (path, payload) => ({ path, ...payload }),
  () => ([fetchSuccess, fetchError]));

export const fetchManyRequest = createAction(
  FETCH_REQUEST,
  (path, payload) => ({ path, ...payload }),
  () => ([fetchManySuccess, fetchError]));

export const fetchAction = (view, canvas) => (dispatch, getState) => {
  const charts = getState().views.views.get(view).charts;

  if (List.isList(charts) === false) {
    return dispatch(fetchRequest(charts.source.module, canvas));
  }
  if (charts.size === 1) {
    return dispatch(fetchRequest(charts.get(0).source.module, { view, canvas }));
  }

  return dispatch(fetchManyRequest(charts.map(chart => chart.source.module), { view, canvas }));
};

export const fetchViewsAction = createAction(
  FETCH_REQUEST,
  () => ({ path: 'views' }),
  () => ([fetchViewsSuccess, fetchError]),
);
