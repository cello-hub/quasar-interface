import { useEffect, useState } from 'react'
import { getTodayTaskList } from '../../api/task'
import { ITask } from '../../types/entities/task'
import { List } from 'antd'
import TaskItem from './TaskItem'
import dayjs from 'dayjs/esm'

export default function TodayTask() {
  const [taskList, setTaskList] = useState<ITask[]>([])
  const getList = async () => {
    const taskList = await getTodayTaskList()
    setTaskList(taskList)
  }

  useEffect(() => {
    getList()
  }, [])

  const onCheckChanged = (task: ITask) => {
    getList()
  }

  return (
    <div>
      <div className='font-[700]'>{dayjs().format('YYYY-MM-DD')}</div>
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
    </div>
  )
}
