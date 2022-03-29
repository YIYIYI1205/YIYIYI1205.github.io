// 输入: [1, 2, 3, 4, 5, 6, 7] 和 k = 3
// 输出: [5, 6, 7, 1, 2, 3, 4]

function method(arr, k) {
  const head = arr.slice(arr.length - k)
  const fail = arr.slice(0, arr.length - k)
  console.log(head.concat(fail))
}
// method([1, 2, 3, 4, 5, 6, 7], 3)

// 打印出 1 - 10000 之间的所有对称数

function method1() {
  // 2位，1-9 9个数字
  const result = []
  for (let i = 1; i <= 9; i++) {
    const temp = '' + i + i
    result.push(Number(temp))
  }
  for(let i =1; i<=9;i++) {
      for(let j = 0; j<=9; j++) {
        const temp = '' + i + j+ i
        result.push(Number(temp))
      }
  }
  for(let i = 1; i<=9;i++) {
      for(let j = 0; j<=9; j++) {
        const temp = '' + i + j + j+ i
        result.push(Number(temp))
      }
  }
  console.log(result)
}
method1()
