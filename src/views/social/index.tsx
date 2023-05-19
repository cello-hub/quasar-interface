import { PlusOutlined } from '@ant-design/icons'
import { Button, Space, theme } from 'antd'
import UniTable from '../../components/UniTable'
import { ColumnsType } from 'antd/es/table'
import { ISocial } from '../../types/entities/social'
import { useEffect, useState } from 'react'
import { getPassword, getSocialAccounts } from '../../api/social'
import { MdCheck, MdClose, MdEdit, MdKey } from 'react-icons/md'
import SocialForm from './Form'
import UniModal from '../../components/UniModal'

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
      title: 'ACCOUNT',
      dataIndex: 'account'
    },
    // {
    //   title: 'PASSWORD',
    //   dataIndex: 'password',
    //   width: 120,
    //   render: (text, record) => {
    //     return <div>{text}</div>
    //   }
    // },
    {
      title: 'PLATFORM',
      dataIndex: 'platform',
      width: 120
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
    setIsOpenForm(true)
    setEditableSocial(social)
  }

  const [isOpenSecertModel, setIsOpenSecertModel] = useState(false)
  const [secret, setSecret] = useState('')
  const onOpenSecretModel = async (social: ISocial) => {
    setIsOpenSecertModel(true)
    setSecret('')
    const secret = await getPassword(social.id)
    setSecret(secret)
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

      <UniModal
        open={isOpenSecertModel}
        onCancel={() => setIsOpenSecertModel(false)}
        title='SECRET'
        maskClosable={true}
        footer={null}
      >
        {secret ? (
          <div>{secret}</div>
        ) : (
          'An error occurred. The password for this account cannot be viewed'
        )}
      </UniModal>
    </div>
  )
}
