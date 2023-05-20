import { IToken } from '../../types/entities/token'
import Http from '../http'
import {
  ICreateTokenParams,
  ITokenListParams,
  IUpdateTokenParams
} from './types'

export const getTokenList = (params?: ITokenListParams): Promise<IToken[]> => {
  return Http.get({
    url: '/token',
    data: params
  })
}

export const createToken = (data: ICreateTokenParams) => {
  return Http.post({
    url: '/token',
    data
  })
}

export const updateToken = (id: number, data: IUpdateTokenParams) => {
  return Http.put({
    url: `/token/${id}`,
    data
  })
}
