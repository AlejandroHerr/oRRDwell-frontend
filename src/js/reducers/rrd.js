import { handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { RRD_FETCH_SUCCESS } from '../actions/fetcher';
import { RrdDataSource, RrdModule } from '../models/rrd';
import { pureTransformer as transformer } from '../utils';

const toRrdModule = rrdModule => new RrdModule(rrdModule)
  .set('dataSources', new Map(rrdModule.data)
    .map((dataSource, key) => new RrdDataSource({ dsName: key, data: dataSource })));

const mapper = (value, idx, output) => output.set(value.path, toRrdModule(value));
const selector = (input, idx) => input[idx];
const sizeFn = input => () => Object.keys(input).length;

export default handleActions(
  {
    [RRD_FETCH_SUCCESS]: (state, { payload: { data } }) =>
      transformer(data, state, mapper, selector, sizeFn(data)),
  }, new Map());
