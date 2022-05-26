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
- 双向数据绑定：`v-model`，只能应用到有`value`的表单类元素上

## 计算属性和侦听器

### 计算属性

- 组件模板应该只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法
- 使用`methods`性能不高，会多次触发方法，在`data`数据未发生改变时仍然会因为其他数据的变化而重新渲染解析模板，因此触发函数
- 计算属性定义形式是方法，通过属性进行计算，以属性的形式绑定在`vm`上，属性改变，计算属性随之改变
- 底层也是`Object.definedProperty`
- `vm._data`并不存在计算属性

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

### 区别

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
  - right：`.right`
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
- 无法传递`key`、`red`参数

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
- `Vue.set(target, propertyName/index, value)`适用于两个场景：添加某个不存在的属性、直接修改数组的某个索引
  - 当一个对象中不存在某个属性，直接用`vue._ data.name`设置的数据，无法数据代理到`vm`身上，因为直接赋值没有数据代理的`set`和`get`方法
  - 应该使用`Vue.set(this.student, 'sex', '男'`添加新的属性，使用`vm.$set`是同样的
  - 不能直接给`vm._data`追加，必须给里面具体的属性追加属性
  - 数组上并不存在关于`arr[0]`的`set`和`get`，因此直接修改`vm.arr[0] = {}`是无法让页面有响应的，需要`vm.$set(this.arr, 0, {})`
  - 数组修改自身的方法`push|pop|shift|unshift|splice|sort|reverse`，是不需要使用`set`就可以响应到页面的，这些方法被`vue`包裹，因此页面可以响应引起视图更新
    - `vue.student.slice(0, 1, {name: '1111'}`
    - `vue.student.push === Array.prototype.push // false`
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
- `render(createElement)`：该渲染函数接收一个`createElement`方法作为第一个参数用来创建`VNode`，为了解决`vue`版本没有`template`编译器，`render`返回`createElement(组件)`指定具体内容

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

### 实例方法/数据

- `watch`：`vm.$watch('a.b.c', function (newVal, oldVal) {})`

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

- `ref`：给元素或子组件绑定`ref`属性，可以通过`this.$refs`获取；在组件上添加`ref`，获取的是组件`VueComponent`，而用原生`getElementById`获取是组件最外层的`DOM`元素

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
