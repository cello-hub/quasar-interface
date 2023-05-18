import IBaseEntity from './base'
import { IToken } from './token'
import { IWallet } from './wallet'

export interface IBalance extends IBaseEntity {
  wallet: IWallet
  token: IToken
  amount: string
  token_id: number
  usdt_value: string
}
