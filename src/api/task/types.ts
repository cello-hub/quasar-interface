import { ITask } from '../../types/entities/task'
import { IPaginationParams } from '../../types/pagination'

export type ISaveTaskParams = Partial<ITask> & { ecosystemId?: number }

export interface ITaskListParams extends IPaginationParams {
  date?: string
  finished?: boolean
}
