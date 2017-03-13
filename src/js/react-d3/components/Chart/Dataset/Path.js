import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { ShapeRecord } from '../../../models';

const classnamer = (shape, view, styles, selected) => {
  const standard = [];
  view.forEach((value, key) => {
    standard.push(styles[`${shape}--${key}-${value}`]);
  });

  return classNames(styles[shape], standard, { [styles.selected]: selected });
};

const Path = ({ d, mouseOut, mouseOver, selected, shape, styles, view }) => (
  <path
    className={classnamer(shape, view, styles, selected)}
    d={d}
    onMouseOut={mouseOut}
    onMouseOver={mouseOver}
  />
);

Path.defaultProps = {
  mouseOut: null,
  mouseOver: null,
  selected: false,
  view: new ShapeRecord(),
};

Path.propTypes = {
  d: PropTypes.string.isRequired,
  mouseOut: PropTypes.func,
  mouseOver: PropTypes.func,
  selected: PropTypes.bool,
  shape: PropTypes.string.isRequired,
  styles: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  view: PropTypes.instanceOf(ShapeRecord),
};

export default Path;
