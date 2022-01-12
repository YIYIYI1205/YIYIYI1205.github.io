# js相关
#### 1. url带锚点却不能跳转
由于进入页面时dom还未渲染，若滑过一次后，再刷新却保持之前位置，是因为静态页面能够保存位置；手动滚动位置
```
const hash = decodeURIComponent(this.props.location.hash);
const ele = global.document.querySelector(hash);
ele.scrollIntoView();
```