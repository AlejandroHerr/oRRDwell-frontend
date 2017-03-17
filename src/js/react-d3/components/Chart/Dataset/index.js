import React, { PropTypes } from 'react';
import { area, line } from 'd3';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { ChartView } from '../../../models';
import Path from './Path';

class Dataset extends React.PureComponent {
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
      chartId,
      dataset,
      mouseOut,
      mouseOver,
      selected,
      styles,
      view: {
        probes,
        shape,
      },
    } = this.props;

    return (
      <g className={'d3line_dataset d3line_dataset_test'}>
        { dataset.map((set, idx) => (
          <Path
            d={this.getShaper()(set.data)}
            key={`dataset_${set.id}`}
            mouseOut={mouseOut ? () => mouseOut(canvas, chartId, set.id) : null}
            mouseOver={mouseOver ? () => mouseOver(canvas, chartId, set.id) : null}
            name={set.id}
            selected={selected === set.id}
            shape={shape}
            styles={styles}
            view={probes.get(idx)}
          />
        ))
        }
      </g>);
  }
}
Dataset.defaultProps = {
  selected: null,
  mouseOver: null,
  mouseOut: null,
};
Dataset.propTypes = {
  canvas: PropTypes.string.isRequired,
  chartId: PropTypes.string.isRequired,
  dataset: ImmutablePropTypes.list.isRequired,
  mouseOut: PropTypes.func,
  mouseOver: PropTypes.func,
  scaleX: PropTypes.func.isRequired,
  scaleY: PropTypes.func.isRequired,
  selected: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  view: PropTypes.instanceOf(ChartView).isRequired,
};

export default Dataset;
