import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import router from './router.tsx'
import 'normalize.css'
import './assets/css/common.css'
import useChainStore from './store/useChainStore.ts'
import useThemeStore from './store/useThemeStore.ts'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const App = () => {
  const updateChainList = useChainStore((state) => state.updateChainList)
  const colorPrimary = useThemeStore((state) => state.colorPrimary)

  useEffect(() => {
    updateChainList()
  }, [])
  return (
    <React.StrictMode>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: colorPrimary
          }
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </React.StrictMode>
  )
}

root.render(<App />)
