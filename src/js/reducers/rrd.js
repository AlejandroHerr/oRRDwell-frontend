import { handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { RRD_FETCH_SUCCESS } from '../actions/fetcher';
import { RrdDataSource, RrdModule } from '../models/rrd';

const toRrdModule = rrdModule => new RrdModule(rrdModule)
  .set('dataSources', new Map(rrdModule.data)
    .map((dataSource, key) => new RrdDataSource({ dsName: key, data: dataSource })));
const mapRrdModule = (map, module) => map.set(module.path, toRrdModule(module));
const defaultMapper = (output, input, idx) => output.set(idx, input);

const toMap = (input, mapper = defaultMapper, output = new Map(), idx = 0) => {
  if (idx < Object.keys(input).length) {
    return toMap(input, mapper, mapper(output, input[idx], idx), idx + 1);
  }

  return output;
};

export default handleActions(
  {
    [RRD_FETCH_SUCCESS]: (state, { payload: { data } }) => toMap(data, mapRrdModule),
  },
  new Map());
