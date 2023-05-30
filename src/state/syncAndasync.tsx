import { Component, useEffect, useState } from "react"

/**
 * setState 是同步还是异步的 在 legacy模式下(react17及之前版本)
 * 1. 在非异步操作下，它是批量的、异步的
 * 2. 在异步操作下，它是非批量的、同步的
 * 
 * setState 和 useState 表现是一致的
 * 
 * 在 concurrent模式下(react18及之后的版本)
 * setState 批量的、异步的
 */
export class IndexClass_async extends Component {
  state = {
    number: 1
  }

  componentDidMount() {
    this.setState({number: 2})
    console.log('number', this.state.number)
    this.setState({number: 3})
    this.setState({number: 4})
    this.setState({number: 5})
    console.log('number', this.state.number)
  }

  render() {
    console.log('render ', this.state.number)
    return (
      <div></div>
    )
  }
} // 打印结果 render 1 -> number 1 -> number 1 -> render 5

export class IndexClass_sync extends Component {
  state = {
    number: 1
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({number: 2})
      console.log('number', this.state.number)
      this.setState({number: 3})
      this.setState({number: 4})
      this.setState({number: 5})
      console.log('number', this.state.number)
    })
  }

  render() {
    console.log('render ', this.state.number)
    return (
      <div></div>
    )
  } // legacy模式下 打印结果 render 1 -> render 2 -> number 2 -> render 3 -> render 4 -> render 5 -> number 5
}

export function IndexFun_async() {
  const [number, setNumber] = useState(0)

  useEffect(() => {
    setNumber(1)
    setNumber(2)
    setNumber(3)
  }, [])

  console.log('render ', number)
  return (
    <div></div>
  ) // 打印结果 render 0 -> render 3
}

export function IndexFun_sync() {
  const [number, setNumber] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setNumber(1)
      setNumber(2)
      setNumber(3)
    });
  }, [])

  console.log('render ', number)
  return (
    <div></div>
  ) // legacy模式下 render 0 -> render 1 -> render 2 -> render 3
}