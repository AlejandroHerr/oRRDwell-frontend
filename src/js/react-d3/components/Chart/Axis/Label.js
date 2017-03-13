import React, { PropTypes } from 'react';
import classNames from 'classnames';

const dy = { top: '0em', right: '0.32em', bottom: '0.71em', left: '0.32em' };
const classnames = (styles, position) => classNames(styles.label, {
  [styles['label--middle']]: position === 'top' || position === 'bottom',
  [styles['label--start']]: position === 'left',
  [styles['label--end']]: position === 'right',
});

const Label = ({ position, spacing, styles, text, vertical }) => (
  <text className={classnames(styles, position)} dy={dy[position]} x={vertical ? spacing : '0.5'} y={vertical ? '0.5' : spacing}>
    {text}
  </text>);

Label.propTypes = {
  position: PropTypes.string.isRequired,
  spacing: PropTypes.number.isRequired,
  styles: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  text: PropTypes.string.isRequired,
  vertical: PropTypes.bool.isRequired,
};
export default Label;
