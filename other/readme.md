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




## 埋点
- 手动买点也叫代理买点，它的本质是用`js`代码拿到一些基本信息，然后在一些特定的位置返回给服务端
  - 域名：`document.domain/window.location.host`
  - 页面标题：`document.title`
  - 分辨率：`window.screen.height/width`
  - 颜色深度：`window.screen.colorDepth`
  - `Referrer`：`document.referrer`
  - 客户端语言：`navigator.language`
  - `Performance`：`DNS`解析时间、`TCP`建立连接时间、首页白屏时间、`DOM`渲染完成时间、页面`load`时间
    ```javascript
    // 拿到Performance并且初始化一些参数
    let timing = performance.timing,
        start = timing.navigationStart,
        dnsTime = 0,
        tcpTime = 0,
        firstPaintTime = 0,
        domRenderTime = 0,
        loadTime = 0;
    // 根据提供的api和属性，拿到对应的时间
    dnsTime = timing.domainLookupEnd - timing.domainLookupStart;
    tcpTime = timing.connectEnd - timing.connectStart;
    firstPaintTime = timing.responseStart - start;
    domRenderTime = timing.domContentLoadedEventEnd - start;
    loadTime = timing.loadEventEnd - start;
    ```
  - 除了`ajax`请求，还可以伪装成图片`gif`传给后端，原因：防止跨域、防止阻塞页面加载、`gif`体积最小
    - 纯`css`方式：点击只能加载一次，解决方法是用`less`或`sass`，每次点击，动态改变一下`gif`。
    ```css
      /* 实现跟踪button1和button2的点击事件 */
      .button-1:active::after {
        content: url(./haorooms.gif?action=click&id=button1);
        display: none;
      }
      .button-2:active::after {
        content: url(./haorooms.gif?action=click&id=button2);
        display: none;
      }
      /* 统计浏览器是否支持display: grid */
      .any-element {
        background: url(./pixel.gif?grid=0);
      }
      @supports (display: grid) {
        .any-element {
          background: url(./pixel.gif?grid=1);
        }
      }
      /* retina屏幕占比统计 */
      .any-element {
        background: url(./pixel.gif?retina=0);
      }
      @media screen and (-webkit-min-device-pixel-ratio: 2) {
        .any-element {
          background: url(./pixel.gif?retina=1);
        }
      }
      /* 是否支持某字体 */
      @font-face {
        font-family: anyFontName;
        src: url(../image/pixel.gif?font=unmatch&id=haorooms);
      }
      .element-with-text {
        font-family: 'Source Han Sans CN', 'anyFontName';
      }
    ```
  - `js`埋点
    ```javascript
      <button onClick="aa()">haorooms</button>
      <script>
        function aa(){
          new Image().src = './haorooms.gif?ac=haorooms&'+Math.random() 
        }
      </script>
    ```  