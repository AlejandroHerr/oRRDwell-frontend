import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { FETCH_REQUEST } from '../actions/fetcher';
import rootReducer from '../reducers';
import Fetcher from '../middlewares/Fetcher';
console.log(process.env, process.env.NODE_ENV, process.env.BACKEND, process.env.BACKEND_PORT);
const fetcher = Fetcher({
  uri: process.env.BACKEND,
  isFetcherAction: type => type === FETCH_REQUEST,
  port: process.env.BACKEND_PORT,
});

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(
      applyMiddleware(fetcher, thunk, createLogger()),
    ),
  );

  if (module.hot && process.env.NODE_ENV !== 'production') {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
