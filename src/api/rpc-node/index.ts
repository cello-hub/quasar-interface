import { IRpcNode } from '../../types/entities/rpc-node'
import Http from '../http'
import { ISaveRpcNodeParams } from './types'

export const getRpcNodeList = (chainId: number): Promise<IRpcNode[]> => {
  return Http.get({
    url: `/rpc_node/${chainId}`
  })
}

export const saveRpcNode = (data: ISaveRpcNodeParams) => {
  return Http.post({
    url: '/rpc_node',
    data
  })
}
