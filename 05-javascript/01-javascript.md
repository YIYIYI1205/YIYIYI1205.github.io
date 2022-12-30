# JavaScript

1. 解释型语言：程序执行之前，不需要事先被翻译为机器码；而是在运行时，边翻译边执行
2. 单线程
3. `ECMAScript`标准

## 加载

- 浏览器默认会从上至下解析网页，假如将`JS`代码、`<script>`标签写到`<head>`标签中，或者写在页面标签元素的前面，那么这样的`JS`是无效的，因为标签元素在此时都还没来得及加载，自然无法操作这个元素
- 需要通过`JS`来操作界面上的标签元素的时候，如果实在想把`JS`写到`<head>`标签中，那么就必须用`window.onload`将`JS`代码进行包裹，`window.onload`先加载，最后执行

## 数据类型

- 变量：`var`变量提升
- 基本数据类型（值类型）：`String`字符串、`Number`数值、`Boolean`布尔值、`BigInt`大型数值、`Null`空值、`Undefined`未定义、`Symbol`
  - 字符串的不可变性：字符串里面的值不可被改变。虽然看上去可以改变内容，但其实是地址变了，内存中新开辟了一个内存空间
  - `Undefined`和任何数值计算的结果为`NaN`。`NaN`与任何值都不相等，包括`NaN`本身
  - 浮点数计算会有精度问题，可以使用`decimal.js`
- 引用数据类型（引用类型）：`Object`对象。内置对象`Function`、`Array`、`Date`、`RegExp`、`Error`等都是属于`Object`类型。除了那七种基本数据类型之外，其他的，都称之为`Object`类型
- 所有的变量都是保存在**栈内存**中的
- 基本数据类型的值，直接保存在**栈内存**中
- 对象是保存到**堆内存**中的。每创建一个新的对象，就会在堆内存中开辟出一个新的空间；而变量保存了对象的内存地址（对象的引用），保存在栈内存当中
- `typeof`：返回基本数据类型以及`function`和`object`，`typeof null === object`
- `instanceof`：
- obj instanceof Object
- Object.prototype.toString.call(obj).slice(8, -1) // Object Array Function

## Object

### Object.seal()

    - `Object.seal(obj)`方法封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要原来是可写的就可以改变。
    - 使用`Object.freeze()`冻结的对象中的现有属性值是不可变的。用`Object.seal()`密封的对象可以改变其现有属性值。


- `localStorage`同域名、端口、协议，两个不同的页面之间数据可共享