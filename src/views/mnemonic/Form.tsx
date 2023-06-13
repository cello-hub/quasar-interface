import { Form, Input, Select } from 'antd'
import UniModal from '../../components/UniModal'
import UniModalForm from '../../components/UniModalForm'
import { useState } from 'react'
import { useForm } from 'antd/es/form/Form'
import useChainStore from '../../store/useChainStore'
import { ICreateMnemonicParams } from '../../api/mnemonic/types'
import { createMnemonic } from '../../api/mnemonic'

interface IWalletForm {
  open: boolean
  onCloseFormModal: () => void
  onSubmitSucceed: () => void
}

const { TextArea } = Input

export default function MnemonicForm(props: IWalletForm) {
  const [saving, setSaving] = useState(false)
  const [form] = useForm<ICreateMnemonicParams>()

  const chainOptions = useChainStore((state) => state.chainOptions)

  const onOk = async () => {
    setSaving(true)
    const values = form.getFieldsValue()

    await createMnemonic(values)
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
      <UniModalForm form={form} autoComplete='off' labelAlign='right'>
        <Form.Item label='Phrase' name='phrase'>
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label='Chain' name='chain_id' valuePropName='chain.topic'>
          <Select options={chainOptions} />
        </Form.Item>

        <Form.Item label='Remark' name='remark'>
          <Input />
        </Form.Item>
      </UniModalForm>
    </UniModal>
  )
}
