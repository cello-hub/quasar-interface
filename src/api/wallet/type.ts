import { IPaginationParams } from '../../types/pagination'

export interface IWalletListParams extends IPaginationParams {}

export interface IUpdateWalletParams {
  id: number
  alias: string
  available: boolean
}
