# javascript面试

## 正则表达式[没看]

## 手写ajax

```javascript
function ajax(url) {
    const xhr = new XMLHttpRequest()
    xhr.open('get', url, false) // false:异步；true:同步
    // 如果是post方法
    xhr.open("post", url, false)
    //设置请求头
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded")
    xhr.send()
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = xhr.responseTEXT;
            return data;
        }
    }
}
```

- `readyState`的五个状态
  1. `0`:未初始化。尚未调用`open()`方法
  2. `1`:启动。已经调用`open()`方法，但尚未调用`send()`方法
  3. `2`:发送。已经调用了`send()`方法，但未接收到响应
  4. `3`:接收。已经接收到部分响应数据
  5. `4`:完成。已经接收到全部响应数据，而且已经可以在客户端使用了。

## 数组[没看]

- `Array.prototype.slice`：`slice()`方法返回一个新的数组对象，这一对象是一个由`begin`和`end`决定的原数组的浅拷贝（包括`begin`，不包括`end`）。原始数组不会被改变。

### 判断数组的方法[没看]

1. arr instanceof Array
2. arr.constructor === Array       任何对象都有constructor  并不是只有构造函数才有
3. Array.prototype.isPrototypeOf(arr)
4. Object.getPrototypeOf(arr) === Array.prototype
5. Object.prototype.toString.call(arr) === '[object Array]'
6. Array.isArray(arr)

## 函数式编程-高阶函数

### 纯函数

- 一个函数的返回结果只依赖于它的参数，并且在执行过程里面没有副作用，我们就把这个函数叫做纯函数。
- 一个函数执行过程对产生了外部可观察的变化那么就说这个函数是有副作用的。

### js函数柯里化

- 把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。
- 作用
  1. 参数复用

    ```javascript
    // 函数封装后
    function check(reg, txt) {
        return reg.test(txt)
    }
    check(/\d+/g, 'test')       //false
    check(/[a-z]+/g, 'test')    //true
    // Currying后
    function curryingCheck(reg) {
        return function(txt) {
            return reg.test(txt)
        }
    }
    var hasNumber = curryingCheck(/\d+/g)
    var hasLetter = curryingCheck(/[a-z]+/g)
    hasNumber('test1')      // true
    hasNumber('testtest')   // false
    hasLetter('21212')      // false
    ```

  2. 提前确认

    ```javascript
    var on = function(element, event, handler) {
        if (document.addEventListener) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        } else {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        }
    }
    var on = (function() {
        if (document.addEventListener) {
            return function(element, event, handler) {
                if (element && event && handler) {
                    element.addEventListener(event, handler, false);
                }
            };
        } else {
            return function(element, event, handler) {
                if (element && event && handler) {
                    element.attachEvent('on' + event, handler);
                }
            };
        }
    })();
    ```

  3. 延迟运行

    ```javascript
    Function.prototype.bind = function (context) {
        var _this = this
        var args = Array.prototype.slice.call(arguments, 1)
    
        return function() {
            return _this.apply(context, args)
        }
    }
    ```

```javascript
// 实现一个add方法，使计算结果能够满足如下预期：
add(1)(2)(3) = 6;
add(1, 2, 3)(4) = 10;
add(1)(2)(3)(4)(5) = 15;

function add() {
    // 第一次执行时，定义一个数组专门用来存储所有的参数
    var _args = Array.prototype.slice.call(arguments);
    // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
    var _adder = function() {
        _args.push(...arguments);
        return _adder;
    };
    // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
    _adder.toString = function () {
        return _args.reduce(function (a, b) {
            return a + b;
        });
    }
    return _adder;
}
add(1)(2)(3)                // 6
add(1, 2, 3)(4)             // 10
add(1)(2)(3)(4)(5)          // 15
add(2, 6)(1)                // 9
```

## 闭包

- 使用场景：
    1. 函数作为返回值
    2. 函数作为参数传递

```javascript
// 正确的闭包的写法：i是函数作用域中的，使用的时候会去它定义的时候的作用域找变量
var i
for(i=0;i<10;i++){
    (function(i){
        console.log(i)
    })(i)
}
```

- 这是一个自执行函数：不用调用，只要定义完成，立即执行的函数
- 闭包实际应用中主要用于封装变量，收敛权限
- 闭包实现防抖
- 闭包：为了去访问外部的变量
- 使用场景是因为防抖定义了一个变量`timer`，每次都需要去判断这个参数是否为null，如果定义全局变量会造成污染，因此用闭包解决

## 防抖、节流

- 防抖：只要在延迟时间内执行，就会`clear timeout`，例如输入框防抖
- 节流：规定的延迟时间内必然会执行一次。比如在页面的无限加载场景下，我们需要用户在滚动页面时，每隔一段时间发一次`Ajax`请求，而不是在用户停下滚动页面操作时才去请求数据。这样的场景，就适合用节流技术来实现。

```javascript
// 防抖
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
function fn() {
    console.log(arguments)
    console.log(input.value)
}
const input = document.getElementById('input')
input.addEventListener('keyup', debounce(fn, 1000))
// debounce会直接执行，里面的函数会在keyup出发时执行，因此可以将e传进去
```

```javascript
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

## 深拷贝、浅拷贝

- 内存分为四个区：
  - 栈区（堆栈）：存基本类型（值类型）和地址
  - 堆区：存引用类型的数据
  - 全局静态区
  - 只读区（常量区和代码区）

- 深拷贝
  - 数组
    1. `const arr1 = [...arr]`
    2. `const arr1 = arr.slice()`
    3. `const arr1 = arr.concat()`
    4. 循环
  - 对象
    1. `JSON.parse(JSON.stringify(obj))`：无法赋值函数类型，`Map`，`Set`，`RegExp`，`Date`，`ArrayBuffer`和其他内置类型在进行序列化时会丢失；不能处理循环对象。
    2. 遍历`key`+递归+判断数组+解决循环引用+`WeakMap`

      ```javascript
      function clone(obj, map = new WeakMap()) {
        if (typeof obj === 'object') {
          const objNew = Array.isArray(obj) ? [] : {}
          if (map.get(obj)) {
            return map.get(obj)
          }
          map.set(obj, objNew)
          for (const key in obj) {
            objNew[key] = clone(obj[key], map)
            // 对类型做判断后
            // 克隆set：cloneTarget.add(clone(value,map));
            // 克隆map：cloneTarget.set(key, clone(value,map));
          }
          return objNew
        } else {
          return obj
        }
      }
      ```

- 浅拷贝
  - 用`Object.assign({}, obj)`只解决了对象中基本类型的拷贝，对象中引用类型的拷贝还是不行
  
  ```javascript
  const p2 = {}
  const p = {
    books: [2, 2, 3],
    name: 123
  }
  for (let key in p) {
    p2[key] = p[key]
  }
  p2.books[0] = '1' // 这是引用类型
  p2.name = '234' // 这是值类型
  console.log(p2) // { books: [ '1', 2, 3 ], name: '234' }
  console.log(p) // { books: [ '1', 2, 3 ], name: 123 }
  ```


## 懒加载

- 懒加载其实就是延迟加载，是一种对网页性能优化的方式，比如当访问一个页面的时候，优先显示可视区域的图片而不一次性加载所有图片，当需要显示的时候再发送图片请求，避免打开网页时加载过多资源。
- 先不给`<img>`设置`src`，把图片真正的`URL`放在另一个属性`data-src`中，在需要的时候也就是图片进入可视区域的之前，将`URL`取出放到`src`中。

```javascript
// 如何判断元素是否在可视区域
// 通过getBoundingClientRect()方法来获取元素的大小以及位置
function isInSight(el) {
  const bound = el.getBoundingClientRect();
  const clientHeight = window.innerHeight;
  //如果只考虑向下滚动加载
  //const clientWidth = window.innerWeight;
  return bound.top <= clientHeight + 100;
}
const source = el.dataset.src;
el.src = source;
```

## this

1. 默认绑定，默认为浏览器环境执行结果
2. 在非箭头函数下，`this`永远指向最后调用它的那个对象(隐式绑定)

  ```javascript
  var o = { prop: 37 }
  function independent() {
    return this.prop
  }
  o.f = independent
  console.log(o.f()) // 37
  o.b = {
    g: independent,
    prop: 42
  }
  console.log(o.b.g()) // 42
  ```

2. 构造函数下，`this`与被创建的新对象绑定（`new`绑定）
3. `DOM`事件，`this`指向触发事件的元素
4. 内联事件分两种情况

  ```html
  <button onclick="console.log(this)"></button>    //DOM元素
  <button onclick="(function(){console.log(this)})()"></button>  //window
  ```

5. 箭头函数的 this 始终指向函数定义时的`this`，而非执行时；箭头函数不可以当做构造函数，不能使用`new`，不可以使用`arguments`
6. `bind`，`call`，`apply`方法等（显式绑定）
   - `fun.apply(thisArg, [argsArray])`，传数组
   - `fun.call(thisArg[, arg1[, arg2[, ...]]])`，传参数
   - `fun.bind(thisArg[, arg1[, arg2[, ...]]])`，传参数，并需要调用

## new 的过程

1. 创建一个空对象`obj`
2. 将新创建的空对象的隐式原型指向其构造函数的显示原型
3. 使用`call`改变`this`的指向，指向`obj`
4. 如果无返回值或者返回一个非对象值，则将`obj`返回作为新对象；如果返回值是一个新对象的话那么直接直接返回该对象。

```javascript
function _new() {
  let target = {}; //创建的新对象
  //第一个参数是构造函数
  let [constructor, ...args] = [...arguments];
  //执行[[原型]]连接;target 是 constructor 的实例
  target.__proto__ = constructor.prototype;
  //执行构造函数，将属性或方法添加到创建的空对象上，改变this指向
  let result = constructor.apply(target, args);
  if (result && (typeof (result) == "object" || typeof (result) == "function")) {
    //如果构造函数执行的结构返回的是一个对象，那么返回这个对象
    return result;
  }
  //如果构造函数返回的不是一个对象，返回创建的新对象
  return target;
}
```

## 对象

- `Object.assign(target, source)`
### 遍历对象

- Object.keys() 仅仅返回自身的可枚举属性，不包括继承来的，更不包括Symbol属性 
- Object.getOwnPropertyNames() 返回自身的可枚举和不可枚举属性。但是不包括Symbol属性 
- Object.getOwnPropertySymbols() 返回自身的Symol属性 
- for...in 可以遍历对象的自身的和继承的可枚举属性，不包含Symbol属性 
- Reflect.ownkeys() 返回对象自身的所有属性，不管是否可枚举，也不管是否是Symbol。注意不包括继承的属性

### WeakMap

- `WeakMap`对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。
- 如果是弱引用对象，垃圾回收机制会自动帮我们回收。

```javascript
let obj = { name : 'ConardLi'}
const target = new WeakMap();
target.set(obj,'code秘密花园');
obj = null;
// 如果是WeakMap的话，target和obj存在的就是弱引用关系，当下一次垃圾回收机制执行时，这块内存就会被释放掉。
```

## 变量提升

- 变量提升只会提升变量名的声明，而不会提升变量的赋值初始化。
- 函数提升的优先级大于变量提升的优先级，即函数提升在变量提升之上。

```javascript
console.log(foo);
foo(); // 可以执行
var foo = 10;
foo(); // foo已经被赋值为一个变量，无法执行foo为函数
console.log(foo);
function foo(){
  var a;
  console.log(a);
  a=12;
  console.log(a);
}
console.log(foo);
// 结果：
// [Function: foo]
// undefined
// 12
// Uncaught TypeError: foo is not a function

function foo() {
  var x = 1
}
foo()
console.log(x)
// 结果:报错


function foo() {
  console.log(x)
}
var x = 1
foo()
// 结果：1


function foo() {
  console.log(x)
}
foo()
var x = 1
// 结果：undefined
//只提升声明，不提升赋值

// 只有声明：undefined   没有声明：报错

console.log(f1())
console.log(f2)
function f1() {
  console.log('aa')
}
var f2 = function () {}

// 结果：aa,undefined,undefined
```

## undefined和null的区别

- 类型不同：`undefined`是值类型，声明变量未初始化的时候出现；`null`是空指针，类型是`object`是值类型

## $(document).ready和window.onload的区别，两个window.onload怎么执行

- $(document).ready要比window.onload先执行。
- $(document).ready和window.onload都是在都是在页面加载完执行的函数，大多数情况下差别不大，但也是有区别的。
- $(document).ready:是DOM结构绘制完毕后就执行，不必等到加载完毕。 意思就是DOM树加载完毕，就执行，不必等到页面中图片或其他外部文件都加载完毕。并且可以写多个.ready。
- window.onload:是页面所有元素都加载完毕，包括图片等所有元素。只能执行一次。
  
  ```javascript
  window.onload=function(){
    console.log(1)
  }
  window.onload=function(){
    console.log(2)
  }
  //输出2
  ```

## 事件

1. 第一阶段：捕获：从上往下
2. 第二阶段：目标阶段：事件通过捕获到达目标元素
3. 第三阶段：冒泡：从目标元素上传到window对象，从下往上

- `window-document-html(document.documentElement)-body(document.body)-div`
- `dom.addEventLisner('事件',function(){},true)`，`true`代表捕获，`false`代表冒泡
- 普通绑定事件和`addEventListener`的区别
  - 普通绑定事件（例如`onclick`）不能绑定多个事件，后面绑定的会覆盖前面的。
  - addEventListener 能添加多个事件绑定，按顺序执行。
  - 普通方式绑定事件后，不可以取消。addEventListener绑定后则可以用 removeEvenListener 取消

- stopImmediatePropagation()方法来阻止事件捕获，另外此方法还可以阻止事件冒泡
- 有一些事件是不能冒泡的，每个 event 都有一个event.bubbles属性，可以知道它可否冒泡
- abort、blur、error、focus、load、mouseenter、mousemove、resize、unload不可以冒泡
实现模态框
const but=document.getElementById('button')
const modal=document.getElementsByClassName("hidden")[0]
document.documentElement.addEventListener('click',(e)=>{
    e.stopPropagation()
    modal.setAttribute('style','display:none;')
})
but.addEventListener('click',(e)=>{
    e.stopPropagation()
    modal.setAttribute('style','display:block;')
})
modal.addEventListener('click',(e)=>{
    e.stopPropagation()
    modal.setAttribute('style','display:block;')
})
可以用jquery中的$("#but",'.modal').click()

事件代理和事件委托（是一个意思）（把子元素的事件绑定在父元素上，只需要绑定一次即可）
手写on和emit（订阅模式）
function EventEmitter(){
    this.eventMap = new Map();
    this.arrFn = [];
    this.init();
}
$.extend(EventEmitter.prototype,{
    init(){
        //alert(1);
    },
    on(name,fn){
        if(!this.eventMap.get(name)){
            var newArray = new Array();
            newArray.push(fn);
            this.eventMap.set(name,newArray);
        }else{
            var oddArray = this.eventMap.get(name);
            oddArray.push(fn);
            this.eventMap.set(name,oddArray);
        }
    },
    emit(name,val){
        if(!this.eventMap.get(name)){
            return;
        }else{
            this.arrFn = this.eventMap.get(name);
            for(var i = 0,fn;fn = this.arrFn[i++];){
                fn(val);
            }
        }
        
    },
    off(name,fn){
        if(!fn){
            this.eventMap.delete(name);
        }else{
            this.arrFn = this.eventMap.get(name);
            var newArray = new Array();
            for(var i in this.arrFn){
                if(this.arrFn[i] != fn){
                    newArray.push(this.arrFn[i]);
                }
            }
            this.eventMap.set(name,newArray);
        }
    }
})
//测试
function fn(val){
    console.log("Tom" + val);
}
function fn1(val){
    console.log("Mary" + val);
}
function fn2(val){
    console.log("Jack" + val);
}
var emitter = new EventEmitter();
emitter.on("change",fn);
emitter.on("change",fn1);
emitter.on("change",fn2);
emitter.off("change",fn);
emitter.emit("change",123);