'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin

    new FriendlyErrorsPlugin()
  ]
})


var pages = utils.getEntries('./src/module/**/*.html')
for(var page in pages) {
  var conf = {
    filename: page + '.html',
    template: pages[page], //模板路径
    inject: true,
    chunksSortMode: 'dependency',
    minify: {
       removeComments: true,
       collapseWhitespace: true,
       removeAttributeQuotes: true
       // more options:
       // https://github.com/kangax/html-minifier#options-quick-reference
     },
    excludeChunks: Object.keys(pages).filter(item => {
      return (item != page)
    })
  }
  // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf))
}

// 引入vconsole插件
var vConsolePlugin = require('vconsole-webpack-plugin');
webpackConfig.plugins.push(
  new vConsolePlugin({
    enable: true
  })
)

module.exports = webpackConfig
