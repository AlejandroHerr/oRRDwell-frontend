import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Chart from '../react-d3/components/Chart';
import LegendGroup from '../react-d3/components/LegendGroup';
import { GeometryRecord } from '../react-d3/models';
import { fetchAction, fetchViewsAction } from '../actions/fetcher';
import { chartOver, chartOut } from '../actions/charts';
import { selectViews, selectCharts, selectTheView, selectSelected } from '../selectors';
import 'basscss/css/basscss.css';

class App extends PureComponent {
  componentDidMount() {
    this.props.fetchViews();
  }
  render() {
    const { data, geometry, fetch, views, mainCharts, scale, chartViews, mainView, mainSelected, mouseOver, mouseOut } = this.props;
    return (
      <div>
        <div>
          {views.map(view => (
            <button key={view.get('id')} onClick={() => fetch(view.get('id'), 'main')}>
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
                idx={idx}
                key={`chart_main_${idx}`}
                mouseOut={mouseOut}
                mouseOver={mouseOver}
                selected={mainSelected.get(idx, null)}
                view={mainView.get(idx)}
              />),
            )}
          </svg>
          <LegendGroup
            canvas={'main'}
            charts={mainCharts}
            mouseOut={mouseOut}
            mouseOver={mouseOver}
            view={mainView}
          />
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
  mainView: selectTheView(state, 'main'),
  mainSelected: selectSelected(state, 'main'),

});
const mapDispatchToProps = dispatch => ({
  fetch: bindActionCreators(fetchAction, dispatch),
  fetchViews: bindActionCreators(fetchViewsAction, dispatch),
  mouseOver: bindActionCreators(chartOver, dispatch),
  mouseOut: bindActionCreators(chartOut, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
