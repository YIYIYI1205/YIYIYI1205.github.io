# 语法

## 变量

### var

 1. 作用域：全局作用域和函数作用域；在函数作用域中去掉`var`定义变量，变量会被定义在全局作用域中。
 2. 变量提升：变量的声明会自动提升到作用域顶部，因此重复声明同一变量也不会报错。
 3. `for`循环：所有的`i`都是同一个变量，因而输出的都是同一个最终值。

### let

 1. 作用域：块级作用域。使用`let`在全局作用域中声明的变量不会成为`window`对象的属性。
 2. 没有变量提升，不能重复声明。在`let`声明之前的执行瞬间被称为“暂时性死区”。
 3. `for`循环：`JavaScript`引擎在后台会为每个迭代循环声明一个新的迭代变量。

### const

- `const`声明的限制只适用于它指向的变量的引用。如果`const`变量引用的是一个对象，那么修改这个对象内部的属性并不违反`const`的限制。

## 数据类型

### typeof

 - `"undefined"`表示值未定义; 声明未赋值和未声明的变量都会是`undefined`;
 - `"boolean"`表示值为布尔值;
 - `"string"`表示值为字符串;
 - `"number"`表示值为数值;
 - `"object"`表示值为对象(而不是函数)或 null;
 - `"function"`表示值为函数;
 - `"symbol"`表示值为符号。

### 基本数据类型

- 简单数据类型(也称为原始类型): `Undefined`、`Null`、`Boolean`、`Number`、 `String `和`Symbol`。

#### Boolean

-----------------

像`if`等流控制语句会自动执行其他类型值到布尔值的转换。

| 数据类型  | 转换为`true`的值 | 转换为`false`的值 |
| :-------- | -------------------: | :-------------------: |
| Boolean   |                 true |         false         |
| String    |           非空字符串 |     ""(空字符串)      |
| Number    | 非零数值(包括无穷值) |        0、NaN         |
| Object    |             任意对象 |         null          |
| Undefined |          N/A(不存在) |       undefined       |

#### Number

-----------------

##### 浮点数

浮点值的精确度最高可达`17`位小数，但在算术计算中远不如整数精确。例如，`0.1`加`0.2`得到的不是`0.3`。

##### NaN

 `console.log(NaN == NaN); // false``

  - `isNaN()`判断参数是否不是数值

   ``javascript
        console.log(isNaN(NaN));     // true
        console.log(isNaN(10));      // false，10 是数值
        console.log(isNaN("10"));    // false，可以转换为数值10 
        console.log(isNaN("blue"));  // true，不可以转换为数值
        console.log(isNaN(true));    // false，可以转换为数值1
   ``

##### 数值转换

- 将非数值转换为数值: `Number()`、`parseInt()`和`parseFloat()``。
  
###### Number()转换
  
  | 数据类型  | 转换为`1`的值 | 转换为`0`的值 | 转换为`NaN`的值 |
  | :-------- | ----------------: | :---------------: | :-----------------: |
  | 布尔值    |              true |       false       |     N/A(不存在)     |
  | null      |       N/A(不存在) |       null        |     N/A(不存在)     |
  | undefined |       N/A(不存在) |    N/A(不存在)    |      undefined      |
  | string    |               '1' | '0',""(空字符串)  |    包含其它字符     |

  - `Object`: 调用`valueOf()`方法，如果转换结果是`NaN`，则调用`toString()`方法，再按照转换字符串的规则转换。

```javascript
let num1 = Number("Hello world!");  // NaN
let num2 = Number("");              // 0
let num3 = Number("000011");        // 11
let num4 = Number(true);            // 1
```

###### parseInt()转换

 - `parseInt('')`会得到`NaN`
 - 以数字开头的`string`会被转换为开头的数字
 - `parseInt('')`的第二个参数用于制定进制数。可以用来将某进制转化为十进制。`parseInt("AF", 16);  //175``。

###### parseFloat()转换

- 第一次出现的小数点是有效的，但第二次出现的小数点就无效了，此时字符串的剩余字符都会被忽略。
- `parseFloat()`只解析十进制值，因此不能指定底数。

##### 操作符

- 这些操作符会进行隐式类型转换成`Number`类型：递增/递减、一元`+， -`、`*， /， %`；
  1. 递增/递减操作符：在变量前递增或者递减，变量的值都会在语句被求值之前改变；在变量后递增或者递减，变量会先参与语句求值再进行改变。
  2. 一元`+， -`、``*， /， %`应用到非数值会执行`Number()`
  3. `Math.pow()`现在有了自己的操作符`**`

- 这些操作符或语句会进行饮食类型转换成`Boolean`类型：`!`、`&&`、`||`、`if`
  1. 逻辑非`!`：`true`：空字符串、`0`、`null`、`NaN`、`undefined`；`false`：对象、非空字符串、非0数值
  2. 逻辑与：第一个操作数为`false`时后面就不会执行了
  3. 逻辑非：第一个操作数为`true`时后面就不会执行了

#### String

-----------------

- `ECMAScript`中的字符串是[不可变](https://www.jianshu.com/p/15ed1a4c35d8)的(`immutable`)，意思是一旦创建，它们的值就不能变了。要修改某个变量中的字符串值，必须先销毁原始的字符串，然后将包含新值的另一个字符串保存到该变量。

   ``javascript
    var statement = "I am an immutable value";
    var otherStr = statement.slice(8, 17);
   ``
    没有字符串方法可以改变他们操作的字符串，它们都是返回新的字符串。
    数字也是不变的。

##### 转换为字符串

###### toString()

- 用途就是返回当前值的字符串等价物。
- `toString()`方法可见于数值、布尔值、对象和字符串值。`null`和`undefined`值没有`toString()`方法。
- 数值调用时，可以传参制定进制数。

###### String()

- 如果值有`toString()`方法，则调用该方法（不传参数）并返回结果。
- 如果值是`null`，返回`"null"`。
- 如果值是`undefined`，返回`"undefined"`。

##### 模板字面量

###### 模板字面量标签函数

标签函数会接收被插值记号分隔后的模板和对每个表达式求值的结果。
``javascript
let a = 6;
let b = 9;
function simpleTag(strings, ...expressions) {
  console.log(strings);
  for(const expression of expressions) {
    console.log(expression);
  }
  return 'foobar';
}
// 第一个参数是将
let taggedResult = simpleTag`${ a } + ${ b } = ${ a + b }`;
// ["", " + ", " = ", ""]
// 6
// 9
// 15
console.log(taggedResult);  // "foobar"
```

##### 原始字符串

- `String.raw`标签函数可以直接获取原始的模板字面量内容。

#### Symbol 类型

-----------------

- 可以表示独一无二的值，比如定义对象的唯一属性名并且不会被`Object.keys`或者`for...in`或者`JSON.stringify()`遍历到保护个别隐私属性，定义不会重复的常量。
- `Symbol()`函数不能与`new`关键字一起作为构造函数使用。
- `Symbol(description)`，`description`用于调式，不是`Symbol`的值。
- 每一个`Symbol`类型数据都独一无二，不能划等号。 
- `Symbol`不能和其它值参与运算。
- `Symbol`可以显式(`String()、Boolean()`)地转为字符串，布尔值，但是不能转为数字。
  
 ``javascript
  const s = Symbol()
  const a = {}
  a[s] = 'hello'
  // 这是用计算属性定义
  const b = {
    [Symbol()]: 'hello'
  }
  // 还可以用Object.defineProperty()/Object.defineProperties()
  Object.defineProperty(a, s, {value: 'bar val'});
  console.log(a[s])
  console.log(Object.getOwnPropertyNames(a))
  console.log(Object.getOwnPropertySymbols(a))
  console.log(Object.getOwnPropertyDescriptors(a))
  console.log(Reflect.ownKeys(a));
 ``
- `Object.getOwnPropertyNames()`，`Object.getOwnPropertySymbols()`，`Object.getOwnPropertyDescriptors()`，`Reflect.ownKeys`展示不同内容。
- (书上还有一些高级用法没看)

#### Object

##### 属性和方法

- `constructor`：用于创建当前对象的函数。在前面的例子中，这个属性的值就是`Object()`函数。
- `hasOwnProperty(propertyName)`：用于判断当前对象实例（不是原型）上是否存在给定的属
性。要检查的属性名必须是字符串（如`o.hasOwnProperty("name")`）或符号。
- `isPrototypeOf(object)`：用于判断当前对象是否为另一个对象的原型。
- `propertyIsEnumerable(propertyName)`：用于判断给定的属性是否可以使用`for-in`语句枚举。与`hasOwnProperty()`一样，属性名必须是字符串。
- `toLocaleString()`：返回对象的字符串表示，该字符串反映对象所在的本地化执行环境。
- `toString()`：返回对象的字符串表示。
- `valueOf()`：返回对象对应的字符串、数值或布尔值表示。通常与`toString()`的返回值相同。