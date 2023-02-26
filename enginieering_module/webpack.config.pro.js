const common = require('./webpack.config.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: 'production',
  /// source map 支持多种类型, 详见 https://webpack.js.org/configuration/devtool/, 
  /// 开发环境建议使用 eval-cheap-module-source-map,
  /// 生产环境建议使用 none 
  plugins: [
    new CleanWebpackPlugin(),
    /// 将不参加打包的文件拷贝到public目录下
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { from: './src/static', to: './static' }
    //   ],
    //   options: {
    //     concurrency: 100
    //   }
    // }),
  ],
  /// 详见 https://webpack.js.org/configuration/optimization/
  optimization: {
    /// 压缩js代码
    minimize: true,
    /// 将所有的模块合并到一个函数中
    usedExports: true,
    /// 副作用分析,没有用到的模块不会被打包,要确定代码没有副作用,不然会被误判,这个功能慎用,可能会导致代码被误判
    // sideEffects: true,
  }
});