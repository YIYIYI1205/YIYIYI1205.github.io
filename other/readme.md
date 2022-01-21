 - 永久切换：nvm alias default 4.6.0
 - 旺哥的服务端渲染，也会去渲染renderView中的内容
 - 监听元素是否存在
 ``javascript
    observe = (selector, callback) => {
    let startTime = Date.now();
    // 检测超时, 最长 30s
    let MAX_OBSERVE_TIME = 30e3;

    let found = false;

    // 每隔 100ms 检测一次页面元素是否存在
    let intervalId = setInterval(function () {
      // 务必注意 return, 即 结束方法
      if (found) {
        clearInterval(intervalId);
        return;
      }
      let elapse = Date.now() - startTime;
      if (elapse > MAX_OBSERVE_TIME) {
        // console.log(`${selector} 元素检测超时 ${elapse} ms, 停止检测`);
        clearInterval(intervalId);
        return;
      }

      let element = document.querySelector(selector);

      // 如果没值, 则 return
      if (!element) {
        // console.log(`${selector} 元素不存在`);
        return;
      }
      found = true;
      // 向回调函数中传入 this
      callback(element);
    }, 100);
  };

 ``



-  react 监听数据变化
```javascript
static getDerivedStateFromProps(nextProps, prevState) {
    const {type} = nextProps;
    // 当传入的type发生变化的时候，更新state
    if (type !== prevState.type) {
        return {
            type,
        };
    }
    // 否则，对于state不进行任何操作
    return null;
}
```

- 锚点跳转
  1. 搜索框跳转：在onslect函数中判断如果当前path不变，执行滚动事件；但是当页面跳转时，找不到ele，需要配合path中componentDidUpdate监听path是否变化，变化后持续找ele，然后进行跳转，此时不需要setInterval
  2. hash不存在跳转时，需要滚到window.scrollTo(0,0)



forEach不支持await  要用for of

同步方法写成异步，可能会影响

isNaN(+tem)  强制转换成数字


3.for...of优势

​ ​有着同for...in一样简洁的语法，但没有for...in的那些缺点

​不同forEach方法，可以用break,continue,return配合使用

​提供了变量所有数据结构的统一操作接口


react hook context