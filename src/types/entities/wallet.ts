import { IChain } from './chain'

export interface IWallet {
  id: number
  address: string
  alias: string
  chain: IChain
  amount: string
  available: boolean
  created_at: string
  updated_at: string
}
