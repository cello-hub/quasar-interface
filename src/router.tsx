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
import { BsCurrencyBitcoin } from 'react-icons/bs'

import Ecosystem from './views/ecosystem'
import Wallet from './views/wallet'
import Social from './views/social'
import Cluster from './views/cluster'
import Couponer from './views/couponer'
import Token from './views/token'
import Login from './views/login'
import Mnemonic from './views/mnemonic'

export interface RouteProps {
  name?: string
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
        name: 'Token',
        path: 'token',
        icon: <BsCurrencyBitcoin />,
        element: <Token />
      },
      {
        name: 'Mnemonic',
        path: 'mnemonic',
        icon: <MdWallet />,
        element: <Mnemonic />
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
  },
  {
    path: 'login',
    element: <Login />
  }
]

const router = createBrowserRouter(routes)

export default router
