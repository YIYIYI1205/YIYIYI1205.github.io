# ESLint
[官网](https://eslint.bootcss.com/docs/user-guide/getting-started)
- `JavaScript`和`JSX`代码检查工具
- `ESLint`使用`AST`去分析代码中的模式
```javascript
{
    "max-len":["error", {"code: 80"}],
}
```
.eslintrc.js
```javascript
    module.exports = {
        root: true,
        env: {
            node: true,
        },
        rulers: {
            "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
            "no-debbgur": process.env.NODE_ENV === "production" ? "warn" : "off"
        }
    }
```
  