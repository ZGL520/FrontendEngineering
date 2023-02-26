const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js',
    about: './src/about.js',
  },
  output: {
    filename: '[name]-[contenthash:8].bundle.js',
    path: path.join(__dirname, 'public'),
  },
  devServer: {
    hot: true,
    static: { directory: path.join(__dirname, 'public') },
    proxy: {
      '/api': {
        /// 代理到github的api, http://localhost:8080/api/users/xxx => https://api.github.com/users/xxx
        target: 'https://api.github.com',
        pathRewrite: { '^/api': '' },
        /// 代理到本地的api, http://localhost:8080/api/users/xxx => http://localhost:3000/users/xxx
        /// 不使用localhost, 因为localhost会被浏览器拦截, 无法访问
        changeOrigin: true,
      }
    }
  },
  module: {
    rules: [
      {
        test: /.(js|ejs)$/, use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        },
      },
      {
        test: /.css$/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader"
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg|webp)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10240,
          }
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            esModule: true,
          }
        },
      }
    ]
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
    },
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      /// 开启这个插件后,原有的压缩插件会失效,需要手动配置,详见 https://webpack.js.org/plugins/terser-webpack-plugin/
      new TerserWebpackPlugin(),
    ],
  },

  plugins: [
    /// 设置title, 设置模板, 设置输出文件名, 设置入口文件
    new HtmlWebpackPlugin({ title: 'Engineering', template: './src/index.html', filename: 'index.html', chunks: ['app'] }),
    new HtmlWebpackPlugin({ title: 'Engineering', template: './src/about.html', filename: 'about.html', chunks: ['about'] }),
    new webpack.HotModuleReplacementPlugin(),
    /// 不是所有情况都适合把css提取出来, 经验之谈,css文件大于150kb的时候,提取出来,否则不提取
    new MiniCssExtractPlugin({ filename: '[name]-[contenthash:8].bundle.css' }),
    /// webpack 建议将压缩类插件配置到optimization.minimizer中
    // new OptimizeCssAssetsPlugin(),
  ],
};