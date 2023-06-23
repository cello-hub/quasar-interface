import { Button, Checkbox, Drawer, Modal, theme } from 'antd'
import { ITask } from '../../types/entities/task'
import { useState } from 'react'
import { CloseIcon } from '../../components/Icon/CloseIcon'
import { saveTask } from '../../api/task'
import dayjs from '../../utils/dayjs'
import EditIcon from '../../components/Icon/EditIcon'
import ParticipateForm from './ParticipateForm'
import TaskForm from './TaskForm'
import { ISaveTaskParams } from '../../api/task/types'

interface ITaskItemProps {
  task: ITask
  showDate?: boolean
  onUpdated?: (task: ITask) => void
}

export default function TaskItem(props: ITaskItemProps) {
  const { task } = props
  const { token } = theme.useToken()

  const [openDrawer, setOpenDrawer] = useState(false)
  const [openParticipateForm, setOpenParticipateForm] = useState(false)

  const onReverseFinished = async () => {
    const params: ISaveTaskParams = {
      id: task.id,
      finished: !task.finished
    }
    if (task.ecosystem) {
      params.ecosystemId = task.ecosystem.id
    }
    await saveTask(params)
    props.onUpdated && props.onUpdated(task)
  }

  const onCheck = async () => {
    if (task.ecosystem) {
      if (task.finished) {
        onReverseFinished()
      } else {
        setOpenParticipateForm(true)
      }
    } else {
      if (task.finished) {
        onReverseFinished()
      } else {
        Modal.confirm({
          title: 'Are you sure to complete?',
          onOk: async () => {
            onReverseFinished()
          }
        })
      }
    }
  }
  const [openTaskForm, setOpenTaskForm] = useState(false)
  const onEdit = async () => {
    setOpenTaskForm(true)
  }

  return (
    <>
      <div className='flex'>
        <Checkbox checked={task.finished} onChange={onCheck}>
          <span
            className={`${
              task.finished && 'line-through opacity-75 decoration-[gray]'
            }`}
          >
            {task.date && props.showDate && (
              <span>
                <span
                  style={{
                    color: `${token.colorPrimary}`
                  }}
                >
                  {dayjs(task.date).format('YYYY-MM-DD')}
                </span>
                <span> - </span>
              </span>
            )}
            <span>{task.name}</span>
            {task.ecosystem && (
              <span>
                <Button
                  type='link'
                  size='small'
                  onClick={() => setOpenDrawer(true)}
                >
                  {task.ecosystem.name}
                </Button>
              </span>
            )}
          </span>
        </Checkbox>
        <div>
          <Button
            icon={<EditIcon />}
            type='text'
            size='small'
            onClick={onEdit}
          />
        </div>
      </div>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        title='ecosystem detail'
        destroyOnClose
        closeIcon={<CloseIcon />}
      >
        <div>TODO</div>
      </Drawer>

      <TaskForm
        task={task}
        open={openTaskForm}
        onCloseFormModal={() => setOpenTaskForm(false)}
        onSubmitSucceed={() => {
          setOpenTaskForm(false)
          props.onUpdated && props.onUpdated(task)
        }}
      />

      <ParticipateForm
        task={task}
        open={openParticipateForm}
        onCloseFormModal={() => setOpenParticipateForm(false)}
        onSubmitSucceed={() => {
          setOpenParticipateForm(false)
          props.onUpdated && props.onUpdated(task)
        }}
      />
    </>
  )
}
