import { ITask } from '../../types/entities/task'
import Http from '../http'
import { ISaveTaskParams } from './types'

export const getTaskList = (): Promise<ITask[]> => {
  return Http.get({
    url: '/task'
  })
}

export const saveTask = (data: ISaveTaskParams) => {
  return Http.post({
    url: '/task',
    data
  })
}
