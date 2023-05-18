import { theme } from 'antd'
import styles from './index.module.css'

export default function LiveIcon() {
  const { token } = theme.useToken()
  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block'
      }}
    >
      <div
        className={styles.ripple_outer}
        style={{
          borderColor: token.colorPrimary
        }}
      />
      <div
        className={styles.ripple_inner}
        style={{
          background: token.colorPrimary
        }}
      />
    </div>
  )
}
