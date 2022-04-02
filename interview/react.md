# react

- 而React遵循从上到下的单向数据流。
- 虚拟dom

## 生命周期

1. 挂载卸载过程
constructor
componentWillMount
render
componentDidMount
2. 更新过程
2.1. componentWillReceiveProps (nextProps)  nextProps和this.props
2.2.shouldComponentUpdate(nextProps,nextState)
2.3.componentWillUpdate (nextProps,nextState)：在组件接收到新的props或者state但还没有render时被调用。
2.5.render()
2.4.componentDidUpdate(prevProps,prevState)：在组件完成更新后立即调用。

销毁：componentWillUnmount

3. React新增的生命周期(个人补充)
3.1. getDerivedStateFromProps(nextProps, prevState)
3.2. getSnapshotBeforeUpdate(prevProps, prevState)

## PureComponent

- PureComponent 通过 prop 和 state 的浅比较来实现 shouldComponentUpdate，当 prop 或 state 的值或者引用地址发生改变时，组件就会发生更新。
- 而 Component 只要 state 发生改变， 不论值是否与之前的相等，都会触发更新。
- 浅比较：当前状态（current）和 下一个状态（next）下的 prop 和 state时，比较基本数据类型是否相同（如： 'a' === 'a'）, 而引用数据类型则是比较其引用地址是否相同，与值内容无关。

1. PureComponent 不仅会影响本身，而且会影响子组件。
2. 如果 prop 和 state 每次都会变，那么使用 Component 的效率会更好，因为浅比较也是需要时间的。
3. 若有shouldComponentUpdate，则执行shouldComponentUpdate，若没有shouldComponentUpdate方法会判断是不是PureComponent，若是，进行浅比较

## 函数组件

- 基于类的组件是 ES6 类，它扩展了 React 的 Component 类，并且至少实现了render()方法。
- useEffect的回调函数会在页面渲染后执行；useLayoutEffect会在页面渲染前执行
- useMemo && useCallback优化
- useContext

函数组件是无状态的

## React 中 keys 的作用是什么？

- Keys 是 React 用于追踪哪些列表中元素被修改、被添加或者被移除的辅助标识。

## 状态（state）和属性（props）有何不同？

- props 是从父组件传递到组件的数据。它们不应该被改变，而应该只显示或用于计算其他值。状态是组件的内部数据，可以在组件的生存期内修改，并在重新呈现之间进行维护。

## 为什么调用 setState 而不是直接改变 state？

- 如果您尝试直接改变组件的状态，React 将无法得知它需要重新渲染组件。通过使用setState()方法，React 可以更新组件的UI。
- State 的更新可能是异步的,因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。
- 要解决这个问题，可以让 setState() 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数

## propTypes和typescript的区别

- PropTypes是组件接收prop的约束。
- typescript只会是在编译器中提示，propTypes会在浏览器中提示

## 受控组件、非受控组件

- 受控组件，用事件更改状态
- 非受控组件，用ref获取元素，不是事件处理程序

## 事件处理机制：全部冒泡到document上注册事件

## 请求数据

- componentDidMount方法中的代码，是在组件已经完全挂载到网页上才会调用被执行，所以可以保证数据的加载。此外，在这方法中调用setState方法，会触发重新渲染。所以，官方设计这个方法就是用来加载外部数据用的，或处理其他的副作用代码。与组件上的数据无关的加载，也可以在constructor里做，但constructor是做组件state初绐化工作，并不是做加载数据这工作的，constructor里也不能setState，还有加载的时间太长或者出错，页面就无法加载出来。所以有副作用的代码都会集中在componentDidMount方法里。

## context

- const MyContext = react.createContext("init");
- <MyContext.Provider value={"context value"} / >
- /注入context 在class组件中，必须要为static属性contextType，设置通过react.createContext()创建的context对象，才能使用this.context,不然this.context的值会为一个{}
- static contextType = MyContext;
- console.log(this.context); //context value