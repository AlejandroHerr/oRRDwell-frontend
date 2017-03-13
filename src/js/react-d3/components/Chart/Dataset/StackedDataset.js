import { area, line } from 'd3';
import Dataset from './';
import { selectStack } from '../../../reducers';

class StackedDataset extends Dataset {
  getDataSet() {
    const { canvas, data, idx } = this.props;

    return selectStack(data, canvas, idx);
  }
  getShaper() {
    const { data, scaleX, scaleY, view: { shape } } = this.props;

    const time = data.first().values;

    return shape === 'line' ?
      line().x((v, i) => scaleX(1000 * time.get(i)[0]))
        .y(v => scaleY(v[1]))
        .defined(v => v[1]) :
      area().x((v, i) => scaleX(1000 * time.get(i)[0]))
        .y1(v => scaleY(v[1]))
        .y0(v => scaleY(v[0]))
        .defined(v => v[1]);
  }
}

export default StackedDataset;
