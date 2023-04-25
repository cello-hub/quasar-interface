import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Icon } from '@chakra-ui/react'
import {
  MdPerson,
  MdLock,
  MdDashboard,
  MdCurrencyExchange,
  MdDynamicForm
  // MdOutlineEmergencyRecording
} from 'react-icons/md'

// Admin Imports
import MainDashboard from '@/views/admin/default'
import Profile from '@/views/admin/profile'
import DataTables from '@/views/admin/dataTables'

// Auth Imports
import SignInCentered from '@/views/auth/signIn'
import Chain from '@/views/chain/index.jsx'
import Couponer from './views/couponer/index.jsx'

const routes = [
  {
    name: '总览',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdDashboard} width='20px' height='20px' color='inherit' />,
    component: MainDashboard
  },
  {
    name: '节点',
    layout: '/admin',
    path: '/chain',
    icon: (
      <Icon as={MdDynamicForm} width='20px' height='20px' color='inherit' />
    ),
    component: Chain,
    secondary: true
  },
  {
    name: '交互',
    layout: '/admin',
    path: '/couponer',
    icon: (
      <Icon
        as={MdCurrencyExchange}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: Couponer
  },
  {
    name: '行情数据',
    layout: '/admin',
    icon: (
      <Icon
        as={MdCurrencyExchange}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    path: '/data-tables',
    component: DataTables
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: '/profile',
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered
  }
]

export default routes
