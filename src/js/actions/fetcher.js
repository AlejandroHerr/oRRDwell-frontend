import { createAction, createActions } from 'redux-actions';

export const RRD_FETCH_REQUEST = 'RRD_FETCH_REQUEST';
export const RRD_FETCH_SUCCESS = 'RRD_FETCH_SUCCESS';
export const RRD_FETCH_ERROR = 'RRD_FETCH_ERROR';
export const VIEWS_FETCH_REQUEST = 'VIEWS_FETCH_REQUEST';
export const VIEWS_FETCH_SUCCESS = 'VIEWS_FETCH_SUCCESS';
export const VIEWS_FETCH_ERROR = 'VIEWS_FETCH_ERROR';

const {
  rrdFetchSuccess,
  rrdFetchError,
  viewsFetchSuccess,
  viewsFetchError,
} = createActions({
  [RRD_FETCH_SUCCESS]: (data, { view, canvas }) => ({ data, view, canvas }),
}, RRD_FETCH_ERROR, VIEWS_FETCH_SUCCESS, VIEWS_FETCH_ERROR);

const rrdFetchRequest = createAction(
  RRD_FETCH_REQUEST,
  (view, path, canvas) => ({ view, path, canvas }),
  () => ([rrdFetchSuccess, rrdFetchError]));

export const rrdFetchAction = (view, modules, canvas) =>
  dispatch => dispatch(rrdFetchRequest(view, modules, canvas));

export const viewsFetchAction = createAction(
  VIEWS_FETCH_REQUEST,
  () => ({ path: 'views' }),
  () => ([viewsFetchSuccess, viewsFetchError]),
);
