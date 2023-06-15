import { Button, Checkbox, Drawer, Modal, theme } from 'antd'
import { ITask } from '../../types/entities/task'
import { useState } from 'react'
import { CloseIcon } from '../../components/Icon/CloseIcon'
import { reverseFinished } from '../../api/task'
import dayjs from '../../utils/dayjs'
import EditIcon from '../../components/Icon/EditIcon'

interface ITaskItemProps {
  task: ITask
  showDate?: boolean
  onCheckChanged?: (task: ITask) => void
}

export default function TaskItem(props: ITaskItemProps) {
  const { task } = props
  const { token } = theme.useToken()

  const [openDrawer, setOpenDrawer] = useState(false)

  const onReverseFinished = async () => {
    if (task.ecosystem) {
      await reverseFinished(task.id)
    } else {
      await reverseFinished(task.id)
    }
    props.onCheckChanged && props.onCheckChanged(task)
  }

  const onCheck = async () => {
    if (!task.finished) {
      Modal.confirm({
        title: 'Are you sure to complete?',
        onOk: async () => {
          onReverseFinished()
        }
      })
    } else {
      onReverseFinished()
    }
  }

  const onEdit = async () => {}

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
    </>
  )
}
