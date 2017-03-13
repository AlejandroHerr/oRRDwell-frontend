import { Record } from 'immutable';

export const RrdDataSource = new Record({
  dsName: null, // This field is mandatory.
  data: null,  //This field is mandatory.
});
export const RrdModule = new Record({
  dataSources: null, // This field is mandatory.
  end: 60,
  start: 0,
  step: 0,
});
