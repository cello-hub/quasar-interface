import Http from '../http'
import { ISaveClusterParams } from './types'

export const getClusterList = () => {
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
