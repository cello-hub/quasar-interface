import { useEffect, useState } from 'react'
import { getTaskList } from '../../api/task'
import { ITask } from '../../types/entities/task'
import { Button, Card, Checkbox, List, Typography } from 'antd'
import TaskForm from './TaskForm'
import CreateIcon from '../../components/Icon/CreateIcon'

export default function TodayTask() {
  const [taskList, setTaskList] = useState<ITask[]>([])
  const getList = async () => {
    const taskList = await getTaskList()
    setTaskList(taskList)
  }

  useEffect(() => {
    getList()
  }, [])

  const [isOpenTodoForm, setIsOpenTodoForm] = useState(false)
  const onCreateTodo = () => {
    setIsOpenTodoForm(true)
  }

  const onCheckChange = (task: ITask, index: number) => {
    // task.finished = !task.finished
    // let newTaskList = [...taskList]
    // newTaskList.splice(index, 1, task)
    // setTaskList(newTaskList)

    // task 绑定了生态
    if (task.ecosystem) {
    } else {
    }
  }

  return (
    <div>
      <Button
        className='ml-[16px]'
        onClick={onCreateTodo}
        icon={<CreateIcon />}
        type='primary'
        size='small'
      ></Button>

      <List
        dataSource={taskList}
        size='small'
        pagination={false}
        renderItem={(item, index) => {
          return (
            <List.Item>
              <Checkbox
                checked={item.finished}
                onChange={() => onCheckChange(item, index)}
              >
                <span
                  className={`${item.finished && 'line-through opacity-50'}`}
                >
                  {item.name}
                </span>
              </Checkbox>
            </List.Item>
          )
        }}
      />

      <TaskForm
        open={isOpenTodoForm}
        onCloseFormModal={() => {
          setIsOpenTodoForm(false)
        }}
        onSubmitSucceed={() => {
          setIsOpenTodoForm(false)
          getList()
        }}
      />
    </div>
  )
}
