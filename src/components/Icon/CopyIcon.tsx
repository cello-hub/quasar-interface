import { theme } from 'antd'

import { MdOutlineContentCopy } from 'react-icons/md'

export default function CopyIcon() {
  const { token } = theme.useToken()
  return <MdOutlineContentCopy color={token.colorPrimary} />
}
