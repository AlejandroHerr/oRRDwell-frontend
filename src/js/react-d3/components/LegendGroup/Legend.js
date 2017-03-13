import React, { PropTypes, PureComponent } from 'react';
import format from '../../format';
import { ChartRecord, ChartView } from '../../models';
import { selectAverage, selectMaxs, selectMins } from '../../reducers';
import LegendRow from './LegendRow';

class Legend extends PureComponent {
  render() {
    const { canvas, chart, chartView, idx, mouseOut, mouseOver, styles } = this.props;

    const maxs = selectMaxs(chart, canvas, idx).rel;
    const mins = selectMins(chart, canvas, idx).rel;
    const avg = selectAverage(chart, canvas, idx).rel;
    const fmt = format[chartView.axisY.unit];

    return (
      <div>
        {chart.data.map((dataSource, key) => (
          <LegendRow
            avg={avg.get(key)}
            chartView={chartView}
            dataSource={dataSource}
            formatter={fmt}
            key={`legendrow_${canvas}_${idx}_${dataSource.id}`}
            max={maxs.get(key)[1] || 0}
            min={mins.get(key)[1] || 0}
            styles={styles}
            onMouseOut={mouseOut ? () => mouseOut(canvas, idx, dataSource.id) : null}
            onMouseOver={mouseOver ? () => mouseOver(canvas, idx, dataSource.id) : null}
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
