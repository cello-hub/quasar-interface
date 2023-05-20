import { IChain } from '../../types/entities/chain'
import Http from '../http'

export const getChainList = (): Promise<IChain[]> => {
  return Http.get({
    url: '/chain'
  })
}
