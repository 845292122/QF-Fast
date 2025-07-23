import { Button } from 'antd'
import PageContainer from '~/components/PageContainer'
import AccountSearch from './AccountSearch'
import AccountTable from './AccountTable'
import { useState } from 'react'
import EditDrawer, { EditDrawerFieldProps } from '~/components/EditDrawer'

const accountInfoFields: EditDrawerFieldProps[] = [
  {
    name: 'id',
    label: 'ID',
    type: 'input',
    span: 0
  },
  {
    name: 'contact',
    label: '联系人',
    type: 'input',
    rules: [{ required: true, message: '联系人不能为空' }]
  },
  {
    name: 'shopName',
    label: '店铺名称',
    type: 'input',
    rules: [{ required: true, message: '店铺名称不能为空' }]
  },
  {
    name: 'phone',
    label: '手机号码',
    type: 'input',
    rules: [{ required: true, message: '手机号码不能为空' }]
  },
  {
    name: 'creditCode',
    label: '信用代码',
    type: 'input'
  },
  {
    name: 'address',
    label: '地址',
    type: 'input'
  },
  {
    name: 'domain',
    label: '域名',
    type: 'input'
  },
  {
    name: 'email',
    label: '邮箱',
    type: 'input'
  },
  {
    name: 'premiumDate',
    label: '会员时间',
    type: 'dateRange',
    props: {
      format: 'YYYY-MM-DD'
    }
  },
  {
    name: 'remark',
    label: '备注',
    type: 'textarea'
  }
]

export default function Account() {
  const [accountDrawerOpen, setAccountDrawerOpen] = useState(true)

  return (
    <PageContainer actionBar={<Button type="primary">新增</Button>}>
      <AccountSearch />
      <AccountTable />
      <EditDrawer
        title="账户信息"
        size="large"
        fields={accountInfoFields}
        open={accountDrawerOpen}
        onClose={() => setAccountDrawerOpen(false)}
        onSubmit={() => {}}
      />
    </PageContainer>
  )
}
