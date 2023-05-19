import { ISocial } from '../../types/entities/social'
import Http from '../http'
import { ICreateSocialParams, IUpdateSocialParams } from './types'

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

export const updateSocialAccount = (id: number, data: IUpdateSocialParams) => {
  return Http.put({
    url: `/social/${id}`,
    data
  })
}

export const getPassword = (id: number) => {
  return Http.get({
    url: `/social/password/${id}`
  })
}
