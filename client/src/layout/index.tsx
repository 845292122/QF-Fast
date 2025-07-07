import { Layout } from 'antd'
import { createStyles } from 'antd-style'
import { useAtomValue } from 'jotai'
import { Outlet } from 'react-router'
import { appJotai } from '~/store'
import AppSider from './AppSider'
import ProfileContext from '~/context/ProfileContext'
import { useState } from 'react'

const useStyles = createStyles(() => {
  return {
    layout: {
      display: 'flex',
      width: '100vw',
      height: '100vh'
    },
    sider: {
      flexDirection: 'column',
      display: 'flex',
      height: '100vh',
      boxShadow: '7px 0px 7px 0px rgba(0, 0, 0, 0.3)'
    },
    content: {
      background: '#ffffff'
    }
  }
})

export default function AppLayout() {
  const { styles } = useStyles()
  const { Sider, Content } = Layout

  const navCollapsed = useAtomValue(appJotai.navCollapsedAtom)

  const [visible, setVisible] = useState<boolean>(false)
  const closeProfile = () => {
    setVisible(false)
  }
  const openProfile = () => {
    setVisible(true)
  }

  return (
    <Layout className={styles.layout}>
      <Sider collapsed={!navCollapsed} width={230} theme="light">
        <ProfileContext.Provider value={{ visible, closeProfile, openProfile }}>
          <aside className={styles.sider}>
            <AppSider />
          </aside>
        </ProfileContext.Provider>
      </Sider>

      <Content className={styles.content}>
        <Outlet />
      </Content>
    </Layout>
  )
}
