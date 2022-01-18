

 有状态组件？无状态组件？

## useState(状态)

- 声明和初始化状态：使用数组解构：`` const [ 状态，改变状态的函数 ] = useState(初始值) ``
- 更新状态：改变状态的函数(将要改变成为的值)
- 状态通过`` useState ``的顺序进行记录，不像`` class ``中的`` this.setState ``，更新`` state ``变量总是替换它而不是合并它。
- `` useState ``不能存在于条件语句中，报错提示：必须以完全相同的顺序调用`` React Hooks ``。

## useEffect(生命周期)

- 副作用：和函数业务主逻辑关系不大，在特定的时间执行或者事件中执行，例如请求数据、监听、手动修改`` dom ``等都会在生命周期中执行。
- 使用：`` useEffect(() => {}) ``
- 异步方法，并会阻碍视图更新
- `` useEffect ``中的`` return ``方法，会在销毁时执行，包括组件的销毁以及状态的销毁。会先执行`` return ``中的方法，再执行`` useEffect ``中内容。
- `` componentDidMount ``：第一次组件渲染完成之后会执行。
- `` componentDidUpdate ``：组件更新时会执行，`` useEffect ``传入第二个参数`` [状态] ``，会在该状态变化时才执行`` useEffect ``方法。
- `` componentWillUnmount ``：第二个参数传入`` [] ``，会在组件销毁时执行`` return ``回调函数中的方法。
  - 可以用路由举例，切换路由时，前一个路由销毁
  
    ```javascript
    const [flag, setFlag] = useState(true)
    const [value, setValue] = useState(0)
    useEffect(() => {
        console.log('任何改变都会执行')
        return () => {
            console.log('任何销毁都会执行');
        }
    })
    useEffect(() => {
        console.log('flag变化才执行这一行')
        return () => {
        console.log('flag销毁才执行这一行')
        }
    }, [flag])
    useEffect(() => {
        console.log('组件变化才执行这一行')
        return () => {
        console.log('组件销毁才执行这一行')
        }
    }, [])
    // 第一次进入页面结果：任何改变都会执行；flag变化才执行这一行；组件变化才执行这一行
    // 改变与flag不相关状态：任何销毁都会执行；任何改变都会执行
    // 改变flag：任何销毁都会执行；flag销毁才执行这一行；任何改变都会执行；flag变化才执行这一行
    // 销毁组件：任何销毁都会执行；flag销毁才执行这一行；组件销毁才执行这一行
    ```

- 与`` componentDidMount ``或`` componentDidUpdate ``不同，使用`` useEffect ``调度的`` effect ``不会阻塞浏览器更新屏幕，这让你的应用看起来响应更快。大多数情况下，`` effect ``不需要同步地执行。在个别情况下（例如测量布局），有单独的`` useLayoutEffect Hook ``供你使用，其`` API ``与`` useEffect `` 相同。

## useContext(传参)

- 创建：`` const CountContext = createContext() ``
- 父组件传值：`` <CountContext.Provider value={count}>放子组件</CountContext.Provider>``
- 子组件接收：`` const count = useContext(CountContext) ``(`` import ``可以循环嵌套，在父组件中导出`` context ``，在子组件中``  useContext ``即可)
- 不需要逐级传递，可实现多级传递。

## useReducer

- 使用：`` useReducer ``传入一个`` reducer ``函数以及`` state ``的初始值

```javascript
import { useReducer } from 'react'
function ReducerDemo(){
    const [count, dispatch] = useReducer((state, action) => {
        switch(action) {
            case 'add':
                return state + 1
            case 'sub':
                return state - 1
            default:
                return state
        }
    }, 0)
    return (
        <div>
            <h2>{count}</h2>
            <button onClick={() => {dispatch('add')}}>add</button>
            <button onClick={() => {dispatch('sub')}}>sub</button>
        </div>
    )
}
```

```javascript 
// color.js
import

```