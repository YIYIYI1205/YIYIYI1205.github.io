# Vue

## 直接引入脚本

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