import IBaseEntity from './base'

export interface IChain extends IBaseEntity {
  topic: string
  chain_id: number
  hex_chain_id: string
  symbol: string
  explorer: string
}
