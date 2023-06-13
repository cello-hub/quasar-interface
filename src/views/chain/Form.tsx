import { Form, Input, Radio, message } from 'antd'
import UniModal from '../../components/UniModal'
import UniModalForm from '../../components/UniModalForm'
import { useEffect, useState } from 'react'
import { useForm } from 'antd/es/form/Form'
import { IChain } from '../../types/entities/chain'
import { ISaveChainParams } from '../../api/chain/types'
import { saveChain } from '../../api/chain'

interface IChainForm {
  open: boolean
  chain: IChain | undefined
  onCloseFormModal: () => void
  onSubmitSucceed: () => void
}

export default function ChainForm(props: IChainForm) {
  const { chain } = props
  const [saving, setSaving] = useState(false)
  const [form] = useForm<ISaveChainParams>()

  useEffect(() => {
    if (chain) form.setFieldsValue(chain)
  }, [chain])

  const onOk = async () => {
    setSaving(true)

    const params = form.getFieldsValue()

    if (chain?.id) {
      params.id = chain.id
    }

    await saveChain(params)
      .then(() => {
        props.onSubmitSucceed()
      })
      .catch(() => {
        message.error('save failed')
      })
      .finally(() => {
        setSaving(false)
      })
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
        initialValues={chain}
      >
        <Form.Item label='Topic' name='topic'>
          <Input />
        </Form.Item>
        <Form.Item label='Symbol' name='symbol'>
          <Input />
        </Form.Item>

        <Form.Item label='Chain Id' name='chain_id'>
          <Input />
        </Form.Item>

        <Form.Item label='EVM' name='evm'>
          <Radio.Group>
            <Radio value={true}>YES</Radio>
            <Radio value={false}>NO</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label='Testnet' name='testnet'>
          <Radio.Group>
            <Radio value={true}>YES</Radio>
            <Radio value={false}>NO</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label='Explorer' name='explorer'>
          <Input />
        </Form.Item>
      </UniModalForm>
    </UniModal>
  )
}
