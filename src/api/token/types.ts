import { IPaginationParams } from './../../types/pagination'

export interface ITokenListParams extends IPaginationParams {}

export interface ICreateTokenParams {
  name: string
  address: string
  chain_id: number
  type: string
  symbol: string
  decimal: number
}

export interface IUpdateTokenParams extends ICreateTokenParams {}
