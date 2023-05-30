import { useEffect, useState } from 'react'
import { Button, Popconfirm, Space, theme } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import UniTable from '../../components/UniTable'
import { ColumnsType } from 'antd/es/table'
import CopyIcon from '../../components/Icon/CopyIcon'
import { IMnemonic } from '../../types/entities/mnemonic'
import { getMnemonicList } from '../../api/mnemonic'

export default function Mnemonic() {
  const [mnemonicList, setMnemonicList] = useState<IMnemonic[]>([])

  const { token } = theme.useToken()
  const getList = async () => {
    const mnemonics = await getMnemonicList()

    setMnemonicList(mnemonics)
  }

  const columns: ColumnsType<IMnemonic> = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center'
    },
    {
      title: 'PHRASE',
      dataIndex: 'phrase',
      align: 'center'
    },
    {
      title: 'CREATE DATE',
      dataIndex: 'chain',
      width: 250,
      align: 'center',
      render: (_, record) => {
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
      title: 'OPERATION',
      dataIndex: 'operation',
      align: 'center',
      render: (_, record) => {
        return (
          <Space wrap>
            <Button size='small' type='link' icon={<CopyIcon />} />
          </Space>
        )
      }
    }
  ]

  useEffect(() => {
    getList()
  }, [])

  const onCreate = async () => {
    // await createWallet()
    getList()
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

      <UniTable dataSource={mnemonicList} columns={columns} rowKey={'id'} />

      {/* <WalletForm
        open={isOpenForm}
        onCloseFormModal={() => setIsOpenForm(false)}
        onSubmitSucceed={() => {
          setIsOpenForm(false)
          getList()
        }}
        wallet={editableMnemonic!}
      /> */}

      {/* <UniModal
        open={isOpenSecertModel}
        onCancel={() => setIsOpenSecertModel(false)}
        title='SECRET'
        maskClosable={true}
        footer={null}
      >
        <div>{secret}</div>
      </UniModal> */}
    </div>
  )
}
