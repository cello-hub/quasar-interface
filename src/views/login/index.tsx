import { Button } from 'antd'
import styles from './index.module.css'
import { Connector, useAccount, useConnect, useSignMessage } from 'wagmi'
import { login } from '../../api/auth'
import { useEffect } from 'react'

export default function Login() {
  const { connect, connectors, isLoading, pendingConnector } = useConnect()

  const { address, isConnected, connector } = useAccount()
  const { signMessageAsync } = useSignMessage()

  useEffect(() => {
    if (isConnected && address && connector) {
      onSignMessage()
    }
  }, [isConnected, address, connector])

  const onSignMessage = () => {
    const message = `Login to quasar.sys. \n${new Date().getTime()}`
    signMessageAsync({
      message
    })
      .then((res) => {
        return login({
          address,
          message,
          signedMessage: res
        })
      })
      .then(() => {
        window.location.href = '/app/dashboard'
      })
  }

  const onLogin = async (connector: Connector) => {
    connect({ connector })
  }

  return (
    <div className={styles.login_wrapper}>
      {connectors.map((connector) => {
        return (
          <Button
            disabled={!connector.ready}
            key={connector.id}
            type='primary'
            className={styles.login_button}
            onClick={() => onLogin(connector)}
          >
            {connector.name}
            {!connector.ready && ' (unsupported)'}
            {isLoading &&
              connector.id === pendingConnector?.id &&
              ' (connecting)'}
          </Button>
        )
      })}
    </div>
  )
}
