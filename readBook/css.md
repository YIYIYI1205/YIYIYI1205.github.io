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
  - `em`：相对于当前元素的`font-size`，若没有设置，则是`html`的`font-size: 16px`
  - `rem`：相对于根元素`html`的`font-size`
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
- `font-style: italic|oblique|normal`：斜体、倾斜体和竖直
- `font`：前三个值`font-style | font-weight | font-variant`顺序任意，后两个值`font-size|font-family`必须存在且必须按照这个顺序；也可以在`font-size`中用`/`加入`line-height`；可使用系统字体值，让`web`应用看起来像用户操作系统的原生应用一样
  - `caption`：说明文字的控件，如按钮
  - `icon`：图标
  - `menu`：下拉菜单和菜单列表
  - `message-box`：对话框
  - `small-caption`：小型控件
  - `status-bar`：窗口的状态栏

## 第6章 文本属性

- `text-indent`：缩进，后跟缩进长度，只影响元素的第一行，即使有换行也是如此，会继承
- `text-align`：文本对齐，`start|end|left|right|center|justify（两端对齐）|match-parent|start end`，只适用于块级元素
- `line-height`：行的基线之间的距离
- `vertical-align`：纵向对齐，只能用于行内元素和行内块元素，不能继承，`baseline（默认值）|sub|super|top|text-top|middle|bottom|text-bottom`
- `word-spacing`：单词间距，默认为`normal`， 结果为`0`
- `letter-spacing`：字符间距
- `text-transform`：文本转换，`uppercase(转成大写)|lowercase(转成小写)|capitalize(首字母转成大写)|none`
- `text-decoration`：文本装饰，`none|underline|overline|line-through|blink`，可以写多个值，不能继承
- `text-shadow`：文本阴影，值：颜色，第一个长度设置横向偏移，第二个长度设置纵向偏移，可选的第三个长度定义阴影的模糊半径，大量阴影会损耗性能
- `white-space`：处理`html`中的空白，`normal|nowrap(禁止换行)|pre(也会禁止换行)|pre-wrap|pre-line`
- `tab-size`：制表符等于多少个空格
- `word-break`：控制文本软换行(一串文本过长，一行放不下)的方式，`normal|break-all|keep-all`
- `line-break`
- `overflow-wrap`：`normal|break-word`，只有`white-space`属性的值允许换行时，`overflow-wrap`才会起作用

## 第7章 视觉格式化基础

- 块级元素：`p|div|h1-h6|ul|li`
- 行内元素：`a|span`
- 行内块元素：`input|img`
- 行内元素可以作为块级元素的后代，但是反过来不行
- 盒模型：`box-sizing`，`content-box|padding-box|border-box`
- `width|margin-left|margin-right`可以设置为`auto`
  - 如果其中一个设为`auto`，另两个设为具体的值，那么设为`auto`的那个属性的具体长度要能满足元素框的宽度等于父元素的宽度
  
    ```css
    div{
      width: 500px;
    }
    p{
      margin-left: auto; /* 设为auto的左外边距最终计算的结果为300px */
      margin-right: 100px;
      width: 100px;
    }
    p{
      margin-left: 100px;
      margin-right: 100px; /* 等同于右边设置为auto，右外边距被强制设为300px */
      width: 100px;
    }
    p{
      margin-left: 100px;
      margin-right: 100px; 
      width: auto; /* 等同于不写width，中间被强制设为300px */
    }
    ```
  
  - 如果两个设为`auto`：`margin: auto`，元素居中；`margin-left`和`width`设为`auto`，设为`auto`的`margin`为`0`
  - 三个都为`auto`，`margin`全为`0`
- 设置`margin-top`和`margin-bottom`为`auto`，相当于设置为`0`
- 上下外边距会出现塌陷情况，都是正值时会去最大值，但是如果一个是负值，会进行计算。
- `padding`和`margin`无论`left`还是`right`还是`top`还是`bottom`都是相对于父元素的`width`
- 父元素的高度在设置`border`时才会真正的显示出包含子元素`margin`

  ```css
  .one p{
      margin-top: 2em;
      margin-bottom: 2em;
  }
  .two{
      border-top: 1px solid red;
      border-bottom: 1px solid red;
      background: green;
  }
  .two p{
      margin-top: 2em;
      margin-bottom: 2em ;
  }
  ```

- 行距：`line-height`减去`font-size`，上下分到的空间就是行距除以`2`
- `line-height`设置为小数，是以当前`font-size`为系数，可以被子元素继承
- `vertical-align`属性的百分数值是相对元素的`line-height`计算的

## 第8章 内边距、边框、轮廓和外边距

- `margin`和`padding`只有三个值，最后一个左边值由右边值替代
- `border-style`：`none | hidden | solid | dotted | dashed |double | groove | ridge | inset | outset`
- `border-radius`：圆角边框，设置完`border`后可进行圆角的设置；如果元素是正方形，设置`border-radius: 50%`，会得到圆形
- 图像做边框：`border`、`border-image`、`border-image-slice`、`border-image-width`、`border-image-repeat`

  ```css
  .box{
    border: 25px solid; /* 必须有border，否则不显示*/
    border-image: url(./2.jpeg);
    border-image-slice: 1%; /* 没有slice只能显示四个点，设置fill填满 */
  }
  ```

- 轮廓，一般直接绘制在边框外侧，不占空间，可以不是矩形，用户代理通常在元素处于`:focus`状态时渲染轮廓，轮廓更极端，无法单独为一边设置独特的轮廓
  - `outline-style: auto | none | solid | dotted | dashed | double | groove | ridge | inset | outset`
  - `outline-width`
  - `outline-color`

## 第9章 颜色、背景和渐变

- 
