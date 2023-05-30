import { Button, Input } from "antd"
import { PureComponent, ChangeEvent, Component, ReactNode } from "react"

/**
 * 合并的方式
 * this.setState() 三种用法
 * 1. 第一个参数是一个对象
 * this.setState(obj)
 * 2. 第一个参数是一个函数 可以拿到props
 * this.setState(function(preState, props))
 * 3. 第二个参数是是一个函数 可以获取到最新的state
 */

export class Index extends PureComponent {
  state = {
    name: '',
    age: 18
  }

  handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // state 合并
    this.setState({
      name: value,
      age: this.state.age + 1
    })
  }

  handleBtn = () => {
    // 第一个参数是一个函数，可以获取到props
    this.setState((preState, props) => {
      
      return {
        age: 23
      }
    })

    this.setState({ name: 'tom' }, () => {
      this.state.name // 获取获取最新的name
    })
  }

  render() {
    return (
      <>
        <div>{this.state.age}</div>
        <Input onChange={this.handleInput} />
        <Button onClick={this.handleBtn}>test</Button>
      </>
    )
  }
}

export class Index_1 extends Component {
  state = {
    index: 0
  }

  componentWillMount(): void {
    /**
     * 此时将作为新的值，赋予给 state，作为下一次渲染使用
     */
    this.setState({index: this.state.index + 1}, () => {
      console.log('componentWillMount 11 --', this.state.index) // 1
    })
    this.setState({index: this.state.index + 1}, () => {
      console.log('componentWillMount 22 --', this.state.index) // 1
    })
  }

  render(): ReactNode {
    return (
      <div></div>
    )
  }
}