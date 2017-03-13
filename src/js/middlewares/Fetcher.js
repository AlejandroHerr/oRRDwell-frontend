import fetch from 'isomorphic-fetch';
import { List } from 'immutable';

const urlBuilder = (uri, port, path = []) => `${uri}:${port}/fetch/${path}`;

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;

  throw error;
};

export default ({ uri, isFetcherAction, port = 8080 }) => ({ dispatch }) => next => (action) => {
  const { payload, type, meta } = action;

  if (!isFetcherAction(type)) {
    return next(action);
  }
  /*
    Do some checks (meta, path,...)
   */
  const [REQUEST_SUCCESS, REQUEST_FAIL] = meta;


  if (List.isList(payload.path)) {
    payload.path.forEach((fetchPath, idx) => {
      const url = urlBuilder(uri, port, fetchPath);
      fetch(url)
        .then(checkStatus)
        .then(response => response.json())
        .then(data => dispatch(REQUEST_SUCCESS(data, payload, idx)))
        .catch(error => dispatch(REQUEST_FAIL(error)));
    });
    return next(action);
  }
  const url = urlBuilder(uri, port, payload.path);

  fetch(url)
    .then(checkStatus)
    .then(response => response.json())
    .then(data => dispatch(REQUEST_SUCCESS(data, payload)))
    .catch(error => dispatch(REQUEST_FAIL(error)));

  return next(action);
};
