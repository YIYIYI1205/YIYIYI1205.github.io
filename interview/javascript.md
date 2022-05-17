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
