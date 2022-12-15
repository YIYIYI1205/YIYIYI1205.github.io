# vuex

- 专门在`vue`中实现集中式状态（数据）管理的一个`vue`插件
- 安装：`vue2`：`npm install vuex@3 --save`（必须用3版本），`vue3`：`npm install vuex@next --save`（必须用4版本）
- 使用：`vue2`：获取`this.$store.state`和变更`this.$store.commit()`，`vue3`：`import { useStore } from 'vuex'`

```javascript
// vue2：store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
store.commit('increment')
console.log(store.state.count)
// main.js注入store
import store from './store/index'
new Vue({
  el: '#app',
  store
})
// 组件中通过this.$store.state
console.log(this.$store.state.count)
this.$store.commit('increment')

// vue3：store/index.js
import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
createApp(App).use(store)

// store/index.js
import { createStore } from 'vuex'

// 组件中通过import { useStore } from 'vuex'
import { useStore } from 'vuex'
const store = useStore()
```

## 配置项

- 三个部分，由`store`管理，提供`dispatch`、`commit`方法
  - `state`对象保管数据，`state`可以帮助重新渲染组件
  - `mutations`：调用`commit()`给`mutations`，`mutations`是一个对象，其中一定含有`key`值和`commit`第一个参数相同，`value`为一个函数，函数可以拿到`state`和数据的数值，执行具体更改数据的表达式；`vue`允许不走`actions`直接`commit()`，`mutations`都是同步事务；处理异步使用`actions`
    - 需要增加新属性时，最好用`set`或者新对象替换`state.obj = { ...state.obj, newProp: 123 }`
    - 使用常量代替事件类型

    ```javascript
    const INCREMENT = 'increment'
    mutations: {
      [INCREMENT] (state, payload) {
        state.count += payload.amount
      }
    }
    // 调用方式1
    store.commit(INCREMENT, {
      amount: 10
    })
    // 调用方式2
    store.commit({
      type: INCREMENT,
      amount: 10
    })
    ```
  
  - `actions`：组件中`dispatch()`给`actions`，`actions`是一个对象，其中一定含有`key`值和`dispatch`第一个参数相同，`value`为一个函数；`actions`可以做请求；
    - 一般在`actions`中写业务逻辑而不是组件中，因为各组件调用`actions`中方法，只需要写一套
  
  ```javascript
  actions: {
    checkout ({ commit, state }, products) {
      // 把当前购物车的物品备份起来
      const savedCartItems = [...state.cart.added]
      // 发出结账请求，然后乐观地清空购物车
      commit(types.CHECKOUT_REQUEST)
      // 购物 API 接受一个成功回调和一个失败回调
      shop.buyProducts(
        products,
        // 成功操作
        () => commit(types.CHECKOUT_SUCCESS),
        // 失败操作
        () => commit(types.CHECKOUT_FAILURE, savedCartItems)
      )
    },
    actionA ({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('someMutation')
          resolve()
        }, 1000)
      })
    },
    actionB ({ dispatch, commit }) {
      return dispatch('actionA').then(() => {
        commit('someOtherMutation')
      })
    }
  }
  // 分发
  store.dispatch('increment')
  store.dispatch('actionA').then(() => {
    // ...
  })
  ```

- 开发者工具是监控`mutations`状态，因此不要在`actions`中直接对`state`进行改变
- `getters`：加工`state`中的内容，类似`data`和`computed`的关系，参数`state`和`getters`，可以返回属性或者方法，通过`store.getters.属性/方法`访问
  
  ```javascript
  const store = new Vuex.Store({
    state: {
      todos: [
        { id: 1, text: '...', done: true }
      ]
    },
    getters: {
      doneTodos: (state, getters) => {
        return state.todos.filter(todo => todo.done)
      },
      getTodoById: (state) => (id) => {
        return state.todos.find(todo => todo.id === id)
      }
    }
  })
  // 组件中访问
  store.getters.getTodoById(2)
  ```

### 方法

- 需要从`vuex`中引入
- `mapState`：生成计算属性，当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余
  
  ```javascript
  computed: {
    ...mapState({
      count, // 这种就是count:"count", 的简写
      repeatCount: "count2", // 当组件中与vuex中的字符已经出现重复时，使用 repeatCount 来映射 store.state.count2
      count3: (state) => { // 映射 count3 为 store.state.conut3的值
        return state.count3
      },
      helloName: function (state) { // 为了能够使用 `this` 获取局部状态，必须使用常规函数，不能使用箭头函数
        return this.hello + state.name
      },
    })
  }
  ```

- `mapGetters`类似`mapState`
- `mapActions`和`mapMutations`用于生成调用`dispatch`和`commit`的方法，注意调用`method`方法的时候需要传参，否则会传`event`；这两个方法中的参数可以传对象或数组
  
  ```javascript
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
  ``

### 模块化

- 创建模块对象，里面分别写入各自的`actions`、 `mutations`、 `state`、 `getters`，其中对应的参数`state`也是该模块下的`state`，导出时通过`export default new Vuex.Store({ modules: {对应的模块} })`
- 可以通过`rootSate`获取根节点状态
- 使用时需要加上对应模块`this.$store.state.模块`
- `mapState(模块, [对应模块的数据])`第一个参数传模块名，必须在`store`中配置了模块名`namespaced: true`，`mapGetter`同理
- `mapMutations(模块，[对应mutations的key])`，`mapActions`同理
- 如果想直接操作`commit`，需要用`this.$store.commit('模块/对应actions的key', value)`
- `this.$store.getters`无法拿到对应模块，必须是`this.$store.getters[模块/getters的key]`

### 表单处理

- 如果使用`v-model`的变量是`store`中的`state`，可以双向绑定计算属性
  
  ```javascript
  computed: {
    message: {
      get () {
        return this.$store.state.obj.message
      },
      set (value) {
        this.$store.commit('updateMessage', value)
      }
    }
  }
  ```

```javascript
// vue2
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
