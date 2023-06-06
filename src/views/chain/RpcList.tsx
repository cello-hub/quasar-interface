import { LoadingOutlined } from '@ant-design/icons'
import { IChain } from '../../types/entities/chain'
import { useEffect, useState } from 'react'
import { IRpcNode } from '../../types/entities/rpc-node'
import UniTable from '../../components/UniTable'
import { Button, Space } from 'antd'
import { getRpcNodeList } from '../../api/rpc-node'
import RpcNodeForm from './RpcNodeForm'
import { ColumnsType } from 'antd/es/table'
import EditIcon from '../../components/Icon/EditIcon'
import { setDefaultRpcUrl } from '../../api/chain'

type RpcListProps = {
  chain: IChain
}

export default function RpcList(props: RpcListProps) {
  const { chain } = props
  const [loading, setLoading] = useState(false)
  const [rpcList, setRpcList] = useState<IRpcNode[]>()

  const columns: ColumnsType<IRpcNode> = [
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
      title: 'RPC Server Address',
      dataIndex: 'rpc_url',
      align: 'center'
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
              type='primary'
              onClick={() => onUpdate(record)}
            >
              edit
            </Button>
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
    console.log(chainId)
    setIsOpenRpcNodeForm(true)
  }

  const onUpdate = (rpcNode: IRpcNode) => {
    setIsOpenRpcNodeForm(true)
    setRpcNode(rpcNode)
  }

  const onSetDefault = (rpcNode: IRpcNode) => {
    setDefaultRpcUrl(chain.id, rpcNode.rpc_url)
  }

  return loading ? (
    <LoadingOutlined />
  ) : (
    <div>
      <Button type='primary' onClick={() => onCreateRpcNode(props.chain.id)}>
        create node
      </Button>
      <UniTable
        bordered={false}
        pagination={false}
        dataSource={rpcList}
        columns={columns}
      />

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
