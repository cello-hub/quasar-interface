import { createHashRouter } from 'react-router-dom'
import AppLayout from './layouts/app'
import Dashboard from './views/dashboard'
import Wallet from './views/wallet'
import { Icon } from '@chakra-ui/react'
import Chain from './views/chain'
import Couponer from './views/couponer'

import {
  MdGroupWork,
  MdHome,
  MdSocialDistance,
  MdDynamicForm,
  MdWallet,
  MdEvent,
  MdList
} from 'react-icons/md'

import { AiOutlineStock } from 'react-icons/ai'
import Market from './views/market'
import Social from './views/social'
import Cluster from './views/cluster'
import Event from './views/event'

const router = createHashRouter([
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      {
        name: '总览',
        path: 'dashboard',
        element: <Dashboard />,
        icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />
      },
      {
        name: '实时行情',
        path: 'market',
        element: <Market />,
        icon: (
          <Icon
            as={AiOutlineStock}
            width='20px'
            height='20px'
            color='inherit'
          />
        )
      },
      {
        name: '节点',
        path: 'chain',
        element: <Chain />,
        icon: (
          <Icon as={MdDynamicForm} width='20px' height='20px' color='inherit' />
        )
      },
      {
        name: '钱包',
        path: 'account',
        element: <Wallet />,
        icon: <Icon as={MdWallet} width='20px' height='20px' color='inherit' />
      },
      {
        name: '社交账号',
        path: 'social',
        element: <Social />,
        icon: (
          <Icon
            as={MdSocialDistance}
            width='20px'
            height='20px'
            color='inherit'
          />
        )
      },
      {
        name: '账号组',
        path: 'groups',
        element: <Cluster />,
        icon: (
          <Icon as={MdGroupWork} width='20px' height='20px' color='inherit' />
        )
      },
      {
        name: '撸毛事件',
        path: 'event',
        element: <Event />,
        icon: <Icon as={MdEvent} width='20px' height='20px' color='inherit' />
      },
      {
        name: '参与记录',
        path: 'records',
        element: <Couponer />,
        icon: <Icon as={MdList} width='20px' height='20px' color='inherit' />
      }
    ]
  }
])

export default router
