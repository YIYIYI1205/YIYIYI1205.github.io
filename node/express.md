# express

## 初始化

### 手动搭建

- `npm init`
- `npm install express --save`
```javascript
    const express = require('express')
    const app = express()
    const port = 3000

    app.get('/', (req, res) => {
    res.send('Hello World!')
    })

    app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    })
```
- `node index`

### 自动搭建

- `express-generator`：快速创建一个应用的骨架
- `npx express-generator`
- `npm install`
- `DEBUG=myapp:* npm start`