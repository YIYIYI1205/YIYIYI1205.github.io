# css

## 单位

- `px`像素
- `em`：相对于当前元素的`font-size`，若没有设置，则是`html`的`font-size`
- `rem`：相对于根元素`html`的`font-size`
- `vw`：`1vw`等于视口宽度的`1%`
- `vh`：`1vh`等于视口高度的`1%`
- `%`，当`font-size`设置`%`意味着是周围文字大小的百分之多少
  
## 字体

- 行高`line-height`，如果一段文本只有一行，如果此时设置**行高 = 盒子高**，就可以保证单行文本垂直居中
- `vertical-align`属性可用于指定行内元素（`inline`）、行内块元素（`inline-block`）、表格的单元格（`table-cell`）的垂直对齐方式
- `font: 加粗(可以省略) 字号/行高 字体`，`400`是`normal`，`700`是`bold`，字体可以多个
- 文本属性
  - `letter-spacing: 0.5cm;`单个字母之间的间距
  - `word-spacing: 1cm;`单词之间的间距
  - `text-decoration: none;`字体修饰：`none`去掉下划线、`underline`下划线、`line-through`中划线、`overline`上划线
  - `color:red;`字体颜色
  - `text-align: center;`在当前容器中的对齐方式。属性值可以是：`left`、`right`、`center`（在当前容器的中间）、`justify`
  - `text-transform: lowercase;`单词的字体大小写。属性值可以是：`uppercase`（单词大写）、`lowercase`（单词小写）、`capitalize`（每个单词的首字母大写）
  - `list-style`：`li`的样式设置
  - `text-shadow: 水平位移 垂直位移 模糊程度 阴影颜色`：文本阴影
  - `overflow-wrap`：浏览器是否允许单词中断换行
  - `word-break`：浏览器是否允许单词中断换行
  - `white-space`：空白处是否换行，如果想让一段很长的文本不换行，可以直接设置`nowrap`，换行可以设置`pre-wrap`
- `overflow`
  - `visible`：默认值。多余的内容不剪切也不添加滚动条，会全部显示出来
  - `hidden`：不显示超过对象尺寸的内容
  - `auto`：如果内容不超出，则不显示滚动条；如果内容超出，则显示滚动条
  - `scroll`：`Windows`平台下，无论内容是否超出，总是显示滚动条。`Mac`平台下，和`auto`属性相同
- `cursor`鼠标样式，`auto`、`pointer`、`hand`等
- 滤镜：`filter: gray();`

## 背景

- `background-color`设置元素的背景颜色，默认值`transparent`
- `background-image`将图像设置为背景
- `background-repeat: no-repeat;`设置背景图片是否重复及如何重复，默认平铺满，`no-repeat`不要平铺；`repeat-x`横向平铺；`repeat-y`纵向平铺
- `background-position: center top;`设置背景图片在当前容器中的位置，两个值表示向右偏移量和向下偏移量
- `background-attachment`设置背景图片是否跟着滚动条一起移动，`scroll`、`fixed`（背景就会被固定住，不会被滚动条滚走）
- `background-size`调整尺寸，可以设置`cover`图片始终填充满容器，且保证长宽比不变、`contain`图片完整地显示在容器中，且保证长宽比不变、`auto`、百分比
- `background-origin`控制背景从什么地方开始显示，`padding-box`默认值、`border-box`、`content-box`
- `background-clip`超出的部分，将裁剪掉，`padding-box`、`border-box`、`content-box`
- 可以设置多个背景图片
- `background-image`背景渐变：
  - 线性渐变：`background-image: linear-gradient(方向, 起始颜色, 终止颜色);`，方向可以是：`to left`、`to right`、`to top`、`to bottom`、角度`30deg`
  - 径向渐变：`background-image: radial-gradient(辐射的半径大小, 中心的位置, 起始颜色, 终止颜色);`
- `clip-path`裁剪出元素的部分区域做展示
- 置灰：`filter: grayscale(1)'`
- 背景图超出`div`的部分，会自动移溢出，可以直接设置`div`高度为图片高度

## CSS选择器

- `!import` `>` 行内样式 `>` `id`选择器 `>` 一个属性选择器、`class`或者伪类 `>`一个元素选择器或者伪元素 `>` 通配符
- 空格：后代
- 交集：紧密相连
- `>`：子代
- `+`：下一个兄弟
- `div~p`: 选中的`div`后面所有的`p`
- 伪类
  - `:link`、`:visited`、`:hover`、`:active`、`:focus`
  - `E:first-child`匹配父元素的第一个子元素`E`
  - `E:last-child`匹配父元素的最后一个子元素`E`
  - `E:nth-child(n)`匹配父元素的第`n`个子元素`E`。注意，盒子的编号是从`1`开始算起，不是从`0`开始算起
  - `E:nth-child(odd)`匹配奇数
  - `E:nth-child(even)`匹配偶数
  - `E:nth-last-child(n)`匹配父元素的倒数第`n`个子元素`E`
  - `E:first-of-type`匹配同类型中的第一个同级兄弟元素`E`
  - `E:last-of-type`匹配同类型中的最后一个同级兄弟元素`E`
  - `E:nth-of-type(n)`匹配同类型中的第`n`个同级兄弟元素`E`
  - `E:nth-last-of-type(n)`匹配同类型中的倒数第`n`个同级兄弟元素`E`
  - `E:empty`匹配没有任何子节点（包括空格等`text`节点）的元素`E`
  - `E:target`匹配相关`URL`指向的`E`元素。要配合锚点使用
- 伪元素
  - `::before`
  - `::after`
  - `E::first-letter`设置元素`E`里面的第一个字符的样式
  - `E::first-line`设置元素`E`里面的第一行的样式
  - `E::selection`设置元素`E`里面被鼠标选中的区域的样式（一般设置颜色和背景色）
- 属性选择器
  - `E[title]`选中页面的`E`元素，并且`E`存在`title`属性即可
  - `E[title="abc"]`选中页面的E元素，并且`E`需要带有`title`属性，且属性值完全等于`abc`
  - `E[attr~=val]`选择具有`att`属性且属性值为：用空格分隔的字词列表，其中一个等于`val`的`E`元素
  - `E[attr|=val]`表示要么是一个单独的属性值，要么这个属性值是以`“-”`分隔的
  - `E[title^="abc"]`选中页面的`E`元素，并且`E`需要带有`title`属性，属性值以`abc`开头
  - `E[title$="abc"]`选中页面的`E`元素，并且`E`需要带有`title`属性，属性值以`abc`结尾
  - `E[title*="abc"]`选中页面的`E`元素，并且`E`需要带有`title`属性，属性值任意位置包含`abc`
- 继承性：
  - 关于文字样式的属性，都具有继承性。这些属性包括：`color`、 `text-`开头的、`line-`开头的、`font-`开头的
  - 关于盒子、定位、布局的属性，都不能继承

## 盒模型

- `box-sizing`
- 边框
  - 边框有三个要素：像素（粗细）、线型、颜色
  - `border-radius: 四个角半径`：边框圆角
  - `box-shadow: 水平偏移 垂直偏移 模糊程度 阴影大小 阴影颜`：边框阴影
  - `border-image`：边框图片
  - 实现三角形：`transparent`

    ```css
    .dialog::before {
      content: '';
      position: absolute;
      border: 8px solid;
      border-color: transparent lightblue transparent transparent;
      left: -16px;
      top: 8px;
    }
    ```

## 浮动

- 左右元素设置为浮动后，父元素高度塌陷，清除浮动的方法：
  1. 将父级也设置成浮动，爷爷元素又高度塌陷
  2. 给父级增加定位`absolute`，影响文档流，下面元素会跑上来
  3. 给父级设置`overflow: hidden`，当文本过长，且包含过长英文时，会出现英文文本被隐藏的情况
  4. 给父级设置对应的高度
  5. 末尾增加空元素进行`clear`：增加一个元素设置`clear: both`，增加了一个`div`标签，增加了页面的渲染负担
  6. 给父级添加伪元素进行`clear`

    ```css
    .box::after {
      content: '.';
      height: 0;
      display: block;
      clear: both;
    }
    ```

- `BFC`：块级格式化上下文
  - 解决问题
    1. 使用`float`脱离文档流，高度塌陷，使父元素高度不能撑开
    2. `margin`边距重叠，这时`margin`边距的结果为最大值，而不是和
  - 创建
    1. 浮动元素：`float`值为`left`、`right`
    2. `overflow`值不为`visible`，为`auto`、`scroll`、`hidden`
    3. `display`值为`inline-block`、`table-cell`、`table-caption`、`table`、`inline-table`、`flex`、`inline-flex`、`- - grid`、`inline-grid`
    4. 定位元素：`position`值为`absolute`、`fixed`

## 定位

- `position`，`relative`、`absolute`、`fixed`、`sticky`、`static`默认值
- 只有定位了的元素，才能有`z-index`值。也就是说，相对定位、绝对定位、固定定位，都可以使用`z-index`值。而浮动的元素不能用

## 动画

- `transition: 让哪些属性进行过度 过渡的持续时间 运动曲线 延迟时间`：用于设置元素的样式过度，和`animation`有着类似的效果，但细节上有很大的不同
- `transform`：用于元素进行缩放（`scale(水平方向的缩放倍数, 垂直方向的缩放倍数)`）、位移（`translate(水平位移, 垂直位移)`）、旋转（`rotate(角度)`）、倾斜，和设置样式的动画并没有什么关系
  - `3D`
    - 在旋转、位移属性加`X`、`Y`、`Z`
    - 透视：`perspective`
    - `transform-style`，`preserve-3d`三维空间、`fixed`平面内
- `animation`：用于设置动画属性，他是一个简写的属性，包含`6`个属性（`@keyframe`）
  - `animation-name`
  - `animation-duration`
  - `animation-iteration-count`：执行次数，`infinite`表示无数次
  - `animation-direction`：方向，`normal`正常，`alternate`反向
  - `animation-delay`：动画延迟执行
  - `animation-fill-mode`：动画结束时，盒子的状态。`forwards`：保持动画结束后的状态（默认）， `backwards`：动画结束后回到最初的状态
  - `animation-timing-function`：运动曲线，`linear`、`ease-in-out`、`steps()`
  
  ```css
  /* 定义动画 */
  @keyframes 动画名{
    from{ 初始状态 }
    to{ 结束状态 }
  }
  /* 调用 */
  animation: 动画名称 持续时间 执行次数 是否反向 运动曲线 延迟执行；
  ```

## flex布局

- 容器属性
  1. `flex-direction: row（默认） | row-reverse | column | column-reverse`
  2. `flex-wrap：nowrap（默认） | wrap | wrap-reverse（换行，第一行在下方）`
  3. `flex-flow`：是`flex-direction`属性和`flex-wrap`的简写
  4. `justify-content：flex-start（默认值） | flex-end | center | space-between （左右顶在最头）| space-around`，针对主轴
  5. `align-items：flex-start | flex-end | center | baseline | stretch（等高）（默认值）`，针对交叉轴
  6. `align-content：flex-start | flex-end | center | space-between | space-around | stretch（默认）`，针对交叉轴
- 项目的属性
  1. `order`：列顺序。数值越小，排列越靠前，默认为`0`
  2. `flex-grow`：放大比例，默认为`0`
  3. `flex-shrink`：缩小比例，默认为`1`，为`0`时不缩小，负值对该属性无效
  4. `flex-basis`：优先于`width`，默认`auto`
  5. `flex`：`flex-grow`，`flex-shrink`和`flex-basis`的简写，默认值为`0 1 auto`。快截值：`auto (1 1 auto) 和 none (0 0 auto)`
  6. `align-self`：允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性

## 隐藏

1. `display: none` (不占空间，不能点击)（场景，显示出原来这里不存在的结构）
2. `visibility: hidden`（占据空间，不能点击）（场景：显示不会导致页面结构发生变动，不会撑开）
3. `opacity: 0`（占据空间，可以点击）（场景：可以跟`transition`搭配）
4. `position: absolute`：通过使用绝对定位将元素移除可视区域内，以此来实现元素的隐藏
5. `z-index:` 负值：来使其他元素遮盖住该元素，以此来实现隐藏
6. `transform: scale(0,0)`：将元素缩放为`0`，来实现元素的隐藏。这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件

## 题目

### 画一个大小为父元素宽度一半的正方形

- 当`padding`的取值是百分比时，它是相对于父元素的宽度

```css
.outer {
  width: 400px;
  height: 600px;
  background: red;
}
.inner {
  width: 50%;
  padding-bottom: 50%;
  background: blue;
}
```

### 如何修改才能让图片宽度为 300px

```html
<img src="1.jpg" style="width:480px!important;”>
1. max-width: 300px
2. transform: scale(0.625,0.625)
```

### 如何设计实现无缝轮播

- 轮播图基本都在`ul`盒子里面的`li`元素，首先获取第一个`li`元素和最后一个`li`元素，克隆第一个`li`元素，和最后一个`li`元素，分别插入到`last li`的后面和`first li`的前面，然后监听滚动事件，如果滑动距离超过`x`或`-x`，让其实现跳转下一张图或者跳转上一张，(此处最好设置滑动距离)，然后在滑动最后一张实现最后一张和克隆第一张的无缝转换，当到克隆的第一张的时候停下的时候，让其切入真的第一张，则实现无线滑动，向前滑动同理

```javascript
right.addEventListener('click', (e) => {
    div.style.transform = `translate(-${(index + 1) * 500}px)`
    index++
})
```

### 如何解决移动端 Retina 屏 1px 像素问题

### 一列定宽，一列自适应

```css
/* 1. flex布局align-items自动设置为stretch等高 */
.box {
    display: flex;
}
.left {
    width: 100px;
    background: red;
}
.right {
    flex: 1;
    background: blue;
}
/* 2. position方法 设置top和bottom为0实现等高，但是局限于absolute的那边低的情况，如果设置absolute的那边高无法实现 */
/* 左边高 右边低 */
.box {
    position: relative;
}
.left {
    width: 100px;
    background: red;
}
.right {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin-left: 100px;
    background: blue;
}
/* 3. float+margin，需要清除浮动，无法实现等高 */
.box::after {
    content: '';
    height: 0;
    display: block;
    clear: both;
}
.left {
    width: 100px;
    background: red;
    float: left;
}
.right {
    margin-left: 100px; /* 不设置也管用，最好还是说设置 */
    background: blue;
}
```

### 三栏布局（圣杯布局）：左右固定，中间自适应

```css
/* 1. flex */
.container {
    display: flex;
}
.middle {
    flex: 1;
    background: yellow;
}
.left {
    width: 200px;
    background: pink;
}
.right {
    background: aqua;
    width: 300px;
}
/* 2. absolute */
.main{
    width: 100%;
    background: red;
    position: relative;
    padding-left: 200px;
    padding-right: 200px;
}
.center{
    width: 100%;
    background: pink;
}
.left{
    background: yellow;
    width: 200px;
    position: absolute;
    left: 0;
    top: 0;
}
.right{
    background: blue;
    width: 200px;
    position: absolute;
    top: 0;
    right: 0;
}
/* 3. float，中间元素写在最下面，清除浮动 */ 
.center {
    background: red;
    margin: 0 100px;
}
.left {
    background: blue;
    width: 100px;
    float: left;
}
.right {
    background: green;
    width: 100px;
    float: right;
}
/* 4. grid，不设置高度等高 */
.div{
    width: 100%;
    display: grid;
    grid-template-columns: 300px auto 300px;
}
```

### 水平垂直居中

- 水平垂直居中：`grid`：`place-items: center;`
  
  ```css
  /* 父元素 */
  .parent{
    display: grid;
    place-items: center;
  }  
  ```

- 标准流中：`margin: 0 auto;`
- 绝对定位配合`transform: translate(-50%, -50%)`

```css
/* 1. 绝对定位+transform或负margin或者位置全为0，margin:auto */
.wp {
    position: relative;
}
.box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* 或者 */
    margin-left: -子元素的宽
    margin-top: -子元素的高
    /* 或者 */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
/* 2. flex布局或者父元素flex子元素margin:auto */
.wp {
    display: flex;
    justify-content: center;
    align-items: center;
}
/* 3. grid或者父元素grid子元素margin:auto */
.wp {
    display: grid;
}
.box {
    align-self: center;
    justify-self: center;
}
```

### 浏览器渲染机制

- 浏览器采用流式布局模型(`Flow Based Layout`)
- 浏览器会把`HTML`解析成`DOM`，把`CSS`解析成`CSSOM`，`DOM`和`CSSOM`合并就 产生了渲染树(`Render Tree`)
- 有了`RenderTree`，我们就知道了所有节点的样式，然后计算他们在页面上的大小和位置，最后把节点绘制到页面上
- 由于浏览器使用流式布局，对`Render Tree`的计算通常只需要遍历一次就可以完成，但`table`及其内部元素除外，他们可能需要多次计算，通常要花`3`倍于同 等元素的时间，这也是为什么要避免使用`table`布局的原因之一

### 重绘、回流

- 重绘
  - 由于节点的几何属性发生改变或者由于样式发生改变而不会影响布局的，称为重绘，例如`outline`, `visibility`，`color`、`background-color`等，重绘的代价是高昂的，因为浏览器必须验证`DOM`树上其他节点元素的可见性

- 回流
  - 回流是布局或者几何属性需要改变就称为回流。回流是影响浏览器性能的关键因素，因为其变化涉及到部分页面(或是整个页面)的布局更新。一个元素的回流可能会导致了其所有子元素以及`DOM`中紧随其后的节点、祖先节点元素的随后的回流

### 浏览器优化

- 现代浏览器大多都是通过队列机制来批量更新布局，浏览器会把修改操作放在 (即`16.6ms`)才会清空队列，但当你获取布局信息的时候，队列中可能有会影响这些属性或方法返回值的操作，即使没有，浏览器也会强制清空队列，触发回流与重绘来确保返回正确的值。主要包括以下属性或方法：应该避免频繁的使用上述的属性，他们都会强制渲染刷新队列。
    1. `offsetTop`、`offsetLeft`、`offsetWidth`、`offsetHeight`
    2. `scrollTop`、`scrollLeft`、`scrollWidth`、`scrollHeight`
    3. `clientTop`、`clientLeft`、`clientWidth`、`clientHeight`
    4. `width`、`height`
    5. `getComputedStyle()`
    6. `getBoundingClientRect()`

- 减少重绘与回流
  - `css`
    1. 使用`transform`替代`top`
    2. 使用`visibility`替换`display: none`，因为前者只会引起重绘，后者会引发回流(改变了布局
    3. 避免使用`table`布局，可能很小的一个小改动会造成整个`table`的重新布局
    4. 尽可能在`DOM`树的最末端改变`class`，回流是不可避免的，但可以减少其影响。尽可能在`DOM`树的最末端改变`class`，可以限制了回流的范围，使其影响尽可能少的节点
    5. 避免设置多层内联样式，`CSS`选择符从右往左匹配查找，避免节点层级过多
    6. 然后对于`HTML`来说也尽量少的添加无意义标签，保证层级扁平
    7. 将动画效果应用到`position`属性为`absolute`或`fixed`的元素上，避免影响其他元素的布局，这样只是一个重绘，而不是回流
    8. 控制动画速度可以选择`requestAnimationFrame`
    9. 避免使用`CSS`表达式，可能会引发回流
    10. 可以让`transform`、`opacity`、`filters`这些动画不会引起回流重绘
  - `JavaScript`
    1. 避免频繁操作样式，最好一次性重写`style`属性，或者将样式列表定义为`class`并一次性更改 `class`属性
    2. 避免频繁操作`DOM`，创建一个`documentFragment`，在它上面应用所有`DOM`操作，最后再把它添加到文档中
    3. 避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来
    4. 对具有复杂动画的元素使用绝对定位，使它脱离档流，否则会引起父元素 及后续元素频繁回流
