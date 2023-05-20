import { theme } from 'antd'
import { MdEdit } from 'react-icons/md'

export default function EditIcon() {
  const { token } = theme.useToken()
  return <MdEdit color={token.colorPrimary} />
}
