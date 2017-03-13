import React, { PropTypes, PureComponent } from 'react';
import CSSModules from 'react-css-modules';
import { ChartRecord, ChartView, GeometryRecord } from '../../models';
import { selectScale, selectTimeScale } from '../../reducers';
import Axis from './Axis';
import Dataset from './Dataset';
import StackedDataset from './Dataset/StackedDataset';
import styles from '../style.css';

class Chart extends PureComponent {
  render() {
    const {
      canvas,
      chart,
      geometry,
      idx,
      mouseOut,
      mouseOver,
      selected,
      view,
    } = this.props;


    const scaleX = selectTimeScale(geometry, chart.start, chart.end, canvas);
    const scaleY = selectScale(geometry, chart, view, canvas, idx);

    const DataSet = view.stacked ? StackedDataset : Dataset;
    return (
      <g transform={`translate(${geometry.marginLeft},${geometry.marginTop})`}>
        <DataSet
          canvas={canvas}
          data={chart.data}
          idx={idx}
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
  idx: PropTypes.number.isRequired,
  mouseOut: PropTypes.func,
  mouseOver: PropTypes.func,
  selected: PropTypes.string,
  view: PropTypes.instanceOf(ChartView).isRequired,
};

export default CSSModules(Chart, styles);
