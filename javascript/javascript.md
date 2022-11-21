# javascript

## Object

### Object.seal()

    - `Object.seal(obj)`方法封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要原来是可写的就可以改变。
    - 使用`Object.freeze()`冻结的对象中的现有属性值是不可变的。用`Object.seal()`密封的对象可以改变其现有属性值。


- `localStorage`同域名、端口、协议，两个不同的页面之间数据可共享