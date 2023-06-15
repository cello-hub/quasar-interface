import { useState } from 'react'
import Task from '../task'

export default function Dashboard() {
  const [isOpenTodoForm, setIsOpenTodoForm] = useState(true)
  const onCreateTodo = () => {
    setIsOpenTodoForm(true)
  }
  return (
    <div>
      <Task />
    </div>
  )
}
