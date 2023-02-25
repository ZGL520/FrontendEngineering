const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['./src/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public')
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
          "style-loader",
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

  plugins: [
    new HtmlWebpackPlugin({ title: 'Engineering', template: './src/index.html' }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};