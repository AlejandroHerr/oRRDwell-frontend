const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const DashboardPlugin = require('webpack-dashboard/plugin');
const baseConfig = require('./base.js');

module.exports = webpackMerge(baseConfig,
  {
    entry: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './src/index.js',

    ],
    module: {
      rules: [
        {
          test: /style\.css$/,
          use: [
            'style-loader?sourceMap',
            'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
            'postcss-loader',
          ],
        },
        {
          test: {
            test: /\.css$/,
            not: [/style\.css$/],
          },
          use: [
            'style-loader?sourceMap',
            'css-loader?importLoaders=1',
            'postcss-loader',
          ],

        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
          BACKEND: JSON.stringify(process.env.BACKEND),
          BACKEND_PORT: JSON.stringify(process.env.BACKEND_PORT),
        },
      }),
      new DashboardPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
  });

