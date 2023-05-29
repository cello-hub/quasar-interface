import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import router from './router.tsx'
import 'normalize.css'
import './assets/css/common.css'
import useThemeStore from './store/useThemeStore.ts'
import { WagmiConfig, configureChains, createConfig, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

const { chains, publicClient } = configureChains([mainnet], [publicProvider()])
const config = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const App = () => {
  const colorPrimary = useThemeStore((state) => state.colorPrimary)

  return (
    // <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colorPrimary
        }
      }}
    >
      <WagmiConfig config={config}>
        <RouterProvider router={router} />
      </WagmiConfig>
    </ConfigProvider>
    // </React.StrictMode>
  )
}

root.render(<App />)
