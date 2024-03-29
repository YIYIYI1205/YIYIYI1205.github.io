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
- 安装包：`npm i -D webpack webpack-cli typescript ts-loader html-webpack-plugin webpack-dev-server clean-webpack-plugin @babel/core @babel/preset-env babel-loader core-js`
- 建立`webpack.config.js`
  ```javascript
  const path = require('path')
  const HTMLWebpackPlugin = require('html-webpack-plugin')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  module.exports = {
    entry: './src/index.ts', // 入口文件
    output: { // 打包文件
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        environment: {
            arrowFunction: false // 不使用箭头函数
        }
    },
    // 指定webpack打包时要使用的模块
    module: {
        rules:  [ // 指定要加载的规则
            {
              test: /\.ts$/, // 指定规则生效的文件
              use: [{ // 配置loader，复杂版
                  loader: 'babel-loader',
                  options: { // 设置预定义的环境
                      presets: [[
                         '@babel/preset-env', //  指定环境插件
                         {
                             targets: { // 浏览器兼容版本
                                 "chrome": "88",
                                 "ie": "11"
                             },
                             "corejs": "3", // 指定corejs的版本，可以处理promise等es6语法
                             "useBuiltIns": "usage", // 使用corejs的方式，usage表示按需加载
                         }
                      ]]
                  }
              }, 'ts-loader'], // 先用ts-loader把js转化为ts，再用babel-loader把新版本的js转化为旧版本的js
              exclude: /node-modules/
            }
        ]
    },
    plugins: [ // 配置webpack插件
      new CleanWebpackPlugin(), // 清除dist目录下的内容
      new HTMLWebpackPlugin({ // 自动生成html文件
          // title: '自定义title'
          template: './src/index.html' // 每个文件都会引入bundle.js
      })
    ],
    resolve: { // 设置引入模块
      extensions: ['.ts', '.js']
    }
  }
  ```
- 配置`tsconfig.json`文件
- 修改`pakage.json`文件
  ```json
  {
      "scirpts": {
          "build": "webpack",
          "start": "webpack serve --open chrome.exe" // 实时更新
      }
  }
  ```

## 基本类型
- 如果变量声明和赋值同时进行，`ts`可以自动对变量进行类型检测

 | 类型    | 描述                                                               |
 | ------- | ------------------------------------------------------------------ |
 | number  | 数字                                                               |
 | string  | 字符串                                                             |
 | boolean | 布尔值                                                             |
 | 字面量  | 限制变量的值就是该字面量的值（例如a: 10，那么a只能是10，类似常量） |
 | any     | 任意类型                                                           |
 | unknown | 类型安全的any                                                      |
 | void    | 空值或者undefined                                                  |
 | never   | 不能是任何值                                                       |
 | object  | 对象                                                               |
 | array   | 数组                                                               |
 | tuple   | 元素，固定长度数组                                                 |
 | enum    | 枚举                                                               |

- 联合类型：`|` 表示或
- 声明变量如果不指定类型，则`ts`解析器会自动判断变量的类型为`any`（隐式的`any`），将`any`类型的值赋值给别的类型的值，会使别的类型的值也失去类型检测；可以使用`unknown`，或者使用类型断言`as`
- 类型断言：`变量 as 类型`或者`<类型>变量`
- 如果编译器不能够去除`null`或`undefined`，你可以使用类型断言手动去除。 语法是添加`!`后缀：`identifier!`从`identifier`的类型里去除了`null`和`undefined`
- 任意类型属性：`{[propName: string]: any}`
- 函数结构的类型声明：`(形参:类型, 形参:类型...) => 返回值类型`，例如：`let b: (a: number) => number`
- 数组类型：`类型[]`或者`Array<类型>`
- 元组：效率更高，`[类型，类型]`
- 枚举：`Enum 枚举类名字{枚举值, 枚举值}`
  ```javascript
  enum Gender {
      Male, 
      Female
  }
  let gender: Gender; 
  gender = Gender.Male;
  console.log(gender) // 0
  console.log(gender === Gender.Male)
  // 反向映射
  console.log(Gender[0]) // Male
  ```
- `null`和`undefined`是`never`类型的子类型
- 类型别名：`type 类型名 = `，不能`extends`和`implements`

## 函数

- 可选参数：参数后加`?`，必须配置到参数的最后面
- 默认参数：需要在参数后面赋值
- 剩余参数：`...`三点运算符接收形参`function(...result: number[])`
- 函数的重载：同名函数，在`es5`中会被下面的替代；上面写函数的参数和返回值，下面函数写具体实现
  ```javascript
  function getInfo(name: string): string;
  function getInfo(name: string, age: number): string;
  function getInfo(name: any, age?: number): any {
      // 具体实现
  }
  ```
- 箭头函数`this`指向上下文

## 面向对象

### 类

#### `es5`中的类

- 构造函数
  ```javascript
  // 1. 构造函数中增加属性、方法
  function Person(name){
      this.name = name
      this.run = function(){
          console.log(this.name)
      }
  }
  var p = new Person('xxx')
  p.run()
  ```
- 原型链：原型链上的属性会被多个实例共享，构造函数不会
  ```javascript
  // 2. 原型链上增加属性、方法  
  Person.prototype.work = function(){
      console.log(this.name)
  }
  p.work()
  // 解释：原型链上的属性会被多个实例共享，构造函数不会
  function superType() {
    this.colors = ['red', 'blue', 'green' ]
  }
  function SubType () {}
  SubType.prototype = new superType()
  var instance1 = new SubType()
  instance1.colors.push('black')
  console.log(instance1.colors) // ['red', 'blue', 'green', 'black' ]
  var instance2 = new SubType()
  console.log(instance2.colors) // ['red', 'blue', 'green', 'black' ]
  ```
- 静态方法
  ```javascript
  // 3. 实例方法必须通过new才能调用，静态方法可以直接用类调用
  Person.getInfo = function(){
    // 静态方法
  }
  // 例如jquery中的$('#box').css是实例方法，$.ajax是静态方法
  ```
- 继承
  1. 对象冒充实现继承`call`：不可以继承原型链上的属性和方法
    ```javascript
    // 4. 继承：对象冒充实现继承——不可以继承原型链上的属性和方法
    function Web(){
        Person.call(this) // 对象冒充可以继承构造函数的属性和方法
    }
    var w = new Web()
    w.run()
    w.work() // 报错，对象冒充不可以继承原型链上的属性和方法
    ```
  2. 原型链继承：实例化子类的时候无法给父类传参，并且一个实例改变属性，其它实例也会改变
    ```javascript
    // 5. 继承：对象原型链实现继承——实例化子类的时候无法给父类传参
    function Web(name){}
    Web.prototype = new Person() // 原型链实现继承，既可以继承构造函数的属性和方法，也可以继承原型链上的属性和方法
    var w = new Web('xx')
    w.run() // this.name is undefined // 实例化子类的时候无法给父类传参
    ```
  3. 对象冒充+原型链继承的组合继承
    ```javascript
    function Web(name) {
        Person.call(this, name) // 对象冒充继承，实例化子类可以给父类传参
    }
    Web.prototype = new Person()
    ```
  4. 组合继承的另一种方式
    ```javascript
    function Web(name) {
        Person.call(this, name) // 对象冒充继承，实例化子类可以给父类传参
    }
    Web.prototype = Person.Prototype
    ```

#### 属性的封装

- 属性值可以任意修改，数据变得非常不安全
- 类的实例属性
  - `public`：修饰的属性可以在任意位置访问（修改），默认值
  - `private`：私有属性，只能在当前类内部进行访问（修改）
  - `protected`：受保护的属性，只能在当前类和当前类的子类中访问（修改），不能在实例中访问（外部）
- 可重写`getter`、`setter`方法
  ```javascript
  get name() {
      return this._name
  }
  console.log(per.name) // 虽然没有name属性，但是调用name方法，
  // 简写
  constructor(public name: string, age: number){}
  // 等价于
  name: string
  age: number
  constructor(name: string; age:number){
      this.name = name
      this.age = age
  }
  ```

#### 属性和方法

- 实例属性/方法：直接定义在类中，需要通过对象的实例才能访问（`new`一个实例）（`public\private\protected`）
- 类属性（静态属性）/方法：无需创建对象，直接用类能访问到，在属性前`static`，静态方法只能调用静态属性、类
- 只读属性：`readonly`

#### 构造函数

- 构造函数在对象创建时调用，`new`就调用构造函数
- 在实例方法中，构造函数中的`this`对表示当前的实例
- 方法中的`this`表示当前调用方法的对象
- 比较两个类类型的对象时，只有实例的成员会被比较。 静态成员和构造函数不在比较的范围内。

#### 继承

- `class 子类 extends 父类`
- `OCP`原则(开闭原则)
- 方法的重写：子类方法可以覆盖父类方法
- `super`：表示当期类的父类，`constructor`需要调用`super`调用父类的构造函数，并且传递参数，不写`constructor`时自动调用
- 多态：父类定义一个方法不去实现，让继承它的子类去实现，每一个子类有不同的表现

#### 抽象类

- 提供其他类继承的基类，不能直接被实例化
- 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现
- 抽象方法只能放在抽象类中
- 子类必须对抽象方法进行重写
  ```javascript
  abstract class Animal{
      constructor(public name: string)
      abstract eat(): any
  }
  class Dog extends Animal{
      constructor(name:string) {
          super(name)
      }
      eat(){
          console.log('xx')
      }
  }
  ```
## 接口

- 可以对类、方法、属性(对象)进行约束，抽象类只能对类进行约束
- `interface`：用来定义一个类（对象）的结构，定义一个类中应该包含哪些属性和方法，接口也可以当成类型声明(`type`)去使用
- `interface`可以重复声明，并且以两个共同的为主；`type`不能重复声明；`interface`定义一个类的结构时，有点像抽象类，接口中所有属性都不能有实际的值
- `implements`：一个类实现一个接口：当一个类实现了一个接口时，只对其实例部分进行类型检查。 `constructor`存在于类的静态部分，所以不在检查的范围内。
  ```javascript
  interface FullName {
      firstName: string;
      secondName: string;
  }
  function getName(name: FullName){}
  getName({
      firstName: '1'
      secondeName: '2'
      age: 1
  }) // 报错
  const obj = {
      firstName: '1'
      secondeName: '2'
      age: 1
  }
  getName(obj) // 不报错
  // 对函数进行约束
  interface encrypt{
      (key: string, value: string): string;
  }
  const md5:encrypt = function(key:string, value: string): string{}

  // 类类型接口：对类的约束，和抽象类有点相似
  interface Animal{
    name: string;
    eat(str: string): void;
  }
  class Dog implements Animal{}
  ```
- 接口的继承
  ```javascript
  interface Animal{
    eat(): void
  }
  interface Person extends Animal{}
  class Programmer{}
  // 类继承类继承接口
  class Web extends Programmer implements Person{}
  // 接口继承多个接口
  interface Square extends Shape, PenStroke {
    sideLength: number;
  }
  // 接口继承类
  class Control {
  private state: any;
  }
  interface SelectableControl extends Control {
    select(): void;
  }
  ```

## 泛型

- 在定义函数或是类时，如果遇到类型不明确就可以使用泛型
- `Exclude<T, U>` -- 从T中剔除可以赋值给U的类型。
- `Extract<T, U>` -- 提取T中可以赋值给U的类型。
- `NonNullable<T>` -- 从T中剔除`null`和`undefined`。
- `ReturnType<T>` -- 获取函数返回值类型。
- `InstanceType<T>` -- 获取构造函数类型的实例类型。
  ```javascript
  function fn<T>(a: T): T{
      return a
  }
  let result = fn(10) // 不指定泛型，TS可以自动对类型进行推断
  let result2 = fn<string>('hello')
  // 泛型可以同时指定多个
  function fn2<T, K>(a: T, b: K): T{
      console.log(b)
      return a
  }
  fn2<number, string>(123, 'hello')
  interface Inter{
      length: number
  }
  // 泛型T必须是Inter的实现类(子类)
  function fn3<T extends Inter>(a: T): number{
      return a.length
  }
  fn3('123') // 3
  class MyClass<T>{
      name: T
      constructor(name: T){
          this.name = name
      }
  }
  const mc = new MyClass<string>('xxx')

  // 泛型接口
  interface ConfigFn{
    // 第一种写法
    <T>(value:T): T
  }
  const getData: ConfigFn = function<T>(value: T): T{
    return value
  }
  // 第二种写法
  interface ConfigFn<T>{
    (value:T): T
  }
  const myGetData: ConfigFn<string> = function<T>(value: T): T{
    return value
  }
  getData<string>('张三')
  ```
  ```javascript
  // 将类作为参数
  class User{
    username: string | undefined;
    password: string | undefined;
  }
  class MysqlDb{
    add(user: User): boolean{
      return true
    }
  }
  var u = new User()
  u.username = '张三'
  u.password = '12345'
  var db = new MysqlDb()
  db.add(u)

  // 操作数据库的泛型类
  class MysqlDb<T> {
    add(info: T): boolean{
      return true
    }
  }
  var userDb = new MySqlDb<User>()
  ```
	```javascript
  interface DBI{
    add(info: T): boolean
    update(info: T, id: number): boolean
    delete(id: number): boolean
    get(id: number):any[]
  }
  // 定义一个操作mysql数据库的类 注意：要实现泛型接口，这个类也应该是一个泛型类
  class MysqlDb<T> implements DBI<T>{
    add(info: T): boolean{
    }
    update(info: T, id: number): boolean {
    }
    delete(id: number): boolean {
    }
    get(id: number):any[] {
    }
  }
  // 操作用户表 定义一个User类和数据表做映射
  class User{
    username: string | undefined
    password: string | undefined
  }
  const u = new User()
  u.username = '张三'
  u.password = '123456'
  const oMysql = new MysqlDb<User>()
  iMysql.add(u)
	```

## 模块

- `ts`外部模块的简称，侧重代码的服用，一个模块里可能会有多个命名空间

## 命名空间

- 内部模块，主要用于组织代码，避免命名冲突
  ```javascript
  namespace A{}
  ```

## 装饰器

- 装饰器是一种特殊类型的声明，它能够被附加到类声明、方法、属性或参数上，可以修改类的行为
- 装饰器的写法：普通装饰器（无法传参）、装饰器工厂（可传参）
- 装饰器报错：`tsc index.ts --experimentalDecorators`或`tsc index.ts --target ES5 --experimentalDecorators`
 
1. 类装饰器
    - `target`：类
    ```javascript
    // 类装饰器
    function logClass(params: any){
      console.log(params) // params就是当前类
      params.prototype.apiUrl = '动态扩展的属性'
      params.prototype.run = function() {
        console.log('这是一个run方法')
      }
    }

    @logClass // 无需传参，默认就传了
    class HttpClient{
      constructor(){}
      getData(){}
    }
    const http: any = new HttpClient()
    console.log(http.apiUrl)
    http.run()

    // 装饰器工厂
    function logClass(params: string) {
      return function(target: any) {
        console.log(target) // 类
        console.log(params) // hello
        target.prototype.apiUrl = params
      }
    }
    @logClass('hello')
    class HttpClient{
      constructor(){}
      getData(){}
    }

    // 类装饰器重载构造函数
    function logClass(target: any){
      console.log(target)
      return class extends target{
        apiUrl: any = '修改后的数据';
        getData() {} // 该方法也需要重载
      }
    }
    @logClass
    class HttpClient{
      public apiUrl: string | undefined
      constructor() {
        this.apiUrl = '构造函数里里面的apiUrl'
      }
      getData(){
        console.log(this.apiUrl)
      }
    }
    const http = new HttpClient()
    ```
2. 属性装饰器
    - `params`：属性装饰器传递的参数
    - `target`：对于静态属性来说是类的构造函数，对于实例属性是类的原型对象
    - `attr`：属性名
    ```javascript
    function logProperty(params: string) {
      return function (target: any, attr: string) {
        console.log('params:', params) // aaa：传递的参数
        console.log('target:', target) // {}：类的原型对象
        console.log('attr:', attr) // url：属性名称
        target[attr] = params
      }
    }
    class HttpClient{
      @logProperty('aaa')
      public url: any | undefined

      getData(){
        console.log(this.url)
      }
    }
    const http = new HttpClient()
    http.getData()
    ```
3. 方法装饰器
    - `target`：对于静态方法来说是类的构造函数，对于实例方法是类的原型对象
    - `methodName`：方法名称
    - `desc`：描述
    - 在`return`中的`this`指向使用装饰器的方法的`this`
    ```javascript
    function logMethod(params: string) {
    return function(target:any, methodName: string, desc: any){
      console.log(params) // aaa
      console.log(target) // 类
      console.log(methodName) // getData
      console.log(desc) // 方法的描述
      // 修改方法
      // 保存当前的方法
      const oMethod = desc.value
      desc.value = function(...args: any[]) {
        // 这里this指向使用装饰器的方法的this
        // 修改方法
        // 执行旧方法
        oMethod.apply(this, args)
      }
    }
    }
    class HttpClient{
    public apiUrl: string | undefined
    constructor() {
      this.apiUrl = '构造函数里里面的apiUrl'
    }
    @logMethod('aaa')
    getData(){
      console.log(this.apiUrl)
    }
    }
    ```
    ```javascript
    function logMethod(params: string) {
    return function(target:any, methodName: string, desc: any){
      console.log(params) // aaa
      console.log(target) // 类
      console.log(methodName) // getData
      console.log(desc) // 方法的描述
      // 修改方法
      // 保存当前的方法
      const oMethod = desc.value
      desc.value = function(...args: any[]) {
        // 这里this指向使用装饰器的方法的this
        // 修改方法
        // 执行旧方法
        oMethod.apply(this, args)
      }
    }
    }
    class HttpClient{
    public apiUrl: string | undefined
    constructor() {
      this.apiUrl = '构造函数里里面的apiUrl'
    }
    @logMethod('aaa')
    getData(){
      console.log(this.apiUrl)
    }
    }
    ```
4. 方法参数装饰器
    - `target`：对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
    - `methodName`：方法名称
    - `paramsIndex`：参数在函数参数列表中的索引
    ```javascript
    function logParams(params: any){
      return function(target: any, methodName: string, paramsIndex: any) {
        console.log(target) // 类
        console.log(methodName) // getData
        console.log(paramsIndex) // 0
      }
    }
    class HttpClient{
      public url: any | undefined
      getData(@logParams('uuid') uuid: string ){
        console.log('getData里面的方法')
      }
    }
    ```
5. 装饰器执行顺序
    -  属性装饰器 > 方法参数装饰器 > 方法装饰器 > 类装饰器，如果有多个同样的装饰器，先执行后面的（`return`前的按先后顺序执行，`return`中的先执行后面的）
    ```javascript
    function logClass(params) {
      return (target) => {
        console.log(params)
      }
    }
    function logProperty(params) {
      return (target, attr) => {
        console.log(params)
      }
    }
    function logMethod(params) {
      return (target, methodName, desc) => {
        console.log(params)
      }
    }
    function logParams(params) {
      return (target, methodName, paramsIndex) => {
        console.log(params)
      }
    }

    @logClass('类装饰器1')
    @logClass('类装饰器2')
    class HttpClient {
      @logProperty('属性装饰器1')
      @logProperty('属性装饰器2')
      public url: string | undefined = 'aaa'

      @logProperty('属性装饰器3')
      public url1: string | undefined = 'aaa'

      @logMethod('方法装饰器1')
      @logMethod('方法装饰器2')
      getData(
        @logParams('参数装饰器1') uuid: string,
        @logParams('参数装饰器2') uuid1: string
      ) {
        console.log(uuid)
      }

      @logMethod('方法装饰器3')
      getData1(@logParams('参数装饰器3') uuid: string) {
        console.log(uuid)
      }
    }

    @logClass('类装饰器3')
    class HttpClient1 {}

    // 属性装饰器2
    // 属性装饰器1
    // 属性装饰器3
    // 参数装饰器2
    // 参数装饰器1
    // 方法装饰器2
    // 方法装饰器1
    // 参数装饰器3
    // 方法装饰器3
    // 类装饰器2
    // 类装饰器1
    // 类装饰器3

    // 属性装饰器 { getData: [Function (anonymous)] }
    // 方法参数装饰器 { getData: [Function (anonymous)] }
    // 方法装饰器 { getData: [Function (anonymous)] }
    // 类装饰器 [Function: HttpClient]
    ```

### Mixins

```javascript
class SmartObject implements Disposable, Activatable {}
applyMixins(SmartObject, [Disposable, Activatable]);
let smartObj = new SmartObject();
function applyMixins(derivedCtor: any, baseCtors: any[]) {
 baseCtors.forEach(baseCtor => {
   Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
       derivedCtor.prototype[name] = baseCtor.prototype[name];
   })
 });
}
```

- 没使用`extends`而是使用`implements`。 把类当成了接口，仅使用`Disposable`和`Activatable`的类型而非其实现。

### 声明文件

- 通过`declare`声明的类型或者变量或者模块，在`include`包含的文件范围内，都可以直接引用而不用去`import`或者`import type`相应的变量或者类型。