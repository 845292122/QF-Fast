import { Flex, Form, Input, Select } from 'antd'

export default function AccountSearch() {
  return (
    <Form name="query" layout="vertical">
      <Flex gap="middle">
        <Form.Item label="联系人" name="contact">
          <Input placeholder="输入联系人以查询" />
        </Form.Item>
        <Form.Item label="店铺名称" name="shopName">
          <Input placeholder="输入店铺名称以查询" />
        </Form.Item>
        <Form.Item label="Premium" name="isPremium">
          <Select
            placeholder="Premium"
            allowClear
            style={{ width: 120 }}
            options={[
              { value: 1, label: '是' },
              { value: 0, label: '否' }
            ]}
          />
        </Form.Item>
      </Flex>
    </Form>
  )
}
