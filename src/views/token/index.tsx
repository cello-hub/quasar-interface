import { ColumnsType } from 'antd/es/table'
import { IToken } from '../../types/entities/token'
import UniTable from '../../components/UniTable'
import { useEffect, useState } from 'react'
import { getTokenList } from '../../api/token'
import { Button, Space, Tooltip } from 'antd'
import TokenForm from './Form'
import EditIcon from '../../components/Icon/EditIcon'
import CreateIcon from '../../components/Icon/CreateIcon'
import CopyIcon from '../../components/Icon/CopyIcon'

export default function Token() {
  const [tokenList, setTokenList] = useState<IToken[]>()

  useEffect(() => {
    getList()
  }, [])

  const getList = async () => {
    const tokenList = await getTokenList()

    setTokenList(tokenList)
  }
  const columns: ColumnsType<IToken> = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center'
    },
    {
      title: 'NAME',
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: 'SYMBOL',
      dataIndex: 'symbol',
      align: 'center'
    },
    {
      title: 'DECIMAL',
      dataIndex: 'decimal',
      align: 'center'
    },
    {
      title: 'TYPE',
      dataIndex: 'type',
      align: 'center'
    },
    {
      title: 'CHAIN',
      key: 'chain',
      align: 'center',
      render: (_, record) => {
        return <div>{record.chain.topic}</div>
      }
    },
    {
      title: 'OPERATION',
      key: 'operation',
      align: 'center',
      render: (_, record) => {
        return (
          <Space wrap>
            <Button
              size='small'
              type='link'
              icon={<EditIcon />}
              onClick={() => onUpdate(record)}
            />
            <Tooltip title='Copy Contract Address'>
              <Button size='small' type='link' icon={<CopyIcon />} />
            </Tooltip>
          </Space>
        )
      }
    }
  ]

  const [isOpenForm, setIsOpenForm] = useState(false)
  const [editableToken, setEditableToken] = useState<IToken>()
  const onUpdate = (token: IToken) => {
    setIsOpenForm(true)
    setEditableToken(token)
  }
  return (
    <div>
      <Button
        icon={<CreateIcon />}
        type='primary'
        style={{ marginBottom: '10px' }}
        onClick={() => {
          setIsOpenForm(true)
          setEditableToken(undefined)
        }}
      />
      <UniTable columns={columns} dataSource={tokenList} rowKey={'id'} />

      <TokenForm
        open={isOpenForm}
        token={editableToken}
        onCloseFormModal={() => setIsOpenForm(false)}
        onSubmitSucceed={() => {
          setIsOpenForm(false)
          getList()
        }}
      />
    </div>
  )
}
