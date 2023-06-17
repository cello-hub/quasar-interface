import { ITask } from '../../types/entities/task'
import { IPaginationParams } from '../../types/pagination'

export interface IParticipateListParams extends IPaginationParams {
  ecosystemId?: number
  clusterIds?: number[]
}

export type ISaveParticipateParams = Partial<ITask> & { ecosystemId?: number }
