import { Button } from "antd"
import React, { FC, useState, ReactNode, useEffect, ReactElement } from "react"

/**
 * props 作为一个子组件渲染数据源。
   props 作为一个通知父组件的回调函数。
   props 作为一个单纯的组件传递。
   props 作为渲染函数。
   render props ， 和-区别是放在了 children 属性上。
   render component 插槽组件
 */

interface PropsComponentType {
  mes: string
  renderName: () => ReactNode
  say: () => void
  Component: () => ReactElement
  children?: ReactNode[]
}

function ChildrenComponent() {
  return <div>hello world</div>
}

const PropsComponent:FC<PropsComponentType> = (props) => {
  const { mes, say, Component, children, renderName } = props
  useEffect(() => {
    console.log('模拟 componentDidMount --', children)
  }, [])

  useEffect(() => {
    console.log('监听 props.mes 发生了变化')
  }, [props.mes])

  const Children_1 = children && children[0]
  const Children_2 = children && children[1]

  return (
    <div>
      {Children_1}
      {Children_2}
      { mes }  
      { renderName() }
      <Component />
      <Button type="primary" onClick={say}>test say</Button>
    </div>
  )
}

export const Index = () => {
  const [mes, setMes] = useState('')
  
  const say = () => {
    const mes = 'hello world'
    setMes(mes)
  }
  const Child_1 = () => {
    return <div>ni hao</div>
  }

  return (
    <>
      <PropsComponent
        mes={mes} // 1. props 作为一个渲染数据源
        say={say} // 2. props 作为一个回调函数 callback
        Component={ChildrenComponent} // 3. props 作为一个组件
        renderName={() => <div>hello</div>} // 4. props 作为渲染函数
      >
        <Child_1 />
        <ChildrenComponent /> { /* 6. render component  插槽 */ }
      </PropsComponent>
    </>
  )
}

/**
 * 针对 element 节点，通过 cloneElement 混入 props
 */

const ChildClone_1: FC<{ name?: string }> = (props) => {

  return (
    <div>
      <span>组件名字: {props.name}</span>
    </div>
  )
}

const ChildClone_2: FC<{ age?: number }> = (props) => {

  return (
    <div>
      <span>组件年龄: {props.age}</span>
    </div>
  )
}

const Container: FC<{ children: ReactNode[] }> = (props) => {
  const temp = {
    name: 'tom',
    age: 27
  }

  const childrenElement = props.children.map((child, index) => {
    if(React.isValidElement(child)) {
      return React.cloneElement(child, { ...temp, key: index }, child.props.children)
    } else if(typeof child === 'function') {
      //
    } else {
      return null
    }
  })

  return (
    <>
      { childrenElement }
    </>
  )
}

export const Index_1 = () => {

  return <Container>
    <ChildClone_1 />
    <ChildClone_2 />
  </Container>
}

/**
 * 操作 props 小技巧
 * 1. 混入 props
 * 2. 抽离 props
 * 3. 显示注入 props
 * 4. 隐式注入 props
 */
const Test_2: FC<{name?: string; age?: number}> = () => <div></div>

// 1. 混入 props
const Test_1 = () => {
  const obj = {
    name: 'tom',
    age: 18
  }

  return <Test_2 {...obj} />
}

// 2. 抽离 props
const Test_3 = () => {
  const temp = {
    name: 'tom',
    age: 18,
    addr: '12'
  }
  const { addr, ...obj } = temp

  return <Test_2 {...obj} />
}

// 3. 显示注入 props
const Test_4 = () => {

  return <Test_2 name="tom" age={21} />
}

// 4. 隐式注入 props
const Son: FC<{name?: string}> = (props) => <div>{props?.name}</div>

const Father: FC<{ children: ReactNode }> = (props) => {
  const obj = {name: 'jack'}
  let element = null
  if(React.isValidElement(props.children)) {
    element = props.children && React.cloneElement(props.children, { ...obj })
  }

  return (
    <>
      { element }
    </>
  )
}

export const Index_5 = () => {
  return (
    <Father>
      <Son />
    </Father>
  )
}