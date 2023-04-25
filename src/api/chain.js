// 节点管理
import http from './http'

export const getChains = (params) => {
  return http.get({
    url: '/chain',
    data: params
  })
}

export const createChain = (params) => {
  return http.post({
    url: '/chain',
    data: params
  })
}
