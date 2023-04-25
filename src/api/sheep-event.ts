// 撸毛事件
import http from './http'

export const getSheepEvents = (params) => {
  return http.get({
    url: '/sheep-event',
    data: params
  })
}

export const createSheepEvent = (data) => {
  return http.post({
    url: '/sheep-event',
    data
  })
}

export const updateSheepEvent = (data) => {
  return http.put({
    url: `/sheep-event/${data.id}`,
    data
  })
}
