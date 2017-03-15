import { Record } from 'immutable';

export const DataRecord = new Record({
  id: null, // This field is mandatory.
  data: null,  // This field is mandatory.
  max: null,
  min: null,
  avg: null,
});
export const ChartRecord = new Record({
  id: null,
  dataset: null, // This field is mandatory.
  end: 60,
  start: 0,
  step: 0,
  max: null,
  min: null,
});
export const GeometryRecord = new Record({
  height: 500,
  width: 700,
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
});
export const ShapeRecord = new Record({
  id: null,
  color: 'base0A',
  opacity: 'ten',
  dasharray: 'none',
  width: 'one',
});
export const AxisView = new Record({
  visible: true,
  position: 'bottom',
  unit: 'time',
  secondaryTicks: 2,
  tickPadding: 3,
  tickSizeInner: 4,
  tickSizeOuter: 4,
  ticks: 0,
});
export const SourceRecord = new Record({
  module: null,
  probes: null,
});
export const ChartView = new Record({
  axisY: new AxisView({ visible: true, position: 'right', unit: 'absolute' }),
  axisX: new AxisView(),
  probes: null, // This field is mandatory.
  shape: 'line',
  module: null, // This field is mandatory.
  stacked: false,
  low: null,
  high: null,
  secondary: false,
});
export const View = new Record({
  hname: 'Defaut view',
  charts: null, //This field is mandatory.
});
