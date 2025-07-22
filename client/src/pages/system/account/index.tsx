import { Button } from 'antd'
import PageContainer from '~/components/PageContainer'
import AccountSearch from './AccountSearch'
import AccountTable from './AccountTable'
import AccountDrawer from './AccountDrawer'
import { useState } from 'react'

export default function Account() {
  const [accountDrawerVisible, setAccountDrawerVisible] = useState(false)

  return (
    <PageContainer actionBar={<Button type="primary">新增</Button>}>
      <AccountSearch />
      <AccountTable />
      {/* <AccountDrawer visible={accountDrawerVisible} /> */}
    </PageContainer>
  )
}
