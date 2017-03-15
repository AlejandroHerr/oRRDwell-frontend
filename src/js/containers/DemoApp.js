import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'basscss/css/basscss.css';
import Chart from '../react-d3/components/Chart';
import LegendGroup from '../react-d3/components/LegendGroup';
import { GeometryRecord } from '../react-d3/models';
import { rrdFetchAction, viewsFetchAction } from '../actions/fetcher';
import { unselectShape, selectShape } from '../actions/charts';
import { selectViews, selectCharts, selectView, selectSelected } from '../selectors';

class DemoApp extends PureComponent {
  componentDidMount() {
    this.props.fetchViews();
  }
  render() {
    const { data, geometry, fetch, views, mainCharts, scale, chartViews, mainSelected, mainView, mouseOver, mouseOut } = this.props;
    console.log(mainCharts);
    return (
      <div>
        <div>
          {views.map(view => (
            <button key={view.get('id')} onClick={() => fetch(view.get('id'), view.get('modules'), 'main')}>
              {view.get('name')}
            </button>),
          )}
        </div>
        <div>
          <svg height={geometry.height} width={geometry.width}>
            {mainCharts.map((chart, idx) => (
              <Chart
                canvas={'main'}
                chart={chart}
                geometry={geometry}
                key={`chart_main_${chart.id}`}
                mouseOut={mouseOut}
                mouseOver={mouseOver}
                selected={mainSelected.get(chart.id, null)}
                view={mainView.charts.get(idx)}
              />),
            )}
          </svg>
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
      </div>
    );
  }
}
const geometry = new GeometryRecord({
  height: 450,
  width: 800,
  marginTop: 10,
  marginRight: 50,
  marginBottom: 30,
  marginLeft: 50,
});

const mapStateToProps = (state, ownProps = { geometry }) => ({
  geometry: ownProps.geometry,
  views: selectViews(state),
  mainCharts: selectCharts(state, 'main'),
  mainView: selectView(state, 'main'),
  mainSelected: selectSelected(state, 'main'),

});
const mapDispatchToProps = dispatch => ({
  fetch: bindActionCreators(rrdFetchAction, dispatch),
  fetchViews: bindActionCreators(viewsFetchAction, dispatch),
  mouseOver: bindActionCreators(selectShape, dispatch),
  mouseOut: bindActionCreators(unselectShape, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DemoApp);
/* <LegendGroup
            canvas={'main'}
            charts={mainCharts}
            mouseOut={mouseOut}
            mouseOver={mouseOver}
            view={mainView}
          />*/
