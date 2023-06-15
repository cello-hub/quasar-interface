import { useEffect, useState } from 'react'
import { getFutureTaskList } from '../../api/task'
import { List } from 'antd'
import { ITask } from '../../types/entities/task'
import TaskItem from './TaskItem'

export default function FutureTask() {
  const [taskList, setTaskList] = useState<ITask[]>([])
  const getList = async () => {
    const taskList = await getFutureTaskList({
      finished: false
    })
    setTaskList(taskList)
  }

  useEffect(() => {
    getList()
  }, [])

  const onCheckChanged = (task: ITask) => {
    getList()
  }
  return (
    <List
      dataSource={taskList}
      size='small'
      pagination={false}
      renderItem={(item, index) => {
        return (
          <List.Item>
            <TaskItem task={item} showDate onCheckChanged={onCheckChanged} />
          </List.Item>
        )
      }}
    />
  )
}
