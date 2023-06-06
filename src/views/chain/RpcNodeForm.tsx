import { useState } from 'react'
import UniModal from '../../components/UniModal'
import UniModalForm from '../../components/UniModalForm'
import { Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { ISaveRpcNodeParams } from '../../api/rpc-node/types'
import { saveRpcNode } from '../../api/rpc-node'
import { IRpcNode } from '../../types/entities/rpc-node'

interface IRpcNodeFormProps {
  chainId: number
  open: boolean
  rpcNode: IRpcNode | undefined
  onCloseFormModal: () => void
  onSubmitSucceed: () => void
}
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 }
}

export default function RpcNodeForm(props: IRpcNodeFormProps) {
  const [saving, setSaving] = useState(false)

  const onOk = async () => {
    setSaving(true)

    const params = form.getFieldsValue()

    console.log(params)
    console.log(props.chainId)

    await saveRpcNode({
      ...params,
      chainId: props.chainId
    })

    setSaving(false)

    props.onSubmitSucceed()
  }

  const [form] = useForm<ISaveRpcNodeParams>()

  return (
    <UniModal
      title='EDIT'
      open={props.open}
      destroyOnClose
      confirmLoading={saving}
      onCancel={props.onCloseFormModal}
      onOk={onOk}
    >
      <UniModalForm
        form={form}
        autoComplete='off'
        labelAlign='right'
        initialValues={{
          name: props.rpcNode?.name,
          url: props.rpcNode?.rpc_url
        }}
        {...layout}
      >
        <Form.Item label='Name' name='name'>
          <Input />
        </Form.Item>
        <Form.Item label='Url' name='url'>
          <Input />
        </Form.Item>
      </UniModalForm>
    </UniModal>
  )
}
