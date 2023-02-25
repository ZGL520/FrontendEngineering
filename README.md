# 前端工程化

[toc]

工程化的目的: 提升效率/降低成本


## 工程化需要解决的问题

1, 新特性代码的编译,兼容问题,包括js兼容问题,sass兼容问题

2, 解决模块化带来的问题,模块化代js码打包

3, 资源文件打包成模块,图片,音频,字体等


## 前端模块打包工具

1, webpack, 模块打包工具

2, 模块加载器,loader

3, 代码拆分能力

4, 模块化方式载入资源文件

模块化目标



## webpack的使用


### webpack资源加载器分类

1, 变异,转化类型, css-loader
2, 文件操作类型, file-loader, url-loader
3, 代码质量检查类型, eslint-loader

### webpack的引入和打包
1, 初始化webpack.json文件

2, 添加webpack, webpack-cli

3, 开始打包

```
yarn init --yes
yarn add webpack webpack-cli --dev
yarn webpack
```

### webpack添加配置文件

#### 1, 添加webpack.config.js文件,添加内容

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
};
```

#### 2, package.json文件添加命令配置

```json
"scripts": {
    "build": "yarn webpack"
  }
```

#### 3, webpack打包模式的是使用

在打包时通过命令行传递参数

```linux
yarn webpack --mode development
```

通过配置文件配置参数, webpack一共有三种打包模式,production,development,none,
模式使用production模式打包

```js
module.exports = {
  mode: 'production'
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
};
```
### 加载器
#### 1, css资源的加载

1, 添加插件

```
yarn add css-loader style-loader --dev
```

2, 有以下几点需要注意

1, webpack只能处理js文件,其他类型文件需要借助对应的loader插件处理
2, css文件处理需要加入loader插件,这里使用css-loader
3, 只使用css-loader加载样式文件无法生效,需要添加style-loader插件
4, 配置loader是use数组执行顺序从后往前执行,就是下面配置中先执行style-loader,再执行css-loader

3, 添加配置
```js
entry: ['./src/index.js', './src/index.css'],
```
```js
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          "style-loader",
          "css-loader"
        ],
      }
    ]
  },
```

module模块中rules模块用于配置模块加载器
test: 用于匹配文件类型
use: 使用哪些插件,注意,数组执行顺序从后往前执行

#### 2, 图片加载

1, 添加文件加载器

```
yarn add file-loader --dev
```

2, 添加配置

```js
{
  test: /\.(png|svg|jpg|gif|jpeg|webp)$/,
  use: ['file-loader']
}
```

对于项目中一些size比较小的文件,最佳实践是使用url-loader转换成data url,以减少请求次数

url-loader可以通过配置来确定哪些资源需要转换成data url, 例如将10kb以下的图片转换成bs54

```
yarn add url-loader --dev
```
配置如下
```js
      {
        test: /\.(png|svg|jpg|gif|jpeg|webp)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10240,
          }
        }
      }
```

#### 3, es6转换

```
yarn add babel-loader @babel/core @babel/preset-env --dev
```

配置
```js
      {
        test: /.js$/, use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        },
      },
```


### 插件

1, 清理上一次打包产出, clean-webpack-plugin

```
yarn add clean-webpack-plugin --dev
```

配置
```js
  plugins: [
    new CleanWebpackPlugin(),
  ],
```

2, 自动生成使用打包结果的html, html-webpack-plugin

```
yarn add html-webpack-plugin --dev
```

配置
```js
plugins: [
    new HtmlWebpackPlugin(),
  ],
```
注意这里要删除配置文件中的publicPath配置

自定义模板配置
```js
new HtmlWebpackPlugin({ title: 'Engineering', template: './src/index.html' }),
```

如果build过程中碰到语法错误,注意检查html-loader配置,要打开esModule: true

HtmlWebpackPlugin客户实例化多个事例来实现输入多个html页面

3, 将一些不参加打包的静态资源copy到打包文件

安装
```
yarn add copy-webpack-plugin --dev
```

配置
```js
new CopyWebpackPlugin({ patterns: [{ from: './src/static', to: './static' }], options: { concurrency: 100 } })
```

### 自动编译

监听文件变化,触发打包

1, 运行webpack打包时添加参数,--watch

```
yarn webpack --watch
```

成熟方案, webpack-dev-server

安装依赖
```
yarn add webpack-dev-server --dev
```

运行
```
yarn webpack-dev-server
```

package.json文件配置快捷启动

```js
"start": "yarn webpack-dev-server --mode development --open"
```

devServer配置添加静态资源方位配置

```js
 devServer: {
    static: { directory: path.join(__dirname, 'public') },
  }
```

### 添加本地代理服务

1, devServer中添加如下配置
```js
  devServer: {
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
```

### source map

1, 添加source map配置
2, source map配置有很多,可以根据需求调整配置
3, 以下配置说明是根据经验所得

```js
  /// source map 支持多种类型, 详见 https://webpack.js.org/configuration/devtool/, 
  /// 开发环境建议使用 eval-cheap-module-source-map,
  /// 生产环境建议使用 none 
  devtool: 'eval-cheap-module-source-map',
```


### 自动刷新优化,热拔插(HMR)

1, 自动刷新过程中,当监听到内容变化,会重新打包,然后刷新页面,这会导致页面状态数据丢失
2, 解决方案,热拔插

打开热拔插有两种方式, 一种是在cli中添加参数

```
yarn webpack-dev-server --hot
```

另一种是在配置文件中打开,并且在plugins中打开服务
```js
  devServer: {
    hot: true,
  },
```

```js
new webpack.HotModuleReplacementPlugin(),
```


到这里样式文件会自动更新,但是如果是js改动还是会重新刷新页面
原因是样式文件自动更新在css-loader中就处理了,js改动需要手动处理

可以在如下demo方法中处理是否更新
```js
module.hot.accept('./create_node', () => {
  document.body.removeChild(div);
  const div = createDiv();
  document.body.appendChild(div);
});
```

总的来说,webpack没有提供一个完整的js热替换方案,
具体还是要根据实际情况自定义更新方案,或者使用框架热替换方案

若果手动在项目中加入了处理热替换的代码,在打包中会自动将这部分代码删除


### 配置拆分

配置拆分有两种
1, 在配置文件中通过判断选择不同的配置
2, 将不同环境的配置拆分成不同的配置文件管理