import React from 'react'
import { Button, Form, Input } from 'antd'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const validateMessages = {
  required: '${label} 是必填的!',
  types: {
    email: '${label}格式不正确!',
  },
  string: {
    range: '${label}最少${min}位 不超过${max}位',
  },
}

const onFinish = (values: any) => {
  console.log(values)
}

export const Index: React.FC = () => (
  <Form
    {...layout}
    name="demo"
    onFinish={onFinish}
    style={{ maxWidth: 600 }}
    validateMessages={validateMessages}
  >
    <Form.Item name={['user', 'name']} label="姓名" rules={[{ type: 'string', min: 2, max: 10 }]}>
      <Input />
    </Form.Item>
    <Form.Item name={['user', 'email']} label="邮箱" rules={[{ type: 'email' }]}>
      <Input />
    </Form.Item>
    <Form.Item name={['user', 'addr']} label="地址">
      <Input />
    </Form.Item>
    <Form.Item name={['user', 'phone']} label="手机号" rules={[{ message: '手机号格式不正确', pattern: /^1[3-9][0-9]{9}$/ }]}>
      <Input />
    </Form.Item>
    <Form.Item name={['user', 'idNo']} label="身份证号" rules={[{ message: '身份证格式不正确', pattern: /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/ }]}>
      <Input />
    </Form.Item>
    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
      <Button type="primary" htmlType="submit">
        提交
      </Button>
    </Form.Item>
  </Form>
)
