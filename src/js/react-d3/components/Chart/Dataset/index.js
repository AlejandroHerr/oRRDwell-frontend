import React, { PropTypes } from 'react';
import { area, line } from 'd3';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { ChartView } from '../../../models';
import Path from './Path';

class LineChart extends React.PureComponent {
  getDataSet() {
    return this.props.data;
  }
  getShaper() {
    const { scaleX, scaleY, view: { shape } } = this.props;
    return shape === 'line' ?
      line().x(v => scaleX(1000 * v[0]))
        .y(v => scaleY(v[1]))
        .defined(v => v[1]) :
      area().x(v => scaleX(1000 * v[0]))
        .y1(v => scaleY(v[1]))
        .y0(scaleY(0))
        .defined(v => v[1]);
  }
  render() {
    const {
      canvas,
      idx,
      mouseOut,
      mouseOver,
      selected,
      styles,
      view,
    } = this.props;

    const shaper = this.getShaper();
    const dataSet = this.getDataSet();

    return (
      <g className={'d3line_dataset d3line_dataset_test'}>
        { dataSet.map(data => (
          <Path
            d={shaper(data.values.toJS())}
            key={`dataset_${data.id}`}
            mouseOut={mouseOut ? () => mouseOut(canvas, idx, data.id) : null}
            mouseOver={mouseOver ? () => mouseOver(canvas, idx, data.id) : null}
            name={data.id}
            selected={selected === data.id}
            shape={view.shape}
            styles={styles}
            view={view.probes.get(data.id)}
          />
        ))
        }
      </g>);
  }
}
LineChart.defaultProps = {
  selected: null,
  mouseOver: null,
  mouseOut: null,
};
LineChart.propTypes = {
  canvas: PropTypes.string.isRequired,
  data: ImmutablePropTypes.list.isRequired,
  idx: PropTypes.number.isRequired,
  mouseOut: PropTypes.func,
  mouseOver: PropTypes.func,
  scaleX: PropTypes.func.isRequired,
  scaleY: PropTypes.func.isRequired,
  selected: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  view: PropTypes.instanceOf(ChartView).isRequired,
};

export default LineChart;
