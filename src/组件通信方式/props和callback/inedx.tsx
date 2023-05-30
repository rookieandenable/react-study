import { ChangeEventHandler, useState } from 'react'
import { Button, Input } from 'antd'

interface PropsType {
  setFather: (param: string) => void
  fatherMsg: string
}

export const Son = (props: PropsType) => {
  const { fatherMsg, setFather } = props

  return (
    <>
      <div>父组件传递的信息: {fatherMsg}</div>
      <Button type='primary' onClick={() => setFather(String(new Date()))}>修改父组件数据</Button>
    </>
  )
}

export const Father = () => {
  const [father, setFather] = useState('')
  const [son, setSon] = useState('')
  
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFather(e.target.value)
  }

  return (
    <>
      <div>子组件传递的信息：{son}</div>
      <Input value={father} onChange={handleChange} />
      <Son fatherMsg={father} setFather={setSon} />
    </>
  )
}