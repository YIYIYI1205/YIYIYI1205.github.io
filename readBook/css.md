# CSS权威指南第四版

## 第1章 CSS和文档

### 1.3.1 link标签

- 为了正确加载外部样式表，link标签必须放在head元素中
- `<link rel=”stylesheet” type=”text/css” href=”” media=”screen“>`
- `rel`属性值设为`alternate stylesheet`，仅当用户自己选择，文档才会使用候选样式表渲染，可以设置`title`，`Default`表示默认样式
- `@import url()`引入，必须放在`style`元素内部，且必须放在其它css规则前面
- 厂商前缀

  ```css
  -epub-   国际数字出版论坛制定的ePub格式
  -moz-    基于Mozilla的浏览器（如Firefox）
  -ms-     微软Internet Explorer
  -o-      基于Opera的浏览器
  -webkit- 基于WebKit的浏览器（如Safari和Chrome）
  ```

- 媒体查询`@media`
  - `@media screen and (min-width:600px) and (max-width:900px)`
    - 类型
      - `all`：所有展示媒体
      - `print`：打印文档
      - `screen`：屏幕媒体

## 第2章 选择符

- 元素+多个类：`p.warning.help{}`
- 具有`class`属性和`title`属性的所有元素：`h1[class][title]`
- 部分属性值选择
  - `[foo|='bar']`：值以`bar`和一个英文破折号开头，或者值就是`bar`
  - `[foo~='bar']`：值是包含`bar`的一组词
  - `[foo*='bar']`：值包含子串`bar`
  - `[foo^='bar']`：值以`bar`开头
  - `[foo$='bar']`：有`foo`属性，值以`bar`结尾
- 不区分大小写（在末尾加`i`）：`a[href='.PDF' i]`
- 后代选择器（空格）：两个元素之间的层级间隔是无限的

  ```jsx
  div:not(.help) span{
  	color: gray;
  }
  div.help span{
  	color: red;
  }
  // 两个规则的权重相等，红色规则在后面，所以胜出
  <div class='help'>
  	<div class='aside'>
  		<span></span>
  	</div>
  </div>
  ```

- 子代选择器`>`：只能选择一代
- 紧邻同胞元素`+`：必须按照顺序，中间必须是紧邻同胞
- 后续同胞`~`：中间不一定非得是紧邻同胞
- 伪类选择器：伪类选择器可以拼装，**伪类选择的是所依附的元素**
  - :link
  - :hover
  - :visited
  - :first-child、:last-child选择的是为第一、最后的子元素，而不是某元素的第一、最后子元素
  - first-of-type、last-of-type：第一次出现的某种元素
  - :nth-child(n)选择第n个元素，可以写3n+1，表示第1、4、7..个元素，n从0开始；2n是偶数，2n-1或2n+1是奇数，也可以使用even和odd
  - :root
  - :empty选择任何没有子代的元素
  - p:only-child匹配p的父元素只有一个子元素时的p
  - p:only-of-type匹配p的父元素只有一个该类别的子元素