import React, { PropTypes } from 'react';

const Tick = ({ tickSize, vertical, className }) => {
  const coordinates = {
    x1: vertical ? 0 : 0.5,
    y1: vertical ? 0.5 : 0,
    x2: vertical ? tickSize : 0.5,
    y2: vertical ? 0.5 : tickSize,
  };

  return (
    <line {...coordinates} className={className} />
  );
};

Tick.propTypes = {
  className: PropTypes.string.isRequired,
  tickSize: PropTypes.number.isRequired,
  vertical: PropTypes.bool.isRequired,
};
export default Tick;
