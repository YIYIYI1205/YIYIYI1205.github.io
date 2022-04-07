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

  ```html
  <style>
    div:not(.help) span{
        color: gray;
    }
    div.help span{
        color: red;
    }
  </style>
  <!--  两个规则的权重相等，红色规则在后面，所以胜出 -->
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
  - `:link`未访问地址的超链接
  - `:visited`已访问地址的超链接
  - `:hover`
  - `:focus`
  - `:active`
  - 链式样式的推荐顺序：`link-visited-focus-hover-active`，因为前后位置有影响
  - `:first-child`、`:last-child`选择的是为第一、最后的子元素，而不是某元素的第一、最后子元素
  - `:first-of-type`、`:last-of-type`第一次出现的某种元素
  - `:nth-child(n)`、`:nth-last-child()`选择第`n`个元素，可以写`3n+1`，表示第`1、4、7...`个元素，`n`从`0`开始；`2n`是偶数，`2n-1`或`2n+1`是奇数，也可以使用`even`和`odd`
  - `:nth-of-type()`、`:nth-last-of-type`
  - `:root`
  - `:empty`选择任何没有子代的元素
  - `p:only-child`匹配`p`的父元素只有一个子元素时的`p`
  - `p:only-of-type`匹配`p`的父元素只有一个该类别的子元素
  - `:enabled`
  - `:disabled`
  - `:checked`
  - `:indeterminate`指既未选中也没有未选中的单选按钮或复选框，这个状态只由dom脚本设定，不能由用户设定
  - `:default`
  - `:valid`指代满足所有数据有效性语义的输入框
  - `:invalid`
  - `:in-range`指代输入的值在最小值和最大值之间的输入框
  - `:out-of-range`
  - `:required`：`required`为`true`的元素
  - `:optional`：`required`为`false`的元素
  - `:read-write`
  - `:read-only`
  - `:not`：`div:not(.help)`、`input[type='checkbox']:not(:checked)`、`input:not([required])`，括号内放其它选择器
  - `:target`：选择目标元素
  - `:lang`：根据文本使用的语言选择元素，`:lang(fr)`类似`[lang|='fr']`
- 伪元素选择器：只能出现在选择符的最后
  - `::first-letter`装饰任何非行内元素的首字母
  - `::first-line`装饰任何非行内元素的首行文本
  - `::before`可以设置`content: 'xxx'`
  - `::after`
  - `::marker`

## 第3章 特指度和层叠

### 3.1 特指度

- 每个`id`属性值加`100`
- 每个类属性值、属性选择、伪类加`10`
- 标签元素和伪元素加`1`
- 连接符和通用选择符不增加
- 行内声明的特指度为`1000`
- `!import`特指度最高

### 3.2 继承

- `inherit`关键字指定一个属性应从父元素继承它的值
- `inherit`关键字可用于任何`HTML`元素上的任何`CSS`属性

## 第4章 值和单位

- 全局关键字
  - `inherit`继承
  - `initial`预定义的初始值
  - `unset`对继承的属性来说，`unset`作用与`inherit`一样，不继承的属性来说，`unset`作用与`initial`一样
  - `all`属性只接受上面三个全局关键字，表示除`direction`和`unicode-bidi`之外的所有属性
- 单位
  - `px`像素
  - `em`：相对于当前元素的`font-size`
  - `rem`：相对于根元素`<html>`的`font-sizes`
  - `vw`：`1vw`等于视口宽度的`1%`
  - `vh`：`1vh`等于视口高度的`1%`
  - `vmin`：取高度和宽度中较小的那个
  - `vmax`：取高度和宽度中较大的那个
- 计算值`calc`
- 颜色
  - 不透明度：`rgba`，`a`表示不透明度，`0`表示透明，`1`表示完全不透明，十六进制值在最后添加一个十六进制值表示不透明度
  - 颜色关键字
    - `transparent`：完全透明的颜色，和`rgba(0,0,0,0)`等效
    - `currentColor`：当前元素`color`属性计算得到的值
- 自定义值(`css`变量)：自定义标识符以两个连字符开头(`--`)
  ```css
  html{
    --base-color: #639;
    --highlight-color: #AFA;
  }
  h1{
    color: var(--base-color);
  }
  h2{
    color: var(--highlight-color)
  }
  ```

## 第5章 字体

- `font-family`
- `@font-face`自定义字体
  ```css
  @font-face{
    font-family: 's';
    src: url('xxx.otf');
  }
  ```
- `font-weight`字重：`normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900`
- `font-style: italic|oblique|normal`：斜体和竖直
