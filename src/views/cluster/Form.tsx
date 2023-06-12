import { Form, Input, Radio, Select } from 'antd'
import UniModalForm from '../../components/UniModalForm'
import UniModal from '../../components/UniModal'
import { useEffect, useState } from 'react'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'
import { ICluster } from '../../types/entities/cluster'
import { saveCluster } from '../../api/cluster'
import { ISaveClusterParams } from '../../api/cluster/types'

interface IClusterProps {
  open: boolean
  cluster?: ICluster
  onCloseFormModal: () => void
  onSubmitSucceed: () => void
}

export default function ClusterForm(props: IClusterProps) {
  const { cluster } = props
  const [saving, setSaving] = useState(false)
  const [form] = useForm<ISaveClusterParams | undefined>()

  useEffect(() => {
    console.log(cluster)

    form.setFieldsValue(cluster)
  }, [cluster])

  useEffect(() => {
    console.log('form changedpppp-====')

    console.log(form.getFieldsValue())
  }, [form])

  const onOk = async () => {
    setSaving(true)
    const params = form.getFieldsValue()
    if (cluster) {
      params!.id = cluster.id
    }
    try {
      await saveCluster(params!)
      props.onSubmitSucceed()
    } catch (error) {
      setSaving(false)
    }
  }
  return (
    <UniModal
      title={cluster ? 'EDIT' : 'CREATE'}
      open={props.open}
      confirmLoading={saving}
      onCancel={props.onCloseFormModal}
      onOk={onOk}
    >
      <UniModalForm form={form} initialValues={cluster}>
        <Form.Item label='Name' name='name' rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label='Google' name='google'>
          <Input />
        </Form.Item>

        <Form.Item label='Twitter' name='twitter'>
          <Input />
        </Form.Item>

        <Form.Item label='Evm mnemonic' name='evm_mnemonic'>
          <TextArea rows={2} />
        </Form.Item>

        <Form.Item label='Sui mnemonic' name='sui_mnemonic'>
          <TextArea rows={2} />
        </Form.Item>

        <Form.Item label='Btc mnemonic' name='btc_mnemonic'>
          <TextArea rows={2} />
        </Form.Item>
      </UniModalForm>
    </UniModal>
  )
}
