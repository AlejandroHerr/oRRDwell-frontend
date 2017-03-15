import React, { PropTypes, PureComponent } from 'react';
import format from '../../format';
import { ChartRecord, ChartView } from '../../models';
import { selectAverage, selectMaxs, selectMins } from '../../reducers';
import LegendRow from './LegendRow';

class Legend extends PureComponent {
  render() {
    const { canvas, chart, chartView, idx, mouseOut, mouseOver, styles } = this.props;

    const fmt = format[chartView.axisY.unit];
    console.log(chart, chartView);
    return (
      <div>
        {chart.dataset.map((dataSource, key) => (
          <LegendRow
            chartView={chartView.probes.get(key)}
            dataSource={dataSource}
            formatter={fmt}
            key={`legendrow_${canvas}_${chart.id}_${dataSource.id}`}
            styles={styles}
            onMouseOut={mouseOut ? () => mouseOut(canvas, chart.id, dataSource.id) : null}
            onMouseOver={mouseOver ? () => mouseOver(canvas, chart.id, dataSource.id) : null}
          />),
        )}
      </div>);
  }
}

Legend.defaultProps = {
  mouseOut: null,
  mouseOver: null,
};

Legend.propTypes = {
  canvas: PropTypes.string.isRequired,
  chart: PropTypes.instanceOf(ChartRecord).isRequired,
  chartView: PropTypes.instanceOf(ChartView).isRequired,
  idx: PropTypes.number.isRequired,
  mouseOut: PropTypes.func,
  mouseOver: PropTypes.func,
  styles: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
};


export default Legend;
