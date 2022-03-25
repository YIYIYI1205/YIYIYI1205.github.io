# 面试

## 框架

### React/Vue

#### 1. 写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么？

- 考点：`diff`算法、虚拟`DOM`
- React diff 会帮助我们计算出 Virtual DOM 中真正变化的部分，并只针对该部分进行实际 DOM 操作，而非重新渲染整个页面，从而保证了每次操作更新后页面的高效渲染

## javascirpt

### Array、String 基础

#### 2. ['1', '2', '3'].map(parseInt)

- 考点：Array.map((value, index, array) => {}), parseInt(string, radix)
  ```javascript
  Array.map(fn(value, item, array)) --> ['1', '2', '3'].map()
  function parseInt(value, radix){
      return Number(value)
  }
  parseInt('1', 0) // 如果输入的 string 以非0,0x值开头， radix 是 10 (十进制)。
  parseInt('2', 1)
  parseInt('3', 2) // 将3看做2进制
  ```

### 作用域、优化

#### 3. 什么是防抖和节流？有什么区别？如何实现？

- 考点：闭包，变量提升
  - 防抖：输入框
  - 节流：快速往下滑页面

### ES6

#### 4. 介绍下Set、Map、WeakSet 和WeakMap 的区别？

- 考点：Set、Map、WeakSet 和WeakMap
  - Set：对象允许你存储任何类型的唯一值
  - WeakSet：成员都是对象；成员都是弱引用，可以被垃圾回收机制回收，可以用来保存DOM 节点，不容易造成内存泄漏；不可枚举
  - Map——本质上是键值对的集合，类似集合；可以遍历，方法很多，可以跟各种数据格式转换。
  - WeakMap——只接受对象做为键名（null 除外），不接受其他类型的值作为键名；键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的；不能遍历，方法有get、set、has、delete。

## 算法

### 5. 介绍下深度优先遍历和广度优先遍历，如何实现？

- 深度优先遍历——是指从某个顶点出发，首先访问这个顶点，然后找出刚访问这个结点的第一个未被访问的邻结点，然后再以此邻结点为顶点，继续找它的下一个顶点进行访问。重复此步骤，直至所有结点都被访问完为止。
  ```javascript
  
  function deepTraversal(node) {
    let nodes = [];
    if (node != null) {
        nodes.push(node);
        let childrens = node.children;
        for (let i = 0; i < childrens.length; i++) {
            deepTraversal(childrens[i])
        };
    }
    return nodes;
    }
  ```
- 广度优先遍历——是指从某个顶点出发，首先访问这个顶点，然后找出刚访问这个结点所有未被访问的邻结点，访问完后再访问这些结点中第一个邻结点的所有结点，重复此方法，直到所有结点都被访问完为止。
```javascript

```
