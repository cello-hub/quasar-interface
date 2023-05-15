// 撸毛事件
import http from './http'

export const getEcosystems = (params) => {
  return http.get({
    url: '/ecosystem',
    data: params
  })
}

export const createEcosystem = (data) => {
  return http.post({
    url: '/ecosystem',
    data
  })
}

export const updateEcosystem = (data) => {
  return http.put({
    url: `/ecosystem/${data.id}`,
    data
  })
}
