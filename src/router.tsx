import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './views/layout'
import Dashboard from './views/dashboard'

import {
  MdGroupWork,
  MdHome,
  MdWallet,
  MdEvent,
  MdNoteAlt
} from 'react-icons/md'
import { IoEarthSharp } from 'react-icons/io5'
import { FaBitcoin, FaTasks, FaUserFriends } from 'react-icons/fa'

import Ecosystem from './views/ecosystem'
import Wallet from './views/wallet'
import Social from './views/social'
import Cluster from './views/cluster'
import Couponer from './views/couponer'
import Token from './views/token'
import Login from './views/login'
import Mnemonic from './views/mnemonic'
import Chain from './views/chain'
import { ToolFilled } from '@ant-design/icons'

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
        name: 'Chain',
        path: 'chain',
        icon: <IoEarthSharp />,
        element: <Chain />
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
        icon: <FaBitcoin />,
        element: <Token />
      },
      {
        name: 'Mnemonic',
        path: 'mnemonic',
        icon: <MdNoteAlt />,
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
        icon: <FaUserFriends />,
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
        icon: <FaTasks />,
        element: <Couponer />
      },
      {
        name: 'Toos',
        path: 'tools',
        icon: <ToolFilled />,
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
