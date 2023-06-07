import Http from '../http'
import { IWallet } from './../../types/entities/wallet'
import {
  ICreateWalletParams,
  IUpdateWalletParams,
  IWalletListParams
} from './types'

export const getWallets = (params?: IWalletListParams): Promise<IWallet[]> => {
  return Http.get({
    url: '/wallet',
    data: params
  })
}

export const updateWallet = (params: IUpdateWalletParams) => {
  return Http.put({
    url: `/wallet/${params.id}`,
    data: params
  })
}

export const createWallet = () => {
  return Http.post({
    url: '/wallet'
  })
}

export const getSecret = (id: number): Promise<string> => {
  return Http.get({
    url: `/wallet/secret/${id}`
  })
}

export const createWalletManual = (data: ICreateWalletParams) => {
  return Http.post({
    url: '/wallet/manual',
    data
  })
}

// export const updateBalance = (address, balance) => {
//   return Http.put({
//     url: `/wallet/balance/${address}`,
//     data: {
//       balance
//     }
//   })
// }
