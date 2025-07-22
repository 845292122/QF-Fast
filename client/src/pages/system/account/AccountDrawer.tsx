import InfoDrawer, { InfoDrawerFieldType, InfoDrawerFormValues } from '~/components/InfoDrawer'

const accountInfoFields: InfoDrawerFieldType[] = [
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

type AccountDrawerProps = {
  visible: boolean
  accountInfoFields: InfoDrawerFieldType[]
  onClose: () => void
  onSubmit: (values: InfoDrawerFormValues<typeof accountInfoFields>) => void
  initialValues?: Record<string, unknown>
}

export default function AccountDrawer({
  visible,
  onClose,
  onSubmit,
  initialValues,
  accountInfoFields
}: AccountDrawerProps) {
  return (
    <InfoDrawer<typeof accountInfoFields>
      fields={accountInfoFields}
      visible={visible}
      onSubmit={onSubmit}
      initialValues={initialValues}
      onClose={onClose}
      title="租户信息"
      size="large"
    />
  )
}
