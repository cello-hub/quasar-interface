import { ISocial } from '../../types/entities/social'
import Http from '../http'
import { ICreateSocialParams } from './types'

export const getSocialAccounts = (): Promise<ISocial[]> => {
  return Http.get({
    url: '/social'
  })
}

export const createSocialAccount = (params: ICreateSocialParams) => {
  return Http.post({
    url: '/social',
    data: params
  })
}

export const updateSocialAccount = (data) => {
  return Http.put({
    url: `/social/${data.id}`,
    data
  })
}

export const getPassword = (account) => {
  return Http.get({
    url: `/social/password/${account}`
  })
}
