# CSS

## 知识点

### flex

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

## 清除浮动、BFC

- 清除浮动：左右元素设置为浮动后，父元素高度塌陷
  1. 将父级也设置成浮动，爷爷元素又高度塌陷
  2. 给父级增加定位`absolute`，影响文档流，下面元素会跑上来
  3. 给父级设置`overflow: hidden`，当文本过长，且包含过长英文时，会出现英文文本被隐藏的情况
  4. 给父级设置对应的高度
  5. 末尾增加空元素进行`clear`：增加一个元素设置`clear: both`,增加了一个`div`标签，增加了页面的渲染负担
  6. 给父级添加伪元素进行`clear`：

    ```css
    .box::after {
      content: '.';
      height: 0;
      display: block;
      clear: both;
    }
    ```

- BFC：块级格式化上下文
  - 解决问题
    1. 使用`float`脱离文档流，高度塌陷，使父元素高度不能撑开
    2. `margin`边距重叠，这时`margin`边距的结果为最大值，而不是和
  - 创建
    1. 浮动元素：`float`值为`left`、`right`
    2. `overflow`值不为`visible`，为`auto`、`scroll`、`hidden`
    3. `display`值为`inline-block`、`table-cell`、`table-caption`、`table`、`inline-table`、`flex`、`inline-flex`、`- - grid`、`inline-grid`
    4. 定位元素：`position`值为`absolute`、`fixed`

## 隐藏

1. `display: none` (不占空间，不能点击)（场景，显示出原来这里不存在的结构）
2. `visibility: hidden`（占据空间，不能点击）（场景：显示不会导致页面结构发生变动，不会撑开）
3. `opacity: 0`（占据空间，可以点击）（场景：可以跟`transition`搭配）
4. `position: absolute`：通过使用绝对定位将元素移除可视区域内，以此来实现元素的隐藏
5. `z-index:` 负值：来使其他元素遮盖住该元素，以此来实现隐藏
6. `transform: scale(0,0)`：将元素缩放为`0`，来实现元素的隐藏。这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件




position sticky
z-index





#### 60. 已知如下代码，如何修改才能让图片宽度为 300px

```html
<img src="1.jpg" style="width:480px!important;”>
1. max-width: 300px
2. transform: scale(0.625,0.625)
```

#### 63. 如何设计实现无缝轮播

- 轮播图基本都在ul盒子里面的li元素,首先获取第一个li元素和最后一个li元素,克隆第一个li元素,和最后一个li元素,分别插入到lastli的后面和firstli的前面,然后监听滚动事件,如果滑动距离超过x或-x,让其实现跳转下一张图或者跳转上一张,(此处最好设置滑动距离),然后在滑动最后一张实现最后一张和克隆第一张的无缝转换,当到克隆的第一张的时候停下的时候,,让其切入真的第一张,则实现无线滑动,向前滑动同理

```javascript
right.addEventListener('click', (e) => {
    div.style.transform = `translate(-${(index + 1) * 500}px)`
    index++
})
```

#### 68. 如何解决移动端 Retina 屏 1px 像素问题




- 浏览器渲染机制
  - 浏览器采用流式布局模型(Flow Based Layout)
  - 浏览器会把 HTML 解析成 DOM，把 CSS 解析成 CSSOM，DOM 和 CSSOM 合并就 产生了渲染树(Render Tree)。
  - 有了 RenderTree，我们就知道了所有节点的样式，然后计算他们在页面上的大小和位置，最后把节点绘制到页面上。
  - 由于浏览器使用流式布局，对 Render Tree 的计算通常只需要遍历一次就可以完成，但 table 及其内部元素除外，他们可能需要多次计算，通常要花 3 倍于同 等元素的时间，这也是为什么要避免使用 table 布局的原因之一。

- 重绘
  - 由于节点的几何属性发生改变或者由于样式发生改变而不会影响布局的，称为 重绘，例如 outline, visibility, color、background-color 等，重绘的代价是高昂的， 因为浏览器必须验证 DOM 树上其他节点元素的可见性。

- 回流
  - 回流是布局或者几何属性需要改变就称为回流。回流是影响浏览器性能的关键因素，因为其变化涉及到部分页面(或是整个页面)的布局更新。一个元素的回流可能会导致了其所有子元素以及 DOM 中紧随其后的节点、祖先节点元素的随后的回流。

- 浏览器优化
  - 现代浏览器大多都是通过队列机制来批量更新布局，浏览器会把修改操作放在 (即 16.6ms)才会清空队列，但当你获取布局信息的时候，队列中可能有会影响这些属性或方法返回值的操作，即使没有，浏览器也会强制清空队列，触发回流与重绘来确保返回正确的值。主要包括以下属性或方法：应该避免频繁的使用上述的属性，他们都会强制渲染刷新队列。
    1. offsetTop、offsetLeft、offsetWidth、offsetHeight
    2. scrollTop、scrollLeft、scrollWidth、scrollHeight
    3. clientTop、clientLeft、clientWidth、clientHeight
    4. width、height
    5. getComputedStyle()
    6. getBoundingClientRect()

- 减少重绘与回流
  - css
    1. 使用 transform 替代 top
    2. 使用 visibility 替换 display: none ，因为前者只会引起重绘，后者会引发回 流(改变了布局
    3. 避免使用table布局，可能很小的一个小改动会造成整个 table 的重新布局。 
    4. 尽可能在 DOM 树的最末端改变 class，回流是不可避免的，但可以减少其影响。尽可能在 DOM 树的最末端改变 class，可以限制了回流的范围，使其影响 尽可能少的节点。
    5. 避免设置多层内联样式，CSS 选择符从右往左匹配查找，避免节点层级过多。
    6. 然后对于 HTML 来说也尽 量少的添加无意义标签，保证层级扁平。
    7. 将动画效果应用到 position 属性为 absolute 或 fixed 的元素上，避免影响其他元素的布局，这样只是一个重绘，而不是回流，
    8. 控制动画速度可以选择 requestAnimationFrame
    9. 避免使用 CSS 表达式，可能会引发回流。
    10. 可以让transform、opacity、 filters 这些动画不会引起回流重绘
  - JavaScript
    1. 避免频繁操作样式，最好一次性重写style属性，或者将样式列表定义为class 并一次性更改 class 属性。
    2. 避免频繁操作 DOM，创建一个 documentFragment，在它上面应用所有 DOM 操作，最后再把它添加到文档中。
    3. 避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。
    4. 对具有复杂动画的元素使用绝对定位，使它脱离文档流，否则会引起父元素 及后续元素频繁回流。



## 三角形

- transparent

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

## 画一个大小为父元素宽度一半的正方形

- 当padding的取值是百分比时，他是相对于父元素的宽度。

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

## CSS 的权重和优先级

- !import > 行内样式 > id选择器 >一个属性选择器、class或者伪类 >一个元素选择器或者伪元素 > 通配符

## css 动画都有哪些

- animation：用于设置动画属性，他是一个简写的属性，包含6个属性(@keyframe)
- transition：用于设置元素的样式过度，和animation有着类似的效果，但细节上有很大的不同
- transform：用于元素进行旋转、缩放、移动或倾斜，和设置样式的动画并没有什么关系
- translate：translate只是transform的一个属性值，即移动，除此之外还有 scale 等





## 题目

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