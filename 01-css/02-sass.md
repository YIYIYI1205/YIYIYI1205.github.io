# [sass](https://www.sass.hk/docs/)

## 1. CSS功能拓展

- **父选择器的标识符`&`**

    ```css
    #content aside {
      color: red;
      body.ie & { color: green }
    }
    /*编译后*/
    #content aside {color: red};
    body.ie #content aside { color: green }
    ```

- **属性嵌套**

    ```css
    nav {
      border: {
        style: solid;
        width: 1px;
        color: #ccc;
      }
    }
    ```

- **子组合选择器和同层组合选择器**
  - `>`选择一个元素的所有命中的子元素
  - `+`选择紧跟着的子元素
  - `~`选择跟则后面的同层元素

## 2. SassScript

- **变量`$`**
  - 变量中可以使用其它变量
  - 反复声明一个变量，只有最后一处声明有效且它会覆盖前边的值
  - 将局部变量转换为全局变量可以添加`!global`声明

- **运算**
  - 以下三种情况` / `将被视为除法运算符号：
    - 如果值，或值的一部分，是变量或者函数的返回值`$width/2`
    - 如果值被圆括号包裹`(500px/2)`
    - 如果值是算数表达式的一部分`5px + 8px/2px`

- **插值语句**
  - `#{$name}`
  
    ```css
    $name: foo;
    $attr: border;
    p.#{$name} {
        #{$attr}-color: blue;
    }
    ```

- **变量定义`!default`**
  - `!default`用于变量，如果这个变量被声明赋值了，那就用它声明的值，否则就用这个默认值

## 3. @-Rules与指令

- **@import**
  - `css`允许在一个`css`文件中导入其他`css`，后果是只有执行到`@import`时，浏览器才会去下载其他`css`文件，这导致页面加载起来特别慢
  - `sass`的`@import`规则在生成`css`文件时就把相关文件导入进来
  - `sass`局部文件的文件名以下划线开头，`sass`就不会在编译时单独编译这个文件输出`css`，引入时可以忽略下划线
  - 可以在样式下嵌入`@import`

    ```css
    // example.scss
    .example {
      color: red;
    }
    #main{
      @import "example"
    }
    ```
  
- **@extend**
  - 将一个选择器下的所有样式继承给另一个选择器
  - `@extend`不生成新选择器，可以通过`!optional`声明达到这个目的`@extend .notice !optional`

## 4. 控制指令

- **@if**
  
  ```css
  $type: monster;
  p {
    @if $type == ocean {
      color: blue;
    } @else if $type == matador {
      color: red;
    } @else if $type == monster {
      color: green;
    } @else {
      color: black;
    }
  }
  ```

- **@for**

  ```css
  @for $i from 1 through 3 {
    .item-#{$i} { width: 2em * $i; }
  }
  ```

- **@each**
  
  ```css
  @each $animal in puma, sea-slug, egret, salamander {
    .#{$animal}-icon {
      background-image: url('/images/#{$animal}.png');
    }
  }
  ```

- **@while**
  
  ```css
  $i: 6;
  @while $i > 0 {
    .item-#{$i} { width: 2em * $i; }
    $i: $i - 2;
  }
  ```

## 5. 混合指令
  
- `@extend`是继承某一个样式，混合指令是混入多个样式，并且可以传参
- 为便于书写，`@mixin`可以用`=`表示，而`@include`可以用`+`表示
- **定义混合指令`@mixin`**
  - 混合指令的用法是在`@mixin`后添加名称与样式

- **引入混合样式`@include`**
- **参数**
  
    ```css
    @mixin link-colors(
        $normal,
        $hover: $normal,
        $visited: $normal
      )
    {
      color: $normal;
      &:hover { color: $hover; }
      &:visited { color: $visited; }
    }
    a {
      @include link-colors(blue, red, green); 
      /* 或者只传一个参数，另外两个会取这个作为默认值 */
    }
    /* 不确定参数数量的多个参数 */
    @mixin box-shadow($l...) {
      -moz-box-shadow: $shadows;
      -webkit-box-shadow: $shadows;
      box-shadow: $shadows;
    }
    .shadows {
      @include box-shadow(0px 4px 5px #666, 2px 6px 10px #999);
    }
     /* 传参时解构多个变量 */
    @mixin colors($text, $background, $border) {
      color: $text;
      background-color: $background;
      border-color: $border;
    }
    $values: #ff0000, #00ff00, #0000ff;
    .primary {
      @include colors($values...);
    }
    ```

- **向混合样式中导入内容**

    ```css
    /* 使用@content作为内容块 */
    @mixin apply-to-ie6-only {
      * html {
        @content;
      }
    }
    @include apply-to-ie6-only {
      #logo {
        background-image: url(/logo.gif);
      }
    }
    /* 编译为 */
    * html #logo {
      background-image: url(/logo.gif);
    }

    /* 还可以给@content中传参，在@include中使用using */
    @mixin media($types...) {
      @each $type in $types {
        @media #{$type} {
          @content($type);
        }
      }
    }

    @include media(screen, print) using ($type) {
      h1 {
        font-size: 40px;
        @if $type == print {
          font-family: Calluna;
        }
      }
    }
    ```

## 6. 函数指令

- **@function**

    ```css
      $grid-width: 40px;
      $gutter-width: 10px;
      
      @function grid-width($n) {
        @return $n * $grid-width + ($n - 1) * $gutter-width;
      }
      
      #sidebar { width: grid-width(5); }
    ```

## 7. [补充](https://sass-lang.cn/documentation)

- **@supports**：用于检测当前浏览器是否支持某个`CSS`属性并加载具体样式
- **@at-root**：使其中的所有内容都在文档的根目录发出，而不是使用常规嵌套
- 配置模块 **@use**
  - 样式表可以使用`!default`标志定义变量以使其可配置。
  - 要使用配置加载模块，请编写`@use <url> with (<variable>: <value>, <variable>: <value>)`
  - 可以使用内建模块`@use "sass:math" as math;`

  ```css
    /* _library.scss */
    $black: #000 !default;
    $border-radius: 0.25rem !default;
    $box-shadow: 0 0.5rem 1rem rgba($black, 0.15) !default;

    code {
      border-radius: $border-radius;
      box-shadow: $box-shadow;
    }

    @use 'library' with (
      $black: #222,
      $border-radius: 0.1rem
    );
  ```

  ```css
    /* src/_corners.scss */
    $radius: 3px;

    @mixin rounded {
      border-radius: $radius;
    }

    /* style.scss */
    @use "src/corners" as c;

    .button {
      @include c.rounded;
      padding: 5px + c.$radius;
    }
  ```
  