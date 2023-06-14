import { Card, Tabs } from 'antd'
import TodayTask from './TodayTask'
import FutureTask from './FutureTask'
import TBDTask from './TBDTask'
import FinishedTask from './FinishedTask'

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
  return (
    <Card title='Task' size='small'>
      <Tabs items={tabItems} centered size='small' />
    </Card>
  )
}
