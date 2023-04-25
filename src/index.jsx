import ReactDOM from 'react-dom/client'
import './assets/css/App.css'
import { RouterProvider } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme/theme'
// import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui'
import router from './router'
import { useEffect } from 'react'
import useChainStore from './store/useChainStore'

const root = ReactDOM.createRoot(document.getElementById('root'))
function App() {
  useChainStore()
  const addChains = useChainStore((state) => state.addChains)

  useEffect(() => {
    addChains()
  }, [])
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  )
}
root.render(<App />)
