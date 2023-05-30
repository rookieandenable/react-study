import { Button } from "antd"
import { useEffect, useState } from "react"
import ReactDOM from "react-dom"

export default function Index() {
  const [num, setNum] = useState(0) // 初始化只会执行一次

  const handleBtn = () => {
    ReactDOM.flushSync(() => {
      setNum(1)
      console.log('111 --', num)
    })

    setNum(2)
    console.log('222 --', num)

    setTimeout(() => {
      setNum(3)
      console.log('333 --', num)
    }, 2000)
  } // 打印结果 0 0 0

  return (
    <div>
      <Button onClick={handleBtn}>state</Button>
    </div>
  )
}

/**
 * state 更新会进行浅比较 看两次的state的是否相同
 * 如何在本次获取 state 最新值
 */
export function Index1() {
  const [obj, setObj] = useState({name: '', addr: ''})
  const [age, setAge] = useState(() => String(Date.now()).slice(0, 2))
  useEffect(() => {
    console.log('obj -- 的值name有更新', obj.name)
  }, [obj.name]) // 监听 state 变化

  const handleObj = () => {
    const copyObj = { ...obj } // 重新分配内存空间
    copyObj.name = 'tom'
    copyObj.addr = '中华小当家'
    setObj(copyObj)

    console.log('obj --', obj)

    setObj((state) => {
      console.log('可以获取到最新的值 --', state)
      return { ...state }
    })
  }

  return (
    <div>
      <Button onClick={handleObj}>state_2</Button>
    </div>
  )
}

export function Index_2() {
  /**
   * 本次更新的state 需要下次函数组件执行 才能拿到
   */
  const [ number , setNumber ] = useState(0)
  const handleClick = () => {
    setNumber(2) // => number = 2
    setNumber(number + 1) // => number = 0 + 1 = 1
    setNumber(number + 1) // => number = 0 + 1 = 1
  }

  /**
   * 闭包旧值
   */
  const [count, setCount] = useState(0);
  const test = () => {
    setTimeout(() => {
      setCount(count + 1)
    }, 3000)
    console.log(count)
    // 输出：0->0->0->...->1
    // 原因：闭包旧值，每次 setCount 的 count为 0+1
  }

  const [ number1 , setNumber1 ] = useState(0)
  const handleClick1 = () => {
    setNumber1((state) => state + 1) // => number1 = 0 + 1 = 1
    setNumber1((state) => state + 1) // => number1 = 1 + 1 = 2
    setNumber1(8)  // state - > 8
    setNumber1((state)=> state + 1)  // number1 - > 8 + 1 = 9
  }

  const [count1, setCount1] = useState(0)
  const test1 = () => {
    setTimeout(() => {
      setCount1(count1 => count1 + 1)
    }, 3000)
    console.log(count1)
  }
  // 输出：0->1->2->...->8
  // 结论：新值传入，所以点击 8 次后为 => 0 + 1 + 1... + 1 = 8
}