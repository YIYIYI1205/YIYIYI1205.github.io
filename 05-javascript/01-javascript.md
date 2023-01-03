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
- 对象是保存到**堆内存**中的。每创建一个新的对象，就会在堆内存中开辟出一个新的空间；而变量保存了对象的内存地址（对象的引用），保存在**栈内存**当中
- `typeof`：返回基本数据类型以及`function`和`object`，`typeof null === object`
- `instanceof`：
- obj instanceof Object
- Object.prototype.toString.call(obj).slice(8, -1) // Object Array Function

## 流程控制语句

- `for in`遍历对象，而`for of`遍历的是数组元素值
- `return`语句只能出现在函数体内，不可用于`for`；所以可以跳出`each`循环(`return false`: 也可阻止默认事件，如阻止`form`表单的默认的提交)
- `continue/break`只能用在`for`语句、或者`for/in`语句、或者`for/of`语句、`while`语句、`do/while`语句的循环体

## String

- `indexOf()/lastIndexOf()`：获取字符串中指定内容的索引
- `search()`：获取字符串中指定内容的索引（参数里一般是正则）
- `includes(想要查找的字符串, [position])`：字符串中是否包含指定的内容
- `startsWith(想要查找的内容, [position])`：字符串是否以指定的内容开头
- `endsWith(想要查找的内容, [position])`：字符串是否以指定的内容结尾
- `charAt(index)`、`str[index]`：获取指定位置的字符
- `charCodeAt(index)`：返回字符串指定位置的字符的`Unicode`编码
- `slice(开始索引, 结束索引)`：字符串截取，不会修改原字符串，而是将截取到的内容返回，包左不包右
- `substring(开始索引, 结束索引)`：类似`slice`，不能接受负值作为参数，如果传递了一个负值，则默认使用`0`
- `substr(开始索引, 截取的长度)`：从字符串中截取指定的内容
- `split()`：字符串转换为数组
- `replace(被替换的子串，新的子串)`：将字符串中的指定内容，替换为新的内容并返回。不会修改原字符串。默认只会替换第一个被匹配到的字符。如果要全局替换，需要使用正则
- `repeat(重复的次数)`：重复字符串
- `trim()`：去除字符串前后的空白
- `toLowerCase()`：转小写
- `toUpperCase()`：转大写
- `encodeURIComponent()`：把字符串作为`URI`组件进行编码
- `decodeURIComponent()`：把字符串作为`URI`组件进行解码

## Number

- `Number.isInteger(数字)`判断是否为整数
- `toFixed()`小数点后面保留多少位，返回结果是字符串

## Math

- `Math.abs()`：获绝对值
- `Math.random()`：生成随机数
- `Math.pow(a, b)`：乘方，`a`的`b`次方
- `sqrt()`：开方

## Array

- `join()`：将数组转换为字符串，返回结果为转换后的字符串
- `push()`：向数组的最后面插入一个或多个元素，返回结果为新数组的长度，会改变原数组
`pop()`：删除数组中的最后一个元素，返回结果为被删除的元素，会改变原数组
`unshift()`：在数组最前面插入一个或多个元素，返回结果为新数组的长度，会改变原数组
`shift()`：删除数组中的第一个元素，返回结果为被删除的元素，会改变原数组
`splice(起始索引index, 需要删除的个数, 新的元素1, 新的元素2...)`：从数组中删除指定的一个或多个元素，返回结果为被删除元素组成的新数组，会改变原数组
`slice(开始位置的索引, 结束位置的索引)`：从数组中提取指定的一个或多个元素，返回结果为新的数组，不会改变原数组
`concat()`：合并数组：连接两个或多个数组，返回结果为新的数组，不会改变原数组
`fill(固定值, startIndex, endIndex)`：填充数组，用固定的值填充数组，返回结果为新的数组，会改变原数组
`find()`：找出第一个满足指定条件返回`true`的元素

## Function

- 函数内的`arguments`是一个类数组对象，里面存储的是它接收到的实参列表

## Object

- `Object.seal(obj)`方法封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要原来是可写的就可以改变
- `Object.freeze()`冻结的对象中的现有属性值是不可变的。用`Object.seal()`密封的对象可以改变其现有属性值

## 存储
 
- `localStorage`同域名、端口、协议，两个不同的页面之间数据可共享