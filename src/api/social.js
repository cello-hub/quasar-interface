import http from './http'

export const getSocials = () => {
  return http.get({
    url: '/social'
  })
}

export const createSocialAccount = (data) => {
  return http.post({
    url: '/social',
    data
  })
}

export const updateSocialAccount = (data) => {
  return http.put({
    url: `/social/${data.id}`,
    data
  })
}

export const getPassword = (account) => {
  return http.get({
    url: `/social/password/${account}`
  })
}
