import React, { PropTypes } from 'react';
import { range } from 'd3';
import { translateX, translateY } from '../../../helpers';
import Tick from './Tick';
import Label from './Label';


const calculateTicks = (domain, ticks, secondaryTicks) => {
  const realTicks = secondaryTicks * (ticks);
  const step = (domain[1] - domain[0]) / (realTicks);

  return range(domain[0], domain[1] + step, step);
};

const guessTicks = (scale, ticks, secondaryTicks) => {
  if (ticks !== 0) {
    return calculateTicks(scale.domain(), ticks, secondaryTicks);
  }

  return scale.ticks();
};

const TickGroup = (props) => {
  const {
    formatter,
    position,
    qZero,
    scale,
    scaleB,
    secondary,
    secondaryTicks,
    styles,
    tickPadding,
    tickSize,
    ticks,
    vertical,
  } = props;
  // Render Fn's
  const transformer = vertical ? translateY : translateX;

  // Tick sizes
  const axisSize = qZero ? scaleB.range()[vertical ? 1 : 0] : scaleB.range()[vertical ? 1 : 0] * -1;
  const labelSpacing = qZero ? -(tickSize + tickPadding) : tickSize + tickPadding;
  const mainTickSize = qZero ? tickSize * -1 : tickSize;

  return (
    <g>
      { guessTicks(scale, ticks, secondaryTicks).map((tick, idx) => {
        if ((idx % secondaryTicks) === 0) {
          return (
            <g key={`tick_${tick}`} transform={transformer(scale(tick))}>
              <Tick className={styles['tick--main']} tickSize={mainTickSize} vertical={vertical} />
              {secondary === false ?
                (<Tick className={styles['tick--primary']} tickSize={axisSize} vertical={vertical} />) :
                null
              }
              <Label
                position={position}
                spacing={labelSpacing}
                styles={styles}
                text={formatter(tick)}
                vertical={vertical}
              />
            </g>);
        }
        if (secondary === false) {
          return (
            <g key={`tick_${tick}`} transform={transformer(scale(tick))}>
              <Tick className={styles['tick--secondary']} tickSize={axisSize} vertical={vertical} />
            </g>);
        }
        return null;
      })
    }
    </g>);
};

TickGroup.defaultProps = {
  secondary: false,
};

TickGroup.propTypes = {
  formatter: PropTypes.func.isRequired,
  position: PropTypes.string.isRequired,
  qZero: PropTypes.bool.isRequired,
  scale: PropTypes.func.isRequired,
  scaleB: PropTypes.func.isRequired,
  secondary: PropTypes.bool,
  secondaryTicks: PropTypes.number.isRequired,
  styles: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  tickPadding: PropTypes.number.isRequired,
  tickSize: PropTypes.number.isRequired,
  ticks: PropTypes.number.isRequired,
  vertical: PropTypes.bool.isRequired,
};

export default TickGroup;
