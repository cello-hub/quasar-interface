import { useEffect, useState } from 'react'
import { ITask } from '../../types/entities/task'
import { getExpiredTaskList } from '../../api/task'
import { List } from 'antd'
import TaskItem from './TaskItem'

export default function ExpiredTask() {
  const [taskList, setTaskList] = useState<ITask[]>([])
  const getList = async () => {
    const taskList = await getExpiredTaskList({
      finished: false
    })
    setTaskList(taskList)
  }

  useEffect(() => {
    getList()
  }, [])

  const onUpdated = (task: ITask) => {
    getList()
  }
  return (
    <List
      dataSource={taskList}
      size='small'
      pagination={{
        position: 'bottom',
        align: 'center'
      }}
      renderItem={(item, index) => {
        return (
          <List.Item>
            <TaskItem task={item} showDate onUpdated={onUpdated} />
          </List.Item>
        )
      }}
    />
  )
}
