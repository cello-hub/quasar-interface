import { Card, Layout, Menu } from 'antd'
import { useEffect, useState } from 'react'
import type { MenuProps } from 'antd'
import { routes, RouteProps } from '../../router'

import { Link, Outlet, useLocation } from 'react-router-dom'

const { Content, Sider } = Layout

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
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible style={{ backgroundColor: '#FFFFFF' }}>
        <Menu
          defaultSelectedKeys={['dashboard']}
          selectedKeys={[pathname.split('/')[2]]}
          mode='inline'
          items={items}
        />
      </Sider>

      <Layout>
        <Card
          style={{
            margin: '16px'
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
