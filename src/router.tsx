import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './views/layout'
import Dashboard from './views/dashboard'

import {
  MdGroupWork,
  MdHome,
  MdSocialDistance,
  MdWallet,
  MdEvent,
  MdList
} from 'react-icons/md'
import Ecosystem from './views/ecosystem'
import Wallet from './views/wallet'
import Social from './views/social'
import Cluster from './views/cluster'
import Couponer from './views/couponer'

export interface RouteProps {
  name: string
  path: string
  element: React.ReactNode
  icon?: React.ReactNode
  children?: RouteProps[]
}

export const routes: RouteProps[] = [
  {
    name: 'App',
    path: 'app',
    element: <AppLayout />,
    children: [
      {
        name: 'Dashboard',
        path: 'dashboard',
        icon: <MdHome />,
        element: <Dashboard />
      },
      {
        name: 'Ecosystem',
        path: 'ecosystem',
        icon: <MdEvent />,
        element: <Ecosystem />
      },
      {
        name: 'Wallet',
        path: 'wallet',
        icon: <MdWallet />,
        element: <Wallet />
      },
      {
        name: 'Social',
        path: 'social',
        icon: <MdSocialDistance />,
        element: <Social />
      },
      {
        name: 'Cluster',
        path: 'cluster',
        icon: <MdGroupWork />,
        element: <Cluster />
      },
      {
        name: 'Couponer',
        path: 'couponer',
        icon: <MdList />,
        element: <Couponer />
      }
    ]
  }
]

const router = createBrowserRouter(routes)

export default router
