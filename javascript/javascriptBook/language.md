# 语法

## 变量

### var

 1. 作用域：全局作用域和函数作用域；在函数作用域中去掉`` var ``定义变量，变量会被定义在全局作用域中。
 2. 变量提升：变量的声明会自动提升到作用域顶部，因此重复声明同一变量也不会报错。
 3. `` for ``循环：所有的`` i ``都是同一个变量，因而输出的都是同一个最终值。

### let

 1. 作用域：块级作用域。使用`` let ``在全局作用域中声明的变量不会成为`` window ``对象的属性。
 2. 没有变量提升，不能重复声明。在`` let ``声明之前的执行瞬间被称为“暂时性死区”。
 3. `` for ``循环：`` JavaScript ``引擎在后台会为每个迭代循环声明一个新的迭代变量。

### const

- `` const ``声明的限制只适用于它指向的变量的引用。如果`` const ``变量引用的是一个对象，那么修改这个对象内部的属性并不违反`` const ``的限制。

## 数据类型

### typeof

 - `` "undefined" ``表示值未定义; 声明未赋值和未声明的变量都会是`` undefined ``;
 - `` "boolean" ``表示值为布尔值;
 - `` "string" ``表示值为字符串;
 - `` "number" ``表示值为数值;
 - `` "object" ``表示值为对象(而不是函数)或 null;
 - `` "function" ``表示值为函数;
 - `` "symbol" ``表示值为符号。

### 基本数据类型

- 简单数据类型(也称为原始类型): `` Undefined ``、`` Null ``、`` Boolean ``、`` Number ``、 `` String `` 和`` Symbol`` 。

#### Boolean

像`` if ``等流控制语句会自动执行其他类型值到布尔值的转换。

| 数据类型  | 转换为`` true ``的值 | 转换为`` false ``的值 |
| :-------- | -------------------: | :-------------------: |
| Boolean   |                 true |         false         |
| String    |           非空字符串 |     ""(空字符串)      |
| Number    | 非零数值(包括无穷值) |        0、NaN         |
| Object    |             任意对象 |         null          |
| Undefined |          N/A(不存在) |       undefined       |

#### Number

##### 浮点数

浮点值的精确度最高可达`` 17 ``位小数，但在算术计算中远不如整数精确。例如，`` 0.1 ``加`` 0.2 ``得到的不是`` 0.3 ``。

##### NaN

  ``` console.log(NaN == NaN); // false ```

  - `` isNaN() ``判断参数是否不是数值

    ```
        console.log(isNaN(NaN));     // true
        console.log(isNaN(10));      // false，10 是数值
        console.log(isNaN("10"));    // false，可以转换为数值10 
        console.log(isNaN("blue"));  // true，不可以转换为数值
        console.log(isNaN(true));    // false，可以转换为数值1
    ```

##### 数值转换

- 将非数值转换为数值: `` Number() ``、`` parseInt() ``和`` parseFloat()``。
  
###### Number()转换
  
  | 数据类型  | 转换为`` 1 ``的值 | 转换为`` 0 ``的值 | 转换为`` NaN ``的值 |
  | :-------- | ----------------: | :---------------: | :-----------------: |
  | 布尔值    |              true |       false       |     N/A(不存在)     |
  | null      |       N/A(不存在) |       null        |     N/A(不存在)     |
  | undefined |       N/A(不存在) |    N/A(不存在)    |      undefined      |
  | string    |               '1' | '0',""(空字符串)  |    包含其它字符     |

  - `` Object ``: 调用`` valueOf() ``方法，如果转换结果是`` NaN ``，则调用`` toString() ``方法，再按照转换字符串的规则转换。

```
let num1 = Number("Hello world!");  // NaN
let num2 = Number("");              // 0
let num3 = Number("000011");        // 11
let num4 = Number(true);            // 1
// 0 // 11 // 1
```

###### parseInt()转换

 - `` parseInt('') ``会得到`` NaN ``
 - 以数字开头的`` string ``会被转换为开头的数字
 - `` parseInt('') ``的第二个参数用于制定进制数。可以用来将某进制转化为十进制。`` parseInt("AF", 16);  //175``。

###### parseFloat()转换

- 第一次出现的小数点是有效的，但第二次出现的小数点就无效了，此时字符串的剩余字符都会被忽略。
- `` parseFloat() ``只解析十进制值，因此不能指定底数。



Symbol(符号)是 ECMAScript 6 新增的。还有一种复杂数据类型叫 Object(对 象)。Object 是一种无序名值对的集合。



#### String

- `` ECMAScript ``中的字符串是不可变的(`` immutable ``)，意思是一旦创建，它们的值就不能变了。要修改 某个变量中的字符串值，必须先销毁原始的字符串，然后将包含新值的另一个字符串保存到该变量。


标签函数会接收被插值记号分隔后的模板和对每个表达式求值的结果。
``` 
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

- `` String.raw ``标签函数可以直接获取原始的模板字面量内容。


#### Symbol 类型

- 可以表示独一无二的值，比如定义对象的唯一属性名并且不会被`` Object.keys ``或者`` for...in ``或者`` JSON.stringify() ``遍历到保护个别隐私属性，定义不会重复的常量。
- `` Symbol() ``函数不能与`` new ``关键字一起作为构造函数使用。
- `` Symbol(description) ``，`` description ``用于调式，不是`` Symbol ``的值。
- 每一个`` Symbol ``类型数据都独一无二，不能划等号。 
- `` Symbol ``不能和其它值参与运算。
- `` Symbol ``可以显式地转为字符串，布尔值，但是不能转为数字。
  ```
  const s = Symbol()
  const a = {}
  a[s] = 'hello'
  const b = {
    [Symbol()]: 'hello'
  }
  console.log(a[s])
  ```