# 面试
## 框架

### React/Vue

#### 1. 写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么？

- 考点：`diff`算法、虚拟`DOM`
- `React diff`会帮助我们计算出`Virtual DOM`中真正变化的部分，并只针对该部分进行实际`DOM`操作，而非重新渲染整个页面，从而保证了每次操作更新后页面的高效渲染，降低时间复杂度，O(n^3)->O(n)，通过？

#### 18. React 中 setState 什么时候是同步的，什么时候是异步的?

- 在React的setState函数实现中，会根据一个变量isBatchingUpdates判断是直接更新this.state还是放到队列中回头再说，而isBatchingUpdates默认是false，也就表示setState会同步更新this.state，但是，有一个函数batchedUpdates，这个函数会把isBatchingUpdates修改为true，而当React在调用事件处理函数之前就会调用这个batchedUpdates，造成的后果，就是由React控制的事件处理过程setState不会同步更新this.state。
- 如果有这种 async 的 work 就不执行 batch update 如果没有 async 的就执行 batch update，setTimeout 和 promise 这些要进入 EventLoop 队列的都会被认为是 async work。
- 异步的setState会被合并，所以前两次执行完其实只执行了一次

```javascript
componentDidMount() {
  this.setState({ val: this.state.val + 1 })
  console.log(this.state.val) // 第 1 次 log

  this.setState({ val: this.state.val + 1 })
  console.log(this.state.val) // 第 2 次 log

  setTimeout(() => {
    this.setState({ val: this.state.val + 1 })
    console.log(this.state.val) // 第 3 次 log

    this.setState({ val: this.state.val + 1 })
    console.log(this.state.val) // 第 4 次 log
  }, 0)
}
// 0 0 2 3
```

#### 32. Virtual DOM 真的比操作原生 DOM 快吗?谈谈你的想法

- 前端性能优化的一个秘诀就是尽可能少地操作DOM,不仅仅是DOM相对较慢,更因为频繁变动DOM会造成浏览器的回流或者重回
- Virtual DOM最初的目的,就是更好的跨平台,比如Node.js就没有DOM,如果想实现SSR(服务端渲染),那么一个方式就是借助Virtual DOM,因为Virtual DOM本身是JavaScript对象.
- 缺点：
  1. 创建dom依赖创建函数
  2. 当节点数量非常庞大时，其自身的各种判断和计算会将自己击溃
  3. 单从创建dom的角度出发，它的创建速度比原生的慢
- 真正的问题是在 “全部重新渲染” 的思维模式下，即使只有一行数据变了，它也需要重置整个 innerHTML，这时候显然就有大量的浪费。

### redux

- 把组件之间需要共享的状态抽取出来，遵循特定的约定，统一来管理，让状态的变化可以预测。
- Redux是将整个应用状态存储到到一个地方，称为store，里面保存一棵状态树(state tree)
- 组件可以派发(dispatch)行为(action)给store,而不是直接通知其它组
- 其它组件可以通过订阅store中的状态(state)来刷新自己的视图
- state是数据集合
- action就是改变state的指令，有多少操作state的动作就会有多少action。
- action发出命令后将state放入reducer加工函数中，返回新的state。 可以理解为加工的机器
- store 可以理解为有多个加工机器的总工厂，let store = createStore(reducers);
  - 维持应用的 state；
  - 提供 getState() 方法获取 state；
  - 提供 dispatch(action) 方法更新 state；
  - 通过 subscribe(listener) 注册监听器;
  - 通过 subscribe(listener) 返回的函数注销监听器。
  
```javascript
import { createStore } from 'redux'

const reducer = (state = {count: 0}, action) => {
  switch (action.type){
    case 'INCREASE': return {count: state.count + 1};
    case 'DECREASE': return {count: state.count - 1};
    default: return state;
  }
}

const actions = {
  increase: () => ({type: 'INCREASE'}),
  decrease: () => ({type: 'DECREASE'})
}

const store = createStore(reducer);

store.subscribe(() =>
  console.log(store.getState())
);

// 可以直接使用在组件上
store.dispatch(actions.increase()) // {count: 1}
store.dispatch(actions.increase()) // {count: 2}
store.dispatch(actions.increase()) // {count: 3}
```

#### 85. react-router 里的Link标签和a标签有什么区别

- 从最终渲染的 DOM 来看，这两者都是链接，都是 <a> 标签，区别是：
- Link 是 react-router 里实现路由跳转的链接，一般配合 <Route> 使用，react-router 接管了其默认的链接跳转行为，区别于传统的页面跳转，<Link> 的“跳转”行为只会触发相匹配的 <Route> 对应的页面内容更新，而不会刷新整个页面。
- 而 <a> 标签就是普通的超链接了，用于从当前页面跳转到 href 指向的另一个页面（非锚点情况）。
  
- Link
  1. 有onclick那就执行onclick
  2. click的时候阻止a标签默认事件（这样子点击<a href="/abc">123</a>就不会跳转和刷新页面）
  3. 再取得跳转href（即是to），用history（前端路由两种方式之一，history & hash）跳转，此时只是链接变了，并没有刷新页面

#### 37. 为什么 Vuex 的 mutation 和 Redux 的 reducer 中 不能做异步操作?

#### 62. redux 为什么要把 reducer 设计成纯函数

- redux的设计思想就是不产生副作用，数据更改的状态可回溯，

### vue

#### 29. 聊聊 Vue 的双向数据绑定，Model 如何改变 View， View 又是如何改变 Model 的

#### 40. 在 Vue 中，子组件为何不可以修改父组件传递的 Prop

#### 78. Vue 的父组件和子组件生命周期钩子执行顺序是什么

- 父组件： beforeCreate -> created -> beforeMount
- 子组件： -> beforeCreate -> created -> beforeMount -> mounted
- 父组件： -> mounted
- 总结：从外到内，再从内到外
- 加载渲染过程
  - 父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted
- 子组件更新过程
  - 父beforeUpdate->子beforeUpdate->子updated->父updated
- 父组件更新过程
  - 父beforeUpdate->父updated
- 销毁过程
  - 父beforeDestroy->子beforeDestroy->子destroyed->父destroyed

#### 94. vue 在 v-for 时给每项元素绑定事件需要用事件代理吗？为什么？

## javascript

### 数据类型

- 基本数据类型变量保存在栈内存中，因为基本数据类型占用空间小、大小固定，通过值来访问，属于被频繁使用的数据。
- typeof 可以检测变量的数据类型，返回如下6种字符串number、string、boolean、object、undefined、function
- obj instanceof Object
- Object.prototype.toString.call(obj).slice(8, -1) // Object Array Function

### Array、String 基础

- Array.prototype.reduce((previousValue, currentValue, currentIndex, array), initialValue)

#### 72. 为什么普通 for 循环的性能远远高于 forEach 的性能，请解释其中的原因

1. for 循环没有任何额外的函数调用栈和上下文；
2. forEach函数签名实际上是array.forEach(function(currentValue, index, arr), thisValue)，它不是普通的 for 循环的语法糖，还有诸多参数和上下文需要在执行的时候考虑进来，这里可能拖慢性能

#### 2. ['1', '2', '3'].map(parseInt)

- 考点：Array.map((value, index, array) => {}), parseInt(string, radix)

  ```javascript
  Array.map(callback(value, item, array))
  function parseInt(value, radix){}
  parseInt('1', 0) // 如果输入的 string 以非0,0x值开头， radix 是 10 (十进制)。
  parseInt('2', 1)
  parseInt('3', 2) // 将3看做2进制
  ```

#### 11. 编写一个程序将数组扁平化去并除其中重复部分数据，最终得 到一个升序且不重复的数组

- 考点：Array.prototype.flat(depth)，depth表示深度，使用 Infinity，可展开任意深度的嵌套数组、Set、sort、Array.from方法对一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例、[...(new Set)]

```javascript
const arr1 = new Set(arr.flat(Infinity))
console.log([...arr1].sort((a, b) => a-b))
console.log(Array.from(arr1).sort((a, b) => a-b))
```

#### 21. 三个判断数组的方法，请分别介绍它们之间 的区别和优劣

- Array.prototype.toString.call(arr) ：这种方法对于所有基本的数据类型都能进行判断，即使是 null 和 undefined 
- Array.isArray(arr)：当检测 Array 实例时，Array.isArray 优于 instanceof ，因为 Array.isArray 可以 检测出 iframes
- arr instanceof Array：instanceof 只能用来判断对象类型，原始类型不可以。并且所有对象类型 instanceof Object 都是 true；instanceof 底层原理是检测构造函数的 prototype 属性是否出现在某个实例的原型链上，如果实例的原型链发生变化，则无法做出正确判断。
- arr.constructor === Array

```javascript
var a = ?;
if(a == 1 && a == 2 && a == 3){
  console.log(1);
}
```

#### 43. 使用 sort() 对数组 [3, 15, 8, 29, 102, 22] 进行排序，输出结果

- 默认的排序方法会将数组元素转换 为字符串，然后比较字符串中字符的 UTF-16 编码顺序来进行排序。
- [102, 15, 22, 29, 3, 8]

#### 55.某公司 1 到 12 月份的销售额存在一个对象里面

```javascript
const obj = { 1: 222, 2: 123, 5: 888 }
obj.length = 12
const arr = Array.from(obj).slice(1)
const arr1 = arr.map((value) => (value === undefined ? null : value))
console.log(arr1)
```

#### 59. 给定两个数组，写一个方法来计算它们的交集

- 2次循环

#### 65. a.b.c.d 和 a['b']['c']['d']，哪个性能更高？

- a.b.c.d 比 a['b']['c']['d'] 性能高点，后者还要考虑 [ ] 中是变量的情况，再者，从两种形式的结构来看，显然编译器解析前者要比后者容易些，自然也就快一点。

#### 67. 数组编程题

```javascript
function method(arr) {
  arr = Array.from(new Set(arr.sort((a, b) => a - b)))
  const result = []
  const len = arr[arr.length - 1] / 10 + 1
  let current = 0
  for (let i = 1; i <= len; i++) {
    console.log(i)
    let min = (i - 1) * 10
    let max = 10 * i
    const temp = []
    for (let j = current; j < arr.length; j++) {
      if (arr[j] >= min && arr[j] < max) {
        temp.push(arr[j])
        if (j === arr.length - 1) {
          result.push(temp)
        }
      } else {
        if (temp.length > 0) {
          current = j
          result.push(temp)
        }
        break
      }
    }
  }
  return result
}
function randomMethod() {
  const arr = []
  arr.length = 10
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.floor(Math.random() * 100)
  }
  return arr
}
console.log(method(randomMethod()))
```

#### 69. 如何把一个字符串的大小写取反（大写变小写小写变大写），例如 ’AbC' 变成 'aBc'

```javascript
function transition(string) {
  let arr = string.split('')
  arr = arr.map((item) =>
    item === item.toUpperCase() ? item.toLowerCase() : item.toUpperCase()
  )
  return arr.join('')
}
```

#### 71. 实现一个字符串匹配算法，从长度为 n 的字符串 S 中，查找是否存在字符串 T，T 的长度是 m，若存在返回所在位置

```javascript
const find = (S, T) => {
  if (S.length < T.length) {
    return -1
  }
  for (let i = 0; i < S.length; i++) {
    if (S.slice(i, i + T.length) === T) {
      return i
    }
  }
  return -1
}
```

#### 75. 数组里面有10万个数据，取第一个元素和第10万个元素的时间相差多

- 数组可以直接根据索引取的对应的元素，所以不管取哪个位置的元素的时间复杂度都是 O(1)，都是用 key 精确查找哈希表的过程，其消耗时间大致相同。
- 得出结论：消耗时间几乎一致，差异可以忽略不计

#### 76. 输出以下代码运行结果

```javascript
// example 1
var a={}, b='123', c=123;  
a[b]='b';
a[c]='c';  
console.log(a[b]); // c 的键名会被转换成字符串'123'，这里会把 b 覆盖掉。

---------------------
// example 2
var a={}, b=Symbol('123'), c=Symbol('123');  
a[b]='b';
a[c]='c';  
console.log(a[b]); // 唯一的key因此是b

---------------------
// example 3
var a={}, b={key:'123'}, c={key:'456'};  
a[b]='b';
a[c]='c';  
console.log(a[b]); // 对象作为key需要转成字符串，对象类型会调用 toString 方法转换成字符串 [object Object]。
```

#### 77.算法题「旋转数组」

```javascript
function method(arr, k) {
  const head = arr.slice(arr.length - k)
  const fail = arr.slice(0, arr.length - k)
  console.log(head.concat(fail))
}
```

#### 81. 打印出 1 - 10000 之间的所有对称数

```javascript
function method() {
  // 2位，1-9 9个数字
  const result = []
  for (let i = 1; i <= 9; i++) {
    const temp = '' + i + i
    result.push(Number(temp))
  }
  for (let i = 1; i <= 9; i++) {
    for (let j = 0; j <= 9; j++) {
      const temp = '' + i + j + i
      result.push(Number(temp))
    }
  }
  for (let i = 1; i <= 9; i++) {
    for (let j = 0; j <= 9; j++) {
      const temp = '' + i + j + j + i
      result.push(Number(temp))
    }
  }
  console.log(result)
}
```

#### 82. 周一算法题之「移动零」

```javascript
function method(arr) {
  const len = arr.length
  const j = 0
  for (let i = 0; i < len - j; i++) {
    if (arr[i] == 0) {
      arr.push(0)
      arr.slice(i, 1)
      j++
      i--
    }
  }
  return arr
}
```

#### 84. 请实现一个 add 函数，满足以下功能

#### 86. 「两数之和」

```javascript
function method(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    const index = arr.indexOf(target - arr[i], i) // i表示从哪里开始
    if (index !== -1) {
      return [i, index]
    } else {
      break
    }
  }
  return []
}
```

#### 87. 在输入框中如何判断输入的是一个正确的网址。

```javascript
const isUrl = urlStr => {
  try {
    const { href, origin, host, hostname, pathname } = new URL(urlStr)
    return href && origin && host && hostname && pathname && true
  } catch (e) {
    return false
  }
}
```

### 作用域、优化

#### 3. 什么是防抖和节流？有什么区别？如何实现？

- 考点：闭包，变量提升
  - 防抖：输入框

    ```javascript
    function debounce(fn, wait) {
      let timer = null
      return () => {
        const context = this
        if (timer !== null) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          fn(...arguments)
          // 不用箭头函数
          fn.apply(context, arguments)
        }, wait)
      }
    }
    ```

  - 节流：快速往下滑页面
  
#### 79. input 搜索如何防抖，如何处理中文输入

```javascript
function onCompositionStart(e){
    e.target.composing = true;
}
function onCompositionEnd(e){
    //console.log(e.target)
    e.target.composing = false;
    var event = document.createEvent('HTMLEvents');
    event.initEvent('input');
    e.target.dispatchEvent(event);
}
var input_dom = document.getElementById('myinput');
input_dom.addEventListener('input',debounce(1000));
input_dom.addEventListener('compositionstart',onCompositionStart);
input_dom.addEventListener('compositionend',onCompositionEnd);
```

#### 90. 实现模糊搜索结果的关键词高亮显示

- let panter = new RegExp(关键词, 'g') 该行字符串.replace(panter, '<b style="color: #2D7BFF">' + 关键词 + '</b>')

### 渲染过程、优化

#### 22. 介绍下重绘和回流(Repaint & Reflow)，以及如何 进行优化

- 浏览器渲染机制
  - 浏览器采用流式布局模型(Flow Based Layout)
  - 浏览器会把 HTML 解析成 DOM，把 CSS 解析成 CSSOM，DOM 和 CSSOM 合并就 产生了渲染树(Render Tree)。
  - 有了 RenderTree，我们就知道了所有节点的样式，然后计算他们在页面上的大小和位置，最后把节点绘制到页面上。
  - 由于浏览器使用流式布局，对 Render Tree 的计算通常只需要遍历一次就可以完成，但 table 及其内部元素除外，他们可能需要多次计算，通常要花 3 倍于同 等元素的时间，这也是为什么要避免使用 table 布局的原因之一。

- 重绘
  - 由于节点的几何属性发生改变或者由于样式发生改变而不会影响布局的，称为 重绘，例如 outline, visibility, color、background-color 等，重绘的代价是高昂的， 因为浏览器必须验证 DOM 树上其他节点元素的可见性。

- 回流
  - 回流是布局或者几何属性需要改变就称为回流。回流是影响浏览器性能的关键因素，因为其变化涉及到部分页面(或是整个页面)的布局更新。一个元素的回流可能会导致了其所有子元素以及 DOM 中紧随其后的节点、祖先节点元素的随后的回流。

- 浏览器优化
  - 现代浏览器大多都是通过队列机制来批量更新布局，浏览器会把修改操作放在 (即 16.6ms)才会清空队列，但当你获取布局信息的时候，队列中可能有会影响这些属性或方法返回值的操作，即使没有，浏览器也会强制清空队列，触发回流与重绘来确保返回正确的值。主要包括以下属性或方法：应该避免频繁的使用上述的属性，他们都会强制渲染刷新队列。
    1. offsetTop、offsetLeft、offsetWidth、offsetHeight
    2. scrollTop、scrollLeft、scrollWidth、scrollHeight
    3. clientTop、clientLeft、clientWidth、clientHeight
    4. width、height
    5. getComputedStyle()
    6. getBoundingClientRect()

- 减少重绘与回流
  - css
    1. 使用 transform 替代 top
    2. 使用 visibility 替换 display: none ，因为前者只会引起重绘，后者会引发回 流(改变了布局
    3. 避免使用table布局，可能很小的一个小改动会造成整个 table 的重新布局。 
    4. 尽可能在 DOM 树的最末端改变 class，回流是不可避免的，但可以减少其影响。尽可能在 DOM 树的最末端改变 class，可以限制了回流的范围，使其影响 尽可能少的节点。
    5. 避免设置多层内联样式，CSS 选择符从右往左匹配查找，避免节点层级过多。
    6. 然后对于 HTML 来说也尽 量少的添加无意义标签，保证层级扁平。
    7. 将动画效果应用到 position 属性为 absolute 或 fixed 的元素上，避免影响其他元素的布局，这样只是一个重绘，而不是回流，
    8. 控制动画速度可以选择 requestAnimationFrame
    9. 避免使用 CSS 表达式，可能会引发回流。
    10. 可以让transform、opacity、 filters 这些动画不会引起回流重绘
  - JavaScript
    1. 避免频繁操作样式，最好一次性重写style属性，或者将样式列表定义为class 并一次性更改 class 属性。
    2. 避免频繁操作 DOM，创建一个 documentFragment，在它上面应用所有 DOM 操作，最后再把它添加到文档中。
    3. 避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。
    4. 对具有复杂动画的元素使用绝对定位，使它脱离文档流，否则会引起父元素 及后续元素频繁回流。

### 原型链

- 引用类型，都有一个隐式原型`__proto__`属性，指向它的构造函数的显式原型 `prototype`。当你试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么它会去它的隐式原型`__proto__`（也就是它的构造函数的显式原型`prototype`）中寻找。
- 原型.prototype.constructor === 原型
- Object.prototype.__proto__ === null
- f.__proto__ === Fo.prototype（new的过程中有这样的操作）；构造函数.prototype.__proto__ === 上一个构造函数.prototype；构造函数不是new上一个构造函数得来的，而是继承，所以构造函数的__proto__不指向上一个构造函数的prototype

```javascript
class Foo {
  name = 'foo'
}
class Fo extends Foo {
  name = 'fo'
}
const f = new Fo()
console.log(f.__proto__ === Fo.prototype)
console.log(Fo.prototype.__proto__ === Foo.prototype)
console.log(Foo.prototype.__proto__ === Object.prototype)
const obj = { a:1 }
obj.toString // Object.prototype上找到
var nick = new Person("nick")
nick.toString // Person.prototype--->Object.prototype
```

- 实例`instanceof`构造函数，可以沿着原型链一直往上找

### 继承

1. 原型链继承

   - 将父类的实例作为子类的原型
   - 缺点1：父类的所有引用属性会被所有子类共享，更改一个子类的引用属性，其他子类也会受影响
   - 缺点2：在创建Child实例的时候，无法向Parent传参。这样就会使Child实例没法自定义自己的属性（名字）

   ```javascript
   function Parent() {
       this.names = ['arzh','arzh1'];
   }
   function Child() {
   }
   Child.prototype = new Parent()
   Child.prototype.constructor = Child // 如果不写，输出Child的constructor会有问题
   var arzhChild2 = new Child()
   arzhChild2.names.push('arzh2')
   console.log(arzhChild2.names) //[ 'arzh', 'arzh1', 'arzh2' ]

   var arzhChild3 = new Child()
   console.log(arzhChild3.names) //[ 'arzh', 'arzh1', 'arzh2' ]
   ```

2. 盗用构造函数继承(构造函数继承)

   - 在子类构造函数中调用父类构造函数，可以在子类构造函数中使用call()和apply()方法
   - 缺点：只能继承父类的实例属性和方法，不能继承原型Parent.prototype属性/方法

   ```javascript
   function Parent(name) {
   }
   function Child(name) {
       Parent.call(this, name)
       this.age = 18
   }
   ```

3. 组合继承

   - 组合继承其实调用了两次父类构造函数, 造成了不必要的消耗

   ```javascript
   function Parent(name) {
      this.name = name
      this.colors = ["red", "blue", "yellow"]
   }
   Parent.prototype.sayName = function () {
      console.log(this.name);
   }
   function Child(name, age) {
      // 继承父类属性
      Parent.call(this, name)
      this.age = age;
   }
   // 继承父类方法
   Child.prototype = new Parent();
   Child.prototype.constructor = Child
   ```

4. 优化

   - Child.prototype = Parent.prototype，修正constructor指向后，Parent.prototype.constructor的指向会出现问题

5. 寄生组合继承

  ```javascript
  function Parent(name) {
    this.name = name
    this.colors = ["red", "blue", "yellow"]
  }
  Parent.prototype.sayName = function () {
    console.log(this.name);
  }
  function Child(name, age) {
    // 继承父类属性
    Parent.call(this, name)
    this.age = age;
  }
  // 继承父类方法
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child
  ```

### new一个对象的过程

1. 创建一个空对象obj;
2. 去除第一个参数，也就是我们传入的构造函数，理由shift方法修改原数组,所以 `arguments`会被去除第一个参数;
3. 将`obj`的`_proto_`指向构造函数的prototype，这样obj就能访问到构造函数原型上的属性方法;
4. 将构造函数的this用call或apply方法指向obj,让obj拥有构造函数内部属性方法;
5. 返回obj;

```javascript
function newObj(fn, ...args) {
  const obj = {}
  obj.__proto = fn.prototype
  const result = fn.apply(obj, args)
  if (Object.prototype.toString.call(result) === '[object Object]') {
    return result
  }
  return obj
}
// 中间的判断是因为如果构造函数中return一个对象的时候
function Fn() {
  this.name = '123'
  return {
    name: this.name
  }
}
const fn = newObj(Fn)
```

### event loop

- js是单线程
- Javascript 有一个 main thread 主线程和 call-stack 调用栈(执行栈)，所有的任务都会被放到调用栈等待主线程执行。
- JS调用栈采用的是后进先出的规则，当函数执行的时候，会被添加到栈的顶部，当执行栈执行完成后，就会从栈顶移出，直到栈内被清空。
- 同步任务会在调用栈中按照顺序等待主线程依次执行，异步任务会在异步任务有了结果后，将注册的回调函数放入任务队列中等待主线程空闲的时候（调用栈被清空），被读取到栈内等待主线程的执行。
- 同步任务——微任务（Process.nextTick（Node独有）、Promise、Object.observe(废弃)、MutationObserver）——宏任务（script全部代码、setTimeout、setInterval、setImmediate（浏览器暂时不支持，只有IE10支持，具体可见MDN）、I/O、UI Rendering）
- setTimeout时间长的会比时间短的后执行

```javascript
console.log('start')
setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(function() {
    console.log('promise1')
  })
}, 0)
setTimeout(() => {
  console.log('timer2')
  Promise.resolve().then(function() {
    console.log('promise2')
  })
}, 0)
Promise.resolve().then(function() {
  console.log('promise3')
})
console.log('end')
// start
// end
// promise3
// timer1
// promise1
// timer2
// promise2

console.log('script start')

setTimeout(() => {
  console.log('time1')
}, 1 * 2000)

Promise.resolve()
  .then(function () {
    console.log('promise1') // 加入微任务第一个
  })
  .then(function () {
    console.log('promise2')
  })

async function foo() {
  await bar()
  console.log('async1 end') // 加入微任务第二个
}
foo()

async function errorFunc() {
  try {
    await Promise.reject('error!!!') // 加入微任务第三个
  } catch (e) {
    console.log(e)
  }
  console.log('async1')
  return Promise.resolve('async1 success')
}
errorFunc().then((res) => console.log(res))

function bar() {
  console.log('async2 end')
}

console.log('script end')
// script start
// async2 end
// script end
// promise1
// async1 end
// error!!!
// async1
// promise2
// async1 success
// time1

setTimeout(() => {
  console.log(1)
}, 0)

const P = new Promise((resolve, reject) => {
  console.log(2)
  setTimeout(() => {
      resolve()
      console.log(3) // 同步方法，会先于后面的异步执行
  }, 0)
})

P.then(() => {
  console.log(4)
})
console.log(5)
// 2 5 1 3 4
```

#### 56. 要求设计 LazyMan 类，实现以下功能

```javascript
class LazyManClass {
  constructor(name) {
    this.name = name
    this.taskList = []
    console.log(`I am ${name}`)
    setTimeout(() => {
      this.next()
    }, 0) // 会先执行eat方法以及sleep方法，是同步方法
  }

  eat(type) {
    this.taskList.push(() => {
      console.log(type)
      this.next()
    })
    return this
  }

  sleep(time) {
    this.taskList.push(() => {
      setTimeout(() => {
        console.log('this')
        this.next()
      }, time)
    })
    return this
  }
  sleepFirst (time) {
    this.taskList.unshift(() => {
      setTimeout(() => {
        console.log('this')
        this.next()
      }, time)
    })
    return this
  }
  next() {
    const fn = this.taskList.shift()
    fn && fn()
  }
}
function LazyMan(name) {
  return new LazyManClass(name)
}
LazyMan('tony').eat('dinner').sleep(1000)
```

#### 8. setTimeout、Promise、Async/Await 的区别

- 考点：宏任务、微任务

### 闭包

#### 31.改造下面的代码，使之输出 0 - 9，写出你能想到的 所有解法

```javascript
for(let i = 0; i< 10; i++) {
  setTimeout(() => {
    console.log(i)
  }, 1000)
}
for(var i = 0; i< 10; i++) {
  (function(i){
    setTimeout(() => {
      console.log(i)
    }, 1000)
  })(i)
}
```

### 变量提升

- 首先函数声明比变量要高
- 如果是匿名函数就不存在函数b

#### 33.下面的代码打印什么内容，为什么

```javascript
var b = 10;
(function b() {
  b = 20
  console.log(b)
})()
```

#### 34. 简单改造下面的代码，使之分别打印 10 和 20

```javascript
var b = 10;
(() =>{
  b =20
  console.log(b);
})();
```

#### 41. 下面代码输出什么

```javascript
var a = 10;
(function(){
  console.log(a) // undefined
  a = 5
  console.log(window.a) // 10
  var a = 20
  console.log(a) // 20
})()
```

#### 53. 输出以下代码的执行结果并解释为什么

```javascript
var a = {n: 1};
var b = a;
a.x = a = {n: 2};

console.log(a) // { n: 2 }
console.log(b) // { n: 1, x: { n: 2 } }
```

- 赋值是从右到左的没错，但是.的优先级比=要高

## ES6

### ES6转ES5

#### 66. ES6 代码转成 ES5 代码的实现思路是什么

1. 解析：解析代码字符串，生成 AST；
2. 转换：按一定的规则转换、修改 AST；
3. 生成：将修改后的 AST 转换成普通代码。

### Set、Map、WeakSet 和WeakMap

#### 4. 介绍下Set、Map、WeakSet 和WeakMap 的区别？

- 考点：`Set`、`Map`、`WeakSet`和`WeakMap`
  - `Set`：对象允许你存储任何类型的唯一值
  - `WeakSet`：成员都是对象；成员都是弱引用，可以被垃圾回收机制回收，可以用来保存`DOM`节点，不容易造成内存泄漏；不可枚举
  - `Map`：本质上是键值对的集合，类似集合；可以遍历，方法很多，可以跟各种数据格式转换。
  - `WeakMap`：只接受对象做为键名（`null`除外），不接受其他类型的值作为键名；键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的；不能遍历，方法有`get`、`set`、`has`、`delete`。

### 模块化

#### 26. 介绍模块化发展历程

- 进化过程
  - 全局function模式 : 将不同的功能封装成不同的全局函数
  - namespace模式 : 简单对象封装
  - 引入多个script后出现出现问题：请求过多，依赖模糊，难以维护
- 模块化规范
  1. CommonJS：
     - module.exports = value或exports.xxx = value
     - require
     - 输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
     - 加载模块是同步的
  2. AMD
     - 非同步加载模块
     - define
     - require
  3. CMD
     - CMD规范整合了CommonJS和AMD规范的特点。在 Sea.js 中，所有 JavaScript 模块都遵循 CMD模块定义规范。
  4. ES6
     - export default 或 export
     - import
     - 尽量的静态化，使得编译时就能确定模块的依赖关系，common.js和AMD只能在运行时确定这些东西
     - CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
     - CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

### const let

#### 27. 全局作用域中，用 const 和 let 声明的变量不在 window 上，那到底在哪里?如何去获取?

- ES6 规定，var 命令和 function 命令声明的全局变量，依旧是顶层对象的属 性，但 let 命令、const 命令、class命令声明的全局变量，不属于顶层对象的属性。
- window输出const和let声明的变量是undefined，所以直接获取就行了

#### let

 1. 作用域：块级作用域。使用`let`在全局作用域中声明的变量不会成为`window`对象的属性。
 2. 没有变量提升，不能重复声明。在`let`声明之前的执行瞬间被称为“暂时性死区”。
 3. `for`循环：`JavaScript`引擎在后台会为每个迭代循环声明一个新的迭代变量。

#### const

- `const`声明的限制只适用于它指向的变量的引用。如果`const`变量引用的是一个对象，那么修改这个对象内部的属性并不违反`const`的限制。

### promise

- Promise.allSettled()返回一个在所有给定的promise都已经fulfilled或rejected后的promise，并带有一个对象数组，每个对象表示对应的promise结果。
- Promise.race(iterable) 方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。
- Promise.all() 方法接收一个promise的iterable类型（注：Array，Map，Set都属于ES6的iterable类型）的输入，并且只返回一个Promise实例， 那个输入的所有promise的resolve回调的结果是一个数组。这个Promise的resolve回调执行是在所有输入的promise的resolve回调都结束，或者输入的iterable里没有promise了的时候。它的reject回调执行是，只要任何一个输入的promise的reject回调执行或者输入不合法的promise就会立即抛出错误，并且reject的是第一个抛出的错误信息。

#### 80. 介绍下 Promise.all 使用、原理实现及错误处理

```javascript
all(list) {
  return new Promise((resolve, reject) => {
    let resValues = [];
    let counts = 0;
    for (let [i, p] of list) {
      resolve(p).then(res => {
        counts++;
        resValues[i] = res;
        if (counts === list.length) {
            resolve(resValues)
        }
      }, err => {
        reject(err)
      })
    }
  })
}
```

#### 89. 设计并实现 Promise.race()

```javascript
Promise._race = (promises) =>
  new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise.then(resolve, reject)
    })
  })
```

#### 42. 实现一个sleep函数

- 考点：promise

```javascript
function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
sleep(1000).then(() => {console.log(123)})
(async function() {
  await sleep(1000)
  console.log(123)
})()
```

#### 64. 模拟实现一个 Promise.finally

- Promise.prototype.finally()，在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数。

```javascript
Promise.prototype.finallyNew = function (callback) {
  const p = this.constructor
  return this.then(
    (res) => {
      p.resolve(callback()).then(() => res)
    },
    (err) => {
      p.resolve(callback()).then(() => {
        throw err
      })
    }
  )
}
```

### 箭头函数

#### 58. 箭头函数与普通函数（function）的区别是什么？构造函数（function）可以使用 new 生成实例，那么箭头函数可以吗？为什么？

1. 函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。
2. 不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
3. 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。
4. 不可以使用 new 命令，因为：没有自己的 this，无法调用 call，apply。没有 prototype 属性 ，而 new 命令在执行时需要将构造函数的 prototype 赋值给新的对象的 __proto__

### proxy

- Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。

```javascript
const handler = {
    get: function(obj, prop) {
        return prop in obj ? obj[prop] : 37;
    }
};

const p = new Proxy({}, handler);
p.a = 1;
p.b = undefined;

console.log(p.a, p.b);      // 1, undefined
console.log('c' in p, p.c); // false, 37
```

#### 74. 使用 JavaScript Proxy 实现简单的数据绑定

```html
<body>
  hello,world
  <input type="text" id="model">
  <p id="word"></p>
</body>
<script>
  const model = document.getElementById("model")
  const word = document.getElementById("word")
  var obj= {};

  const newObj = new Proxy(obj, {
      get: function(target, key, receiver) {
        console.log(`getting ${key}!`);
        return Reflect.get(target, key, receiver);
      },
      set: function(target, key, value, receiver) {
        console.log('setting',target, key, value, receiver);
        if (key === "text") {
          model.value = value;
          word.innerHTML = value;
        }
        return Reflect.set(target, key, value, receiver);
      }
    });

  model.addEventListener("keyup",function(e){
    newObj.text = e.target.value
  })
</script>
```

### Reflect

- Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。将之前的一些不规范的写法进行规范化

## 算法

### 5. 介绍下深度优先遍历和广度优先遍历，如何实现？

- 深度优先遍历(`DFS`)：是指从某个顶点出发，首先访问这个顶点，然后找出刚访问这个结点的第一个未被访问的邻结点，然后再以此邻结点为顶点，继续找它的下一个顶点进行访问。重复此步骤，直至所有结点都被访问完为止。用堆栈的方法，先进后出

```javascript
// 递归
function DFS(node, nodes) {
  if (node) {
    nodes.push(node.name)
    const children = node.children
    if (children) {
      for (let i = 0; i < children.length; i++) {
        DFS(children[i], nodes)
      }
    }
    return nodes
  }
}
const tree = {
  name: 'root',
  children: [
    {
      name: 'c1',
      children: [
        {
          name: 'c11',
          children: []
        },
        {
          name: 'c12',
          children: []
        }
      ]
    },
    {
      name: 'c2',
      children: [
        {
          name: 'c21',
          children: []
        },
        {
          name: 'c22',
          children: []
        }
      ]
    }
  ]
}
```

- 广度优先遍历(`BFS`)：是指从某个顶点出发，首先访问这个顶点，然后找出刚访问这个结点所有未被访问的邻结点，访问完后再访问这些结点中第一个邻结点的所有结点，重复此方法，直到所有结点都被访问完为止。用队列的方法，先进先出

```javascript
function BFS() {
  const queue = [tree]
  const nodes = []
  while (queue.length > 0) {
    const node = queue.shift()
    nodes.push(node.name)
    const children = node.children
    if (children) {
      for (let i = 0; i < children.length; i++) {
        queue.push(children[i])
      }
    }
  }
  return nodes
}
```

### 6. 请分别用深度优先思想和广度优先思想实现一个深拷贝函数?【不会】

- 考点：深拷贝、算法、判断类型`Object.prototype.toString.call(o) === "[object Object]"`

```javascript
function getEmpty(o) {
  if (Object.prototype.toString.call(o) === "[object Object]") {
    return {};
  }
  if (Object.prototype.toString.call(o) === "[object Array]") {
    return [];
  }
  return o; // 其它类型
}

```

### 30. 两个数组合并成一个数组

- break跳出循环
- continue跳出本次循环

```javascript
const arr1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']
const arr2 = ['A', 'B', 'C', 'D']
function method() {
  const result = []
  for (let i = 0; i <= arr2.length; i++) {
    for (let j = 0; j <= arr1.length; j++) {
      if (arr1[j]?.includes(arr2[i])) {
        result.push(arr1[j])
      } else if (arr1[j-1]?.includes(arr2[i])) {
        result.push(arr2[i])
        break
      }
    }
  }
  return result
}
console.log(method())
```

### 36.实现flatten

```javascript
var arr = [1, 2, 3, [4, 5], [6, [7, [8]]]]
function flatten(arr) {
  let result = []
  for(let a of arr ) {
    if (Array.isArray(a)) {
      result = result.concat(flatten(a))
    } else {
      result.push(a)
    }
  }
  return result
}
console.log(flatten(arr))
```

#### 88. 实现 convert 方法，把原始 list 转换成树形结构，要求尽可能降低时间复杂度

```javascript
function convert(list) {
  const res = []
  const map = new Map()
  for (const item of list) {
    map.set(item.id, item)
  }
  for (const item of list) {
    if (item.parentId === 0) {
      res.push(item)
      continue
    }
    if (map.get(item.parentId)) {
      const parent = map.get(item.parentId)
      parent.children = parent.children || []
      parent.children.push(item)
    }
  }
  console.log(res)
}
```

### 排序

#### 54. 冒泡排序如何实现，时间复杂度是多少， 还可以如 何改进

- 原理：两次循环，O(n^2)，两次循环，相邻元素两两比较，如果前面的大于后面的就交换位置

- 冒泡O(n^2)

```javascript
function bubbleSort(arr) {
  const len = arr.length
  // 外层循环i控制比较的轮数
  for (let i = 0; i < len; i++) {
    // 里层循环控制每一轮比较的次数j，arr[i] 只用跟其余的len - i个元素比较
    for (let j = 1; j < len - i; j++) {
      // 若前一个元素"大于"后一个元素，则两者交换位置
      if (arr[j - 1] > arr[j]) {
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]
      }
    }
  }
  return arr
}
```

- 选择排序O(n^2)

  - 循环一遍，找到最小的，和下标1交换；循环下一遍，找到第二小的，和下标2交换

```javascript
function selection(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[min] > arr[j]) {
        min = j
      }
    }
    const temp = arr[min]
    arr[min] = arr[i]
    arr[i] = temp
  }
  return arr
}
```

- 插入排序O(n^2)
  - 每一次循环排好前i+1个数组长度的顺序，然后将后面的元素插入进数组中

```javascript
function insertionSort(array) {
  const handle = [array[0]]
  for (let i = 1; i < array.length; i++) {
    const current = array[i]
    for (let j = handle.length - 1; j >= 0; j--) {
      if (current > handle[j]) {
        handle.push(current)
      } else {
        if (j === 0) {
          handle.unshift(current)
        }
      }
    }
  }
  return handle
}
```

- 快速排序O(n log n)

  - 从中间开始，左边的都比它小，右边的都比它大，递归

```javascript
function quickSort(arr) {
  // 4.结束递归（当ary小于等于一项，则不用处理）
  if (arr.length <= 1) {
    return arr
  }
  // 1. 找到数组的中间项，在原有的数组中把它移除
  const middleIndex = Math.floor(arr.length / 2)
  const middle = arr.splice(middleIndex, 1)[0]
  // 2. 准备左右两个数组，循环剩下数组中的每一项，比当前项小的放到左边数组中，反之放到右边数组中
  const leftArr = [],
    rightArr = []
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i]
    current < middle ? leftArr.push(current) : rightArr.push(current)
  }
  // 3. 递归方式让左右两边的数组持续这样处理，一直到左右两边都排好序为止。
  //（最后让左边+中间+右边拼接成最后的结果）
  return quickSort(leftArr).concat(middle, quickSort(rightArr))
}
```

## 计算机网络

### http

- 早在 HTTP 建立之初，主要就是为了将超文本标记语言(HTML)文档从Web服务器传送到客户端的浏览器。
- 影响一个 HTTP 网络请求的因素主要有两个：带宽和延迟（浏览器阻塞、DNS查询、建立连接-三次握手]）。
- HTTP1.0和HTTP1.1的一些区别
  - 缓存
  - 带宽优化及网络连接的使用：HTTP1.1在请求头引入了range头域，它允许只请求资源的某个部分，即返回码是206
  - 错误通知的管理：在HTTP1.1中新增了24个错误状态响应码，
  - Host头处理：请求消息和响应消息都应支持Host头域，且请求消息中如果没有Host头域会报告一个错误（400 Bad Request）
  - 长连接：默认开启Connection： keep-alive，
- HTTPS与HTTP的一些区别
  - HTTP: HTTP+TCP
  - HTTPS: HTTP+SSL/TLS加密+TCP
- HTTP2.0和HTTP1.X相比的新特性
  - 新的二进制格式：HTTP1.x的解析是基于文本。二进制格式实现方便且健壮
  - 多路复用：一个request对应一个id，这样一个连接上可以有多个request，每个连接的request可以随机的混杂在一起，接收方可以根据request的 id将request再归属到各自不同的服务端请求里面。
  - header压缩
  - 服务端推送

### TCP三次握手和四次挥手

- 三次握手
  1. 第一次握手：刚开始客户端处于 closed 的状态，服务端处于 listen 状态。客户端给服务器发送一个 SYN 报文，并指明客户端的初始化序列号 SN(c)。此时客户端处于 SYN_Send 状态。服务端：客户端发送能力没有问题
  2. 第二次握手：服务器收到客户端的 SYN 报文之后，会以自己的 SYN 报文作为应答，并且也是指定了自己的初始化序列号 ISN(s)，同时会把客户端的 ISN + 1 作为 ACK 的值，表示自己已经收到了客户端的 SYN，此时服务器处于 *SYN_REVD* 的状态。客户端：服务端接受、发送能力没有问题
  3. 第三次握手：客户端收到 SYN 报文之后，会发送一个 ACK 报文，当然，也是一样把服务器的 ISN + 1 作为 ACK 的值，表示已经收到了服务端的 SYN 报文，此时客户端处于 establised 状态。服务端：客户端接收能力没有问题
  4. 服务器收到 ACK 报文之后，也处于 establised 状态，此时，双方以建立起了链接。
  - 作用
    1. 确认双方的接受能力、发送能力是否正常。
    2. 指定自己的初始化序列号，为后面的可靠传送做准备。

- 四次挥手
  1. 第一次挥手：客户端发送一个 FIN 报文，报文中会指定一个序列号。此时客户端处于FIN_WAIT1状态。
  2. 第二次握手：服务端收到 FIN 之后，会发送 ACK 报文，且把客户端的序列号值 + 1 作为 ACK 报文的序列号值，表明已经收到客户端的报文了，此时服务端处于 CLOSE_WAIT状态。
  3. 第三次挥手：如果服务端也想断开连接了，和客户端的第一次挥手一样，发给 FIN 报文，且指定一个序列号。此时服务端处于 LAST_ACK 的状态。
  4. 第四次挥手：客户端收到 FIN 之后，一样发送一个 ACK 报文作为应答，且把服务端的序列号值 + 1 作为自己 ACK 报文的序列号值，此时客户端处于 TIME_WAIT 状态。需要过一阵子以确保服务端收到自己的 ACK 报文之后才会进入 CLOSED 状态
  5. 服务端收到 ACK 报文之后，就处于关闭连接了，处于 CLOSED 状态。

#### 17. A、B 机器正常连接后，B 机器突然重启，问 A 此时 处于 TCP 什么状态

- 因为 B 会在重启之后进入 tcp 状态机的 listen 状态，只要当 a 重新发送一个数据 包(无论是 syn 包或者是应用数据)，b 端应该会主动发送一个带 rst 位的重置 包来进行连接重置，所以 a 应该在 syn_sent 状态

#### 44. 介绍 HTTPS 握手过程

  1. clientHello
  2. SeverHello
  3. 客户端回应
  4. 服务器的最后回应

#### 45.HTTPS 握手过程中，客户端如何验证证书的合法性

  1. 校验证书的颁发机构是否受客户端信任。
  2. 通过 CRL 或 OCSP 的方式校验证书是否被吊销。
  3. 对比系统时间，校验证书是否在有效期内。
  4. 通过校验对方是否存在证书的私钥，判断证书的网站域名是否与证书颁发的域名一致。

### 缓存

## 工程化

### npm

#### 20. 介绍下 npm 模块安装机制，为什么输入 npm install就可以自动安装对应的模块

- npm安装机制
  - 查询node_modules目录之中是否已经存在指定模块
    - 若存在，不再重新安装
    - 若不存在
      - npm 向 registry 查询模块压缩包的网址
      - 下载压缩包，存放在根目录下的.npm目录里
      - 解压压缩包到当前项目的node_modules目录
- npm原理
  - 执行工程自身 preinstall
  - 确定首层依赖模块：也就是 dependencies 和 devDependencies 属性中直接指定的模块
  - 获取模块
  - 模块扁平化
  - 安装模块
  - 执行工程自身生命周期

## 设计模式

### 23. 介绍下观察者模式和订阅-发布模式的区别，各自适用于什么场景

- 观察者模式中主体和观察者是互相感知的，发布-订阅模式是借助第三方来实现 调度的，发布者和订阅者之间互不感知

## Node

### 事件循环

#### 说说浏览器和 Node 事件循环的区别

- v11以上一样

## 浏览器、安全

### 安全

#### 28. cookie 和 token 都存放在 header 中，为什么不会 劫持 token?

- CSRF攻击的原因是浏览器会自动带上cookie，而浏览器不会自动带上token。
- cookie：登陆后后端生成一个sessionid放在cookie中返回给客户端，并且服务端一直记录着这个sessionid，客户端以后每次请求都会带上这个sessionid，服务端通过这个sessionid来验证身份之类的操作。所以别人拿到了cookie拿到了sessionid后，就可以完全替代你。
- token：登陆后后端不返回一个token给客户端，客户端将这个token存储起来，然后每次客户端请求都需要开发者手动将token放在header中带过去，服务端每次只需要对这个token进行验证就能使用token中的信息来进行下一步操作了。

### 攻击

- xss 跨站脚本攻击
  - Cross-Site Scripting（跨站脚本攻击）简称 XSS，是一种代码注入攻击。攻击者通过在目标网站上注入恶意脚本，使之在用户的浏览器上运行。利用这些恶意脚本，攻击者可获取用户的敏感信息如 Cookie、SessionID 等，进而危害数据安全。
    - 在 HTML 中内嵌的文本中，恶意内容以 script 标签形成注入。
    - 在内联的 JavaScript 中，拼接的数据突破了原本的限制（字符串，变量，方法名等）。
    - 在标签属性中，恶意内容包含引号，从而突破属性值的限制，注入其他属性或者标签。
    - 在标签的 href、src 等属性中，包含 javascript: (伪协议)等可执行代码。
    - 在 onload、onerror、onclick 等事件中，注入不受控制代码。
    - 在 style 属性和标签中，包含类似 background-image:url("javascript:..."); 的代码（新版本浏览器已经可以防范）。
    - 在 style 属性和标签中，包含类似 expression(...) 的 CSS 表达式代码（新版本浏览器已经可以防范）。
  - 只要有输入数据的地方，就可能存在 XSS 危险。
  - 常用防范方法
    - httpOnly: 在 cookie 中设置 HttpOnly 属性后，js脚本将无法读取到 cookie 信息。
    - 输入过滤: 一般是用于对于输入格式的检查，例如：邮箱，电话号码，用户名，密码……等，按照规定的格式输入。不仅仅是前端负责，后端也要做相同的过滤检查。因为攻击者完全可以绕过正常的输入流程，直接利用相关接口向服务器发送设置。
    - 转义 HTML: 如果拼接 HTML 是必要的，就需要对于引号，尖括号，斜杠进行转义,但这还不是很完善.想对 HTML 模板各处插入点进行充分的转义,就需要采用合适的转义库.(可以看下这个库,还是中文的)
    - 白名单: 对于显示富文本来说，不能通过上面的办法来转义所有字符，因为这样会把需要的格式也过滤掉。这种情况通常采用白名单过滤的办法，当然也可以通过黑名单过滤，但是考虑到需要过滤的标签和标签属性实在太多，更加推荐使用白名单的方式。
- CSRF 跨站点请求伪造
  - 是一种挟制用户在当前已登录的 Web 应用程序上执行非本意的操作的攻击方法。如:攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。
    1. 登录受信任网站A，并在本地生成Cookie。
    2. 在不登出A的情况下，访问危险网站B
  - 防御
    1. 验证码；强制用户必须与应用进行交互，才能完成最终请求。此种方式能很好的遏制 csrf，但是用户体验比较差。
    2. Referer check；请求来源限制，此种方法成本最低，但是并不能保证 100% 有效，因为服务器并不是什么时候都能取到 Referer，而且低版本的浏览器存在伪造 Referer 的风险。
    3. token；token 验证的 CSRF 防御机制是公认最合适的方案。若网站同时存在 XSS 漏洞的时候，这个方法也是空谈。

#### 91.介绍下 HTTPS 中间人攻击

- 中间人攻击过程如下：
  1. 服务器向客户端发送公钥。
  2. 攻击者截获公钥，保留在自己手上。
  3. 然后攻击者自己生成一个【伪造的】公钥，发给客户端。
  4. 客户端收到伪造的公钥后，生成加密hash值发给服务器。
  5. 攻击者获得加密hash值，用自己的私钥解密获得真秘钥。
  6. 同时生成假的加密hash值，发给服务器。
  7. 服务器用私钥解密获得假秘钥。
  8. 服务器用加秘钥加密传输信息

- 防范方法：服务端在发送浏览器的公钥中加入CA证书，浏览器可以验证CA证书的有效性

### cookie session

- HTTP 协议是一种无状态协议，即每次服务端接收到客户端的请求时，都是一个全新的请求，服务器并不知道客户端的历史请求记录；Session 和 Cookie 的主要目的就是为了弥补 HTTP 的无状态特性

## Node.js

### 61.介绍下如何实现 token 加密

- JWT
  1. 需要一个secret（随机数）
  2. 后端利用secret和加密算法(如：HMAC-SHA256)对payload(如账号密码)生成一个字符串(token)，返回前端
  3. 前端每次request在header中带上token
  4. 后端用同样的算法解密

## 工程化

### webpack

#### 70. 介绍下 webpack 热更新原理，是如何做到在不刷新浏览器的前提下更新页面的

1. 当修改了一个或多个文件；
2. 文件系统接收更改并通知webpack；
3. webpack重新编译构建一个或多个模块，并通知HMR服务器进行更新；
4. HMR Server 使用webSocket通知HMR runtime 需要更新，HMR运行时通过HTTP请求更新jsonp；
5. HMR运行时替换更新中的模块，如果确定这些模块无法更新，则触发整个页面刷新。