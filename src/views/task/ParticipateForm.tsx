import { Form, Select } from 'antd'
import UniModalForm from '../../components/UniModalForm'
import UniModal from '../../components/UniModal'
import { useEffect, useState } from 'react'
import { useForm } from 'antd/es/form/Form'
import { IEcosystem } from '../../types/entities/ecosystem'
import useClusterStore from '../../store/useClusterStore'
import { ITaskParticipateParams } from '../../api/task/types'
import { executeParticipate } from '../../api/task'
import { ITask } from '../../types/entities/task'

interface IParticipateFormProps {
  open: boolean
  task: ITask
  onCloseFormModal: () => void
  onSubmitSucceed: () => void
}

export default function ParticipateForm(props: IParticipateFormProps) {
  const { task } = props
  const [saving, setSaving] = useState(false)
  const [form] = useForm<ITaskParticipateParams>()
  const clusterOptions = useClusterStore((state) => state.clusterOptions)

  useEffect(() => {
    form.resetFields()
  }, [task])

  const onOk = async () => {
    setSaving(true)

    try {
      const params = form.getFieldsValue()
      await executeParticipate({
        taskId: task.id,
        clusterIds: params.clusterIds
      })
      setSaving(false)
      props.onSubmitSucceed()
    } catch (error) {
      setSaving(false)
    }
  }

  return (
    <UniModal
      title={'Finish task'}
      open={props.open}
      confirmLoading={saving}
      onCancel={props.onCloseFormModal}
      onOk={onOk}
    >
      <UniModalForm form={form}>
        <Form.Item label='Clusters' name='clusterIds'>
          <Select options={clusterOptions} mode='multiple' />
        </Form.Item>
      </UniModalForm>
    </UniModal>
  )
}
