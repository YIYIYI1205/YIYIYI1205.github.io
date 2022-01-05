# vite
  [官网](https://vitejs.cn/)
  > 1. 基于`` ESM ``的`` Dev Server `` + `` HMR ``（开发环境不进行打包）
  2. 基于`` esbuild ``的依赖预优化
  3. 基于`` Rollup ``的`` Plugins ``+`` Bundle ``（生产环境Rollup打包）
  4. `` SSR ``（服务端渲染）
## 为什么选vite

  > 现有问题：

  使用`` JavaScript ``开发的工具通常需要很长时间（甚至是几分钟！）才能启动开发服务器，即使使用 HMR，文件修改后的效果也需要几秒钟才能在浏览器中反映出来。如此循环往复，迟钝的反馈会极大地影响开发者的开发效率和幸福感。
  项目变大，`` Bundle ``的启动时间变长，`` HMR ``时间变长。`` Dev Server ``必须等待所有模块构建完成。

`` bundle ``是`` webpack ``打包出来的文件，`` chunk ``是代码块，一个`` chunk ``由多个模块组合而成，`` module ``是单个模块。`` module ``，`` chunk ``和`` bundle ``其实就是同一份逻辑代码在不同转换场景下的取了三个名字：直接写出来的是`` module ``，`` webpack ``处理时是`` chunk ``，最后生成浏览器可以直接运行的`` bundle ``。

  >解决：
  1. `` Vite ``旨在利用生态系统中的新进展解决上述问题：浏览器开始原生支持`` ES ``模块，且越来越多`` JavaScript ``工具使用编译型语言编写。

    `` Vite ``通过在一开始将应用中的模块区分为依赖和源码两类，改进了开发服务器启动时间。

    源码：`` Vite ``以原生`` ESM ``方式提供源码。浏览器接管了打包程序的部分工作：`` Vite ``只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入代码，即只在当前屏幕上实际使用时才会被处理，服务器先启动。

2. 依赖：`` Vite ``将会使用`` esbuild ``预构建依赖。用`` esbuild ``转换`` TS/JSX``，代替`` TSC/Babel``。
3. `` HMR ``优化：编辑一个文件时，`` Vite ``只需要精确地使已编辑的模块与其最近的`` HMR ``边界之间的链失活；`` Vite ``同时利用 `` HTTP ``头来加速整个页面的重新加载。源码模块的请求会根据`` 304 Not Modified ``进行协商缓存，而依赖模块请求则会通过`` Cache-Control: max-age=31536000,immutable ``进行强缓存，因此一旦被缓存它们将不需要再次请求。
4. 仍然需要打包：基于`` Rollup ``的`` Plugins ``+`` Bundle ``

## [插件](https://vitejs.cn/guide/api-plugin.html#simple-examples)
> 基于Rollup
```
      export default definedConfig({
        // vue是系统插件，viteMockServe是用户插件
        plugins: [vue(), viteMockServe({})]
      })
```
### [通用钩子](https://vitejs.cn/guide/api-plugin.html#transforming-custom-file-types)
 - config: 修改vite配置
 - configResolved: vite配置确认，只能读不能改
 - configServer: 用于配置dev server，可以做中间件，例如实现viteMockServe
 - transformIndexHtml: 用于修改宿主页面
 - resolveId: 确定插件名字，是否接管
 - load: 接管后返回什么
 - transform: 将load进来的代码块进一步加工处理


## 使用
### 初始化
```
// npm
$ npm init vite@latest
// yarn
$ yarn create vite
// pnpm
$ pnpm create vite
```
### 安装包
``` pnpm install ```
### 启动
看`` package.json ``

### 注意点
1. 引入一个[静态资源](https://vitejs.cn/guide/assets.html#importing-asset-as-url)会返回解析后的公共路径（所有的相对地址都被解析成了绝对地址）
    ```import logo from './assets/logo.png' //输出/src/assets/logo.png```
2. [配置别名](https://vitejs.cn/config/#resolve-alias)
  ```
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve('./src'),
        comps: resolve('./src/components')
      }
    }
})
// 使用
background: url('@/logo.svg'); 
```
3. `` vue3 ``使用[`` <script setup> ``](https://v3.cn.vuejs.org/guide/composition-api-setup.html#setup)直接引入模块
4. `` vue ``中`` <style scope> ``(使用：`` class='logo' ``)和`` <style module> ``(使用：`` :class='$style.logo' ``)的区别：
   
   [模块化](https://vitejs.cn/guide/features.html#css-modules)更优，自动给类名添加`` hash ``；也可以直接给样式文件命名`` xx.module.css ``，使用：`` import classes from 'xx.module.css' ``等同于`` <style module> ``；
   
   `` scope ``方式会给元素添加`` data-v ``属性
5. 使用[`` sass ``](https://vitejs.cn/guide/features.html#css-pre-processors)：`` npm i -D sass ``，不需要配`` loader ``，由插件来实现。使用：`` <style lang='scss'> ``
6. `` post-css ``用来加前缀，直接配置`` postcss.config.js ``即可直接生效，`` npm i autoprefixer -D ``
  ```
    module.exports = {
      plugins: [require('autoprefixer')]
    }
  ```
7. [`` ts ``](https://vitejs.cn/guide/features.html#typescript): `` <script lang='ts'> ``，可以在`` tsconfig.json ``中加配置
8. [代理](https://vitejs.cn/config/#server-proxy)：
  ```
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
9. `` mock ``：`` npm i mockjs -S ``和`` npm i vite-plugin-mock -D ``，配置`` vite.config.js ``，创建`` mock ``目录
    ```
      // vite.config.js
      import {viteMockServe} from 'vite-plugin-mock'
      export default definedConfig({
        plugins: [viteMockServe({})]
      })
      // mock接口
      // mock/test.ts
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
10. 代码规范`` eslint+prettier ``，安装依赖，配置`` .eslintrc.js  ``和`` .eslintignore ``
11. `` jest ``：安装依赖，配置`` jest.config.js ``
