import IBaseEntity from './base'
import { IChain } from './chain'

export interface IToken extends IBaseEntity {
  address: string
  chain: IChain
  name: string
  symbol: string
  decimal: number
  type: string
}
