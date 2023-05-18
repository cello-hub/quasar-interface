import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import router from './router.tsx'
import 'normalize.css'
import './assets/css/common.css'
import useChainStore from './store/useChainStore.ts'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const App = () => {
  // useChainStore().updateChainList()
  const updateChainList = useChainStore((state) => state.updateChainList)
  useEffect(() => {
    updateChainList()
  }, [])
  return (
    <React.StrictMode>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#00B96B'
          }
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </React.StrictMode>
  )
}

root.render(<App />)
