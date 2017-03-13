import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import configureFetcher from './configureFetcher';

export default preloadedState =>
  createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(configureFetcher(), thunk),
    ),
  );

