# 前端工程化

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

1, 添加webpack.config.js文件,添加内容

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

2, package.json文件添加命令配置

```json
"scripts": {
    "build": "yarn webpack"
  }
```