import { theme } from 'antd'
import { MdOutlineCheck } from 'react-icons/md'

export default function ConfirmIcon() {
  const { token } = theme.useToken()
  return <MdOutlineCheck color={token.colorPrimary} />
}
