# webpack code spliting是如何动态加载chunk的



[视频](https://www.bilibili.com/video/BV1k44y1h7DW)

1. `__webpack_require__.e`: 加载`chunk`。该函数将使用`document.createElement('script')`异步加载`chunk`并封装为`Promise`。
2. `self["webpackChunk"].push`: `JSONP cllaback`，收集`modules`至 `__webpack_modules__`，并将`__webpack_require__.e`的`Promise`进行 `resolve`。
实际上，在`webpack`中可配置`output.chunkLoading`来选择加载`chunk`的方式，比如选择通过`import()`的方式进行加载。(由于在生产环境需要考虑`import`的兼容性，目前还是`JSONP`方式较多)
