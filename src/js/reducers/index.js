import { combineReducers } from 'redux';
import charts from './charts';
import rrd from './rrd';
import views from './views';

const rootReducer = combineReducers({ charts, rrd, views });

export default rootReducer;
