import { DatePicker, Form, Input, Radio } from 'antd'
import UniModalForm from '../../components/UniModalForm'
import UniModal from '../../components/UniModal'
import { useEffect, useState } from 'react'
import { useForm } from 'antd/es/form/Form'
import { ITask } from '../../types/entities/task'
import { ISaveTaskParams } from '../../api/task/types'
import { saveTask } from '../../api/task'
import EcosystemSelect from '../../components/EcosystemSelect'
import dayjs from '../../utils/dayjs'
import locale from 'antd/locale/zh_CN'

interface IClusterProps {
  open: boolean
  task?: ITask
  onCloseFormModal: () => void
  onSubmitSucceed: () => void
}

export default function TaskForm(props: IClusterProps) {
  const { task } = props
  const [saving, setSaving] = useState(false)
  const [form] = useForm<ISaveTaskParams>()

  useEffect(() => {
    form.resetFields()
  }, [task])

  const onOk = async () => {
    const params = form.getFieldsValue()
    console.log(params.date?.toString())

    if (task) {
      params.id = task.id
    }

    if (params.date) {
      // params.date = dayjs(params.date)
    }
    try {
      await saveTask(params)
      setSaving(false)
      props.onSubmitSucceed()
    } catch (error) {
      setSaving(false)
    }
  }

  return (
    <UniModal
      title={task ? 'EDIT' : 'CREATE'}
      open={props.open}
      confirmLoading={saving}
      onCancel={props.onCloseFormModal}
      onOk={onOk}
    >
      <UniModalForm
        form={form}
        initialValues={{
          ...task,
          finished: false,
          date: dayjs(),
          ecosystemId: task?.ecosystem?.id
        }}
      >
        <Form.Item label='Name' name='name'>
          <Input />
        </Form.Item>

        <Form.Item label='Date' name='date'>
          <DatePicker className='w-[100%]' placeholder='' />
        </Form.Item>

        <Form.Item label='Ecosystem' name='ecosystemId'>
          <EcosystemSelect
            ecosystemList={task?.ecosystem ? [task.ecosystem] : []}
          />
        </Form.Item>

        <Form.Item label='Finished' name='finished'>
          <Radio.Group disabled>
            <Radio value={true}>YES</Radio>
            <Radio value={false}>NO</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label='Remark' name='remark'>
          <Input.TextArea rows={4} />
        </Form.Item>
      </UniModalForm>
    </UniModal>
  )
}
