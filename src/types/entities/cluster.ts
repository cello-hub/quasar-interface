import IBaseEntity from './base'

export interface ICluster extends IBaseEntity {
  name: string
  google: string
  discord: string
  twitter: string
  evm_mnemonic: string
  sui_mnemonic: string
  btc_mnemonic: string
}
