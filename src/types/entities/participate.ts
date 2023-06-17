import { IEcosystem } from './ecosystem'
import IBaseEntity from './base'
import { ICluster } from './cluster'

export interface IParticipate extends IBaseEntity {
  ecosystem: IEcosystem
  cluster: ICluster
  cost: number
  date: string
  addresses: string[]
  profit: number
  remark: string
}
