import { theme } from 'antd'
import { MdKey } from 'react-icons/md'

export default function KeyIcon() {
  const { token } = theme.useToken()
  return <MdKey color={token.colorPrimary} />
}
