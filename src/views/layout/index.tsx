import { Card, Layout, Menu, theme } from 'antd'
import { useEffect, useState } from 'react'
import type { MenuProps } from 'antd'
import { routes, RouteProps } from '../../router'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Navigator from './components/Navigator'
import BrandLogo from '../../assets/imgs/ikun.png'

const { Content, Sider, Header } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label: <Link to={String(key)}>{label}</Link>
  } as MenuItem
}

export default function AppLayout() {
  const [items, setItems] = useState<MenuItem[]>([])
  const { pathname } = useLocation()
  const { token } = theme.useToken()

  const buildItems = (route?: RouteProps[]) => {
    const items: any =
      route &&
      route.map((child: RouteProps) => {
        return getItem(
          child.name,
          child.path,
          child.icon,
          buildItems(child.children)
        )
      })

    return items as MenuItem[]
  }

  useEffect(() => {
    routes.forEach((route) => {
      if (route.path === 'app' && route.children && route.children.length > 0) {
        setItems(buildItems(route.children))
      }
    })
  }, [])

  useEffect(() => {
    console.log(pathname)
  }, [pathname])

  return (
    <Layout style={{ minHeight: '100vh' }} hasSider>
      <Sider
        style={{
          backgroundColor: token.colorBgContainer,
          height: '100vh',
          position: 'sticky',
          left: 0,
          top: 0,
          bottom: 0,
          overflow: 'auto'
        }}
      >
        <div
          style={{
            margin: '32px',
            marginBottom: '8px',
            overflow: 'hidden',
            borderRadius: '8px'
          }}
        >
          <img src={BrandLogo} width='100%' />
        </div>
        <Menu
          defaultSelectedKeys={['dashboard']}
          selectedKeys={[pathname.split('/')[2]]}
          mode='inline'
          items={items}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: 'transparent',
            position: 'sticky',
            top: 0,
            padding: 0,
            zIndex: 1,
            lineHeight: 'auto'
          }}
        >
          <Navigator />
        </Header>
        <Card
          style={{
            margin: '24px 16px 16px'
          }}
        >
          <Content>
            <Outlet />
          </Content>
        </Card>
      </Layout>
    </Layout>
  )
}
