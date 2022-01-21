# 如何提升 webpack 的构建性能
[视频](https://www.bilibili.com/video/BV1DU4y1N7sd)

使用[speed-measure-webpack-plugin](https://www.npmjs.com/package/speed-measure-webpack-plugin)可以评估每个`loader/plugin`的执行耗时。最耗时的就是`loader/plugin`。
  
  如何让`npm run build`更快

  ## 1. 更快的loader:swc（用于js代码转化）
  在`webpack`中耗时最久是负责`AST`转换的`loader`。
  比如`Javascript`转化由`babel`转化为更快的[swc](https://swc.rs/docs/usage/swc-loader)。
 ``javascript
    module:{
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "swc-loader"
                }
            }
        ]
    }
 ``
  ## 2. 持久化缓存：cache
  在`webpack5`中，可以直接进行配置。
 ``javascript
  cache:{
      type: 'filesystem'
  }
 ``
  在`webpack4`中，可使用`cache-loader`仅仅对`loader`进行缓存。(不推荐)
 ``javascript
  module.exports = {
    module: {
        rules: [
        {
            test: /\.ext$/,
            use: ["cache-loader", ...loaders],
            include: path.resolve("src"),
        },
        ],
    },
  };
 ``
  ## 3. 多进程：thread-loader
  `thread-loader`为官方推荐的开启多进程的`loader`，可对`babel`解析`AST`时开启多线程处理，提升编译的性能。
 ``javascript
  module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "thread-loader",
                        options: {
                            workers: 8,
                        },
                    },
                    "babel-loader",
                ],
            },
        ],
    },
  };
 ``
  在`webpack4`中，可使用`happypack plugin`(不推荐)。