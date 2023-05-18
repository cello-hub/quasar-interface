import IBaseEntity from './base'
import { IChain } from './chain'

export interface IEcosystem extends IBaseEntity {
  name: string
  desc: string
  chain: IChain
  link: string
  discord: string
  twitter: string
  finished: boolean
  remark: string
}
