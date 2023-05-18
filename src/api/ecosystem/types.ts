import { IPaginationParams } from '../../types/pagination'

export interface IEcosystemListParams extends IPaginationParams {}

export interface ICreateEcosystemParams {
  name: string
  chain_id: number
  desc: string
  link: string
  discord: string
  twitter: string
  finished: boolean
  remark: string
}

export interface IUpdateEcosystemParams {
  id: number
  alias: string
  available: boolean
}
