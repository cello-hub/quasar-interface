import { ITask } from '../../types/entities/task'
import Http from '../http'
import { ISaveParticipateParams, IParticipateListParams } from './types'

export const getParticipateList = (
  data?: IParticipateListParams
): Promise<ITask[]> => {
  return Http.get({
    url: '/participate',
    data
  })
}

export const saveParticipate = (data: ISaveParticipateParams) => {
  return Http.post({
    url: '/participate',
    data
  })
}
