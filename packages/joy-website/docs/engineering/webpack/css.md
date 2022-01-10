# webpack 如何加载样式
[视频](https://www.bilibili.com/video/BV1Wr4y1X7mY)

- `` css-loader ``打包过后，包含一个入口模块，一个引入模块，其它还有很多个模块都是做一些处理的，例如注入`` dom ``中、处理`` import ``等。
- `` babel ``和`` postcss ``是两个编译器，编译`` js ``和`` css ``。
- `` css-loader ``的原理就是`` postcss ``，借用`` postcss-value-parser ``解析`` css ``为`` AST ``，并将`` css ``中的`` url() ``与`` @import ``解析为模块。
- `` style-loader ``用以将`` css ``注入到`` DOM ``中，原理为使用`` DOM API ``手动创建`` style ``标签，并将`` css ``内容注入到`` style ``中。
- 使用`` DOM API ``加载`` css ``资源，由于`` css ``需要在`` js ``资源加载完通过`` DOM API ``控制加载，容易出现页面抖动，在线上低效，这时候需要`` mini-css-extract-plugin ``单独抽离，再通过`` html-webpack-plugin ``引入到`` html ``中。
  
打包文件
```
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
function f1() {
  return webpack({
    entry: "./index.js",
    mode: "none",
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    output: {
      clean: true,
      path: path.resolve(__dirname, 'dist/style')
    },
    plugins: [
      new HtmlWebpackPlugin()
    ]
  });
}
f1().run((err, stat) => {});
```