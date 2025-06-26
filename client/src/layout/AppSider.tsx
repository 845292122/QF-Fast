import { LogoutOutlined, ProfileTwoTone } from '@ant-design/icons'
import { Down, HamburgerButton, LeftBar, RightBar } from '@icon-park/react'
import { Avatar, Dropdown, Menu, MenuProps, message, theme } from 'antd'
import { createStyles } from 'antd-style'
import { useAtomValue, useSetAtom } from 'jotai'
import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router'
import AppLogo from '~/assets/react.svg'
import ProfileContext from '~/context/ProfileContext'
import BizRoutes from '~/router/routes'
import { authJotai } from '~/store'

type MenuItem = Required<MenuProps>['items'][number]

const { useToken } = theme

const useStyles = createStyles(() => {
  const { token } = useToken()

  return {
    siderLogo: {
      padding: '10px 0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '56px'
    },
    siderTitle: {
      marginLeft: '8px',
      maxWidth: '120px',
      flexShrink: '0',
      fontSize: '18px',
      color: token.colorPrimary,
      fontWeight: 'bold'
    },
    siderMenu: {
      marginTop: 4,
      flex: 1,
      overflowY: 'auto'
    },
    siderAction: {
      marginTop: 6,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingLeft: 12,
      paddingRight: 12,
      height: '56px'
    },
    actionBarContainer: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      padding: '7px'
    },
    actionTitle: {
      fontSize: '14px',
      fontWeight: '500'
    },
    collapseButtonWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      borderRadius: 4,
      padding: 6,
      transitionProperty: 'all',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      transitionDuration: '300ms',
      ':hover': {
        backgroundColor: 'rgb(229 231 235 / 0.5)'
      }
    }
  }
})

const ActionBar = () => {
  const { styles } = useStyles()
  const navigate = useNavigate()
  const setToken = useSetAtom(authJotai.tokenAtom)
  const setAuthInfo = useSetAtom(authJotai.authInfoAtom)
  const setPerms = useSetAtom(authJotai.permAtom)

  const profileContext = useContext(ProfileContext)
  if (!profileContext) throw new Error('ProfileContext is undefined')
  const { openProfile } = profileContext

  const logout = () => {
    setToken(undefined)
    setAuthInfo(undefined)
    setPerms([])
    navigate('/login')
    message.success('注销成功')
  }

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      label: '个人信息',
      icon: <ProfileTwoTone style={{ fontSize: '16px' }} />,
      onClick: openProfile
    },
    {
      key: 'logout',
      icon: <LogoutOutlined style={{ fontSize: '16px' }} />,
      danger: true,
      onClick: logout,
      label: '注销登录'
    }
  ]

  return (
    <Dropdown menu={{ items }} placement="top" trigger={['click']}>
      <div className={styles.actionBarContainer}>
        <Avatar shape="square" style={{ marginRight: '10px' }} />
        <span className={styles.actionTitle}>超级管理员</span>
        <Down theme="outline" size="16" fill="#333" strokeWidth={3} strokeLinecap="square" />
      </div>
    </Dropdown>
  )
}

const CollapseButton = () => {
  const { styles } = useStyles()

  return (
    <div className={styles.collapseButtonWrapper}>
      <LeftBar theme="outline" size="20" fill="#000000" strokeWidth={4} />
      {/* <RightBar theme="outline" size="20" fill="#000000" strokeWidth={4}/> */}
    </div>
  )
}

export default function AppSider() {
  const title = import.meta.env.VITE_APP_TITLE
  const { styles } = useStyles()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const perms = useAtomValue(authJotai.permAtom)
  const [menuList, setMenuList] = React.useState<MenuItem[]>([])
  const [openKeys, setOpenKeys] = React.useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([pathname])
  const clickMenu = ({ key }: { key: string }) => {
    navigate(key)
  }

  const onOpenChange = (openKeys: string[]) => {
    if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys)
    const latestOpenKey = openKeys[openKeys.length - 1]
    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys)
    setOpenKeys([latestOpenKey])
  }

  // React.useEffect(() => {
  //   setSelectedKeys([pathname])
  //   if (collapsed) {
  //     setOpenKeys(getOpenKeys(pathname))
  //   }
  // }, [pathname, collapsed])

  React.useEffect(() => {
    const filterAndConvertMenuByPerms = (
      routes: RouteType.RouteInfo[],
      perms: string[]
    ): MenuItem[] => {
      return routes.flatMap(route => {
        if (route.children) {
          const filteredChildren = filterAndConvertMenuByPerms(route.children, perms)
          if (filteredChildren.length > 0 && route.meta?.key) {
            return [
              {
                key: route.meta.key,
                label: route.meta.title,
                icon: route.meta.icon,
                children: filteredChildren
              }
            ]
          }
          return filteredChildren
        }
        if (
          (route.meta?.perm && perms.includes(route.meta.perm) && !route.meta.hidden) ||
          (!route.meta.perm && !route.meta.hidden)
        ) {
          return [
            {
              key: route.meta.key,
              label: route.meta.title,
              icon: route.meta.icon ?? <HamburgerButton theme="outline" size="14" />
            }
          ]
        }
        return []
      })
    }

    const filterMenuList = filterAndConvertMenuByPerms(BizRoutes, perms)
    console.log(perms)
    console.log(filterMenuList)
    setMenuList(filterMenuList)
  }, [perms])

  return (
    <>
      <div className={styles.siderLogo}>
        <img src={AppLogo} alt="logo" />
        <span className={styles.siderTitle}>{title}</span>
        {/* {collapsed && <span className={styles.logoTitle}>{title}</span>} */}
      </div>
      <div className={styles.siderMenu}>
        <Menu
          items={menuList}
          theme="light"
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          triggerSubMenuAction="click"
          inlineIndent={24}
          onClick={clickMenu}
          onOpenChange={onOpenChange}
        />
      </div>
      <div className={styles.siderAction}>
        <ActionBar />
        <CollapseButton />
      </div>
    </>
  )
}
