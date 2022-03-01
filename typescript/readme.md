# TypeScript

## 环境搭建

- `npm i -g typescript`
- 使用`tsc`对`ts`文件进行编译

## 编译选项

- 编译所有文件：`tsc`，需要配置文件
- 监视模式：`tsc -w`
- 创建配置文件：`npx tsconfig.json`
  ```json
    {
        "include": [
            "src/**/*"
        ],// 一个*表示任意文件，两个**表示任意目录
        "exclude": [
            "node_modules",
            "**/*.spec.ts"
        ],
        "extends": "./configs/base", // 从另一个配置文件里继承配置
        "files": [], //指定被编译文件的列表，文件少时使用
        "compilerOptions": { //编译器选项
            "target": "ES6", // 指定ts被编译为es的版本；"ES3"（默认）， "ES5"， "ES6"/ "ES2015"， "ES2016"， "ES2017"或 "ESNext"。
            "module": "ES6", // 指定要使用的模块化的规范，如将import转换成什么规范；"None"， "CommonJS"， "AMD"， "System"， "UMD"， "ES6"或 "ES2015"。
            "lib": [], //指定项目中要使用的库，一般不用改
            "outDir": "./dist", // 指定编译后文件所在的目录
            "outFile": "", // 所有全局作用域中的代码会合并到同一个文件中，模块化的文件不合并，如果想合并两个模块，需要用AMD或者System
            "allowJs": false, // 是否对js文件进行编译，默认false
            "checkJs": false, //是否检查js代码，默认false
            "removeComments": false, //是否移除注释
            "noEmit": true, // 不生产编译后的文件 
            "noEmitOnError": true, // 当有错误的时候不生产编译后的文件
            "alwaysStrict": true, // 设置编译后的文件是否使用严格模式
            "noImplicitAny": true, // 在表达式和声明上有隐含的any类型时报错。
            "noImplicitThis": true, // 当this表达式的值为any类型的时候，生成一个错误。
            "strictNullChecks": true, // 如果可以为null的变量使用方法，会提示
            "strict": true, // 所有严格检查都打开；--noImplicitAny, --noImplicitThis, --alwaysStrict， --strictNullChecks和 --strictFunctionTypes和--strictPropertyInitialization。
        }
    }
  ```

## webpack打包ts代码

- 生成`package.json`：`npm init -y`
- 安装包：`npm i -D webpack webpack-cli typescript ts-loader`

## 基本类型

- 如果变量声明和赋值同时进行，`ts`可以自动对变量进行类型检测
  <details>
    <summary>类型表</summary>

      | 类型    | 描述                                                               |
      | ------- | ------------------------------------------------------------------ |
      | number  | 数字                                                               |
      | string  | 数字                                                               |
      | boolean | 数字                                                               |
      | 字面量  | 限制变量的值就是该字面量的值（例如a: 10，那么a只能是10，类似常量） |
      | any     | 任意类型                                                           |
      | unknown | 类型安全的any                                                      |
      | void    | 空值或者undefined                                                  |
      | never   | 不能是任何值                                                       |
      | object  | 对象                                                               |
      | array   | 数组                                                               |
      | tuple   | 元素，固定长度数组                                                 |
      | enum    | 枚举                                                               |
    </details>
- 联合类型：`|` 表示或
- 声明变量如果不指定类型，则`ts`解析器会自动判断变量的类型为`any`（隐式的`any`），将`any`类型的值赋值给别的类型的值，会使别的类型的值也失去类型检测；可以使用`unknown`，或者使用类型断言`as` 
- 类型断言：`变量 as 类型`或者`<类型>变量`
- 任意类型属性：`{[propName: string]: any}`
- 函数结构的类型声明：`(形参:类型, 形参:类型...) => 返回值类型`，例如：`let b: (a: number) => number`
- 数组类型：`类型[]`或者`Array<类型>`
- 元组：效率更高，`[类型，类型]`
- 枚举：`Enum 枚举类名字{枚举值, 枚举值}`
  ```javascript
    Enum Gender {
        Male, 
        Female
    }
    let gender: Gender; 
    gender = Gender.Male;
    console.log(gender) // 0
    console.log(gender === Gender.Male)
  ```
- 类型别名：`type 类型名 = `
