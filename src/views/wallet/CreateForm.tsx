import { Form, Input, Radio, Select } from 'antd'
import { IWallet } from '../../types/entities/wallet'
import UniModal from '../../components/UniModal'
import UniModalForm from '../../components/UniModalForm'
import { useState } from 'react'
import { useForm } from 'antd/es/form/Form'
import useChainStore from '../../store/useChainStore'
import { ICreateWalletParams } from '../../api/wallet/types'
import { createWalletManual } from '../../api/wallet'

interface IWalletForm {
  open: boolean
  onCloseFormModal: () => void
  onSubmitSucceed: () => void
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 }
}

export default function WalletCreateForm(props: IWalletForm) {
  const [saving, setSaving] = useState(false)
  const [form] = useForm<ICreateWalletParams>()

  const chainOptions = useChainStore((state) => state.chainOptions)

  const onOk = async () => {
    setSaving(true)
    const values = form.getFieldsValue()
    console.log(values)

    // await updateWallet({
    //   id: wallet.id,
    //   alias,
    //   available
    // })

    await createWalletManual(values)
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
        {...layout}
      >
        <Form.Item label='ALIAS' name='alias'>
          <Input />
        </Form.Item>
        <Form.Item label='ADDRESS' name='address'>
          <Input />
        </Form.Item>
        <Form.Item label='SECRET' name='secret'>
          <Input />
        </Form.Item>

        <Form.Item label='Chain' name='chainId' valuePropName='chain.topic'>
          <Select options={chainOptions} />
        </Form.Item>

        <Form.Item label='AVAILABLE' name='available' initialValue={true}>
          <Radio.Group>
            <Radio value={true}>YES</Radio>
            <Radio value={false}>NO</Radio>
          </Radio.Group>
        </Form.Item>
      </UniModalForm>
    </UniModal>
  )
}
