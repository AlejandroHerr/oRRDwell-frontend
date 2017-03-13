import { combineReducers } from 'redux';
import charts from './charts';
import views from './views';

const rootReducer = combineReducers({ charts, views });

export default rootReducer;
