import React from 'react'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Desensitization } from './数据脱敏_utils'

/**
 * 列表数据脱敏
 */

interface DataType {
  key: string
  name: string
  age: string
  address: string
  email: string
  idNo: string
  phone: string
}

const columns: ColumnsType<DataType> = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <>{Desensitization.userName(text)}</>,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    render: (text) => <>{text}</>,
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
    render: (text) => <>{Desensitization.address(text)}</>,
  },
  {
    title: '手机号码',
    dataIndex: 'phone',
    key: 'phone',
    render: (text) => <>{Desensitization.phoneNumber(text)}</>,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    render: (text) => <>{Desensitization.email(text)}</>,
  },
  {
    title: '身份证号',
    dataIndex: 'idNo',
    key: 'idNo',
    render: (text) => <>{Desensitization.idNumber(text)}</>,
  },
  // {
  //   title: '操作',
  //   key: 'action',
  //   render: (_, record) => (
  //     <Space size="middle">
  //       <a>邀请 {record.name}</a>
  //       <a>删除</a>
  //     </Space>
  //   ),
  // },
]

const data: DataType[] = [
  {
    key: '1',
    name: '法外狂徒',
    age: '32',
    address: '浙江省杭州市余杭区未来科技城1号',
    email: '123gevadsfsf@163.com',
    idNo: '838870098974634892',
    phone: '1804567654365'
    
  },
  {
    key: '2',
    name: '张三',
    age: '42',
    address: '上海市松江区洞泾镇法外狂徒1号楼',
    email: 'e12324gevadsfsf@gmail.com',
    idNo: '83887484f348764892',
    phone: '1397687565437'
  },
  {
    key: '3',
    name: '李程意',
    age: '32',
    address: '穿越者地月星球居民城市群云海区快乐园小区100号',
    email: '985236762@google.com',
    idNo: '838874890298764892',
    phone: '1868687565437'
  },
]

export const Index: React.FC = () => <Table columns={columns} dataSource={data} />
