import { Button } from "antd";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { increment, modules1State, minus, incrementAsync, minusAsync } from "../redux/modules_1";

function Son() {
  const dispatch = useAppDispatch()
  const module1State = useAppSelector(modules1State)
  const actionIncrement = {
    type: 'father',
    num: 1
  }
  const actionMinus = {
    type: 'father',
    num: -1
  }

  return(
    <>
      <div>Son 组件数据: {module1State.son}</div>
      <Button type="primary" onClick={() => dispatch(increment(actionIncrement))}>Father组件 加 1</Button>
      <Button type="primary" onClick={() => dispatch(minus(actionMinus))}>Father组件 减去 1</Button>
      <Button type="primary" onClick={() => dispatch(incrementAsync(actionIncrement))}>Father组件 异步加 1</Button>
      <Button type="primary" onClick={() => dispatch(minusAsync(actionMinus))}>Father组件 异步减去 1</Button>
    </>
  )
}

export function Father() {
  const dispatch = useAppDispatch()
  const module1State = useAppSelector(modules1State)
  const actionIncrement = {
    type: 'son',
    num: 1
  }
  const actionMinus = {
    type: 'son',
    num: -1
  }
  
  return (
    <>
      <Son />
      <br />
      <div>Father 组件数据: {module1State.father}</div>
      <Button type="primary" onClick={() => dispatch(increment(actionIncrement))}>Son组件 加 1</Button>
      <Button type="primary" onClick={() => dispatch(minus(actionMinus))}>Son组件 减去 1</Button>
      <Button type="primary" onClick={() => dispatch(incrementAsync(actionIncrement))}>Son组件 异步加 1</Button>
      <Button type="primary" onClick={() => dispatch(minusAsync(actionMinus))}>Son组件 异步减去 1</Button>
    </>
  )
}