import { useEffect, useState } from 'react'
import { Button, Space, theme } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import UniTable from '../../components/UniTable'
import { ColumnsType } from 'antd/es/table'
import CopyIcon from '../../components/Icon/CopyIcon'
import { IMnemonic } from '../../types/entities/mnemonic'
import { createWallet, getMnemonicList } from '../../api/mnemonic'
import MnemonicForm from './Form'
import CreateIcon from '../../components/Icon/CreateIcon'

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
      dataIndex: 'phrase'
    },
    {
      title: 'CHAIN',
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
            <Button
              size='small'
              type='link'
              icon={<CreateIcon />}
              onClick={() => onCreateWallet(record)}
            />
          </Space>
        )
      }
    }
  ]

  useEffect(() => {
    getList()
  }, [])

  const [isOpenForm, setIsOpenForm] = useState(false)
  const onCreate = async () => {
    setIsOpenForm(true)
  }

  const onCreateWallet = async (mnemonic: IMnemonic) => {
    await createWallet(mnemonic.id)
    getList()
  }
  return (
    <div>
      <Button
        icon={<PlusOutlined />}
        type='primary'
        style={{ marginBottom: '10px' }}
        onClick={onCreate}
      />

      <UniTable
        dataSource={mnemonicList}
        columns={columns}
        rowKey={'id'}
        pagination={false}
      />

      <MnemonicForm
        open={isOpenForm}
        onCloseFormModal={() => setIsOpenForm(false)}
        onSubmitSucceed={() => {
          setIsOpenForm(false)
          getList()
        }}
      />

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
