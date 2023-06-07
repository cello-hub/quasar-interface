import { LoadingOutlined } from '@ant-design/icons'
import { IChain } from '../../types/entities/chain'
import { useEffect, useState } from 'react'
import { IRpcNode } from '../../types/entities/rpc-node'
import UniTable from '../../components/UniTable'
import { App, Button, Space, Tooltip, message } from 'antd'
import { getRpcNodeList } from '../../api/rpc-node'
import RpcNodeForm from './RpcNodeForm'
import { ColumnsType } from 'antd/es/table'
import { setDefaultRpcUrl } from '../../api/chain'
import EditIcon from '../../components/Icon/EditIcon'

type RpcListProps = {
  chain: IChain
}

export default function RpcList(props: RpcListProps) {
  const { chain } = props
  const [loading, setLoading] = useState(false)
  const [rpcList, setRpcList] = useState<IRpcNode[]>()
  const [latencyList, setLatencyList] = useState<number[]>()

  const columns: ColumnsType<IRpcNode> = [
    {
      title: 'NAME',
      dataIndex: 'name',
      align: 'center',
      width: '150px'
    },
    {
      title: 'RPC Server Address',
      dataIndex: 'rpc_url',
      align: 'center',
      width: '500px',
      ellipsis: true,
      render: (url) => {
        return <Tooltip title={url}>{url}</Tooltip>
      }
    },
    {
      title: 'Latency',
      dataIndex: 'latency',
      align: 'center'
      // render: async (_, record) => {
      //   const
      //   return <div>10ms</div>
      // }
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
              onClick={() => onUpdate(record)}
              icon={<EditIcon />}
            />
            <Button
              size='small'
              type='primary'
              onClick={() => onSetDefault(record)}
            >
              set default
            </Button>
          </Space>
        )
      }
    }
  ]

  const getList = async () => {
    setLoading(true)
    const list = await getRpcNodeList(props.chain.id)

    // 获取延迟数据列表
    // list
    setRpcList(list)
    setLoading(false)
  }

  useEffect(() => {
    if (props && props.chain && props.chain.id) {
      getList()
    }
  }, [props])

  const [isOpenRpcNodeForm, setIsOpenRpcNodeForm] = useState(false)
  const [rpcNode, setRpcNode] = useState<IRpcNode>()
  const onCreateRpcNode = async (chainId: number) => {
    setIsOpenRpcNodeForm(true)
  }

  const onUpdate = (rpcNode: IRpcNode) => {
    setIsOpenRpcNodeForm(true)
    setRpcNode(rpcNode)
  }

  const onSetDefault = async (rpcNode: IRpcNode) => {
    await setDefaultRpcUrl(chain.id, rpcNode.rpc_url)

    message.success('set succeed')
  }

  return loading ? (
    <LoadingOutlined />
  ) : (
    <div>
      <Button type='primary' onClick={() => onCreateRpcNode(props.chain.id)}>
        add rpc url
      </Button>
      {rpcList && rpcList.length > 0 && (
        <UniTable
          size='small'
          pagination={false}
          dataSource={rpcList}
          columns={columns}
          rowKey={'id'}
        />
      )}

      <RpcNodeForm
        open={isOpenRpcNodeForm}
        chainId={chain.id}
        rpcNode={rpcNode}
        onCloseFormModal={() => {
          setIsOpenRpcNodeForm(false)
        }}
        onSubmitSucceed={() => {
          setIsOpenRpcNodeForm(false)
          getList()
        }}
      ></RpcNodeForm>
    </div>
  )
}
