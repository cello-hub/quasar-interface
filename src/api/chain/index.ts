import { IChain } from '../../types/entities/chain'
import Http from '../http'
import { ISaveChainParams } from './types'

export const getChainList = (): Promise<IChain[]> => {
  return Http.get({
    url: '/chain'
  })
}

export const saveChain = (data: ISaveChainParams) => {
  return Http.post({
    url: '/chain/save',
    data
  })
}

export const setDefaultRpcUrl = (chainId: number, url: string) => {
  return Http.post({
    url: '/chain/set_rpc',
    data: {
      chainId: chainId,
      url: url
    }
  })
}
