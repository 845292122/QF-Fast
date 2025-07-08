import { Button, Flex, Form, Input, Select, Table } from 'antd'
import PageContainer from '~/components/PageContainer'

const ActionBar = () => {
  return <Button type="primary">新增</Button>
}

export default function Account() {
  return (
    <PageContainer actionBar={<ActionBar />}>
      {/* 查询区域 */}
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

      {/* 数据表格 */}
      <Table>
        <Table.Column title="ID" dataIndex="id" key="id" />
        <Table.Column title="店铺名称" dataIndex="shopName" key="shopName" />
        <Table.Column title="联系人" dataIndex="contact" key="contact" />
        <Table.Column title="手机号" dataIndex="phone" key="phone" />
        <Table.Column title="信用代码" dataIndex="creditCode" key="creditCode" />
        <Table.Column title="地址" dataIndex="address" key="address" />
        <Table.Column title="生日" dataIndex="birthday" key="birthday" />
        <Table.Column title="类型" dataIndex="type" key="type" />
        <Table.Column title="邮箱" dataIndex="email" key="email" />
        <Table.Column title="状态" dataIndex="status" key="status" />
        <Table.Column title="Premium" dataIndex="isPremium" key="isPremium" />
        <Table.Column title="开始时间" dataIndex="startDate" key="startDate" />
        <Table.Column title="结束时间" dataIndex="endDate" key="endDate" />
      </Table>
    </PageContainer>
  )
}
