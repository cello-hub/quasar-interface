import { ITask } from '../../types/entities/task'
import Http from '../http'
import {
  ISaveTaskParams,
  ITaskListParams,
  ITaskParticipateParams
} from './types'

export const getTaskList = (data?: ITaskListParams): Promise<ITask[]> => {
  return Http.post({
    url: '/task/list',
    data
  })
}

export const getTodayTaskList = (data?: ITaskListParams): Promise<ITask[]> => {
  return Http.post({
    url: '/task/today',
    data
  })
}

export const getExpiredTaskList = (
  data?: ITaskListParams
): Promise<ITask[]> => {
  return Http.post({
    url: '/task/expired',
    data
  })
}

export const getFutureTaskList = (data?: ITaskListParams): Promise<ITask[]> => {
  return Http.post({
    url: '/task/future',
    data
  })
}

export const saveTask = (data: ISaveTaskParams) => {
  return Http.post({
    url: '/task',
    data
  })
}

export const executeParticipate = (data: ITaskParticipateParams) => {
  return Http.post({
    url: '/task/participate',
    data
  })
}
