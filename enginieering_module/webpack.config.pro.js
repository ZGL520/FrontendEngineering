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
});