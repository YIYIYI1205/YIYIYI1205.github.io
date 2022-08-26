# sass

- **声明变量用`$`**
  - 变量中可以使用其它变量
  - 反复声明一个变量，只有最后一处声明有效且它会覆盖前边的值
  - 将局部变量转换为全局变量可以添加`!global`声明
  - `!default`用于变量，如果这个变量被声明赋值了，那就用它声明的值，否则就用这个默认值。

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

- **子组合选择器和同层组合选择器**
  - `>`选择一个元素的所有命中的子元素
  - `+`选择紧跟着的子元素
  - `~`选择跟则后面的同层元素

- **嵌套属性**

    ```css
    nav {
      border: {
        style: solid;
        width: 1px;
        color: #ccc;
      }
    }
    ```

- **导入规则**
  - `css`允许在一个`css`文件中导入其他`css`，后果是只有执行到`@import`
    时，浏览器才会去下载其他`css`文件，这导致页面加载起来特别慢。
  - `sass`的`@import`规则在生成`css`文件时就把相关文件导入进来
  - `sass`局部文件的文件名以下划线开头。`sass`就不会在编译时单独编译这个文件输出`css`，引入时可以忽略下划线

- **混合器`@mixin、@include、@content`**
  - 可以包含多条`css`语句
  - 可以传入变量
  - 为便于书写，`@mixin`可以用`=`表示，而`@include`可以用`+`表示

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
    
    /* 多个参数 */
    @mixin box-shadow($shadows...) {
      -moz-box-shadow: $shadows;
      -webkit-box-shadow: $shadows;
      box-shadow: $shadows;
    }
    .shadows {
      @include box-shadow(0px 4px 5px #666, 2px 6px 10px #999);
    }
    
    @mixin colors($text, $background, $border) {
      color: $text;
      background-color: $background;
      border-color: $border;
    }
    $values: #ff0000, #00ff00, #0000ff;
    .primary {
      @include colors($values...);
    }
    
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

- **选择器继承`@extend`**

    ```css
    .error {
      border: 1px solid red;
      background-color: #fdd;
    }
    .seriousError {
      @extend .error;
      border-width: 3px;
    }
    
    .hoverlink {
      @extend a:hover;
    }
    .comment a.user:hover {
      font-weight: bold;
    }
    /* 编译为 */
    .comment a.user:hover, .comment .user.hoverlink {
      font-weight: bold; 
    }
    ```

- 在有引号的文本字符串中使用 `#{}`插值语句可以添加动态的值

- 字符串

    ```css
    @mixin firefox-message($selector) {
      body.firefox #{$selector}:before {
        content: "Hi, Firefox users!";
      }
    }
    @include firefox-message(".header");
    ```

- **@function**

    ```css
      $grid-width: 40px;
      $gutter-width: 10px;
      
      @function grid-width($n) {
        @return $n * $grid-width + ($n - 1) * $gutter-width;
      }
      
      #sidebar { width: grid-width(5); }
    ```

- **@-Rules 与指令**
  - 通用声明：这些类型的语句可以在`Sass`样式表中的任何位置使用
    - 声明变量：`$`
    - 流控制规则
      - **@if**

        ```css
        $dark-theme: true !default;
        $primary-color: #f8bbd0 !default;
        $accent-color: #6a1b9a !default;

        @if $dark-theme {
          $primary-color: darken($primary-color, 60%);
          $accent-color: lighten($accent-color, 60%);
        }
        ```

      - **@each**

        ```css
        @each $animal, $color, $cursor in (puma, black, default),
                                          (sea-slug, blue, pointer),
                                          (egret, white, move) {
          .#{$animal}-icon {
            background-image: url('/images/#{$animal}.png');
            border: 2px solid $color;
            cursor: $cursor;
          }
        }
        ```

      - **@for**
        - 如果`to`使用，则排除最终号码；如果`through`使用，则包含在内

        ```css
            @for $i from 1 through(或者to) 3 {
              .item-#{$i} { width: 2em * $i; }
            }
            /* 编译后 */
            .item-1 {
              width: 2em; 
            }
            .item-2 {
              width: 4em; 
            }
            .item-3 {
              width: 6em; 
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

    - 信息
      - **@debug**
      - **@warn**
      - **@error**
  - `css`语句：可以在以下任何地方使用`@function`
    - 样式规则
    - `CSS`规则
      - **@media**
      - **@supports** : 用于检测当前浏览器是否支持某个`CSS`属性并加载具体样式
      - **@font-face**
    - `Mixin`使用： **@include**
    - **@at-root**：使其中的所有内容都在文档的根目录发出，而不是使用常规嵌套
  - 顶级声明：只能在样式表的顶层使用，或嵌套在`CSS`语句的顶层
    - 加载模块 **@use**
      - 默认情况下，模块的名称空间只是其URL的最后一个组成部分，而没有文件扩展名
      - 定义私有成员，方法是使用`-`或开头`_`。这些成员将在定义它们的样式表中正常工作，但是它们不会成为模块公共`API`的一部分
      - 样式表可以使用`!default`标志定义变量以使其可配置。
      - 要使用配置加载模块，请编写`@use <url> with (<variable>: <value>, <variable>: <value>)`
      - 可以使用内建模块

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

        $radius: 3px;

        /* src/_corners.scss */
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

    - **@forward**
      - 控制可见性``@forward "src/list" hide list-reset, $horizontal-list-gap;``
    - 导入 **@import**
    - `Mixin`定义 **@mixin**
    - 函数定义 **@function**

- 特殊功能
  - **url()** ：可以使用带引号或不带引号的`URL`
    - ``src: url($roboto-font-path + "/Roboto-Light.woff2") format("woff2");``
  - `calc()`，`element()`，`progid:...()`，和`expression()`
    - ``left: calc(50% - #{$width / 2});``
  - `min()`和`max()`
  - `env()`和`var()`

    ```css
      .component {
        --text-color: #080;
      }

      /*在 component 的样式中使用它：*/
      .component .text {
        color: var(--text-color, black); /*此处 color 正常取值 --text-color*/
      }
      .component .header {
        color: var(--header-color, blue);
        /*header-color 并没有被设定, 此处 color 被回退到 blue*/
      }

    ```
