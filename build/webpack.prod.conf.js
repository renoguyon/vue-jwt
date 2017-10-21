const path = require('path')
const baseConf = require('./webpack.base.conf');
const webpack = require('webpack')
const merge = require('webpack-merge')

module.exports = merge(baseConf, {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'vuejs-jwt.js',
    library: ['vuejs-jwt'],
    libraryTarget: 'umd'
  },
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
})
