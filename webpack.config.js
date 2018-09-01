var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  context: __dirname,
  devtool: "inline-sourcemap",
  entry: "./js/client.js",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
        }
      }
    ]
  },
  output: {
      filename: 'client.min.js',
      path: path.resolve(__dirname, 'src', 'public'),
      publicPath: '/public/'
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
    minimize: true
  }
};
