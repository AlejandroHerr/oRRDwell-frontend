/* global document,__DEV__ */
import 'babel-polyfill';
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
import Root from './js/Root';
import configureStore from './js/store/configureStore';

require('es6-promise').polyfill();

const store = configureStore();

render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept('./js/Root', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextRoot = require('./js/Root.js').default;
    render(
      <AppContainer>
        <NextRoot store={store} />
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}
