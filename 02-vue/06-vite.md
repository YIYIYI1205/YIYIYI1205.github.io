# Vite

- 基于`ESM`的`Dev Server`+ `HMR`（开发环境不进行打包）
- 基于`esbuild`的依赖预优化
- 基于`Rollup`的`Plugins`+`Bundle`（生产环境`Rollup`打包）
- `SSR`（服务端渲染）

## 为什么选vite

> 现有问题：

使用`JavaScript`开发的工具通常需要很长时间（甚至是几分钟！）才能启动开发服务器，即使使用`HMR`，文件修改后的效果也需要几秒钟才能在浏览器中反映出来。如此循环往复，迟钝的反馈会极大地影响开发者的开发效率和幸福感。项目变大，`Bundle`的启动时间变长，`HMR`时间变长。`Dev Server`必须等待所有模块构建完成

- `bundle`是`webpack`打包出来的文件，`chunk`是代码块，一个`chunk`由多个模块组合而成，`module`是单个模块。`module`，`chunk`和`bundle`其实就是同一份逻辑代码在不同转换场景下的取了三个名字：直接写出来的是`module`，`webpack`处理时是`chunk`，最后生成浏览器可以直接运行的`bundle`

> 解决：

- 解决缓慢的服务器启动：`Vite`通过在一开始将应用中的模块区分为依赖和源码两类，改进了开发服务器启动时间
  - 源码：`Vite`以原生`ESM`方式提供源码。浏览器接管了打包程序的部分工作：`Vite`只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入代码，即只在当前屏幕上实际使用时才会被处理，服务器先启动
  - 依赖：`Vite`将会使用`esbuild`预构建依赖。用`esbuild`转换`TS/JSX`，代替`TSC/Babel`
- 解决缓慢的更新：`HMR`优化：编辑一个文件时，`Vite`只需要精确地使已编辑的模块与其最近的`HMR`边界之间的链失活；`Vite`同时利用 `HTTP`头来加速整个页面的重新加载。源码模块的请求会根据`304 Not Modified`进行协商缓存，而依赖模块请求则会通过`Cache-Control: max-age=31536000,immutable`进行强缓存，因此一旦被缓存它们将不需要再次请求
- 仍然需要打包：基于`Rollup`的`Plugins`+`Bundle`

## 使用

### 初始化

```javascript
// npm
$ npm init vite@latest
// yarn
$ yarn create vite
// pnpm
$ pnpm create vite
```

### 功能

- 天然支持`ts`，无需安装，在`tsconfig.json`中加配置
- `css`：安装相应的预处理器依赖，`npm add -D sass`
- `post-css`用来加前缀，直接配置`postcss.config.js`即可直接生效，`npm i autoprefixer -D`

```javascript
module.exports = {
  plugins: [require('autoprefixer')]
}
```

- `vue`中`<style scope>`(使用：`class='logo'`)和`<style module>`(使用：`:class='$style.logo'`)的区别：
  - 模块化更优，自动给类名添加`hash`；也可以直接给样式文件命名`xx.module.css`，使用：`import classes from 'xx.module.css'`等同于`<style module>`
  - `scope`方式会给元素添加`data-v`属性

### 使用插件

- 安装依赖，并且在`vite.config.js`中配置`plugins`中引入插件

```javascript
// npm add -D @vitejs/plugin-legacy
import legacy from '@vitejs/plugin-legacy'
import { defineConfig } from 'vite'
export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ]
})
```

- `mock`：`npm i mockjs -S`和`npm i vite-plugin-mock -D`，配置`vite.config.js`，创建`mock`目录

```javascript
// vite.config.js
import { viteMockServe } from 'vite-plugin-mock'
export default definedConfig({
  plugins: [viteMockServe({
   mockPath: "./src/server/mock", // mock文件地址
  })]
})
// mock接口
// /server/mock/test.ts
export default[
  {
    url: 'xxx',
    method: 'get',
    response: req => {
      return {
        code: 0,
        data: [{name: 'tom'}, {name: 'jerry'}]
      }
    }
  }
]
```

- 代码规范`eslint+prettier`，安装依赖，配置`.eslintrc.js`和`.eslintignore`
- `jest`：安装依赖，配置`jest.config.js`

### 静态资源处理

- 引入一个静态资源会返回解析后的公共路径（所有的相对地址都被解析成了绝对地址）`import logo from './assets/logo.png' //输出/src/assets/logo.png`

### 环境变量与模式

- `Vite`使用`dotenv`从环境目录中的`.env`、`.env.local`、`.env.[mode]`加载额外的环境变量

### 配置

- 配置别名：安装`@types/node`，`ts`的`node`类型

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve('./src'),
      comps: resolve('./src/components')
    }
  }
})
// 使用
// background: url('@/logo.svg'); 
```

- 代理

```javascript
// vite.config.js
export default{
  server:{
    proxy: {
      '/api':{
        target: 'xxx',
        changeOrigin: true,
        rewrite:path => path.replace(/^\/api/, '')
      }
    }
  }
}
```

## 原理

- `<script type='module'>`，可以使用`es6`，便于开发，打包时可以降级。
- 第三方依赖进行预打包（`esbuild`）
- 第三方依赖协商缓存，源码强缓存

## 通用钩子

- `config`: 修改`vite`配置
- `configResolved`: `vite`配置确认，只能读不能改
- `configServer`: 用于配置`dev server`，可以做中间件，例如实现`viteMockServe`
- `transformIndexHtml`: 用于修改宿主页面
- `resolveId`: 确定插件名字，是否接管
- `load`: 接管后返回什么
- `transform`: 将`load`进来的代码块进一步加工处理
