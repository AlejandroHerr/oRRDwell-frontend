import React, { PropTypes } from 'react';
import { ChartView, DataSource } from '../../models';

const LegendRow = ({
  avg,
  chartView,
  dataSource,
  formatter,
  max,
  min,
  styles,
  onMouseOut,
  onMouseOver }) => (
    <div
      className="clearfix"
      onMouseOut={onMouseOut}
      onMouseOver={onMouseOver}
    >
      <div className="col col-4">
        <svg height={10} width={10} >
          <rect
            className={styles[`area--color-${chartView.probes.get(dataSource.id).color}`]}
            height="10"
            width="10"
            x="0"
            y="0"
          />
        </svg>
        {` ${dataSource.id}`}</div>
      <div className="col col-2 right-align">
        {formatter(dataSource.values.last()[1] ||
          dataSource.values.get(dataSource.values.size - 2)[1])}
      </div>
      <div className="col col-2 right-align">{formatter(min)}</div>
      <div className="col col-2 right-align">{formatter(avg)}</div>
      <div className="col col-2 right-align">{formatter(max)}</div>
    </div>);

LegendRow.defaultProps = {
  onMouseOut: null,
  onMouseOver: null,
};

LegendRow.propTypes = {
  avg: PropTypes.number.isRequired,
  chartView: PropTypes.instanceOf(ChartView).isRequired,
  dataSource: PropTypes.instanceOf(DataSource).isRequired,
  formatter: PropTypes.func.isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  styles: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  onMouseOut: PropTypes.func,
  onMouseOver: PropTypes.func,
};

export default LegendRow;
