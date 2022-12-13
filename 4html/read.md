# html

- `ul>li*8`

## 浏览器

### 浏览器的组成

1. 渲染引擎（即：浏览器内核）
   - 用来解析`HTML`与`CSS`
   - 渲染引擎是浏览器兼容性问题出现的根本原因
2. `JS`引擎
   - 解析网页中的`avaScript`代码，对其处理后再运行

### 浏览器工作原理

1. `User Interface`（`UI`界面）：包括地址栏、前进/后退按钮、书签菜单等。也就是浏览器主窗口之外的其他部分
2. `Browser engine`（浏览器引擎）：用来查询和操作渲染引擎。是`UI`界面和渲染引擎之间的桥梁
3. `Rendering engine`（渲染引擎）：用于解析`HTML`和`CSS`，并将解析后的内容显示在浏览器上
4. `Networking`（网络模块）：用于发送网络请求
5. `JavaScript Interpreter`（`JavaScript`解析器）：用于解析和执行`JavaScript`代码
6. `UI Backend`（UI后端）：用于绘制组合框、弹窗等窗口小组件。它会调用操作系统的`UI`方法
7. `Data Persistence`（数据存储模块）：比如数据存储`cookie`、`HTML5`中的`localStorage`、`sessionStorage`

## 元素分类

- 块级元素：`div`、`h1-h6`、`hr`、`menu`、`ol`、`ul`、`li`、`dl`、`dt`、`dd`、`table`、`p`、`form`
  - `display: block`
  - 独占一行
  - 可以修改高宽
  - 不设置宽度，块级元素的宽度是它的父元素内容的宽度，高度是自身内容的高度
- 行内元素：`span`、`a`、`strong`、`i`、`em`、`s`、`u`、`textarea`、`select`、`label`、`sup`、`sub`
  - `display: inline`
  - 不独占一行，和其他内联元素从左到右在一行显示
  - 不能修改高宽，由内容本身决定
- 行内块元素：`input`、`img`
  - `display: inline-block`
  - 不独占一行，和其他内联元素从左到右在一行显示
  - 可以修改高宽

## h5

- 语义化标签：`<header>`、`<nav>`、`<main>`、`<article>`、`<section>`、`<aside>`、`<footer>`、`<data>`、`<time>`、`<mark>`、`<video>`、`<audio>`、`<canvas>`
- 增强表单验证、元素、属性
- 音频`audio`和视频`video`
- 绘图：`canvas`和`svg`
- 地理定位：`navigator.geolocation.getCurrentPosition`
- 可拖拽属性：`draggable="true"`，拖拽事件：`ondragstart`
- 存储：`localStorage`、`sessionStorage`
- `websocket`：持久性连接，并进行双向数据传输
- 选择器：`document.querySelector()`、`document.querySelectorAll()`

## meta viewport

- 适配移动端，可以控制视口的大小和比例：
  `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale-1, minimum-scale=1">`

## label标签的作用

- label标签来定义表单控制间的关系,当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上

## a标签中 如何禁用href 跳转页面 或 定位链接

- e.preventDefault(); 或者 href="javascript:void(0);

## src和href的区别

- src： 表示对资源的引用，它指向的内容会嵌入到当前标签所在的位置。src会将其指向的资源下载并应⽤到⽂档内，如请求js脚本。当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执⾏完毕，所以⼀般js脚本会放在页面底部。
- href： 表示超文本引用，它指向一些网络资源，建立和当前元素或本文档的链接关系。当浏览器识别到它他指向的⽂件时，就会并⾏下载资源，不会停⽌对当前⽂档的处理。 常用在a、link等标签上。

## DOCTYPE(⽂档类型) 的作⽤

- 它的目的是告诉浏览器（解析器）应该以什么样（html或xhtml）的文档类型定义来解析文档

## script标签中defer和async的区别

- defer 和 async属性都是去异步加载外部的JS脚本文件，它们都不会阻塞页面的解析，其区别如下：

  - 执行顺序： 多个带async属性的标签，不能保证加载的顺序；多个带defer属性的标签，按照加载顺序执行；
  - 脚本是否并行执行：async属性，异步加载，加载完立刻执行，再加载后面的；defer属性，加载后续文档的过程和js脚本的加载(此时仅加载不执行)是并行进行的(异步)，js脚本需要等到文档所有元素解析完成之后才执行，DOMContentLoaded事件触发执行之前。