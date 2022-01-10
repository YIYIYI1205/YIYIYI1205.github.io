# 配置首选项
```
"editor.fontFamily": "Fira Code, Consolas", // 调整字体，Fira Code
"editor.detectIndentation": false, //vscode默认启用了根据文件类型自动设置tabsize的选项
"editor.tabSize": 4, // 重新设定tabsize
"editor.formatOnSave": true, // 每次保存的时候自动格式化
"editor.codeActionsOnSave": { // 每次保存的时候代码自动化检测
    "source.fixAll.eslint": true
}
// 添加支持
"eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue-html",
    "html",
    "vue"
]
"prettier.semi": false, // 去掉代码结尾的分号
"prettier.singleQuote": true, // 使用单引号替代双引号
"prettier.trailingComma": "none", // 去掉代码结尾的逗号
"javascript.format.insertSpaceBeforeFunctionParenthesis": true, // 让函数名和后面的括号之间加个空格
"vetur.format.defaultFormatter.html": "js-beatify-html",
"vetur.format.defaultFormatter.js": "vscode-typescript", // 让vue中的js按编译器自带的ts格式进行格式化
```