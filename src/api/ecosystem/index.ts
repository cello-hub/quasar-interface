import { IEcosystem } from '../../types/entities/ecosystem'
import Http from '../http'
import {
  ICreateEcosystemParams,
  IEcosystemListParams,
  IUpdateEcosystemParams
} from './types'

export const getEcosystems = (
  params?: IEcosystemListParams
): Promise<IEcosystem[]> => {
  return Http.get({
    url: '/ecosystem',
    data: params
  })
}

export const createEcosystem = (data: ICreateEcosystemParams) => {
  return Http.post({
    url: '/ecosystem',
    data
  })
}

export const updateEcosystem = (data: IUpdateEcosystemParams) => {
  return Http.put({
    url: `/ecosystem/${data.id}`,
    data
  })
}
