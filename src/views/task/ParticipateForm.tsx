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
import { getParticipateList } from '../../api/participate'
import { IParticipate } from '../../types/entities/participate'

interface IParticipateFormProps {
  open: boolean
  task: ITask
  onCloseFormModal: () => void
  onSubmitSucceed: () => void
}

export default function ParticipateForm(props: IParticipateFormProps) {
  const { task } = props
  const [saving, setSaving] = useState(false)
  const [participatedList, setParticipatedList] = useState<IParticipate[]>([])

  const [form] = useForm<ITaskParticipateParams>()
  const clusterOptions = useClusterStore((state) => state.clusterOptions)
  const [participateClusterOptions, setParticipateClusterOptions] = useState<
    { label: string; value: number; disabled: boolean }[]
  >([])

  useEffect(() => {
    form.resetFields()

    if (task && task.ecosystem) {
      getParticipateList({
        ecosystemId: task.ecosystem.id
      }).then((list) => {
        setParticipatedList(list)
        form.setFieldValue(
          'clusterIds',
          list.map((item) => item.cluster.id)
        )
      })
    }
  }, [task])

  useEffect(() => {
    setParticipateClusterOptions(clusterOptions)
    if (
      participatedList &&
      participatedList.length > 0 &&
      clusterOptions &&
      clusterOptions.length > 0
    ) {
      const clusterIds = participatedList.map((participate) => {
        return participate.cluster.id
      })
      const list = clusterOptions.map((cluster) => {
        if (clusterIds.indexOf(cluster.value) > -1) {
          cluster.disabled = true
        }
        return cluster
      })

      setParticipateClusterOptions(list)
    }
  }, [clusterOptions, participatedList])

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
          <Select options={participateClusterOptions} mode='multiple' />
        </Form.Item>
      </UniModalForm>
    </UniModal>
  )
}
