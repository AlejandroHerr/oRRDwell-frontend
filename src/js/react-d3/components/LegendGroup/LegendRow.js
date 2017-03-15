import React, { PropTypes } from 'react';
import { ShapeRecord, DataRecord } from '../../models';

const LegendRow = ({
  chartView,
  dataSource,
  formatter,
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
            className={styles[`area--color-${chartView.color}`]}
            height="10"
            width="10"
            x="0"
            y="0"
          />
        </svg>
        {` ${dataSource.id}`}</div>
      <div className="col col-2 right-align">
        {formatter(dataSource.data[dataSource.data.length - 1][1] ||
          dataSource.data[dataSource.data.length - 2][1])}
      </div>
      <div className="col col-2 right-align">{formatter(dataSource.min[1])}</div>
      <div className="col col-2 right-align">{formatter(dataSource.avg)}</div>
      <div className="col col-2 right-align">{formatter(dataSource.max[1])}</div>
    </div>);

LegendRow.defaultProps = {
  onMouseOut: null,
  onMouseOver: null,
};

LegendRow.propTypes = {
  chartView: PropTypes.instanceOf(ShapeRecord).isRequired,
  dataSource: PropTypes.instanceOf(DataRecord).isRequired,
  formatter: PropTypes.func.isRequired,
  styles: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  onMouseOut: PropTypes.func,
  onMouseOver: PropTypes.func,
};

export default LegendRow;
