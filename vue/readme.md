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

- 属性绑定动态值：`v-bind:属性='变量'`或`:属性 ='变量'`，单向数据绑定
- 双向数据绑定：`v-model`，只能应用到有`value`的表单类元素上
- 事件处理：`v-on:click="函数名"`或`@click`，配合`methods`定义方法，普通函数`this`指向`vm`，若不传参，默认第一个参数为`event`；若传别的参数，用`$event`传递`event`，`@click=handleClick($event, params1)`；`methods`中定义的方法也在`vm`对象身上，但是不是数据代理，`data`会被数据代理，而`methods`不会，因此如果在`data`中写方法也可以使用，但是浪费资源
  - 事件修饰符，可以连写
    - 阻止默认事件：`@click.prevent`
    - 阻止事件冒泡：`@click.stop`
    - 事件只触发一次：`@click.once`
    - 事件捕获模式：`@click.capture`
    - 只有`event.target`是当前操作的元素时才触发事件：`@click.self`
    - 事件的默认行为立即执行，无需等待事件回调执行完毕`@click.passive`
  - 事件
    - `@scroll`：滚动条
    - `@wheel`：鼠标滚动轮，先执行回调函数，再执行滚动行为，此时可以使用`passive`
    - `@keydown`
    - `@keyup`
  - 按键别名
    - 回车：`@keyup.enter`，无需判断输入回车时才执行函数
    - 删除：`.delete`，捕获删除和退格键
    - 退出：`.esc`
    - 空格：`.space`
    - 换行：`.tab`，会将光标从元素上切走，需要使用`@kepdown`
    - 上：`.up`
    - 下：`.down`
    - 左：`.left`
    - right：`.right`
    - 除此之外的遵循单词小写，连词中间用'-'，如`.caps-lock`
    - 系统修饰键`ctrl | alt | shift | meta`，在使用`@keyup`时，要配合按下其它键，释放其它键时才回触发；使用`@keydown`正常触发；还可以`@keyup.ctrl.y`使用
    - 添加别名：`Vue.config.keyCodes.huiche = 13`

## 计算属性和侦听器

### 计算属性

- 组件模板应该只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法
- 使用`methods`性能不高，会多次触发方法
- 计算属性定义形式是方法，通过属性进行计算，以属性的形式绑定在`vm`上，属性改变，计算属性随之改变

```javascript
computed: {
  fullName: {
    // 只要需要读取fullName时，get就会被调用，实际上fullName被调用多次时，只执行一次get
    // 1.除此读取fullName时调用get 2.所依赖的数据发生变化时调用get 
    get() {
      return this.firstName + '-' + this.lastName
    },
    // 当fullName被修改时调用set，不是必须的
    set(value) {
      const arr = value.split('-')
      this.firstName = arr[0]
      this.lastName = arr[1]
    }
  }
  // 简写
  fullName: function() {
    return this.firstName + '-' + this.lastName
  } 
}
```

## API

### 全局配置

- `vue.config`文件
  - 阻止`vue`在启动时生成生产提示：`Vue.config.productionTip = false`
  - 添加按键别名：`Vue.config.keyCodes.huiche = 13`

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
- 如果不进行数据代理，那么属性要写成`{{_data.name}}`，数据代理为了让编码更方便
  
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

- 数据劫持