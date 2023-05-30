/**
 * 生命周期函数在 函数组件中的替代方案
 */
import { useEffect } from 'react'

/**
 * componentDidMount 替代方案
 */
useEffect(() => {
  // 请求数据 事件绑定 操作DOM
}, [])

/**
 * componentWillUnMount 替代方案
 */
useEffect(() => {
  // 请求数据 ， 事件监听 ， 操纵dom ， 增加定时器，延时器
  return () => {
    // 解除事件监听器 ，清除定时器，延时器
  }
}, [])

/**
 * componentWillReceiveProps 替代方案
 */
const props: { [index: string]: any } = {}
useEffect(() => {
  console.log('props 发生了变化')
}, [props])

useEffect(() => {
  console.log('props 的name 发生了变化')
}, [props.name])

/**
 * componentDisUpdate 替代方案
 */
useEffect(() => {
  console.log('组件更新完成')
})