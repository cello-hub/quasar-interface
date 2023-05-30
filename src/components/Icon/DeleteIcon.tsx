import { theme } from 'antd'
import { MdDeleteOutline } from 'react-icons/md'

export default function DeleteIcon() {
  const { token } = theme.useToken()
  return <MdDeleteOutline color={token.colorPrimary} />
}
