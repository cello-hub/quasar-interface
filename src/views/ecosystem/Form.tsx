import { Form, Input, Radio, Select } from 'antd'
import UniModalForm from '../../components/UniModalForm'
import UniModal from '../../components/UniModal'
import { useEffect, useState } from 'react'
import { useForm } from 'antd/es/form/Form'
import { IEcosystem } from '../../types/entities/ecosystem'
import TextArea from 'antd/es/input/TextArea'
import useChainStore from '../../store/useChainStore'
import { createEcosystem, updateEcosystem } from '../../api/ecosystem'

interface IEcosystemProps {
  open: boolean
  onCloseFormModal: () => void
  ecosystem?: IEcosystem
  onSubmitSucceed: () => void
}

export default function EcosystemForm(props: IEcosystemProps) {
  const { ecosystem } = props
  const [saving, setSaving] = useState(false)
  const [form] = useForm<IEcosystem>()
  const chainOptions = useChainStore((state) => state.chainOptions)

  useEffect(() => {
    form.resetFields()
  }, [ecosystem])

  const onOk = async () => {
    setSaving(true)
    const filedsValue = form.getFieldsValue()

    if (ecosystem?.id) {
      await updateEcosystem({
        ...filedsValue,
        id: ecosystem.id,
        chain_id: form.getFieldValue('chain_id')
      })
    } else {
      await createEcosystem({
        ...filedsValue,
        chain_id: form.getFieldValue('chain_id')
      })
    }

    setSaving(false)
    props.onSubmitSucceed()
  }
  return (
    <UniModal
      title={ecosystem ? 'EDIT' : 'CREATE'}
      open={props.open}
      destroyOnClose
      confirmLoading={saving}
      onCancel={props.onCloseFormModal}
      onOk={onOk}
    >
      <UniModalForm
        form={form}
        initialValues={{
          finished: true,
          chain_id: ecosystem?.chain?.id,
          ...ecosystem
        }}
      >
        <Form.Item label='Name' name='name' rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label='Link' name='link'>
          <Input />
        </Form.Item>

        <Form.Item label='Discord' name='discord'>
          <Input />
        </Form.Item>

        <Form.Item label='Twitter' name='twitter'>
          <Input />
        </Form.Item>

        <Form.Item label='Chain' name='chain_id'>
          <Select options={chainOptions} />
        </Form.Item>

        <Form.Item label='Finished' name='finished'>
          <Radio.Group>
            <Radio value={true}>YES</Radio>
            <Radio value={false}>NO</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label='Description' name='desc'>
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label='Remark' name='remark'>
          <TextArea rows={4} />
        </Form.Item>
      </UniModalForm>
    </UniModal>
  )
}
