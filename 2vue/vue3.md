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

### 创建工程

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

### 常用Composition API

- `setup`
  - 组件中所用到的数据、方法等等，均要配置在`setup`中，不能是`async`函数
  - 返回值
    - 返回一个对象，则对象中的属性、方法在模板中均可以直接使用
    - 返回一个渲染函数，则可以自定义渲染内容，需要引入渲染函数，`import {h} from vue`，返回渲染函数：`return () => h('h1', 'xxx')`
  - `data`和`methods`还可以使用，不建议混着写，有可能读不出来
  - 执行时机：在`beforeCreate`之前执行一次，`this`是`undefined`，所以不要在`setup`中写`this`
  - 接收参数：`props`：并且在`setup`外配置`props: []`；`context`：包含`attrs`，与`vm.$attrs`用法一致；`emit`用于触发事件，需要在`setup`外配置`emits:[事件名]`；`slots`插槽，尽量使用`v-slot:名字`
  - `ref`函数：实现数据的响应式，`import {ref} from vue`，定义函数的时候需要把数据给`ref`方法，生成一个`RefImpl`引用对象，会将传入的内容代理到`value`上
    - 其中基本数据类型`value`使用`Object.definedProperty`的`get`和`set`进行数据劫持，更改时`set`中封装了渲染页面的方法；所以更改属性是给变量的`value`进行修改；不需要`return`出`.value`，因为模板中自动会`.value`
    - 引用类型使用`proxy`进行代理（`ref`调用`reactive`函数，其中实现了`proxy`），更改数据`obj.value.key`直接修改；对于数组来说也可以直接用索引修改
  - `reactive`函数
    - 定义一个对象类型的响应式数据
    - 如果用`reactive`函数直接创建一个对象，返回一个`Proxy`对象，不需要调用`value`
    - 可以直接用`reactive`创建对象，还可以把基本数据类型全部合成一个对象

```javascript
export default {
  name: 'App',
  setup() {
    let name = ref('123')
    let obj = ref({
      a: 1,
      b: '2'
    })
    function sayHello() {
      name.value = '234'
      obj.value.a = 3
    }
    return {
      name, // 这里没有写name.value因为模板里自动.value了
      obj,
      sayHello
    }
  }
}
```

### 对比vue2响应式

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

### 计算属性

- 继续使用`computed`是可以的，但不推荐
- 引入`computed`：`import {computed} from 'vue'`
- 在`setup`中定义计算属性，要调用`const params = computed(() => {} )`传递回调函数，并`return`返回该计算属性
- 完整写法和之前类似：`computed({get(){}, set(value){}})`

### watch

- 引入`watch`：`import {watch} from 'vue'`
- 在`setup`中调用`watch`
  - 监视`ref`定义的一个响应式数据`watch(属性, (newValue, oldValue) => {}, {配置})`
  - 监视`ref`定义的多个响应式数据`watch([属性1, 属性2], (newValueArray, oldValueArray) => {}, {immediate: true})`
  - 监视`reactive`定义的引用类型响应式数据，无法正确获取`oldValue`，并且监视完整对象，`deep`失效
  - 监视对象中的某一个属性第一个参数得写成回调函数`watch(() => person.name, () => {})`
  - 监视对象中的某些属性，数组里写回调函数`watch([() => person.name, () => person.age], () => {})`，并且如果监视的某个属性是类型是对象，必须写`deep: true`
- 监视基本数据类型不加`value`；当对象用`ref`定义时，就要加`value`，或者用`deep: true`

### watchEffect函数

- 引入`watchEffect`：`import {watchEffect} from 'vue'`
- 直接写回调函数，回调函数中用到谁就监视谁
- 立即执行
- 有点像`computed`
  - 但`computed`注重的是计算出来的值，需要写返回值
  - `watchEffect`注重过程，不需要返回值

### 生命周期

- `beforeUnmount`
- `unmounted`
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

### 自定义hook

- 本质是一个函数，把`setup`函数中使用的`composition API`进行了封装
- 将复用的方法提出，存在`hooks`文件夹下，通过函数暴露给需要的组件

### toRef和toRefs

- 创建一个`ref`对象，其`value`值指向另一个对象中的某个属性
- `const name = toRef(person, 'name')`
- 使用场景：在`setup`中将对象的某个属性暴露出去时，会丢失响应式（因为相当于新赋值给一个变量），可以使用`toRef`，不能使用`ref`，因为`ref`不存在和之前对象的引用关系
- `toRefs`可以处理一个对象中的多个参数，返回一个对象；`toRefs(obj)`可以返回整个对象中所有参数的引用

### 其它composition API

- `shadowReactive`和`shadowRef`浅层次的，`shadowReactive`只处理对象最外层的响应式；`shadowRef`只处理基本数据类型的响应式
- `readOnly`和`shadowReadOnly`，使用：`obj = readOnly(obj)`；`shadowReadOnly`只不让改第一层对象，嵌套的可以修改
- `toRaw`和`markRaw`：转换为原本对象；`markRaw`用于添加对象中的某个属性为对象类型，若正常添加自动为响应式，要求不是响应式时使用`markRaw`
- `customRef`：创建一个自定义的`ref`，并对其依赖项跟踪和更新触发进行显式控制




- defineProps, 不写required，会有undefined类型