# 路由

- 路由`route`，路由器`router`，多个路由，需要经过路由器的管理
- 为了实现`SPA`单页面应用：部署到后端只有`index.html`，所以路由点击跳转没问题，一旦跳转后刷新页面就会`404`，需要使用`hash`
- 浏览器路径变化后，`vue-router`检测到，展示对应的组件
- 前端路由：返回组件；后端路由：返回函数
- `vue-router4`只能在`vue3`中使用，`vue-router3`才能在`vue2`中使用，是`vue`的插件，所以要用`vue.use(VueRouter)`
- `vue-router3`安装：`yarn add vue-router@3`

## 基础

- `router-link`：可以在不重新加载页面的情况下更改`URL`，处理`URL`的生成以及编码，可以使用配置激活样式`active-class`，`to`可以写字符串或者对象，包含`path`、`query`、`name`
- `router-view`：将显示与`url`对应的组件，可以放在任何地方
- 配置
  
  ```javascript
  // vue2
  // main.js
  import Vue from 'vue'
  import App from './App.vue'
  import router from './router/index'
  new Vue({
    el: '#app',
    render: h => h(App),
    router
  })

  // router/index.js 创建整个应用的路由器
  import Vue from 'vue'
  import Router from 'vue-router'
  import IndexVue from '../view/index.vue'
  import Home from '../view/home.vue'
  Vue.use(Router)
  const router = new Router({
      routes: [{
          path: '/index',
          component: IndexVue
      },
      {
          path: '/home',
          component: Home
      }]
  })
  export default router
  ```

  ```javascript
  // vue3
  // main.js
  import { createApp } from 'vue'
  import App from './App.vue'
  import router from './router/index'

  createApp(App).use(router).mount('#app')

  // router/index.js 创建整个应用的路由器
  import { createRouter, createWebHashHistory } from 'vue-router'
  import Index from '../view/index.vue'
  import Home from '../view/home.vue'
  const router = createRouter({
      history: createWebHashHistory(),
      routes: [{
          path: '/index',
          component: Index
      },
      {
          path: '/home',
          component: Home
      }]
  })
  export default router
  ```

- 可以通过`this.$route`访问当前路由，`setup`中引入`useRoute`，每个路由的`this.$route`不同，`this.$router`相同
- 切换路由，组件会被销毁

### 动态路由

1. `query`参数：通过`this.$route.query`获取参数或者在路由（`router/index.js`）中配置`props: route => ({ query: route.query.q })`
2. `params`参数：使用`params`不能用`path`作为`to`的传参，必须用`name`
    - 传参：可以直接在`path`后用`/`拼接参数`/detail/123/456`
    - 配置：在`router.js`中配置`path: '/detail/:id/:name'`
    - 获取：`this.$route.params`或者在路由（`router/index.js`）中配置`props: true`，可以用`props: []`接收

### 编程式路由

- 跳转路由：`this.$router.push`，相当于`<router-link :to="...">`
- 替换路由：`this.$router.replace`，在导航时不会向`history`添加新记录，`<router-link replace>`加`replace`就开启了
- 横跨历史：回退`this.$router.back()`或`go`负数，前进`this.$router.forward()`或`go`正数

### 重定向和别名

```javascript
{
  // /search/screens -> /search?q=screens
  path: '/search/:searchText',
  redirect: to => {
    // 方法接收目标路由作为参数
    // return 重定向的字符串路径/路径对象
    return { path: '/search', query: { q: to.params.searchText } }
  },
}
```

### 不同的历史记录模式

- `hash`模式：使用`createWebHashHistory`，`hash`不会作为路径的一部分发送给服务端；部署到后端只有`index.html`，所以路由点击跳转没问题，一旦跳转后刷新页面就会`404`，需要使用`hash`
- `history`模式：使用`createWebHistory`，解决`404`问题，需要后端配置，例如`connect-history-api-fallback`

## 进阶

### 导航守卫

- 全局前置路由守卫：`router.beforeEach((to, from, next) => {})`初始化路由以及每一次路由切换之前都会执行`beforeEach`里面的回调函数；强调的是路由切换
  - `vue-router3`必须调用`next()`才能往后执行，可以给`next()`传其它路由
  - `vue-router4`可以`return true`或者`undefined`或者`return false`（拒绝跳转）
  - 如果每一个`to`进行权限判断，效率较低，可以在`router`配置时给路由加一个配置，在`meta`中配置一个权限参数，例如`meta:{ isAuth: false }`，直接判断`to.meta.isAuth`即可
- 全局后置路由守卫：`router.afterEach((to, from) => {})`初始化路由以及每一次路由切换之后都会执行`afterEach`里面的回调函数；强调的是路由切换，对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用
  - 例如：更改`document.title`
    - 默认项得在`index.html`中的`<title>`中更改，如果是读取`package.json`的`name`，则需要更改`name`
    - 其他路由应该在`router.afterEach`中`document.title = to.meta.title || '默认名'`
- `vue-router4`独有的全局解析守卫：`router.beforeResolve`，获取数据或执行任何其他操作（如果用户无法进入页面时你希望避免执行的操作）的理想位置
- 独享路由守卫：直接配置在路由中`beforeEnter: (to, from, next) => {}`，写逻辑，只对该路由进行权限限制；只有前置没有后置，只在进入路由时触发，不会在`params`、`query`或`hash`改变时触发
- 组件内路由守卫：在组件内，强调的是组件更改
  - `beforeRouteEnter(to, from, next)`：通过路由规则（必须是切换路由），进入该组件时被调用，`vur-router3`需要调用`next()`，不能访问`this`，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建
  - `beforeRouteLeave(to, from, next)`：通过路由规则（必须是切换路由），离开该组件时被调用，`vur-router3`需要调用`next()`，离开守卫通常用来预防用户在还未保存修改前突然离开。该导航可以通过返回`false`来取消
  - `setup`中，`beforeRouteUpdate`和`beforeRouteLeave`被替换为`onBeforeRouteUpdate`和`onBeforeRouteLeave`

### 组合式API

- `import { useRouter, useRoute } from 'vue-router'`，跳转路由使用`useRouter().push()`
- 守卫`import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'`

### 滚动行为

```javascript
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...],
  scrollBehavior(to, from, savedPosition) {
    // 始终在元素 #main 上方滚动 10px
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        // 也可以这么写
        // el: document.getElementById('main'),
        el: '#main',
        top: -10,
        // 跳转到锚点
        // el: to.hash,
        // 滚动更流畅
        behavior: 'smooth',
      }
    }
  },
})
```

### 路由懒加载

- 用动态导入代替静态导入组件`const UserDetails = () => import('./views/UserDetails.vue')`
- 使用`webpack把组件按组分块`：`const UserDetails = () => import(/* webpackChunkName: "group-user" */ './UserDetails.vue')`

## 其它

### 配置参数

- 配置`router`：`new VueRouter({})`
  - `mode`：`history | hash`
  - `routes`：路由数组
    - `path`：跳转路径
    - `component`：展示组件
    - `children`：子路由，二级路由的`path`不加`/`
    - `name`：路由命名，用于`<router-link>`中`to`跳转，简化复杂`path`，`to`必须带`name`跳转
    - `props`
      - 对象：该对象中的所有值都以`props`的形式传给组件，需要在组件中配置`props: ['key']`；用得较少，传递固定数据
      - 布尔值：若`true`，则所有`params`以`props`的形式传递给组件
      - 函数：`function($route) { return { id: $route.query.id } }`简写`props({query: {id, title}}){ return {id, title}}`
    - `meta`：路由元信息，可以配置任意参数
    - `beforeEnter`：独享路由守卫

### 缓存路由组件

- 使用`keep-alive`包裹`<router-link>`，可以配置`include=组件名`，可以写成数组`:include=['组件1', '组件2']`

### 路由组件生命周期

- 若在`keep-alive`包裹的组件，设置`setInterval`，那么组件切换时，定时器仍然执行
- `activated`
- `deactivated`
