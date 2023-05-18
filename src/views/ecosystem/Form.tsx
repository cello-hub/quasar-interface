import { Form, Input, Radio, Select } from 'antd'
import UniModalForm from '../../components/UniModalForm'
import UniModal from '../../components/UniModal'
import { useEffect, useState } from 'react'
import { useForm } from 'antd/es/form/Form'
import { IEcosystem } from '../../types/entities/ecosystem'
import TextArea from 'antd/es/input/TextArea'
import useChainStore from '../../store/useChainStore'
import { createEcosystem } from '../../api/ecosystem'

interface IEcosystemProps {
  open: boolean
  onCloseFormModal: () => void
  ecosystem?: IEcosystem
  onSubmitSucceed: () => void
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}

export default function EcosystemForm(props: IEcosystemProps) {
  const { ecosystem } = props
  const [saving, setSaving] = useState(false)
  const [form] = useForm<IEcosystem>()
  const chainList = useChainStore((state) => state.chainList)
  const [chainOptions, setChainOptions] = useState<
    { label: string; value: string }[]
  >([])

  useEffect(() => {
    if (chainList && chainList.length > 0) {
      setChainOptions(
        chainList.map((chain) => {
          return {
            label: chain.topic,
            value: chain.id
          }
        })
      )
    }
  }, [chainList])

  const onOk = async () => {
    setSaving(true)
    const filedsValue = form.getFieldsValue()
    await createEcosystem({
      ...filedsValue,
      chain_id: form.getFieldValue('chain_id')
    })
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
      <UniModalForm form={form} initialValues={ecosystem} {...layout}>
        <Form.Item label='NAME' name='name' rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label='LINK' name='link'>
          <Input />
        </Form.Item>

        <Form.Item label='DISCORD' name='discord'>
          <Input />
        </Form.Item>

        <Form.Item label='TWITTER' name='twitter'>
          <Input />
        </Form.Item>

        <Form.Item label='CHAIN' name='chain_id' valuePropName='chain.topic'>
          <Select options={chainOptions} />
        </Form.Item>

        <Form.Item label='FINISHED' name='finished'>
          <Radio.Group>
            <Radio value={true}>YES</Radio>
            <Radio value={false}>NO</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label='DESCRIPTION' name='desc'>
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label='REMARK' name='remark'>
          <TextArea rows={4} />
        </Form.Item>
      </UniModalForm>
    </UniModal>
  )
}
