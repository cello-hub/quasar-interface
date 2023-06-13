import { Form, Input, InputNumber, Select } from 'antd'
import UniModal from '../../components/UniModal'
import UniModalForm from '../../components/UniModalForm'
import { useEffect, useState } from 'react'
import { useForm } from 'antd/es/form/Form'
import { IToken } from '../../types/entities/token'
import { TokenType, TokenTypeOptions } from '../../constants/token-type'
import useChainStore from '../../store/useChainStore'
import { createToken, updateToken } from '../../api/token'

interface ITokenForm {
  open: boolean
  token?: IToken
  onCloseFormModal: () => void
  onSubmitSucceed: () => void
}

export default function TokenForm(props: ITokenForm) {
  const { token } = props
  const [saving, setSaving] = useState(false)
  const [form] = useForm<IToken & { chain_id: number }>()
  const chainOptions = useChainStore((state) => state.chainOptions)

  useEffect(() => {
    form.resetFields()
  }, [token])

  const onOk = async () => {
    setSaving(true)
    const values = form.getFieldsValue()
    if (token?.id) {
      await updateToken(token.id, values)
    } else {
      await createToken(values)
    }
    setSaving(false)
    props.onSubmitSucceed()
  }

  return (
    <UniModal
      title={token?.id ? 'EDIT' : 'CREATE'}
      open={props.open}
      confirmLoading={saving}
      onCancel={props.onCloseFormModal}
      onOk={onOk}
    >
      <UniModalForm
        form={form}
        autoComplete='off'
        labelAlign='right'
        initialValues={{
          ...token,
          chain_id: token?.chain.topic,
          type: token?.type ?? TokenType[0]
        }}
      >
        <Form.Item label='Name' name='name'>
          <Input />
        </Form.Item>

        <Form.Item label='Contract' name='address'>
          <Input />
        </Form.Item>

        <Form.Item label='Chain' name='chain_id'>
          <Select options={chainOptions} />
        </Form.Item>

        <Form.Item label='Token Type' name='type'>
          <Select options={TokenTypeOptions} />
        </Form.Item>

        <Form.Item label='Symbol' name='symbol'>
          <Input />
        </Form.Item>

        <Form.Item label='Decimal' name='decimal'>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
      </UniModalForm>
    </UniModal>
  )
}
