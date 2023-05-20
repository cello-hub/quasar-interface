import { theme } from 'antd'
import { MdClose } from 'react-icons/md'

export default function ErrorIcon() {
  const { token } = theme.useToken()
  return <MdClose color={token.colorError} />
}
