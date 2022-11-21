## 路由

- 路由`route`，路由器`router`，多个路由，需要经过路由器的管理
- 为了实现`SPA`单页面应用：部署到后端只有`index.html`，所以路由点击跳转没问题，一旦跳转后刷新页面就会`404`，需要使用`hash`
- 浏览器路径变化后，`vue-router`检测到，展示对应的组件
- 前端路由：返回组件；后端路由：返回函数
- `vue-router4`只能在`vue3`中使用，`vue-router3`才能在`vue2`中使用，是`vue`的插件，所以要用`vue.use(VueRouter)`

### 使用

- 配置`router`：`new VueRouter({})`
  - `mode`：`history | hash`
  - `routes`：路由数组
    - `path`：跳转路径
    - `component`：展示组件
    - `children`：子路由
    - `name`：路由命名，用于`<router-link>`中`to`跳转，简化复杂`path`，`to`必须带`name`跳转
    - `props`
      - 对象：该对象中的所有值都以`props`的形式传给组件，需要在组件中配置`props: ['key']`；用得较少，传递固定数据
      - 布尔值：若`true`，则所有`params`以`props`的形式传递给组件
      - 函数：`function($route) { return { id: $route.query.id } }`简写`props({query: {id, title}}){ return {id, title}}`
    - `meta`：路由元信息，可以配置任意参数
    - `beforeEnter`：独享路由守卫
- 跳转使用`router-link`标签，`<router-link to='/about'>About</router-link>`，可以使用配置激活样式`active-class`
  - `to`可以写字符串或者对象，包含`path`、`query`、`name`
- 指定显示位置`<router-view />`
- 切换路由，组件会被销毁
- 每个路由的`this.$route`不同，`this.$router`相同
- 嵌套路由：配置`children`，二级路由的`path`不加`/`

### 传参

1. `query`参数：通过`this.$route.query`获取参数或者在路由中配置`props({query; {id. title}}){ return {id, title}}`
2. `params`参数：使用`params`不能用`path`作为`to`的传参，必须用`name`
    - 传参：可以直接在`path`后用`/`拼接参数`/detail/123/456`
    - 配置：在`router.js`中配置`path: '/detail/:id/:name'`
    - 获取：`this.$route.params`或者在路由中配置`props: true`，可以用`props: []`接收

### 历史模式

- `push`模式，往堆栈里添加，默认
- `replace`模式，替换，给`<router-link replace>`加`replace`就开启了

### 跳转

1. `<router-link>`
2. `this.$router.push()`传参和`to`一样；`replace`类似
3. 回退`this.$router.back()`或`go`负数、
4. 前进`this.$router.forward()`或`go`正数

### 缓存路由组件

- 使用`keep-alive`包裹`<router-link>`，可以配置`include=组件名`，可以写成数组`:include=['组件1', '组件2']`

### 路由组件生命周期

- 若在`keep-alive`包裹的组件，设置`setInterval`，那么组件切换时，定时器仍然执行
- `activated`
- `deactivated`

### 路由守卫

- 全局前置路由守卫：`router.beforeEach((to, from, next) => {})`初始化路由以及每一次路由切换之前都会执行`beforeEach`里面的回调函数，必须调用`next()`才能往后执行；强调的是路由切换
  - 如果每一个`to`进行权限判断，效率较低，可以在`router`配置时给路由加一个配置，在`meta`中配置一个权限参数，例如`meta:{ isAuth: false }`，直接判断`to.meta.isAuth`即可
- 全局后置路由守卫：`router.afterEach((to, from) => {})`初始化路由以及每一次路由切换之后都会执行`afterEach`里面的回调函数；强调的是路由切换
  - 例如：更改`document.title`
    - 默认项得在`index.html`中的`<title>`中更改，如果是读取`package.json`的`name`，则需要更改`name`
    - 其他路由应该在`router.afterEach`中`document.title = to.meta.title || '默认名'`
- 独享路由守卫：直接配置在路由中`beforeEnter: (to, from, next) => {}`，写逻辑，只对该路由进行权限限制；只有前置没有后置
- 组件内路由守卫：在组件内，强调的是组件更改
  - `beforeRouteEnter(to, from, next)`：通过路由规则（必须是切换路由），进入该组件时被调用，需要调用`next()`
  - `beforeRouteLeave(to, from, next)`：通过路由规则（必须是切换路由），离开该组件时被调用，需要调用`next()`

### 路由工作模式

- `hash`模式：`hash`不会作为路径的一部分发送给服务端；部署到后端只有`index.html`，所以路由点击跳转没问题，一旦跳转后刷新页面就会`404`，需要使用`hash`
- `history`模式：解决`404`问题，需要后端配置，例如`connect-history-api-fallback`

```javascript
// main.js
import VueRouter from 'vue-router'
import router from './router/index'
Vue.use(VueRouter)
new Vue({
  el: '#app',
  render: h => h(App),
  router
})

// router/index.js 创建整个应用的路由器
import VueRouter from 'vue-router'
import About from '../components/About'
export default new Router({
  routes: [
    {
      path: '/about',
      component: About
    },
    {
      path: '/home',
      component: Home,
      children: [{
        path: 'news',
        component: News
     }]
    }
  ]
})
```