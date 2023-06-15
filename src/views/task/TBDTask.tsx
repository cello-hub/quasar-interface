import { useEffect, useState } from 'react'
import { getTaskList } from '../../api/task'
import { ITask } from '../../types/entities/task'
import { List } from 'antd'
import TaskItem from './TaskItem'

export default function TBDTask() {
  const [taskList, setTaskList] = useState<ITask[]>([])
  const getList = async () => {
    const taskList = await getTaskList({
      date: '',
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
            <TaskItem task={item} onCheckChanged={onCheckChanged} />
          </List.Item>
        )
      }}
    />
  )
}
