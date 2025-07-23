import { Rule } from 'antd/es/form'
import {
  Col,
  DatePicker,
  Drawer,
  Input,
  Form,
  InputNumber,
  Radio,
  Row,
  Select,
  Button,
  DrawerProps
} from 'antd'

export type EditDrawerFieldProps = {
  name: string
  label: string
  type: 'input' | 'select' | 'radio' | 'date' | 'inputNumber' | 'dateRange' | 'textarea'
  options?: { label: string; value: string | number }[]
  rules?: Rule[]
  span?: number
  props?: Record<string, any>
}

export type EditDrawerProps = {
  open: boolean
  onClose: () => void
  onSubmit: (values: any) => void
  initialValues?: Record<string, any>
  fields: EditDrawerFieldProps[]
  data?: Record<string, any>
  title?: string
} & Partial<DrawerProps>

export default function EditDrawer({
  open,
  initialValues,
  fields,
  onSubmit,
  onClose,
  title,
  ...rest
}: EditDrawerProps) {
  const [form] = Form.useForm()
  const handleOk = () => {
    form.validateFields().then(values => onSubmit(values))
  }

  return (
    <Drawer
      title={title}
      open={open}
      maskClosable={false}
      destroyOnHidden
      {...rest}
      onClose={onClose}
      extra={
        <Button type="primary" onClick={handleOk}>
          提交
        </Button>
      }
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        preserve={false}
        autoComplete="off"
      >
        <Row gutter={24}>
          {fields.map(field => (
            <Col span={field.span ?? 12} key={field.name}>
              <Form.Item name={field.name} label={field.label} rules={field.rules ?? []}>
                {field.type === 'input' && (
                  <Input placeholder={`请输入${field.label}`} {...field.props} />
                )}
                {field.type === 'textarea' && (
                  <Input.TextArea placeholder={`请输入${field.label}`} {...field.props} />
                )}
                {field.type === 'inputNumber' && <InputNumber {...field.props} />}
                {field.type === 'select' && (
                  <Select
                    placeholder={`请选择${field.label}`}
                    allowClear
                    options={field.options}
                    {...field.props}
                  />
                )}
                {field.type === 'radio' && (
                  <Radio.Group {...field.props}>
                    {field.options?.map(option => (
                      <Radio key={option.value} value={option.value}>
                        {option.label}
                      </Radio>
                    ))}
                  </Radio.Group>
                )}
                {field.type === 'date' && <DatePicker style={{ width: '100%' }} {...field.props} />}
                {field.type === 'dateRange' && (
                  <DatePicker.RangePicker style={{ width: '100%' }} {...field.props} />
                )}
              </Form.Item>
            </Col>
          ))}
        </Row>
      </Form>
    </Drawer>
  )
}
