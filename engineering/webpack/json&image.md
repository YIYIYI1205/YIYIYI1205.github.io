# webpack 如何加载 json/image 等资源
[视频](https://www.bilibili.com/video/BV1FS4y1971G)

手写一个json-loader：index.js
```javascript
module.exports = function (source) {
  const json = typeof source === "string" ? source : JSON.stringify(source);
  return `module.exports = ${json}`;
};
```
打包配置：dist/build.js
```javascript
const webpack = require("webpack");
const compiler = webpack({
    entry: './index.js',
    mode: 'none',
    output: {
        filename: '[name].[contenthash:8].js',
        clean: true
    },
    module: {
        rules: [{
            use: '..', // 这里是将外部的index.js作为loader
            test: /\.json3$/ // 为了避免与内置的json-loader冲突
        }]
    }
})
compiler.run(() => {
    console.log('DONE')
})
```

需要被打包的文件：dist/user.json3
```javascript
{
    a: 1
}
```