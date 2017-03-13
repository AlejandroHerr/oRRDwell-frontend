import React, { PropTypes } from 'react';

const AxisLine = ({ className, range, tickSize, vertical }) => {
  const d = vertical ?
    `M${tickSize},${range[0] + 0.5}H0.5V${range[1] + 0.5}H${tickSize}` :
    `M${range[0] + 0.5},${tickSize}V0.5H${range[1] + 0.5}V${tickSize}`;

  return (
    <path className={className} d={d} />);
};

AxisLine.propTypes = {
  className: PropTypes.string.isRequired,
  range: PropTypes.arrayOf(PropTypes.number).isRequired,
  tickSize: PropTypes.number.isRequired,
  vertical: PropTypes.bool.isRequired,
};

export default AxisLine;
