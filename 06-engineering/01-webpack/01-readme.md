# webpack

## 安装

- `npm install webpack webpack-cli`

## 运行

- 配置`package.json`，运行`npm run webpack`
- 全局安装，直接`webpack`

## 入口

- `entry`
- 单个入口：`{entry: 入口文件路径}`或者在`{entry: { main: 入口文件路径}`

## mode

- `development`, `production`或`none`，其默认值为`production`
- 还可以使用`webpack --mode=development`传入`mode`
- 安装`npm install cross-env`，能跨平台地设置及使用环境变量
- `mode`配置可以在打包后的文件中拿到，但是无法在`webpack.config.js`中拿到，所有要使用`NODE_ENV`
- 在打包后的文件中，`mode`设置优先`NODE_ENV=`

## webpack4和5的区别