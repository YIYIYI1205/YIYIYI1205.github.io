# Vue3

- 性能提升
  - 打包大小减少
  - 渲染更快
  - 内存减少
- 源码
  - 使用`proxy`
  - 重写虚拟`DOM`和`tree-shaking`
- 支持`ts`
- 新特性

## 创建工程

- `@vue-cli`版本在`4.5.0`以上
- 使用`vite`
  - 无需打包，快速冷启动
  - 轻量快速的热重载
  - 真正的按需编译，不再等待整个应用编译完成

```javascript
// 引入的不再是Vue的构造函数了，引入的是一个名为createApp的工厂函数
import { createApp } from 'vue'
import App from 'App.vue'
// const app = createApp(App)类似于vue2中的new vue创建的vm，但是app更轻
createApp(App).mount('#app')
// 不兼容vue2的new Vue写法
```

- 可以没有根标签了

## 组合式 API

### setup

- 应优先使用`<script setup>`语法
- 若不使用`<script setup>`
  - 组件中所用到的数据、方法等等，均要配置在`setup`方法中，并且返回需要用到的数据和方法
  - `setup`方法不能是`async`函数
  - 返回值
    - 返回一个对象，则对象中的属性、方法在模板中均可以直接使用，在模板中访问从`setup`返回的`ref`时，它会自动浅层解包，因此你无须再在模板中为它写`.value`
    - 返回一个渲染函数，则可以自定义渲染内容，需要引入渲染函数，`import {h} from vue`，返回渲染函数：`return () => h('h1', 'xxx')`
  - `data`和`methods`还可以使用，不建议混着写，有可能读不出来
  - 执行时机：在`beforeCreate`之前执行一次，`this`是`undefined`，所以不要在`setup`中写`this`
  - 接收参数`setup(props, context)`：
    - `props`：并且在`setup`外配置`props: []`，否则`undefined`
    - `context`：
      - 包含`attrs`，与`vm.$attrs`用法一致
      - 包含`slots`，等价于`$slots`，尽量使用`v-slot:名字`
      - 包含`emit`，等价于`$emit`，不需要在`setup`外配置`emits:[事件名]`
      - 包含`expose`，暴露公共属性（函数）

```javascript
import { ref } from 'vue'
export default {
  setup() {
    const count = ref(0)
    // 返回值会暴露给模板和其他的选项式 API 钩子
    return {
      count
    }
  },
  mounted() {
    console.log(this.count) // 0，无须.value
  }
}
```

### 响应式

- 都需要从`vue`引入
- `ref`
  - 实现数据的响应式，`import { ref } from vue`，定义函数的时候需要把数据给`ref`方法，生成一个`RefImpl`引用对象，会将传入的内容代理到`value`上
  - 其中基本数据类型`value`使用`Object.definedProperty`的`get`和`set`进行数据劫持，更改时`set`中封装了渲染页面的方法；所以更改属性是给变量的`value`进行修改；不需要`return`出`.value`，因为模板中自动会`.value`
  - 引用类型使用`proxy`进行代理（`ref`调用`reactive`函数，其中实现了`proxy`），更改数据`obj.value.key`直接修改；对于数组来说也可以直接用索引修改
- `reactive`
  - 定义一个对象类型的响应式数据
  - 如果用`reactive`函数直接创建一个对象，返回一个`Proxy`对象，不需要调用`value`
  - 可以直接用`reactive`创建对象，还可以把基本数据类型全部合成一个对象
- `computed`
  - 接受一个`getter`函数，返回一个只读的响应式`ref`对象
  - `const double = computed(() => count.value * 2)`
  - 如果想要创建可写的`ref`，要配置`set`函数
- `readonly`
  - 接受一个对象 (不论是响应式还是普通的) 或是一个`ref`，返回一个原值的只读代理
- `watchEffect`
  - 立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行
  - 引入`watchEffect`：`import { watchEffect } from 'vue'`
  - 直接写回调函数，回调函数中用到谁就监视谁
  - 有点像`computed`
    - 但`computed`注重的是计算出来的值，需要写返回值
    - `watchEffect`注重过程，不需要返回值
- `watch`
  - 侦听一个或多个响应式数据源，并在数据源变化时调用所给的回调函数
  - 第一个参数是侦听器的源
    - 一个函数，返回一个值
    - 一个`ref`
    - 一个响应式对象
      - 监视`reactive`定义的引用类型响应式数据，无法正确获取`oldValue`，并且监视完整对象，`deep`失效
      - 监视对象中的某一个属性第一个参数得写成回调函数`watch(() => person.name, () => {})`
      - 监视对象中的某些属性，数组里写回调函数`watch([() => person.name, () => person.age], () => {})`，并且如果监视的某个属性是类型是对象，必须写`deep: true`
    - 或是由以上类型的值组成的数组
  - 监视基本数据类型不加`value`；当对象用`ref`定义时，就要加`value`，或者用`deep: true`
  - 与`watchEffect()`相比，`watch()`使我们可以：
    - 懒执行副作用
    - 更加明确是应该由哪个状态触发侦听器重新执行
    - 可以访问所侦听状态的前一个值和当前值

  ```javascript
  const state = reactive({ count: 0 })
  /* 侦听一个 getter 函数 */
  watch(
    () => state.count,
    (count, prevCount) => {
      /* ... */
    }
  )
  /* 当侦听多个来源时 */
  watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
    /* ... */
  })
  ```

### 工具函数

- `isRef`：检查某个值是否是`ref`
- `unref`：如果参数是`ref`，则返回内部值，否则返回参数本身
- `toRef`
  - 创建一个`ref`对象，其`value`值指向另一个对象中的某个属性，新创建的和这个对象是关联的
  - `const name = toRef(person, 'name')`
  - 使用场景：在`setup`中将对象的某个属性暴露出去时，会丢失响应式（因为相当于新赋值给一个变量），可以使用`toRef`，不能使用`ref`，因为`ref`不存在和之前对象的引用关系
  
  ```javascript
  const state = reactive({
    foo: 1,
    bar: 2
  })
  const fooRef = toRef(state, 'foo')
  // 更改该 ref 会更新源属性
  fooRef.value++
  console.log(state.foo) // 2
  // 更改源属性也会更新该 ref
  state.foo++
  console.log(fooRef.value) // 3
  ```

- `toRefs`
  - 将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的`ref`
  - `toRefs`可以处理一个对象中的多个参数，返回一个对象；`toRefs(obj)`可以返回整个对象中所有参数的引用
- `isProxy`
  - 检查一个对象是否是由`reactive()`、`readonly()`、`shallowReactive()`或`shallowReadonly()`创建的代理
- `isReactive`
- `isReadonly`

### 进阶

- `shadowReactive`和`shadowRef`浅层次的，`shadowReactive`只处理对象最外层的响应式；`shadowRef`只处理基本数据类型的响应式
- `readOnly`和`shadowReadOnly`，使用：`obj = readOnly(obj)`；`shadowReadOnly`只不让改第一层对象，嵌套的可以修改
- `toRaw`和`markRaw`：转换为原本对象；`markRaw`用于添加对象中的某个属性为对象类型，若正常添加自动为响应式，要求不是响应式时使用`markRaw`
- `customRef`：创建一个自定义的`ref`，并对其依赖项跟踪和更新触发进行显式控制

### 生命周期钩子

- 组合式`API`：配置在`setup`中，需要从`vue`中引入
  - `beforeCreate ===> setup`
  - `created ===> setup`
  - `beforeMount ===> onBeforeMount`
  - `mounted ===> onMounted`
  - `beforeUpdate ===> onBeforeUpdate`
  - `updated ===> onUpdated`
  - `beforeUnmount ===> onBeforeUnmount`
  - `unmounted ===> onUnmounted`
- 如果将组合式`api`和生命周期一起写，执行顺序是：`setup -> beforeCreate -> created -> onBeforeMount -> beforeMount -> onMounted -> mounted`

### 依赖注入

- 需要从`vue`引入`provide`和`inject`

## 单文件组件

### `<script setup>`

- 由于组件是通过变量引用而不是基于字符串组件名注册的，在 `<script setup>`中要使用动态组件的时候，应该使用动态的`:is`来绑定
- 可以使用`defineProps`和`defineEmits`，它们将自动地在`<script setup>`中可用

### CSS功能

#### 组件作用域

- `scoped`只会影响当前组件的元素，父组件的样式将不会渗透到子组件中
- `:deep()`可以影响子组件
- `:slotted()`将插槽内容作为选择器
- `:global()`应用到全局

#### CSS Modules

- 一个`<style module>`标签会被编译为`CSS Modules`并且将生成的`CSS class`作为`$style`对象暴露给组件
- 可以自定义注入`class`对象的属性名
  
  ```html
  <template>
    <p :class="classes.red">red</p>
  </template>

  <style module="classes">
  .red {
    color: red;
  }
  </style>
  ```

- 以通过`useCssModule`在`setup()`和`<script setup>`中访问注入的`class`，`import { useCssModule } from 'vue';`
- 支持使用`v-bind`函数将`CSS`的值链接到动态的组件状态

    ```html
  <script setup>
  const theme = {
    color: 'red'
  }
  </script>
  <template>
    <p>hello</p>
  </template>
  <style scoped>
  p {
    color: v-bind('theme.color');
  }
  </style>
  ```

## 自定义hook

- 本质是一个函数，把`setup`函数中使用的`composition API`进行了封装
- 将复用的方法提出，存在`hooks`文件夹下，通过函数暴露给需要的组件

## 异步组件

- 在大型项目中，我们可能需要拆分应用为更小的块，并仅在需要时再从服务器加载相关组件

```javascript
import { defineAsyncComponent } from 'vue'
const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
```

## 对比vue2响应式

- `vue2`的响应式
  - 对象类型：通过`Object.definedProperty`对属性的读取、修改进行拦截（数据劫持）
  - 数组类型：通过重写更新数组的一系列方法来实现拦截（对数组的变更方法进行了包裹）
  - 存在的问题：新增属性、删除属性，界面不会更新；直接通过下标修改数组，界面不会更新
- `vue3`的响应式
  - 通过`Proxy`代理：拦截对象中任意属性的变化，包括：属性值的读写、属性的添加、属性的删除等
  - 属性的`Reflect`：对被代理对象的属性进行操作，返回值表示是否反射成功
    - `Object.definedProperty`定义属性重复，报错，必须使用`try``catch`捕获；`Reflect.definedProperty`不会报错

```javascript
let person = {
  name: '111',
  age: 18
}
// vue2实现响应式
let p = {}
Object.defineProperty(p, 'name', {
  get() {
    return person.name
  },
  set() {
    console.log('此时更新vue界面')
    person.name = name
  }
})
p.sex = '123' // 没有响应式

// vue3实现响应式
const p = new Proxy(person, {
  // target就是person
  get(target, propName) { // 只要读取p的某个属性
    return Reflect.get(target, propName)
    // return target[propName]
  },
  set(target, propName, value) { // 只要修改p的某个属性，添加也可以捕获
    console.log('此时更新vue界面')
    // target[propName] = value
    Reflect.set(target, propName, value)
  },
  deleteProperty(target, propName) { // 捕获删除
    console.log('此时更新vue界面')
    // return delete target[propName]
    return Reflect.deleteProperty(target, propName)
  }
})
```
