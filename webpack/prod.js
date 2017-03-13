const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cssModules = new ExtractTextPlugin({
  filename: 'app_[contenthash].css',
  allChunks: true,
});
const globalCss = new ExtractTextPlugin({
  filename: 'global_[contenthash].css',
  allChunks: true,
});
const baseConfig = require('./base.js');

module.exports = webpackMerge(baseConfig,
  {
    entry:
    './src/index.js',

    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /style\.css$/,
          use: cssModules.extract({
            use: [
              'css-loader?modules&importLoaders=1&localIdentName=[local]',
              'postcss-loader',
            ],
          }),
        },
        {
          test: {
            test: /\.css$/,
            not: [/style\.css$/],
          },
          use: globalCss.extract({
            use: [
              'css-loader?importLoaders=1',
              'postcss-loader',
            ],
          }),
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),

      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true,
        },
        compress: {
          screw_ie8: true,
        },
        comments: false,
        sourceMap: true,
      }),
      cssModules,
      globalCss,
    ],
  });
