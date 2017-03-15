import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import DemoApp from './containers/DemoApp';

const Root = ({ store }) => (
  <Provider store={store}>
    <DemoApp />
  </Provider>
);


Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
