import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { FETCH_REQUEST } from '../actions/fetcher';
import rootReducer from '../reducers';
import Fetcher from '../middlewares/Fetcher';

const fetcher = Fetcher({
  uri: process.env.BACKEND,
  isFetcherAction: type => type === FETCH_REQUEST,
  port: process.env.BACKEND_PORT,
});

export default preloadedState =>
  createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(fetcher, thunk),
    ),
  );

