import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CSSModules from 'react-css-modules';
import 'basscss/css/basscss.css';
import Chart from '../react-d3/components/Chart';
import LegendGroup from '../react-d3/components/LegendGroup';
import { GeometryRecord } from '../react-d3/models';
import { rrdFetchAction, viewsFetchAction } from '../actions/fetcher';
import { unselectShape, selectShape } from '../actions/charts';
import { selectViews, selectCharts, selectView, selectSelected } from '../selectors';
import styles from './style.css';

const Button = ({ view, fetch, canvas, styles }) => (
  <button
    className="btn not-rounded"
    onClick={() => fetch(view.get('id'), view.get('modules'), canvas)}
    className={styles.btn}
  >
    {view.get('name')}
  </button>
  );
const ViewButtons = ({ views, fetch, canvas, styles }) => (
  <div className="clearfix">
    {views.map(view => (
      <div className="col m1" key={`button${view.get('id')}`}>
        <Button canvas={canvas} fetch={fetch} styles={styles} view={view} />
      </div>))}
  </div>);

class DemoApp extends PureComponent {
  componentDidMount() {
    this.props.fetchViews();
  }
  render() {
    const { styles, asideCharts, asideSelected, asideView, data, main, aside, fetch, views, mainCharts, scale, chartViews, mainSelected, mainView, mouseOver, mouseOut } = this.props;

    return (
      <div>
        <div className="col col-7">
          <ViewButtons canvas={'main'} fetch={fetch} styles={styles} views={views} />
          <div>
            <svg height={main.height} width={main.width}>
              {mainCharts.map((chart, idx) => (
                <Chart
                  canvas={'main'}
                  chart={chart}
                  geometry={main}
                  key={`chart_main_${chart.id}`}
                  mouseOut={mouseOut}
                  mouseOver={mouseOver}
                  selected={mainSelected.get(chart.id, null)}
                  view={mainView.charts.get(idx)}
                />),
            )}
            </svg>
          </div>
          { mainCharts && mainCharts.size ? (
            <LegendGroup
              canvas={'main'}
              charts={mainCharts}
              mouseOut={mouseOut}
              mouseOver={mouseOver}
              view={mainView}
            />) :
          null
          }
        </div>
        <div className="col col-4">
          <ViewButtons canvas={'aside'} fetch={fetch} styles={styles} views={views} />
          <div>
            <svg height={aside.height} width={aside.width}>
              {asideCharts.map((chart, idx) => (
                <Chart
                  canvas={'aside'}
                  chart={chart}
                  geometry={aside}
                  key={`chart_aside_${chart.id}`}
                  mouseOut={mouseOut}
                  mouseOver={mouseOver}
                  selected={asideSelected.get(chart.id, null)}
                  view={asideView.charts.get(idx)}
                />),
            )}
            </svg>
          </div>
        </div>
      </div>
    );
  }
}
const main = new GeometryRecord({
  height: 400,
  width: 700,
  marginTop: 10,
  marginRight: 50,
  marginBottom: 30,
  marginLeft: 50,
});

const aside = new GeometryRecord({
  height: 200,
  width: 400,
  marginTop: 10,
  marginRight: 50,
  marginBottom: 30,
  marginLeft: 50,
});

const mapStateToProps = (state, ownProps = { aside, main }) => ({
  main: ownProps.main,
  aside: ownProps.aside,
  views: selectViews(state),
  mainCharts: selectCharts(state, 'main'),
  mainView: selectView(state, 'main'),
  mainSelected: selectSelected(state, 'main'),
  asideCharts: selectCharts(state, 'aside'),
  asideView: selectView(state, 'aside'),
  asideSelected: selectSelected(state, 'aside'),

});
const mapDispatchToProps = dispatch => ({
  fetch: bindActionCreators(rrdFetchAction, dispatch),
  fetchViews: bindActionCreators(viewsFetchAction, dispatch),
  mouseOver: bindActionCreators(selectShape, dispatch),
  mouseOut: bindActionCreators(unselectShape, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(DemoApp, styles));
/* <LegendGroup
            canvas={'main'}
            charts={mainCharts}
            mouseOut={mouseOut}
            mouseOver={mouseOver}
            view={mainView}
          />*/
