import { PlusOutlined } from '@ant-design/icons'
import { Button, Space, theme } from 'antd'
import UniTable from '../../components/UniTable'
import { ColumnsType } from 'antd/es/table'
import { ISocial } from '../../types/entities/social'
import { useEffect, useState } from 'react'
import { getSocialAccounts } from '../../api/social'
import { MdCheck, MdClose, MdEdit, MdKey } from 'react-icons/md'
import SocialForm from './Form'

export default function Social() {
  const { token } = theme.useToken()
  const [socialAccounts, setSocialAccounts] = useState<ISocial[]>([])
  const getList = async () => {
    const socialAccounts = await getSocialAccounts()
    setSocialAccounts(socialAccounts)
  }
  useEffect(() => {
    getList()
  }, [])

  const columns: ColumnsType<ISocial> = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center'
    },
    {
      title: 'PLATFORM',
      dataIndex: 'platform',
      width: 120
    },
    {
      title: 'ACCOUNT',
      dataIndex: 'account'
    },
    {
      title: 'AVAILABLE',
      dataIndex: 'available',
      width: 100,
      align: 'center',
      render: (available) => {
        if (available) {
          return <MdCheck color={token.colorPrimary} />
        }
        return <MdClose color={token.colorError} />
      }
    },
    {
      title: 'REWARK',
      dataIndex: 'remark'
    },
    {
      title: 'UPDATE DATE',
      dataIndex: 'updated_at'
    },
    {
      title: 'OPERATION',
      dataIndex: 'operation',
      align: 'center',
      render: (_, record) => {
        return (
          <Space wrap>
            <Button
              size='small'
              type='link'
              icon={<MdEdit />}
              onClick={() => onUpdate(record)}
            />
            <Button
              size='small'
              type='link'
              icon={<MdKey />}
              onClick={() => onOpenSecretModel(record)}
            />
          </Space>
        )
      }
    }
  ]

  const [isOpenForm, setIsOpenForm] = useState(false)
  const [editableSocial, setEditableSocial] = useState<ISocial>()

  const onUpdate = (social: ISocial) => {
    console.log(social)

    setIsOpenForm(true)
    setEditableSocial(social)
  }

  // const [isOpenSecertModel, setIsOpenSecertModel] = useState(false)
  // const [secret, setSecret] = useState('')
  const onOpenSecretModel = async (social: ISocial) => {
    console.log(social)

    // setIsOpenSecertModel(true)
    // const secret = await getSecret(wallet.id)
    // setSecret(secret)
  }
  return (
    <div>
      <Button
        icon={<PlusOutlined />}
        type='primary'
        style={{ marginBottom: '10px' }}
        onClick={() => {
          setIsOpenForm(true)
          setEditableSocial(undefined)
        }}
      >
        Create Social Account
      </Button>

      <UniTable columns={columns} dataSource={socialAccounts} rowKey={'id'} />

      <SocialForm
        open={isOpenForm}
        onCloseFormModal={() => setIsOpenForm(false)}
        onSubmitSucceed={() => {
          setIsOpenForm(false)
          getList()
        }}
        social={editableSocial}
      />
    </div>
  )
}
