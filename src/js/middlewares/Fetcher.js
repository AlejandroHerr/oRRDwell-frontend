import fetch from 'isomorphic-fetch';

/*
  This fuction has to be rewriten for better building.
 */
const urlBuilder = (uri, port, path = []) => {
  if (port) {
    return `${uri}:${port}/fetch/${path}`;
  }

  return `${uri}/fetch/${path}`;
};


const checkStatus = (res) => {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }
  const err = new Error(`${res.status} - ${res.statusText}`);
  err.res = res;

  throw err;
};

export default ({ uri, isFetcherAction, port }) => ({ dispatch }) => next => (action) => {
  const { payload, type, meta } = action;

  if (!isFetcherAction(type)) {
    return next(action);
  }
  /*
    Do some checks (meta, path,...)
   */
  const [REQUEST_SUCCESS, REQUEST_FAIL] = meta;

  if (Array.isArray(payload.path)) {
    const fetches = payload.path.map(path => fetch(urlBuilder(uri, port, path))
      .then(checkStatus)
      .then(res => res.json()));

    Promise.all(fetches)
      .catch(err => dispatch(REQUEST_FAIL(err)))
      .then(results => dispatch(REQUEST_SUCCESS(results.map((res, idx) => ({
        path: payload.path[idx],
        ...res,
      })), payload)));

    return next(action);
  }
  const url = urlBuilder(uri, port, payload.path);

  fetch(url)
    .then(checkStatus)
    .then(res => res.json())
    .then(res => dispatch(REQUEST_SUCCESS(res, payload)))
    .catch(error => dispatch(REQUEST_FAIL(error)));

  return next(action);
};
