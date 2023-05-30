/**
 * 编写的组件能够实现的功能是：
  1. Form 组件可以被 ref 获取实例。然后可以调用实例方法 submitForm 获取表单内容，用于提交表单，resetForm 方法用于重置表单。
  2. Form 组件自动过滤掉除了 FormItem 之外的其他 React 元素
  3. FormItem 中 name 属性作为表单提交时候的 key ，还有展示的 label 。
  4. FormItem 可以自动收集 <Input/> 表单的值。
 */
import { FC, useState, ReactNode, cloneElement, isValidElement } from "react"

interface InputProps {
  name?: string
  setValue?: (name: unknown, value: unknown) => void
  value?: any
}
interface FormItemProps extends InputProps {
  label?: string
  children: ReactNode
}

interface DisplayNameType {
  displayName?:string
  [index: string]: any
}

/**
 * @Button
 * 设计思想：

  绑定 displayName 标识Button。
  Button DOM 元素，绑定 onClick 方法，用于传递 提交/重置 表单 。
 */
const Button: FC<{
  value?: string
  fun?: () => void
  htmlType?: string
}> = (props) => {
  const { value, fun } = props

  return (
    <button onClick={fun}>{value}</button>
  )
}
Button.displayName = 'button'

/**
 * @Input
 * 设计思想：

  绑定 displayName 标识input。
  input DOM 元素，绑定 onChange 方法，用于传递 value 。
 */
const Input: FC<InputProps> = (props) => {
  const { name, setValue, value } = props

  return (
    <>
      <input value={value} onChange={(e) => setValue?.(name, e.target.value)} />
    </>
  )
}
Input.displayName = 'input'

/**
 * @FormItem
 * 设计思想：

  FormItem 一定要绑定 displayName 属性，用于让 <Form> 识别 <FormItem />
  声明 onChange 方法，通过 props 提供给 <Input>，作为改变 value 的回调函数。
  FormItem 过滤掉除了 input 以外的其他元素。
 */
const FormItem: FC<FormItemProps> = (props) => {
  const { name, label, children, setValue, value } = props
  const temp = {
    name,
    setValue,
    value
  }
  let element = null
  if (isValidElement(children) && (children.type as DisplayNameType)?.displayName === 'input') {
    element = cloneElement(children, { ...temp }, children.props.children)
  }

  return (
    <>
      <div className="formItem">
        <span className="label">{label}</span>
        {element}
      </div>
    </>
  )
}
FormItem.displayName = 'formItem'

/**
 * @Form
 * 设计思想：

  创建一个 state 下的 formData 属性，用于收集表单状态。
  要封装 重置表单，提交表单，改变表单单元项的方法。
  要过滤掉除了 FormItem 元素之外的其他元素，那么怎么样知道它是不是 FormItem，可以给函数组件或者类组件绑定静态属性来证明它的身份，然后在遍历 props.children 的时候就可以在 React element 的 type 属性(类或函数组件本身)上，验证这个身份，在这个 demo 项目，给函数绑定的 displayName 属性，证明组件身份。
  要克隆 FormItem 节点，将改变表单单元项的方法 handleChange 和表单的值 value 混入 props 中。
 */
export const Form: FC<{ children: ReactNode[]; submitFun?: (value: any) => void }> = (props) => {
  const { children, submitFun } = props
  const [formData, setFormData] = useState<{[index: string]: unknown}>({})

  const handleValue = (name: string, value: unknown) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }
  const submit = () => {
    console.log('submit data --', formData)
    submitFun?.(formData)
    alert('提交成功 --')
  }
  const reset = () => {
    Object.keys(formData).forEach(item => {
      formData[item] = ''
    })
    setFormData({...formData})
    alert('重置成功')
  }
  
  const elements = children?.map((child, index) => {
    if (isValidElement(child)) {
      if ((child.type as DisplayNameType)?.displayName === 'formItem') {
        const { name } = child.props
        const temp = {
          setValue: handleValue,
          key: name,
          value: formData[name] || '',
          name
        }
        return cloneElement(child, { ...temp }, child?.props.children)
      }
      if ((child.type as DisplayNameType)?.displayName === 'button') {
        let temp: {
          fun?: () => void
        } = {}
        child.props.htmlType === 'submit' && (temp.fun = submit)
        child.props.htmlType === 'reset' && (temp.fun = reset)
        return cloneElement(child, { ...temp, key: index }, child.props.children)
      }
    }
    return null
  })

  return <>
    { elements }
  </>
}
Form.displayName = 'Form'

// test
export const Index = () => {
  
  return (
    <>
      <Form>
        <FormItem name="name" label="name">
          <Input />
        </FormItem>
        <FormItem name="age" label="age">
          <Input />
        </FormItem>
        <FormItem name="addr" label="addr">
          <Input />
        </FormItem>
        <Button htmlType="submit" value="提交" />
        <Button htmlType="reset" value="重置" />
      </Form>
    </>
  )
}