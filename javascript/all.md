# javascirpt面试

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

### 判断数组的方法[没看]

1. arr instanceof Array
2. arr.constructor === Array       任何对象都有constructor  并不是只有构造函数才有
3. Array.prototype.isPrototypeOf(arr)
4. Object.getPrototypeOf(arr) === Array.prototype
5. Object.prototype.toString.call(arr) === '[object Array]'
6. Array.isArray(arr)

## 高级程序设计

### 纯函数

- 一个函数的返回结果只依赖于它的参数，并且在执行过程里面没有副作用，我们就把这个函数叫做纯函数。
- 一个函数执行过程对产生了外部可观察的变化那么就说这个函数是有副作用的。

### js函数柯里化

- 把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。
- 作用
  1. 提高适用性。
  2. 延迟执行。
  3. 固定易变因素。

```javascript
// 普通的add函数
function add(x, y) {
    return x + y
}
// Currying后
function curryingAdd(x) {
    return function (y) {
        return x + y
    }
}
add(1, 2)           // 3
curryingAdd(1)(2)   // 3
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
防抖：只要在延迟时间内执行，就会clear timeout  例如输入框防抖
节流：规定的延迟时间内必然会执行一次。比如在页面的无限加载场景下，我们需要用户在滚动页面时，每隔一段时间发一次 Ajax 请求，而不是在用户停下滚动页面操作时才去请求数据。这样的场景，就适合用节流技术来实现。
防抖：
function debounce(fn, wait) {    
    var timeout = null;    
    return function() {        
        if(timeout !== null)   clearTimeout(timeout);        
        timeout = setTimeout(fn, wait);    
    }
}

上面的方法是返回一个函数，执行完是返回函数，并没有真正执行
//正常写法
var timeout = null; 
$().keyup(function(){
    function() {        
        if(timeout !== null)   clearTimeout(timeout);        
        timeout = setTimeout(执行的方法, 延迟时间);    
    }    
})
//直接if不行吗 为什么还要包一层function

timeout污染全局，在外部，想要收敛权限，想到闭包
$().keyup(function(){
    var timer=null;
    return function(e){
            if(timer){
                clearTimeout(timer)
            }
            Timeout=setTimeout(function(){           
            },1000)
    }
}())

封装：
function debounce(fn,delay){
    var timer=null;
    return function(e){
            if(timer){
                clearTimeout(timer)
            }
            timeout=setTimeout(function(){
                  fn()       
            },delay)
    }
}
function fn(){
    console.log()
}
$().keyup(debounce(fn,1000))
input.addEventListener('keyup',debounce(fn,1000))

节流：
// 函数节流 throttle
// 方法一：定时器实现
const throttle = function(fn,delay) {
  let timer = null
  return function() {
    const context = this
    let args = arguments
    if(!timer) {
      timer = setTimeout(() => {
        fn.apply(context,args)
        clearTimeout(timer)
      },delay)
    }
    //如果定时器存在什么都不做，定时器不存在就创建定时器
  }
}

// 方法二：时间戳
const throttle2 = function(fn, delay) {
  let preTime = Date.now()
  return function() {
      const context = this
      let args = arguments
      let doTime = Date.now()
      if (doTime - preTime >= delay) {
          fn.apply(context, args)
          preTime = Date.now()
      }
  }
}

loadsh里有这个方法