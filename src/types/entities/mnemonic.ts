import IBaseEntity from './base'
import { IChain } from './chain'

export interface IMnemonic extends IBaseEntity {
  chain: IChain
  phrase: string
  remark: string
}
