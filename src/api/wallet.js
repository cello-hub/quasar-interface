// 账号管理
import http from './http'

export const getWallets = (params) => {
  return http.get({
    url: '/wallet',
    data: params
  })
}

export const createWallet = () => {
  return http.post({
    url: '/wallet'
  })
}

export const getPrivateKey = (address) => {
  return http.get({
    url: `/wallet/pk/${address}`
  })
}

export const updateBalance = (address, balance) => {
  return http.put({
    url: `/wallet/balance/${address}`,
    data: {
      balance
    }
  })
}

export const updateWallet = (params) => {
  return http.put({
    url: `/wallet/${params.id}`,
    data: params
  })
}
