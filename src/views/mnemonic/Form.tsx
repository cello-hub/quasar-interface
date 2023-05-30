import { Form, Input, Radio } from 'antd'
import { IWallet } from '../../types/entities/wallet'
import UniModal from '../../components/UniModal'
import UniModalForm from '../../components/UniModalForm'
import { useState } from 'react'
import { updateWallet } from '../../api/wallet'
import { useForm } from 'antd/es/form/Form'

interface IWalletForm {
  open: boolean
  onCloseFormModal: () => void
  wallet: IWallet
  onSubmitSucceed: () => void
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 }
}

export default function WalletForm(props: IWalletForm) {
  const { wallet } = props
  const [saving, setSaving] = useState(false)
  const [form] = useForm<IWallet>()

  const onOk = async () => {
    setSaving(true)
    const { alias, available } = form.getFieldsValue()
    await updateWallet({
      id: wallet.id,
      alias,
      available
    })
    setSaving(false)
    props.onSubmitSucceed()
  }

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
        initialValues={wallet}
        {...layout}
      >
        <Form.Item label='ADDRESS'>{wallet?.address}</Form.Item>
        <Form.Item label='ALIAS' name='alias'>
          <Input />
        </Form.Item>

        <Form.Item label='AVAILABLE' name='available'>
          <Radio.Group>
            <Radio value={true}>YES</Radio>
            <Radio value={false}>NO</Radio>
          </Radio.Group>
        </Form.Item>
      </UniModalForm>
    </UniModal>
  )
}
