import { Button, Card } from 'antd'
import { useState } from 'react'
import { getTaskList } from '../../api/task'
import Task from '../task'

export default function Dashboard() {
  const [isOpenTodoForm, setIsOpenTodoForm] = useState(true)
  const onCreateTodo = () => {
    setIsOpenTodoForm(true)
  }

  getTaskList()
  return (
    <div>
      <Task />
    </div>
  )
}
