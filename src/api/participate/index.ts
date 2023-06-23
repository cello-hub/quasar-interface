import { IParticipate } from '../../types/entities/participate'
import Http from '../http'
import { ISaveParticipateParams, IParticipateListParams } from './types'

export const getParticipateList = (
  data?: IParticipateListParams
): Promise<IParticipate[]> => {
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
