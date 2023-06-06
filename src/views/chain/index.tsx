import UniTable from '../../components/UniTable'
import useChainStore from '../../store/useChainStore'
import { ColumnsType } from 'antd/es/table'
import { IChain } from '../../types/entities/chain'
import { Button, Space, Tag, theme } from 'antd'
import EditIcon from '../../components/Icon/EditIcon'
import { Link } from 'react-router-dom'
import { IoMdBrowsers } from 'react-icons/io'
import ConfirmIcon from '../../components/Icon/ConfirmIcon'
import ErrorIcon from '../../components/Icon/ErrorIcon'
import CreateIcon from '../../components/Icon/CreateIcon'
import useEdit from '../../hooks/useEdit'
import ChainForm from './Form'
import UniExpandRow from '../../components/UniExpandRow'
import RpcList from './RpcList'

export default function Chain() {
  const { token } = theme.useToken()
  const chainList = useChainStore((state) => state.chainList)
  const updateChainList = useChainStore((state) => state.updateChainList)

  const columns: ColumnsType<IChain> = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center'
    },
    {
      title: 'TOPIC',
      dataIndex: 'topic',
      align: 'center',
      render: (topic, chain) => {
        return (
          <div>
            {chain.testnet ? (
              <>
                <span>{topic}</span>
                <Tag
                  color={token.colorPrimary}
                  bordered={false}
                  style={{
                    marginLeft: '5px'
                  }}
                >
                  test
                </Tag>
              </>
            ) : (
              <div>{topic}</div>
            )}
          </div>
        )
      }
    },

    {
      title: 'SYMBOL',
      dataIndex: 'symbol',
      align: 'center'
    },
    {
      title: 'CHAIN ID',
      dataIndex: 'hex_chain_id',
      align: 'center'
    },
    {
      title: 'EVM',
      dataIndex: 'evm',
      align: 'center',
      render: (value) => {
        if (value) {
          return <ConfirmIcon />
        }
        return <ErrorIcon />
      }
    },
    {
      title: 'EXPLORER',
      dataIndex: 'explorer',
      align: 'center',
      render: (value) => {
        return (
          <div>
            {value ? (
              <Link to={value} target='_parent'>
                <IoMdBrowsers />
              </Link>
            ) : (
              '-'
            )}
          </div>
        )
      }
    },
    {
      title: 'UPDATE_DATE',
      dataIndex: 'updated_at'
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
          </Space>
        )
      }
    }
  ]

  // const [isOpenForm, setIsOpenForm] = useState(false)
  // const [editableWallet, setEditableWallet] = useState<IChain>()

  const { isOpenForm, onOpenForm, onCloseForm, entity, setEntity } =
    useEdit<IChain>()
  const onUpdate = (chain: IChain) => {
    onOpenForm()
    setEntity(chain)
  }

  const onCreate = async () => {
    onOpenForm()
    setEntity(undefined)
  }

  return (
    <div>
      <Button
        icon={<CreateIcon />}
        type='primary'
        style={{ marginBottom: '10px' }}
        onClick={onCreate}
      />
      <UniTable
        dataSource={chainList}
        columns={columns}
        pagination={false}
        rowKey={'id'}
        expandable={{
          expandedRowRender: (record) => (
            <UniExpandRow>
              <RpcList chain={record} />
            </UniExpandRow>
          )
        }}
      />

      <ChainForm
        open={isOpenForm}
        chain={entity}
        onCloseFormModal={onCloseForm}
        onSubmitSucceed={() => {
          onCloseForm()
          updateChainList()
        }}
      />
    </div>
  )
}
