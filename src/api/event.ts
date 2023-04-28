// 撸毛事件
import http from './http'

export const getEvents = (params) => {
  return http.get({
    url: '/event',
    data: params
  })
}

export const createEvent = (data) => {
  return http.post({
    url: '/event',
    data
  })
}

export const updateEvent = (data) => {
  return http.put({
    url: `/event/${data.id}`,
    data
  })
}
