# Vue

- 一套用于构建用户界面的渐进式(大小应用都可以用)`JavaScript`框架
- 特点
  - 组件化
  - 声明式编码
  - 虚拟`DOM` `+`  `Diff`算法

## 安装

### 直接用<script>引入

- 开发版本：包含完整的警告和调试模式
- 直接在浏览器中可以拿到`$vm`对象，更改值，动态更新数据显示在页面上
  
  ```html
  <div id="app">
      {{message}}
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
      const app = new Vue({
          el: '#app',
          data:{
              message: 'abx'
          }
      })
  </script>
  ```

## API

### 全局配置

- `vue.config`文件
  - `productionTip: false`阻止`vue`在启动时生成生产提示
