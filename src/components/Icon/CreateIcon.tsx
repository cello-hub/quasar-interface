import { theme } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

export default function CreateIcon() {
  const { token } = theme.useToken()
  return <PlusOutlined color={token.colorPrimary} />
}
