import { Button } from 'antd'
import { PureComponent, useRef, useState, ElementRef } from 'react'
import dayjs from 'dayjs'

interface PropsType {
  setFather: (param: string) => void
}

class Son extends PureComponent<PropsType> {
  state = {
    sonMsg: '',
    fatherMsg: ''
  }

  sonFun = (msg: string) => this.setState({ sonMsg: msg })

  render() {
    return (
      <>
        <div>子组件数据：{this.state.sonMsg}</div>
        <Button type='primary' onClick={() => this.props.setFather(dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'))}>子组件修改父组件的数据</Button>
      </>
    )
  }
}

export function Father() {
  const sonRef = useRef<ElementRef<typeof Son>>(null)
  const [msg, setMsg] = useState('')

  const handleFather = (msg: string) => setMsg(msg)

  return (
    <>
      <div>父组件数据: {msg}</div>
      <Button type='primary' onClick={() => sonRef.current?.sonFun(dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'))}>父组件修改子组件数据</Button>
      <Son ref={sonRef} setFather={handleFather} />
    </>
  )
}