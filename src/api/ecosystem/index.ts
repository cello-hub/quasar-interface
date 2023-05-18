import { IEcosystem } from '../../types/entities/ecosystem'
import http from '../http'
import {
  ICreateEcosystemParams,
  IEcosystemListParams,
  IUpdateEcosystemParams
} from './types'

export const getEcosystems = (
  params?: IEcosystemListParams
): Promise<IEcosystem[]> => {
  return http.get({
    url: '/ecosystem',
    data: params
  })
}

export const createEcosystem = (data: ICreateEcosystemParams) => {
  return http.post({
    url: '/ecosystem',
    data
  })
}

export const updateEcosystem = (data: IUpdateEcosystemParams) => {
  return http.put({
    url: `/ecosystem/${data.id}`,
    data
  })
}
