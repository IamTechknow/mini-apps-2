const path = require('path');
const webpack = require('webpack');
const SRC_DIR = path.join(__dirname, '/client');
const DIST_DIR = path.join(__dirname, '/public');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  devtool: 'source-map',
  mode: 'development',
  cache: true,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?/,
        include: SRC_DIR,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        include: SRC_DIR,
        use: [ { loader: 'style-loader' }, { loader: 'css-loader' }]
      }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
};
