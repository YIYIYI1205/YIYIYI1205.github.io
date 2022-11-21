## vuex

- 专门在`vue`中实现集中式状态（数据）管理的一个`vue`插件

### 配置项

- 三个部分，由`store`管理，提供`dispatch`、`commit`方法
  - `actions`：组件中`dispatch()`给`actions`，`actions`是一个对象，其中一定含有`key`值和`dispatch`第一个参数相同，`value`为一个函数；`actions`可以做请求
  - `mutations`：调用`commit()`给`mutations`，`mutations`是一个对象，其中一定含有`key`值和`commit`第一个参数相同，`value`为一个函数，函数可以拿到`state`和数据的数值，执行具体更改数据的表达式，例如`state.sum+=2`；`vue`允许不走`actions`直接`commit()`
  - `state`对象保管数据，`state`可以帮助重新渲染组件
- `vuex4`只能用在`vue3`中，`vuex3`只能用在`vue2`中
- 开发者工具是监控`mutations`状态，因此不要在`actions`中直接对`state`进行改变
- 一般在`actions`中写业务逻辑而不是组件中，因为各组件调用`actions`中方法，只需要写一套
- `getters`：加工`state`中的内容，类似`data`和`computed`的关系

### 方法

- `mapState`和`mapGetters`用于生成计算属性`methods(){sum(){return this.$store.state.sum}}`；这两个方法中的参数可以传对象或数组
- `mapActions`和`mapMutations`用于生成调用`dispatch`和`commit`的方法，注意调用`method`方法的时候需要传参，否则会传`event`；这两个方法中的参数可以传对象或数组

### 模块化

- 创建模块对象，里面分别写入各自的`actions`、 `mutations`、 `state`、 `getters`，其中对应的参数`state`也是该模块下的`state`，导出时通过`export default new Vuex.Store({ modules: {对应的模块} })`
- 使用时需要加上对应模块`this.$store.state.模块`
- `mapState(模块, [对应模块的数据])`第一个参数传模块名，必须在`store`中配置了模块名`namespaced: true`，`mapGetter`同理
- `mapMutations(模块，[对应mutations的key])`，`mapActions`同理
- 如果想直接操作`commit`，需要用`this.$store.commit('模块/对应actions的key', value)`
- `this.$store.getters`无法拿到对应模块，必须是`this.$store.getters[模块/getters的key]`

```javascript

// main.js
import store from './store'
new Vue({
  el: '#app',
  render: h => h(App),
  store
})

// store/index.js  用于创建vuex中的store
import Vue from 'Vue'
import Vuex from 'vuex'
Vue.use(Vuex)  // use之后，就可以创建vm的时候传入配置项store，放在这是因为mian.js需要引入store，加载会有问题

// actions用于响应组件中的动作
const actions = {
  jia: function(context , value) {
    context.commit('JIA', value)
  },
  jiaOdd(context, value) {
    console.log('可以在这里处理很多逻辑')
    // 可以调用另一个action中的回调
    context.dispatch('demo', value)
  },
  damo(context, value) {
    console.log('继续处理逻辑')
    context.dispatch('JIA',value)
  }
}
// mutations用于操作数据
const mutations = {
  JIA(state, value) {
    state.sum += value
  },
  JIAN(state, value) {
    state.sum -= value
  }
}
// state用于存储数据
const state = {
  sum: 0
}
// getters用于将state中的数据进行加工
const getters = {
  bigSum(state){
    return state.sum * 10
  }
}
export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters
})

// 模块化写法
const countOptions = {
  namespaced: true,
  actions: {},
  mutations: {},
  state: {},
  getters: {}
}
const personOptions = {
  namespaced: true,
  actions: {},
  mutations: {},
  state: {},
  getters: {}
}
export default new Vuex.Store({
  modules: {
    countOptions,
    personOptions
  }
})

// Count.vue 组件
<template>
  <div>{{sum}}</div>
  <div>{{$store.getters.bigSum}}</div>
</template>
<script>
import {mapState, mapGetter, mapActions, mapMutations} from 'vuex'
export default {
  methods: {
    increment() {
      this.$store.dispatch('jia', this.n)
    },
    decrement() {
      this.$store.commit('JIAN', this.n) // 没有业务逻辑就直接走mutation
    },
    // 下面的写法调用方法的时候需要传参
    ...mapActions({
      increment: 'jia'
    }),
    ...mapMutations(['JIAN']) // 当方法名和Mutations中名字对应，可以传递数组简写
  },
  computed() {
    ...mapState({
      sum: 'sum',
      school: 'school'
    }),
    // 简写：
    ...mapState(['sum', 'school'])
    ...mapGetters(['bigSum'])
  }
}
</script>
```