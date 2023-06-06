import IBaseEntity from './base'
import { IChain } from './chain'

export interface IRpcNode extends IBaseEntity {
  name: string
  chain: IChain
  rpc_url: string
}
