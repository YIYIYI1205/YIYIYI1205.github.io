# html

## 语义化

- HTML语义化简单来说就是用正确的标签来做正确的事。比如表示段落用 p 标签、表示标题用 h1-h6 标签、表示文章就用 article 等。
  - 目的
    - 可访问性：帮助辅助技术更好的阅读和转译你的网页，利于无障碍阅读；
    - 可检索性：有了良好的结构和语义，可以提高搜索引擎的有效爬取，提高网站流量；
    - 国际化：全球只有13%的人口是英语母语使用者，因此通用的语义化标签可以让各国开发者更容易弄懂你网页的结构；
    - 互用性：减少网页间的差异性，帮助其他开发者了解你网页的结构，方便后期开发和维护

## h5

- 语义化标签：<header>  <nav> <main> <article> <section> <aside> <footer>
- <data> <time><mark>
- <video> <audio>
-  <canvas>
- localStorage、sessionStorage
- websocket：持久性连接，并进行双向数据传输
- 增加很多表单
- document.querySelector()、document.querySelectorAll()
- draggable="true"

## meta viewport

- 适配移动端，可以控制视口的大小和比例：
- <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale-1, minimum-scale=1">

## label标签的作用

- label标签来定义表单控制间的关系,当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上

## 块级元素、行内元素、行内块元素

- 块级元素block：独占一行，能接受宽高，如果不设置默认为父级的100%；<div>、<p>、<h1>...<h6>、<ol>、<ul>、<dl>、<table>、<address>、<blockquote> 、<form>
- 行内元素inline：与其他行内元素并排，不能设置宽高，默认就是文字的宽高；<a>、<span>、<br>、<i>、<em>、<strong>、<label>、<q>、<var>、<cite>、<code>
- 行内块inline-block：与其他行内元素并排，可以设置宽高；<input>，<img>

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