import React, { PropTypes, PureComponent } from 'react';
import { translateX, translateY } from '../../../helpers';
import format from '../../../format';
import { AxisView } from '../../../models';
import AxisLine from './AxisLine';
import TickGroup from './TickGroup';

class Axis extends PureComponent {
  render() {
    const {
      design: {
        position,
        secondaryTicks,
        tickPadding,
        tickSizeInner,
        tickSizeOuter,
        ticks,
        unit,
      },
      scaleX,
      scaleY,
      secondary,
      styles,
    } = this.props;
    const qZero = position === 'top' || position === 'right';
    const qOne = position === 'top' || position === 'left';
    const vertical = position === 'left' || position === 'right';
    const [mainScale, secondaryScale] = vertical ? [scaleY, scaleX] : [scaleX, scaleY];
    const labelFormatter = format[unit];

    return (
      <g transform={(vertical ? translateX : translateY)(secondaryScale.range()[qOne ? 1 : 0])}>
        <AxisLine
          className={styles['axis--main']}
          range={mainScale.range()}
          tickSize={qZero ? -tickSizeOuter : tickSizeOuter}
          vertical={vertical}
        />
        <TickGroup
          formatter={labelFormatter}
          position={position}
          qZero={qZero}
          scale={mainScale}
          scaleB={secondaryScale}
          secondary={secondary}
          secondaryTicks={secondaryTicks}
          styles={styles}
          tickPadding={tickPadding}
          tickSize={tickSizeInner}
          ticks={ticks}
          vertical={vertical}
        />
      </g>);
  }
}

Axis.defaultProps = {
  design: new AxisView(),
  secondary: false,
};

Axis.propTypes = {
  design: PropTypes.objectOf(AxisView),
  scaleX: PropTypes.func.isRequired,
  scaleY: PropTypes.func.isRequired,
  secondary: React.PropTypes.bool,
  styles: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
};

export default Axis;
