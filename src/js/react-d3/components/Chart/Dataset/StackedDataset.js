import { area, line } from 'd3';
import Dataset from './';

class StackedDataset extends Dataset {
  getShaper() {
    const { scaleX, scaleY, view: { shape } } = this.props;

    return shape === 'line' ?
      line().x(v => scaleX(1000 * v[0]))
        .y(v => scaleY(v[2]))
        .defined(v => v[1] || v[2]) :
      area().x(v => scaleX(1000 * v[0]))
        .y1(v => scaleY(v[2]))
        .y0(v => scaleY(v[1]))
        .defined(v => v[1] || v[2]);
  }
}

export default StackedDataset;
