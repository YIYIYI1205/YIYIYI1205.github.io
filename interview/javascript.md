# js面试相关

## 数据类型

### Array

#### 判断数组的方法

- `Array``+`原型链

1. `arr instanceof Array`，`instanceof`只能用来判断对象类型，原始类型不可以(`num instanceof Number === false`)；并且所有对象类型 `instanceof Object`都是`true`；`instanceof`底层原理是检测构造函数的`prototype`属性是否出现在某个实例的原型链上；会忽略`iframes`
2. `arr.constructor === Array`，任何对象都有`constructor`，并不是只有构造函数才有；会忽略`iframes`
3. `Object.prototype.toString.call(arr) === '[object Array]'`，不能用`obj.toString() === [object Object]`因为`obj`的`toString`可以改写，而应该调用原型链顶端的方法；这种方法对于所有基本的数据类型都能进行判断，即使是`null('[object Null]')`和`undefined('[object Undefined]')`
4. `Array.isArray(arr)`，当检测`Array`实例时，`Array.isArray`优于`instanceof`，因为`Array.isArray`可以检测出`iframes`；`isArray`会有兼容性问题

   ```javascript
   const iframe = document.createElement('iframe')
   document.body.append(iframe)
   const xArray = window.frames[window.frames.length - 1].Array
   const arr = new xArray(1, 2, 3)
   console.log(arr instanceof Array) // false
   console.log(arr.constructor === Array) // false
   ```

5. `Array.prototype.isPrototypeOf(arr)`
6. `Object.getPrototypeOf(arr) === Array.prototype`

#### 方法

- `Array.prototype.slice.call(arguments)`

## 预编译

- `js`运行三部曲：语法分析、预编译、解释执行
  - 语法分析：引擎检查  代码有没有什么低级的语法错误
  - 预编译：在内存中开辟一些空间，存放一些变量与函数，会导致变量提升
  - 解释执行：执行代码
- 浏览器先按照`js`的顺序加载`<script>`标签分隔的代码块，`js`代码块加载完毕之后，立刻进入到上面的三个阶段，然后再按照顺序找下一个代码块，再继续执行三个阶段，无论是外部脚本文件（不异步加载）还是内部脚本代码块，都是一样的，并且都在同一个全局作用域中
- 预编译过程
  - `GO（global object）`对象（`window`对象）(脚本代码块`script`执行前)
    1. 生成`GO`对象` GO｛｝(global object) `这个`GO`就是`window`
    2. 将全局的变量声明（的名）储存在`GO`对象中，`value`为`undefined`
    3. 将全局的函数声明的函数名作为`GO`对象中的`key`，函数整体内容为`value`储存到`GO`对象中，如果遇到同名，直接覆盖
    - 任何变量，如果变量未经声明就赋值，这些变量就为全局对象所有。一切声明的全局变量和未经声明的变量，全归`window`所有。
  
    ```tsx
    var a
    function fun() {}
    function abc() {}
    console.log('第1次', a)      // function a
    function a() {}
    console.log('第2次', a)      // function a
    var a = 100 
    console.log('第3次', a)      // 100
    ```
  
  - `AO（action object）`对象
    - 是函数执行前的一瞬间，生成一个`AO`对象（在函数执行前的一瞬间会生成自己的`AO`，如果函数执行`2`次，生成了两次`AO`，这两次的`AO`是没有任何关联）
    1. 执行前的一瞬间，会生成一个`AO（action object）`对象
    2. 分析参数，形参作为`AO`对象的属性名，实参作为`AO`对象的属性值
    3. 分析`var`变量声明，变量名作为`AO`对象的属性名，值为`undefined`，如果遇到同名的，不去做任何改变
    4. 分析函数声明，函数名作为`AO`对象的属性名，值为函数体，如果遇到同名的，直接覆盖（会将作为参数传进来的变量值覆盖）

    ```jsx
    console.log(person) // undefined
    console.log(personFun) // function personFun
    var person = "saucxs"
    console.log(person) // saucxs
    function personFun() {
      console.log(person) // 这里只是输出person，并没有person = 进行赋值，所以不会定义在全局 
      var person = "songEagle"; // 这里有定义person，所以变量提升，上面一个输出person并不会往外找
      console.log(person)
    }
    personFun() // undefined songEagle
    console.log(person) // saucxs
    ```

## this

1. 默认绑定，默认为浏览器环境执行结果

  ```jsx
  function get(name){
    console.log(name)
  }
  get(123)
  get.call(window, 123)
  ```

2. 在非箭头函数下，`this`永远指向最后调用它的那个对象(隐式绑定)

  ```javascript
  var name = 222
  var a = {
    name: 111,
    say: function() {
      console.log(this.name)
    }
  }
  var fun = a.say
  fun() // fun.call(window) // 222
  a.say() // a.say.call(a) // 111
  var b = {
    name: 333,
    say: function(fun) {
      fun() // fun.call(window) // 222
    }
  }
  b.say(a.say) // 222
  b.say = a.say
  b.say() // b.say.call(b) // 333
  ```

3. 构造函数下，`this`与被创建的新对象绑定（`new`绑定）
4. `DOM`事件，`this`指向触发事件的元素
5. 内联事件分两种情况

  ```html
  <!-- DOM元素 -->
  <button onclick="console.log(this)"></button>
  <!-- window -->
  <button onclick="(function(){console.log(this)})()"></button>
  ```

5. 箭头函数的`this`始终指向函数定义时外层代码块的`this`，而非执行时；箭头函数没有自己的`this`，不可以当做构造函数，不能使用`new`，不可以使用`arguments`

  ```jsx
  var obj = {
    say: () => {
      console.log(this) // window
    }
  }
  var obj = {
    birth: 1990,
    getAge: function() {
      var fn = () => this.birth // obj
    }
  }
  ```

6. `bind`，`call`，`apply`方法等（显式绑定）
  - `fun.apply(thisArg, [argsArray])`，传数组
  - `fun.call(thisArg[, arg1[, arg2[, ...]]])`，传参数
  - `fun.bind(thisArg[, arg1[, arg2[, ...]]])`，传参数，并需要调用
  ```jsx
  // 手写call
  Function.prototype.myCall = function(context) {
    // this代表谁调用myCall方法
    if(typeof this !== 'function'){
      throw new Error('error')
    }
    context = context || window
    const args = [...arguments].slice(1)
    context.fn = this
    const result = context.fn(...args)
  }
  ```
## 闭包

### 防抖、节流

- 闭包`+`作用域`+`优化

- 防抖：一定时间内没有再触发事件，事件处理函数才会执行一次；只要在延迟时间内再触发，就会`clear timeout`；例如输入框防抖
- 节流：规定的延迟时间内必然会执行一次。比如在页面的无限加载场景下，需要用户在滚动页面时，每隔一段时间发一次`Ajax`请求，而不是在用户停下滚动页面操作时才去请求数据

```javascript
// 防抖
function debounce(fn, wait) {
    let timer = null
    // 闭包防止内存泄露
    return function() {
        const context = this
        if (timer !== null) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            // fn(...arguments) // 箭头函数没有arguments
            fn.apply(context, arguments)
        }, wait)
    }
}
function fn() {
    console.log(arguments)
    console.log(input.value)
}
const input = document.getElementById('input')
input.addEventListener('keyup', debounce(fn, 1000))
// debounce会直接执行，里面的函数会在keyup触发时执行，因此可以将e传进去
```

```javascript
// 节流
// 方法一：定时器实现
const throttle = function (fn, delay) {
  let timer = null
  return function () {
    const context = this
    let args = arguments
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args)
        clearTimeout(timer)
      }, delay)
    }
    //如果定时器存在什么都不做，定时器不存在就创建定时器
  }
}
// 方法二：时间戳
const throttle2 = function (fn, delay) {
  let preTime = Date.now()
  return function () {
    const context = this
    let args = arguments
    let doTime = Date.now()
    if (doTime - preTime >== delay) {
      fn.apply(context, args)
      preTime = Date.now()
    }
  }
}
```

```javascript
// 图片懒加载
const num = document.getElementsByTagName('img').length
const img = document.getElementsByTagName('img')
let n = 0 // 存储图片加载到的位置，避免每次都从第一张图片开始遍历
const isLoadImg = false
let _clientHeight = document.documentElement.clientHeight // 可见区域的高度
let _scrollTop = document.documentElement.scrollTop || document.body.scrollTop
function lazyLoad() {
    isLoadImg = n >= num
    _scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    for(let i = n ; i < num; i++ ) {
        if (img[i].offsetTop < _clientHeight + _scrollTop) {
            if (img[i].getAttribute('src') === '') {
                img[i].src = img[i].getAttribute('data-src')
            }
            n = i + 1
        }
    }
}
function computeClientHeight(){
    _clientHeight = document.documentElement.clientHeight
}
window.addEventListener('scroll', throttle(lazyLoad, 100, isLoadImg))
window.addEventListener('resize', debounce(computeClientHeight, 800))
```
