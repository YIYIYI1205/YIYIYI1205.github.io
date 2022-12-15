# Pinia

- 安装：`npm install pinia`
- 引入：`import { createPinia } from 'pinia'`
- 创建`store`：`import { defineStore } from 'pinia'`
- 使用：引入`store`调用方法后，直接可以获取属性、调用`actions`的方法
  - 使用`store`时直接解构赋值会失去响应式
  - `storeToRefs`可以解决（需要引入）：`const { name, doubleCount } = storeToRefs(store)`
- 省去了`mutation`并且不需要`dispatch`

```javascript
// vue3
// main.js，引入
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
const pinia = createPinia()
createApp(App).use(pinia).mount('#app')
// store/index.js
import { defineStore } from 'pinia'
export default defineStore('main', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    }
  }
})
```

## store

- `state`、`getter`和`action`，相当于组件中的`data`、 `computed`和`methods`
- 常规写法

```javascript
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```

- `setup`写法

```javascript
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const double = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  return { count, double, increment }
})
```

## State

- 重置`state`：`store.$reset()`
- 将`state`定义为计算属性，不使用组合式`API`：只读`import { mapState } from 'pinia'`，可写`mapWritableState`
- 改变`state`：直接更改`state`或者`store.$patch`

## Getter

- `getter`只是幕后的计算属性，不可以传参，如果非要传，可以从`getter`返回一个函数，函数可以接受参数
- 可以访问其它`getter`，和使用`store`方法一样

## Action

- 是定义业务逻辑的完美选择
- `action`和`getter`不同的是可以异步

## 插件

- 每个`store`添加特定属性：`pinia.use(() => { key: value})`或者`pinia.use(({store}) => { store.key = value})`
- 添加新的`state`：必须在两个地方添加，`store`和`store.$state`
- 使用`setup`时，`definedStore`的第三个参数，将被一个插件读取

```javascript
import { createPinia } from 'pinia'
export function myPiniaPlugin(context) {
  context.pinia // 用 `createPinia()` 创建的 pinia。 
  context.app // 用 `createApp()` 创建的当前应用(仅 Vue 3)。
  context.store // 该插件想扩展的 store
  context.options // 定义传给 `defineStore()` 的 store 的可选对象。
  // ...
  return { secret: 'the cake is a lie' }
}
const pinia = createPinia()
// 将该插件交给 Pinia
pinia.use(myPiniaPlugin)
// 使用
const store = useStore()
store.secret
```

```javascript
import debounce from 'lodash/debounce'

pinia.use(({ options, store }) => {
  if (options.debounce) {
  }
})
defineStore(
  'search',
  () => {
    // ...
  },
  {
    // 这将在后面被一个插件读取
    debounce: {
      // 让 action searchContacts 防抖 300ms
      searchContacts: 300,
    },
  }
)
```
