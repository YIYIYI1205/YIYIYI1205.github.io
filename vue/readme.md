# Vue

- 一套用于构建用户界面的渐进式(大小应用都可以用)`JavaScript`框架
- 特点
  - 组件化
  - 声明式编码
  - 虚拟`DOM` `+`  `Diff`算法
- 没有完全遵循`mvvm`，`m`：`data`中的数据，`v`：模板，`vm`：`Vue`实例对象，包含数据绑定和`dom`监听

## 安装

### 直接用`<script>`引入

- 开发版本：包含完整的警告和调试模式
- 直接在浏览器中可以拿到`$vm`对象，更改值，动态更新数据显示在页面上
  
  ```html
  <div id="app">{{message}}</div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></s>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        message: 'abx'
      }
    })
  </script>
  ```

## 模板语法

### 插值

- 可以在`{{}}`中写任何`Vue`实例`vm`上的属性以及`Vue`原型上的属性，例如`$options`、`Vue`原型上的`$emit`，`data`中的属性能够使用在插值中也是因为`data`中的属性在`Vue`实例`vm`上

### 指令

- 属性绑定动态值：`v-bind:属性='变量'`或`:属性='变量'`，单向数据绑定
- 双向数据绑定：`v-model`，只能应用到有`value`的表单类元素上

## API

### 全局配置

- `vue.config`文件
  - `productionTip: false`阻止`vue`在启动时生成生产提示

### 选项/数据

- `data: Object | Function`，组件必须用`function`，此处的`this`是`Vue`实例，如果写成箭头函数`this`是全局`window`；`$data`实现数据代理

### 选项/DOM

- `$mount`绑定元素，类似`el`；`vm.$mount('#root')`

## 原理

### Object.defineProperty

- `Object.defineProperty(obj, prop, descriptor)`
- `descriptor`配置项
  - `value`
  - `enumerable`可枚举的
  - `writable`可写的
  - `configurable`可删除的
  - `get`读取时调用，使用`get`更改过的属性，输出时值显示`(...)`，点击后才会显示
  - `set(value)`修改时调用
- 数据代理：一个对象代理对另一个对象中属性的操作(读/写)
- `vm`上的属性是通过数据代理添加的，`data`被存在`vm._data = data`，`vm._data === vm.$data`
  
  ```javascript
  const data = {
    name: 'xxx'
  }
  const vm = new Vue({
    el: '#root',
    data
  })
  // 控制台输出 vm._data = data  true
  // 内部 vm._data = options.data = data
  Object.defineProperty(vm, 'name', {
    get() {
      return vm._data.name
    },
    set(value) {
      vm._data.name = value
    }
  })
  ```