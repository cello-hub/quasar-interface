import { useEffect, useState } from 'react'
import { createWallet, getSecret, getWallets } from '../../api/wallet'
import { Button, Popconfirm, Space, theme } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import UniTable from '../../components/UniTable'
import { ColumnsType } from 'antd/es/table'
import { IWallet } from '../../types/entities/wallet'
import { MdCheck, MdClose, MdKey } from 'react-icons/md'
import { MdEdit } from 'react-icons/md'
import WalletForm from './Form'
import UniModal from '../../components/UniModal'
import { IoMdBrowsers } from 'react-icons/io'
export default function Wallet() {
  const [walletList, setWalletList] = useState<IWallet[]>([])

  const { token } = theme.useToken()
  const getList = async () => {
    const wallets = await getWallets()

    setWalletList(wallets)
  }

  const columns: ColumnsType<IWallet> = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center'
    },
    {
      title: 'ALIAS',
      dataIndex: 'alias'
    },
    {
      title: 'ADDRESS',
      dataIndex: 'address',
      width: 150
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
      title: 'EVM WALLET',
      dataIndex: 'is_evm',
      align: 'center',
      width: 130,
      render: (is_evm, record) => {
        if (is_evm) {
          return <MdCheck color={token.colorPrimary} />
        }
        return (
          <div
            style={{
              color: token.colorPrimary
            }}
          >
            {record.chain?.symbol}
          </div>
        )
      }
    },
    {
      title: 'CREATE DATE',
      dataIndex: 'created_at',
      width: 250
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
            {record.chain && (
              <Button
                size='small'
                type='link'
                icon={<IoMdBrowsers />}
                onClick={() => {
                  window.open(
                    `${record.chain.explorer}/address/${record.address}`,
                    '_blank'
                  )
                }}
              />
            )}
          </Space>
        )
      }
    }
  ]

  const [isOpenForm, setIsOpenForm] = useState(false)
  const [editableWallet, setEditableWallet] = useState<IWallet>()

  const onUpdate = (wallet: IWallet) => {
    setIsOpenForm(true)
    setEditableWallet(wallet)
  }
  useEffect(() => {
    getList()
  }, [])

  const onCreate = async () => {
    await createWallet()
    getList()
  }

  const [isOpenSecertModel, setIsOpenSecertModel] = useState(false)
  const [secret, setSecret] = useState('')
  const onOpenSecretModel = async (wallet: IWallet) => {
    setIsOpenSecertModel(true)

    const secret = await getSecret(wallet.id)

    setSecret(secret)
  }

  return (
    <div>
      <Popconfirm title='Create Wallet' onConfirm={onCreate}>
        <Button
          icon={<PlusOutlined />}
          type='primary'
          style={{ marginBottom: '10px' }}
        >
          Create EVM Wallet
        </Button>
      </Popconfirm>

      <UniTable dataSource={walletList} columns={columns} rowKey={'id'} />

      <WalletForm
        open={isOpenForm}
        onCloseFormModal={() => setIsOpenForm(false)}
        onSubmitSucceed={() => {
          setIsOpenForm(false)
          getList()
        }}
        wallet={editableWallet!}
      />

      <UniModal
        open={isOpenSecertModel}
        onCancel={() => setIsOpenSecertModel(false)}
        title='SECRET'
        maskClosable={true}
        footer={null}
      >
        <div>{secret}</div>
      </UniModal>
    </div>
  )
}
