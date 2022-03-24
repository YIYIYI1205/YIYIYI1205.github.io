# es6

## let与const

### let

1. 变量不能重复声明
2. 块级作用域（`es5`有全局、函数、`eval`作用域）(循环`i`)
3. 不存在变量提升（暂时性死区）
4. 不影响作用域链

### const

1. 必须赋初始值
2. 常量值不能修改，变量指向的那个内存地址所保存的数据不得改动。对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针。
3. 块级作用域

## 解构赋值

- 数组的解构
  - 只要某种数据结构具有`Iterator`接口，都可以采用数组形式的解构赋值。

  ```javascript
  const arr = [1, 2, 3, 4]
  const [a, b, c, d] = arr
  const [a, ...b] = arr
  // b = [2, 3, 4]
  ```

- 对象的解构

  ```javascript
  const obj = {
      a: 'xxx',
      b: '222'
  }
  const {a: c, b} = obj
  // c = 'xxx' 重命名
  ```

## 模板字符串

- 

## 转码

### 安装babel

```linux
$ npm install --save-dev @babel/core
```

### 配置文件.babelrc

```linux
# 最新转码规则
$ npm install --save-dev @babel/preset-env

# react 转码规则
$ npm install --save-dev @babel/preset-react
```

```json
{
  "presets": [
    "@babel/env",
    "@babel/preset-react"
  ],
  "plugins": []
}
```

- `Babel`默认只转换新的`JavaScript`句法（`syntax`），而不转换新的`API`，比如`Iterator`、`Generator`、`Set`、`Map`、`Proxy`、`Reflect`、`Symbol`、`Promise`等全局对象，以及一些定义在全局对象上的方法（比如`Object.assign`）都不会转码。