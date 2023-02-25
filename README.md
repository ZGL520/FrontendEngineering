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

1, 清理上一次打包产出

```
yarn add clean-webpack-plugin --dev
```

配置
```js
  plugins: [
    new CleanWebpackPlugin(),
  ],
```

2, 自动生成使用打包结果的html

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