import React, { PropTypes, PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
import Legend from './Legend';
import LegendHeader from './LegendHeader';
import styles from '../style.css';
import { View } from '../../models';

class LegendGroup extends PureComponent {
  render() {
    const { canvas, charts, mouseOut, mouseOver, view } = this.props;
    return (
      <div className="clearfix" styleName="font-family--mono">
        {charts.map((chart, idx) => (
          <div
            className={classNames(['col', 'max-width-2', 'mb2'], {
              px2: charts.size === 1,
              'col-12': charts.size === 1,
              'col-6': charts.size > 1,
              px1: charts.size > 1,
            })}
            key={`legendcol_${canvas}_${chart.id}`}
          >
            <LegendHeader key={`legendheader_${canvas}_${chart.id}`} />
            <Legend
              canvas={canvas}
              chart={chart}
              chartView={view.charts.get(idx)}
              idx={idx}
              key={`legend_${canvas}_${chart.id}`}
              mouseOut={mouseOut}
              mouseOver={mouseOver}
              styles={styles}
            />
          </div>),
        )}
      </div>);
  }
}

LegendGroup.defaultProps = {
  mouseOver: null,
  mouseOut: null,
};

LegendGroup.propTypes = {
  canvas: PropTypes.string.isRequired,
  charts: ImmutablePropTypes.list.isRequired,
  mouseOut: PropTypes.func,
  mouseOver: PropTypes.func,
  view: PropTypes.instanceOf(View).isRequired,
};

export default CSSModules(LegendGroup, styles, { errorWhenNotFound: false });
