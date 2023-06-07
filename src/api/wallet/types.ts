import { IPaginationParams } from '../../types/pagination'

export interface IWalletListParams extends IPaginationParams {}

export interface IUpdateWalletParams {
  id: number
  alias: string
  available: boolean
}

export interface ICreateWalletParams {
  alias?: string
  address: string
  secret?: string
  chainId: number
  available: boolean
}
