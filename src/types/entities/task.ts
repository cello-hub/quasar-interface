import IBaseEntity from './base'
import { IEcosystem } from './ecosystem'

export interface ITask extends IBaseEntity {
  name: string
  date?: string
  ecosystem?: IEcosystem
  finished: boolean
  remark?: string
}
