# webpack 的 runtime
[视频](https://www.bilibili.com/video/BV1o44y1Y7Zs)

1. `_webpack_modules`是一个数组，存放所有`require()`引入的模块（第一个其实是入口模块，但是放在了最外面，入口模块也就是主函数），每个模块都由一个包裹函数`(module, module.exports, _webpack_modules)`对模块进行包裹。入口模块被解析为`AST`，根据`AST`深度优先搜索所有模块，构建出模块数组。
2. `_webpack_require(moduleId)`手动实现加载一个模块，对已加载过的模块进行缓存，执行`moduleId`定位到`webpack_modules`中的包裹函数，执行并返回`module.exports`。
3. `_webpack_require(0)`：运行`_webpack_modules`第一个模块，引入模块的地方会被解析成`webpack_require(moduleId)`。

build.js
```javascript
const webpack = require("webpack");
const path = require("path");
function f1() {
  return webpack({
    entry: "./index.js",
    mode: "none",
    output: {
      iife: false, //  去掉最外层的包裹函数
      pathinfo: 'verbose' // 更完整的信息
    },
  });
}
f1().run((err, stat) => {});
```

sum.js
```javascript
module.exports = (...args) => args.reduce((x, y) => x + y, 0);
```

add.js
```javascript
module.exports = () => {console.log('add')}
```

主函数index.js
```javascript
const sum = require('./sum')
console.log(sum(3, 8));
const add = require('./add')
add()
```

执行
```
node index.js
```

webpack打包后dist/main.js
```javascript
/******/ var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/*!****************!*\
  !*** ./sum.js ***!
  \****************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 1:0-14 */
/***/ ((module) => {

module.exports = (...args) => args.reduce((x, y) => x + y, 0);


/***/ }),
/* 2 */
/*!****************!*\
  !*** ./add.js ***!
  \****************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 1:0-14 */
/***/ ((module) => {

module.exports = () => {console.log('add')}

/***/ })
/******/ ]);
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
const sum = __webpack_require__(/*! ./sum */ 1)
console.log(sum(3, 8));
const add = __webpack_require__(/*! ./add */ 2)
add()
})();
```