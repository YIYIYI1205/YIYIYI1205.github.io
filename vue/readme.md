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

## 模板语法

- 数据改变后模板会重新解析

### 插值

- 可以在`{{}}`中写任何`Vue`实例`vm`上的属性以及`Vue`原型上的属性，例如`$options`、`Vue`原型上的`$emit`，`data`中的属性能够使用在插值中也是因为`data`中的属性在`Vue`实例`vm`上
- `undefined`不显示，并且如果从对象中找一个不存在的属性也不会报错  

### 指令

- 属性绑定动态值：`v-bind:属性='变量'`或`:属性 ='变量'`，单向数据绑定
- 双向数据绑定：`v-model`，只能应用到有`value`的表单类元素上，可以使用`v-model`代替`checkbox`的`:checked`和`@change`，但是这样会报错，而且提示要加`sync`
- 动态参数：`<a v-bind:[attributeName]="url"> ... </a>`，如果`Vue`实例有一个`data property attributeName`，其值为`"href"，那么这个绑定将等价于 v-bind:href。

## 计算属性和侦听器

### 计算属性

- 组件模板应该只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法
- 使用`methods`性能不高，会多次触发方法，在`data`数据未发生改变时仍然会因为其他数据的变化而重新渲染解析模板，因此触发函数
- 计算属性定义形式是方法，通过属性进行计算，以属性的形式绑定在`vm`上，属性改变，计算属性随之改变
- 底层也是`Object.definedProperty`
- `vm._data`并不存在计算属性
- 计算属性也可以根据计算属性进行计算

```javascript
computed: {
  fullName: {
    // 只要读取fullName时，get就会被调用，实际上fullName被调用多次时，只执行一次get
    // 1.初次读取fullName时调用get 2.所依赖的数据发生变化时调用get 
    get() {
      return this.firstName + '-' + this.lastName
    },
    // 当主动使用vm.fullName进行修改时，调用set，不是必须的
    set(value) {
      const arr = value.split('-')
      this.firstName = arr[0]
      this.lastName = arr[1]
    }
  }
  // 简写
  fullName() {
    return this.firstName + '-' + this.lastName
  } 
}
```

### 监听器

- 可以监听计算属性
- 可以使用`vm.$watch()`实现监听
- 监视属性必须存在才能监视
- 监视的属性发生变化时调用`handler`函数，可简写
- `immediate: boolean`是否立即执行函数
- `deep: boolean`监视多级结构中所有属性的变化，`watch`默认不检测对象内部的改变；`vue`自身可以检测对象内部值的改变

```javascript
watch{
  isHot: {
    // handler在isHot发生改变时调用
    handler(newValue, oldValue) {
      this.info = newValue ? '炎热': '凉爽'
    },
    // immediate是一个布尔值，在没有发生改变时就执行
    immediate: true
  },
  numbers: {
    // numbers中每个属性改变，都会触发
    deep: true,
    handler(){
      console.log('change')
    }
  }
}
```

### 监听器和计算属性的区别

- 监听器需要存在一个属性作为变化的更改，而计算属性直接定义了这个属性，不需要原本就存在
- 如果需要延迟执行等需求的时候，无法使用计算属性，计算属性是无法开启异步任务的，因为它需要返回值

## Class与Style绑定

- `<div class='basic' :class='color'>`，可以存在`class`以及`:class`
- `:class=[a,b,c]`还可以传入数组
- `:class={a: true, b: false}`还可以传入对象
- 用`:style="{fontSize: fsize + 'px'}"`的形式绑定`style`
- 组件的样式汇总在一起会造成类名冲突，这时候可以在组件中加`scoped`，`app`组件不适合用`scoped`
- 使用`less`，`<style lang='less'>`，脚手架需要安装`less-loader`和`less`

## 条件渲染

- `v-show`：`display:none`，不占空间的隐藏元素，切换频率高的情况下使用
- `v-if`：元素也不存在
- `v-else`、`v-else-if`
- 多个判断可以在外层加`<template>`，只能和`v-if`配合使用

## 列表渲染

- `v-for='(item, key) in arr' :key='item.id'`，可遍历对象和数组
- `key`的作用：虚拟`dom`中的标识，当数据发生变化时，会根据新数据生成新的虚拟`dom`，新的虚拟`dom`与旧的虚拟`dom`进行比较，比较规则：
  - 旧的虚拟`dom`中找到了与新的虚拟`dom`中相同的`key`
    - 若虚拟`dom`中内容没变，直接使用之前的真实`dom`
    - 若虚拟`dom`中内容改变，则生成新的真实`dom`，替换旧的真实`dom`
  - 旧的虚拟`dom`中没有找到与新的虚拟`dom`中相同的`key`
    - 创建新的真实`dom`，渲染到页面
- 用`index`作为`key`在逆序添加、逆序删除等破坏顺序的操作时会引起输入类的`dom`产生`bug`，并且效率低下

```html
<li v-for='(p, index) of persons' :key='index'>
  {{p.name}}
  <!-- 如果添加新的元素时，会出现问题，input框错位 -->
  <input type='text'> 
</li>
```

```javascript
// 实现搜索过滤功能
// 1. 监听器实现
watch: {
  keyWord: {
    // 为了初始化显示全量列表，先执行一遍为空时的搜索
    immediate: true,
    handler(val) {
      this.filPersons = this.persons.filter((p) => p.name.indexOf(val) !== -1)
    }
  }
}
// 2. 计算属性实现
computed: {
  filPersons() {
    return this.persons.filter((p) => p.name.indexOf(this.keyWord) !== -1)
  }
}
```

### 表单输入绑定

- `form`中的`Button`提交会刷新页面，在`form`中配置`@submit.prevent`
- `v-model`修饰符，收集`value`
  - `v-model.number`
  - `v-model.lazy`，失去焦点的一瞬间收集数据
  - `v-model.trim`删除空格

## 事件处理

- `v-on:click="函数名"`或`@click`，配合`methods`定义方法，普通函数`this`指向`vm`
- 若不传参，默认第一个参数为`event`；若传别的参数，用`$event`传递`event`，`@click=handleClick($event, params1)`
- `methods`中定义的方法也在`vm`对象身上，但是不是数据代理，`data`会被数据代理，而`methods`不会，因此如果在`data`中写方法也可以使用，但是浪费资源
- 事件修饰符，可以连写
  - 阻止默认事件：`@click.prevent`
  - 阻止事件冒泡：`@click.stop`
  - 事件只触发一次：`@click.once`
  - 事件捕获模式：`@click.capture`
  - 只有`event.target`是当前操作的元素时才触发事件：`@click.self`
  - 事件的默认行为立即执行，无需等待事件回调执行完毕`@click.passive`
  - 修饰符可以连写：`@click.prevent.stop`
- 事件
  - `@scroll`：滚动条，走到底了也会触发事件
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
  - `right`：`.right`
  - 除此之外的遵循单词小写，连词中间用'-'，如`.caps-lock`
  - 系统修饰键`ctrl | alt | shift | meta`，在使用`@keyup`时，要配合按下其它键，释放其它键时才回触发；使用`@keydown`正常触发；
  - `@keyup.ctrl.y`
  - 添加别名：`Vue.config.keyCodes.huiche = 13`
- `vm`上没有`window`对象，如果直接`@click='alert(1)'`是不行的，因为`window`不存在，如果不想定义方法直接写语句，最好只写简单的语句

## 组件

- 组件：实现应用中局部功能代码和资源的集合
- 模块化：对于`js`文件
- 非单文件组件
  - 第一步：用`Vue.extend`定义子组件
    - `data`用函数的形式，因为如果用对象，在多个地方使用组件时，`data`数据会被共用，需要函数返回才能区别数据
    - 不能写`el`配置项，因为所有组件都要被一个`vm`管理
  - 第二步：注册组件
    - 在`new Vue`中配置子组件`components: {子组件}`注册局部组件
    - `Vue.component('组件名', 组件)`注册全局组件
    - 可配置`name`参数指定组件在开发者工具中的名称
    - 非脚手架环境下有首字母大写、自闭合组件`bug`；一般多个单词使用小写加`-`或者首字母大写方式，一个单词首字母大写或小写都行
    - 可将`const school = vue.extend(options)`简写为`const school = options`
  - `VueComponent`
    - 每一个组件本质上是一个`VueComponent`构造函数，是由`Vue.extend`生成的，`school = Vue.extend`，`school`拥有`prototype`，是一个`VueComponent`构造函数
    - 只要使用组件，`Vue`就会在解析时执行`new VueComponent(options)`创建组件的实例对象
    - 每次调用`Vue.extend`，返回的都是一个新的`VueComponent`，每一次`Vue.extend`都会返回一个新定义的`function VueComponent`
    - `this`指向：`new Vue`配置中，`this`指向`Vue`实例对象(`vm`)；组件配置中，`this`指向`VueComponent`实例对象(`vc`)；`vm`的`$children`中包含`vc`
    - `VueComponent`是可复用的`Vue`实例，接收相同的选项，但是`data`必须返回函数，不能配置`el`选项
    - 内置关系：`VueComponent.prototype.__proto__ === Vue.prototype`，让`vc`可以访问到`vue`原型上的属性、方法
- 单文件组件：定义组件：`export default {name: ''}`，`Vue.extend`可以省略；入口`app.vue`，引入组件；在`main.js`创建`vm`，引入`app组件`；在`index.html`中引入`main.js`

### Prop

- 接受父组件传参：`props:['name', 'sex', 'age']`
- 传`number`类型时可以用`v-bind`进行传递`:age='18'`
- 接收时限制类型：`props:{name: String, age: Number}`，或者`props:{name: {type: String, require: true}}`还可以配置默认值`default`
- 不要在子组件中修改传递过来的参数
- 在`data`中配置新的属性：`myAge: this.age`，可以更改外部数据`this.myAge++`
- 无法传递`key`、`ref`参数

### 自定义事件

- 内置事件是给标签使用，而自定义事件是给组件使用
- 自定义事件：`$emit`
- 使用组件：`@自定义名称='方法'`(仍然可以在后面加`.once`等事件修饰符)或者用`ref`然后在`mounted`中`this.refs.名称.$on(自定义名称)`绑定自定义事件，第二种方法适合延需求时使用，还可以配合`$once`只绑定一次事件
- 组件内部：`this.$emit(自定义名称，参数)`
- 解绑：解绑一个自定义事件`this.$off(自定义名称)`，解绑多个自定义事件`this.$off([自定义名称1, 自定义名称2])`，解绑全部自定义事件`this.$off()`
- 销毁组件，自定义事件也全不奏效，原生事件不受影响
- 使用`ref`，在`$on`中传递回调函数，直接写`this`指向的是绑定`ref`的`vc`而不是当前组件，需要传递`methods`中定义的方法作为回调函数或者使用箭头函数作为回调函数，`this`指向当前组件
- 如果直接给组件绑定原生事件`@click`，组件会认为是自定义事件，`@click.native`才可以绑定原生事件
- 绑定自定义事件的组件，才可以触发该自定义事件，无法在组件1中绑定自定义事件，组件2中触发该自定义事件
- 全局事件总线
  1. 所有组件都能看到`$bus`组件：给`vue`的原型对象添加组件`$bus`
  2. `$bus`可以调用`$on`、`$off`、`$emit`，这三个方法都在`vue`的原型对象上
  - 在组件销毁前，将事件进行解绑`beforeDestroy(){this.$bus.$off('事件')}`

  ```javascript
  // main.js
  // 最初版本
  const Demo = Vue.extend({})
  const d = new Demo()
  Vue.prototype.$bus = d
  // 最终版本
  const vm = new Vue({
    el: 'app',
    render: h => h(App),
    beforeCreate() {
      Vue.prototype.$bus = this // 安装全局事件总线
    }
  })
  const Demo = Vue.extend({})
  const d = new Demo()
  Vue.prototype.x = d
  // A.vue：传参
  methods:{
    sendStudentName() {
      this.$bus.$emit('hello', this.name)
    }
  }
  // B.vue：接收参数
  mounted() {
    this.$bus.$on('hello', data => {
      console.log(data)
    })
  }

  ```

### 消息订阅与发布

1. 订阅消息
2. 发布消息

```javascript
// pubsub-js
// A.vue：订阅消息组件
import pubsub from 'pubsub-js'
export default{
  mounted() {
    this.pubId = pubsub.subscribe('hello', (eventName, data) => {})
  },
  beforeDestroy() {
    pubsub.unsubscribe(this.pubId)
  }
}
// B.vue：发布消息组件
import pubsub from 'pubsub-js'
export default{
  methods: {
    sendStudentName() {
      pubsub.publish('hello', this.name)
    }
  }
}
```

### 传参

- 子组件给父组件
  1. 给子组件传方法，在子组件中执行方法，传递参数
  2. 自定义事件，两种写法
  3. 作用域插槽
- 任意组件
  1. 全局事件总线
  2. 消息订阅与发布，和全局事件总线一样，但是要引入新的库，并且看不到事件

## 可复用性 & 组合

### 自定义指令

- 配置项：`directives`，生命周期：`bind | inserted | update`，参数：`element | binding`
- 普通函数：`bing + update`，调用：1. 指令与元素成功绑定时会被调用；2. 指令所在的模板被重新解析时会被调用（不是所依赖的数据变化时才变）
- 指令名：`big-number`，不要用驼峰式，使用`v-big-number`
- `this`指向`window`，如果指向`vm`就不需要`element`了
- 全局指令：`Vue.directive`

```html
<div id='root'>
  <span v-big='n'></span>
</div>
<script>
  const vm = new Vue({
    el: '#root',
    data: {
      n: 1
    },
    directives: {
      // 1. 指令与元素成功绑定时会被调用；2. 指令所在的模板被重新解析时会被调用（不是所依赖的数据变化时才变）
      big(element, binding) {
        element.innerText = binding.value * 10
      },
      focusBind(element, binding) {
         element.innerText = binding.value
         element.focus() // 无效，因为第一次执行是指令与元素成功绑定时执行，此时元素还没有放入页面中
         // 当binding.value改变时，再次调用指令，此时元素已经放入页面，因此focus有效
      },
      focusBind: {
        // 指令与元素成功绑定时
        bind(element, binding) {
          element.innerText = binding.value
        },
        // 指令所在元素被插入页面时
        inserted(element, binding) {
          element.focus()
        },
        // 指令所在的模板被重新解析时
        update(element, binding) {
          element.innerText = binding.value
        }
      }
    }
  })
</script>
```

### 插件

- 通过全局方法`Vue.use()`使用插件。需要在调用`new Vue()`启动应用之前完成
- 注册插件：含有`install`方法的对象，接收`Vue`作为第一个参数，第二个参数时插件使用者传递的数据
  
  ```javascript
  export default{ 
    install(Vue) {
      // 全局过滤器
      Vue.filter()
      // 全局自定义指令
      Vue.directive()
      // 定义混入
      Vue.mixin()
    }
  }
  ```

### 过滤器

- 使用：`数据 | 过滤器(传参)`
- 定义：`filters{ 过滤器(数据，参数='默认值') {return }}`，如果需要有传参的情况下，需要给个默认值
- 多个过滤器之间可以串联，从左往右的顺序执行
- 配置全局过滤器：`Vue.filter()`
- 可以配合`v-bind`使用，但不能配合`v-model`使用

## API

### 全局配置

- `Vue.config`对象更改全局配置，与`vue.config.js`无关
  - `productionTip`：阻止`vue`在启动时生成生产提示：`Vue.config.productionTip = false`
  - `keyCodes`：添加按键别名，`Vue.config.keyCodes.huiche = 13`

### 全局API

- `Vue.extend(options)`：创建子类，`data`必须是函数，因为若`data`是对象，会出现指向同一个对象地址；不能写`el`
- `Vue.nextTick([callback, context])`：在下次`DOM`更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的`DOM`，和`setTimeout`效果一样
- `Vue.set(target, propertyName/index, value)`适用于两个场景：添加某个不存在的属性、直接修改数组的某个索引
  - 当一个对象中不存在某个属性，直接用`vue._ data.name`设置的数据，无法数据代理到`vm`身上，因为直接赋值没有数据代理的`set`和`get`方法
  - 应该使用`Vue.set(this.student, 'sex', '男'`添加新的属性，使用`vm.$set`是同样的
  - 不能直接给`vm._data`追加，必须给里面具体的属性追加属性
  - 数组上并不存在关于`arr[0]`的`set`和`get`，因此直接修改`vm.arr[0] = {}`是无法让页面有响应的，需要`vm.$set(this.arr, 0, {})`
  - 数组修改自身的方法`push|pop|shift|unshift|splice|sort|reverse`，是不需要使用`set`就可以响应到页面的，这些方法被`vue`包裹，因此页面可以响应引起视图更新
    - `vue.student.slice(0, 1, {name: '1111'}`
    - `vue.student.push === Array.prototype.push // false`
- `Vue.delete(target, propertyName/index)`：删除对象的`property`。如果对象是响应式的，确保删除能触发更新视图
- `Vue.directive(id, [definition])`：注册或获取全局指令
- `Vue.filter(id, [definition])`：注册或获取全局过滤器
- `Vue.component(id, [definition])`：注册或获取全局组件
- `Vue.mixin(mixin)`：全局注册一个混入，影响注册之后所有创建的每个`Vue`实例

### 选项/数据

- `data: Object | Function`，组件必须用`function`，此处的`this`是`Vue`实例，如果`Vue`所管理的函数写成箭头函数`this`是全局`window`；函数必须有返回值；`$data`实现数据代理
- `computed`
- `methods`
- `watch`

### 选项/DOM

- `el: String | DOM`，提供一个在页面上已存在的`DOM`元素作为`Vue`实例的挂载目标，在实例挂载之后，元素可以用`vm.$el`访问；容器和`vue`实例之间一一对应
- `render(createElement)`：该渲染函数接收一个`createElement`方法作为第一个参数用来创建`VNode`，为了解决`vue`版本没有`template`编译器，`render`返回`createElement(组件)`指定具体内容；当使用`vue-loader`或`vueify`的时候，`*.vue`文件内部的模板会在构建时预编译成`JavaScrip`。你在最终打好的包里实际上是不需要编译器的，所以只用运行时版本（使用`render`）即可。

### 选项/生命周期钩子

- `this`指向`vm`或组件实例对象
- 初始化过程：
  - `new Vue()`
  - 初始化：生命周期、事件，但数据代理还未开始
  - `beforeCreate`：无法通过`vm`访问到`data`中的数据、`methods`中的方法，`vm`是创建了的，因此`create`创建的是数据相关
  - 初始化：数据监测、数据代理
  - `created`：可以通过`vm`访问到`data`中的数据、`methods`中的方法
  - 是否有`el`配置：没有则通过`vm.$mount(el)`调用后再往下走
  - 是否有`template`配置：没有则编译整个`el`作为模板；有则编译`template`，但是要替换掉`el`。此阶段`vue`开始解析模板，生成虚拟`dom`(内存中)，页面还不能显示解析好的内容
  - `beforeMount`：页面呈现的是未经`Vue`编译的`dom`结构，所有对`dom`的操作，最终都不奏效，因为后面会进行虚拟`dom`的替换
  - 创建`vm.$el`替换`el`，将内存中的虚拟`dom`转为真实`dom`插入页面
  - `mounted`：页面呈现的是经过`Vue`编译的`dom`结构，所有对`dom`的操作有效（尽可能避免）。此时初始化过程结束，一般在此进行：开启定时器、发送网络请求、订阅消息、绑定自定义事件等初始化操作
- 更新流程，当数据改变时：
  - `beforeUpdate`：数据是新的，页面还是旧的
  - 根据新数据，生成新的虚拟`dom`，与旧的虚拟`dom`进行比较，最终完成页面更新
  - `updated`：数据和页面保持同步
- 销毁流程：
  - `vm.$destroy()`调用时
  - `beforeDestroy`：`vm`中的所有`data`、`methods`、指令等等都处于可用状态，但是页面不会变化，马上要执行销毁过程，一般在此阶段：关闭定时器、取消订阅消息、解绑自定义事件等收尾操作
  - `destroyed`

### 选项/组合

- `mixin`：两个组件共享一个配置项，使用：`mixins: []`，任何配置都可以进行混合，`data`以及`methods`冲突时以组件为主，生命周期冲突时不以任何为主，两个方法都要调用，`mixins`的先调用

### 实例property

- `vm.$slots`：`default`下是一个数组，里面含有组件内传的虚拟`dom`
- `vm.$attrs`：若`props`没有声明接收父组件传参时，可以通过`vm.$attrs`获取参数

### 实例方法/数据

- `vm.$watch`：`vm.$watch('a.b.c', function (newVal, oldVal) {})`
- `vm.$set`
- `vm.$delete`

### 实例方法/生命周期

- `vm.$mount()`：手动挂载一个未挂载的实例，类似`el`；`vm.$mount('#root')`
- `vm.$destroy()`：完全销毁一个实例，清绑理它与其它实例的连接，解它的全部指令及自定义事件监听器，但是原生事件依然有效；大多数场景不应该调用，最好用`v-if | v-for`以数据驱动的方式控制子组件的生命周期

### 指令

- `v-text`等价于差值语法
- `v-html`，容易导致`xss`攻击，可以给`cookie`设置`HttpOnly`，就不可以通过`js`脚本的`document.cookie`获取了，不要在表单上使用
- `v-pre`：可以用它跳过没有使用指令语法、插值语法的节点，会加快编译
- `v-cloak`：网速过慢时，配合`css`实现脚本还未加载时插值语句不显示`[v-cloak]{display: none}`，`vue`请求回来执行时会将元素上的`v-cloak`删除
- `v-once`：只渲染元素和组件一次，初次动态渲染后就变成静态资源了

### 特殊 attribute

- `ref`：给元素或子组件绑定`ref`属性，可以通过`this.$refs`获取；在组件上添加`ref`，获取的是组件`VueComponent`，而用原生`getElementById`获取是组件最外层的`DOM`元素；可以用来获取焦点`this.ref.名字.focus()`
- `slot`：插槽，类似`react`的`this.props.children`，将组件使用时包裹的元素放在组件内写`<slot></slot>`的地方
  - 还可以传递默认值`<slot>默认值</slot>`
  - 具名插槽：适用于多个插槽，在使用组件时配置`slot`参数，`<组件><header slot='header'>123</header></组件>`，在组件内部配置`name`参数，`<slot name='header'>默认值</slot>`，可以写多个，用`template`包裹即可，此时可以用`v-slot:header`；可以写成`v-slot:header`或者`slot='header'`
  - 作用域插槽：可以在插槽中把数据传给外部的元素`<slot :data='data'>`，外部必须在组件里包裹`<template slot-scope=''>`：`<组件><template slot-scope='data'>{{data}}</template></组件>`，其中`data`就是传过来的数据；`slot-scope`是新`API`，旧的是`scope`；作用域插槽也可以使用具名

### 内置的组件

- `transition`
  - 元素作为单个元素/组件的过渡效果。`<transition>`只会把过渡效果应用到其包裹的内容上，而不会额外渲染`DOM`元素，也不会出现在可被检查的组件层级中。只能使用在单独的元素上
  - `name - string`，用于自动生成`CSS`过渡类名。例如：`name: 'fade'`将自动拓展为 `.fade-enter`，`.fade-enter-active` 等。默认类名为`"v"`
  - `appear - boolean`，是否在初始渲染时使用过渡。默认为`false`
  - 类名`v-enter`进入的起点、`v-enter-to`进入的终点、`v-leave-active`进入过程中
  
  ```html
  <transition name='hello'>
    <h1>12</h1>
  </transition>
  <style>
  h1{
    transition: 0.5s linear;
  }
  /* 或者 */
  .hello-enter-active, .hello-leave-active{
    transition: 0.5s linear;
  }
  .hello-enter, .hello-leave-to{
    transform: translateX(-100%);
  }
  .hello-enter-to, .hello-leave{
    transform: translateX(0);
  }
  </style>
  ```

  - 配合第三方库`npm install animate.css`
  - 引入`import 'animate.css'`
  - 类名配置在`transition`的`name`：`name='animate_animated animate_bounce'`
  - 配置类动画：`enter-active-class='animate__swing'`
- `transition-group`，每个元素必须有`key`值

## 请求数据

- 解决跨域
  - `cors`后端配置
  - `jsonp`后端前端配置
  - `proxy`：代理服务器与前端服务器在同一个端口
    - `nginx`开启
    - `vue-cli`开启：`vue-cli`的`devServer.proxy`，在`vue.config.js`

      ```javascript
      module.exports = {
        // 方式一：不能指定是否必须转发，不能配置多个代理
        devServer: {
          proxy: 'http://localhost:4000' // 只需要写到端口号，当8080原本请求就存在，就不会做转发
        }
        // 方法二：
        devServer: {
          proxy: {
            '/api': { // 请求前缀，在请求时放在端口号之后的
              target: 'http://localhost:4000',
              pathRewrite: {'^/api': ''}, // 请求将api删了
              ws: true,
              changeOrigin: true // 用于控制请求头中host值 
            },
            '/foo': {
              target: 'http://localhost:4001',
            }
          }
        }
      }
      ```

- `vue-resource`：插件，`vue.use(vueResource)`，`vm`上多了`$http`

## 原理

### Object.defineProperty

- `Object.defineProperty(obj, prop, descriptor)`
- `descriptor`配置项
  - `value`
  - `enumerable`可枚举的，默认`false`
  - `writable`可写的，默认`false`
  - `configurable`可删除的，默认`false`
  - `get`读取时调用，使用`get`更改过的属性，输出时值显示`(...)`，点击后才会显示
  - `set(value)`修改时调用

#### 数据代理

- 一个对象代理对另一个对象中属性的操作(读/写)
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

#### 数据监测

- `vue`会检测`data`中所有层次的数据
- 数据代理中的`set`方法中有一个重新解析页面的响应式`reactiveSetter`，能够实现对对象属性的监视
- 通过`setter`实现数据的监测，且要在`new Vue`时就传入监测的数据
  - 对象中后追加的属性，`vue`默认不做响应式处理，因为追加的属性没有响应式，没有`get`和`set`方法
  - 如需给后追加的属性做响应式，会用`Vue.set(target, key, val)`或`vm.$set()`
- 监测数组中的数据：通过包裹数组更新元素的方法实现
  - 调用原生对应的方法对数组进行更新
  - 重新解析模板，进而更新页面
- 在`vue`中修改数组的某个元素
  - 更改数组对象中的某一条元素时，如果直接替换对象，是无效的
  - `push | pop | shift | unshift | slice | sort | reverse`
  - `vm.$set() | Vue.set()`
- `vm.$set() | Vue.set()`不能给`vm`或者`vm_data`对象添加属性

```javascript
this.persons[0].name ='x' // 有效
this.persons[0] = { name: 'x' } // 无效，vue不能检测到数据更改了，实际已经改正了，输入vm会发现已改变
```

```javascript
// 模拟数据监测
const data = {
  name: 'xxx',
  address: 'yyy'
}
const vm = {}
const obs = new Observer(data) // 数据监测
console.log(obs)
vm._data = data = obs // 没有将data直接代理到vm身上
console.log(vm)
function Observer(obj) {
  const keys = Object.keys(obj)
  keys.forEach((k) => { // 只考虑了一层数据，需要用递归实现
    // this是Observer的实例对象
    Object.defineProperty(this, k, { 
      get() {
        return obj[k]
      },
      set(val) {
        // 在这里解析模板、生成虚拟DOM、Diff比较..
        obj[k] = val
      }
    })
  })
}
```

- 以下：都和`Object.definedPrototype`有关系
  - 数据代理：`vm._data=data`
  - 数据监测：`setter`方法中需要调用`reactiveSetter`，而不存在的属性通过`vm`直接添加是无法进行代理的，因此需要使用`set`方法
  - 数据劫持：原本一个对象，变成了含有`get|set`方法的对象，这种变化叫做数据劫持

### 原型

- `prototype`显式原型属性，函数才有，实例没有
- `__proto__`隐式原型属性，函数和实例都有
- 两者都指向原型对象`Demo.prototype === d.__proto__`
- 通过显式原型属性操作原型对象：`Demo.prototype.x`，通过隐式原型属性获取对象属性
- 内置关系：`VueComponent.prototype.__proto__ === Vue.prototype`，让`vc`可以访问到`vue`原型上的属性、方法

## 脚手架

- 显示`webpack`相关配置：`vue inspect > output.js`，更改在配置参考中查看，在`vue.config.js`中修改，与`Vue.config`无关
- 在`vue.config.js`中配置
  
  ```javascript
  module.exports = {
    lintOnSave: false // 关闭语法检查
  }
  ```

```html
  <!-- 针对IE浏览器的一个特殊配置，含义是让IE浏览器以最高的渲染级别渲染页面 -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!-- 开启移动端的理想视口 -->
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <!-- <%= BASE_URL %>表示public所在路径 -->
  <link rel="icon" href="<%= BASE_URL %>favicon.ico">
  <!-- package.json中的name成为title，webpack进行配置 -->
  <title><%= htmlWebpackPlugin.options.title %></title>
```

## 问题

- 方法跟进不去

## 总结

- `forEach`可以直接改变数组的值

  ```jsx
  this.list.forEach((value) => {
    if (value.id === id) {
      value.checked = !value.checked
    }
  });
  ```

- 给数组重新赋值，如果里面某些元素`key`不改变，并不会影响效率
- `input-checked`，使用`:checked`来绑定计算属性，配合`@change`改变值；或者`v-model`配合计算属性`getter`和`setter`
- 如果想将数组同步给`localStorage`，可以在监视器中做这一步，并且可能需要开启`deep`
- 引入第三方资源`css`字体缺少引入，直接在`public`中引入`css`，并在`index.html`中引入，而不是在`vue`中引入
- `import`语句会优先执行

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

## Vue3

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
