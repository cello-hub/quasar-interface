import { Button, Card, Tabs } from 'antd'
import TodayTask from './TodayTask'
import FutureTask from './FutureTask'
import TBDTask from './TBDTask'
import FinishedTask from './FinishedTask'
import CreateIcon from '../../components/Icon/CreateIcon'
import { useState } from 'react'
import TaskForm from './TaskForm'

export default function Task() {
  const tabItems = [
    {
      key: 'Today',
      label: 'Today',
      children: <TodayTask />
    },
    {
      key: 'Future',
      label: 'Future',
      children: <FutureTask />
    },
    {
      key: 'TBD',
      label: 'TBD',
      children: <TBDTask />
    },
    {
      key: 'Finished',
      label: 'Finished',
      children: <FinishedTask />
    }
  ]
  const [isOpenTodoForm, setIsOpenTodoForm] = useState(false)
  const onCreateTodo = () => {
    setIsOpenTodoForm(true)
  }
  return (
    <div>
      <Card title='Task' size='small'>
        <Tabs
          items={tabItems}
          centered
          size='small'
          animated={{
            inkBar: true,
            tabPane: true
          }}
          destroyInactiveTabPane
          tabBarExtraContent={{
            right: (
              <Button
                className='ml-[16px]'
                onClick={onCreateTodo}
                icon={<CreateIcon />}
                type='primary'
                size='small'
              />
            )
          }}
        />
      </Card>
      <TaskForm
        open={isOpenTodoForm}
        onCloseFormModal={() => {
          setIsOpenTodoForm(false)
        }}
        onSubmitSucceed={() => {
          setIsOpenTodoForm(false)
        }}
      />
    </div>
  )
}
