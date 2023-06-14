import { ITask } from '../../types/entities/task'

export type ISaveTaskParams = Partial<ITask> & { ecosystemId?: number }
