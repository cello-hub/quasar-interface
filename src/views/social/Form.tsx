import { Form, Input, Radio, Select } from 'antd'
import { ISocial } from '../../types/entities/social'
import UniModal from '../../components/UniModal'
import UniModalForm from '../../components/UniModalForm'
import { useEffect, useState } from 'react'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'
import {
  SocialPlatfrom,
  SocialPlatfromOptions
} from '../../constants/social-platform'
import { createSocialAccount, updateSocialAccount } from '../../api/social'

interface IWalletForm {
  open: boolean
  onCloseFormModal: () => void
  social?: ISocial
  onSubmitSucceed: () => void
}

export default function SocialForm(props: IWalletForm) {
  const { social } = props
  const [saving, setSaving] = useState(false)
  const [form] = useForm<ISocial>()

  useEffect(() => {
    form.resetFields()
  }, [social])

  const onOk = async () => {
    setSaving(true)
    const values = form.getFieldsValue()

    if (!social?.id) {
      await createSocialAccount(values)
    } else {
      // 更新
      await updateSocialAccount(social!.id, values)
    }
    setSaving(false)
    props.onSubmitSucceed()
  }

  return (
    <UniModal
      title={social ? 'EDIT' : 'CREATE'}
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
          ...social,
          platform: social?.platform ?? SocialPlatfrom[0],
          available: social?.available ?? true
        }}
      >
        <Form.Item label='ACCOUNT' name='account' rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        {!social && (
          <Form.Item
            label='PASSWORD'
            name='password'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        )}

        <Form.Item
          label='PLATFORM'
          name='platform'
          rules={[{ required: true }]}
        >
          <Select options={SocialPlatfromOptions} />
        </Form.Item>

        <Form.Item label='AVAILABLE' name='available'>
          <Radio.Group>
            <Radio value={true}>YES</Radio>
            <Radio value={false}>NO</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label='REMARK' name='remark'>
          <TextArea rows={4} />
        </Form.Item>
      </UniModalForm>
    </UniModal>
  )
}
