import IBaseEntity from './base'
import { IChain } from './chain'

export interface IRpcNode extends IBaseEntity {
  name: 'Mainnet' | 'Testnet'
  chain: IChain
  is_mainnet: boolean
  rpc_url: string
}
