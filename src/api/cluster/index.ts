import { ICluster } from '../../types/entities/cluster'
import Http from '../http'
import { ISaveClusterParams } from './types'

export const getClusterList = (): Promise<ICluster[]> => {
  return Http.get({
    url: '/cluster'
  })
}

export const saveCluster = (data: ISaveClusterParams) => {
  return Http.post({
    url: '/cluster',
    data
  })
}
