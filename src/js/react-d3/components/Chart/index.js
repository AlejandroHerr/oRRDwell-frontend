import React, { PropTypes, PureComponent } from 'react';
import CSSModules from 'react-css-modules';
import shallowEqual from 'fbjs/lib/shallowEqual';
import { ChartRecord, ChartView, GeometryRecord } from '../../models';
import { createYScale, createXScale } from '../../reducers';
import Axis from './Axis';
import Dataset from './Dataset';
import StackedDataset from './Dataset/StackedDataset';
import styles from '../style.css';

class Chart extends PureComponent {
  componentWillMount() {
    const { chart, geometry, view } = this.props;

    this.scaleX = createXScale(geometry, chart);
    this.scaleY = createYScale(geometry, chart, view);
  }
  componentWillUpdate(nextProps) {
    const { chart, geometry } = this.props;
    const { chart: nextChart, geometry: nextGeometry, view: nextView } = nextProps;

    if (!shallowEqual(geometry, nextGeometry) || !shallowEqual(chart, nextChart)) {
      this.scaleX = createXScale(nextGeometry, nextChart);
      this.scaleY = createYScale(nextGeometry, nextChart, nextView);
    }
  }
  render() {
    const {
      canvas,
      chart,
      geometry,
      mouseOut,
      mouseOver,
      selected,
      view,
    } = this.props;
    const { scaleX, scaleY } = this;

    const DataSet = view.stacked ? StackedDataset : Dataset;

    return (
      <g transform={`translate(${geometry.marginLeft},${geometry.marginTop})`}>
        <DataSet
          canvas={canvas}
          chartId={chart.id}
          dataset={chart.dataset}
          mouseOut={mouseOut}
          mouseOver={mouseOver}
          scaleX={scaleX}
          scaleY={scaleY}
          selected={selected}
          styles={styles}
          view={view}
        />
        { view.secondary || !view.axisX.visible ?
            null :
            (<Axis
              design={view.axisX}
              scaleX={scaleX}
              scaleY={scaleY}
              styles={styles}
            />)
        }
        { view.axisY.visible ?
            (<Axis
              design={view.axisY}
              scaleX={scaleX}
              scaleY={scaleY}
              secondary={view.secondary}
              styles={styles}
            />) :
            null
          }
      </g>);
  }
}

Chart.defaultProps = {
  selected: null,
  mouseOver: null,
  mouseOut: null,
};

Chart.propTypes = {
  canvas: PropTypes.string.isRequired,
  chart: PropTypes.instanceOf(ChartRecord).isRequired,
  geometry: PropTypes.instanceOf(GeometryRecord).isRequired,
  mouseOut: PropTypes.func,
  mouseOver: PropTypes.func,
  selected: PropTypes.string,
  view: PropTypes.instanceOf(ChartView).isRequired,
};

export default CSSModules(Chart, styles);
