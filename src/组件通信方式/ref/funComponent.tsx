import { Button } from "antd";
import dayjs from "dayjs";
import { ElementRef, Ref, forwardRef, useImperativeHandle, useRef, useState } from "react";

interface PropsSon {
  setFather: (msg: string) => void
}

interface RefType {
  setSon: (msg: string) => void
}

/**
 * 定义 forwardRef ts类型
 * 
 * 1，一种是使用 forwardRef 的泛型
 * forwardRef 泛型第一个参数是 Ref 类型，第二个参数是 props 类型，不传时默认类型为{}
 * const Component1 = forwardRef<HTMLInputElement, {}>((props, ref) => <input ref={ref} />)
 * 
 * 2，另一种是是在函数参数上直接定义类型
 * 在函数参数上定义类型时，ref 参数类型需要使用Ref泛型包裹，而 forwardRef 泛型则不需要
 * 
 * 示例使用的是第二种方式
 * 
 * 另外在父组件中，使用 useRef 时，则需要通过 ElementRef 泛型与 typeof 结合获取 ref 类型
 */

function Son(props: PropsSon, ref: Ref<RefType>) {
  const [son, setSon] = useState('')

  useImperativeHandle(ref, () => {
    const obj = {
      setSon(msg: string) {
        setSon(msg)
      }
    }
    return obj
  }, [])
  
  return (
    <>
      <div>子组件数据: {son}</div>
      <Button onClick={() => props.setFather(dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'))}>修改父组件数据</Button>
    </>
  )
}

const ForwardSon = forwardRef(Son)

export function Father() {
  const [father, setFather] = useState('')
  const refSon = useRef<ElementRef<typeof ForwardSon>>(null)

  return (
    <>
      <div>父组件的数据: {father}</div>
      <Button onClick={() => refSon.current?.setSon(dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'))}>修改子组件数据</Button>
      <ForwardSon ref={refSon} setFather={setFather} />
    </>
  )
}