import { DatePicker, Form, Input, Radio } from 'antd'
import UniModalForm from '../../components/UniModalForm'
import UniModal from '../../components/UniModal'
import { useEffect, useState } from 'react'
import { useForm } from 'antd/es/form/Form'
import { IEcosystem } from '../../types/entities/ecosystem'

import EcosystemSelect from '../../components/EcosystemSelect'
import { IParticipate } from '../../types/entities/participate'
import { ISaveParticipateParams } from '../../api/participate/types'
import { saveParticipate } from '../../api/participate'

interface IParticipateFormProps {
  open: boolean
  participate?: IParticipate
  onCloseFormModal: () => void
  onSubmitSucceed: () => void
}

export default function ParticipateForm(props: IParticipateFormProps) {
  const { participate } = props
  const [saving, setSaving] = useState(false)
  const [form] = useForm<ISaveParticipateParams>()

  const [data, setData] = useState<IEcosystem[]>([])

  useEffect(() => {
    form.resetFields()
  }, [participate])

  const onOk = async () => {
    // setSaving(true)
    const params = form.getFieldsValue()
    console.log(params)

    // if (participate) {
    //   params.id = participate.id
    // }

    // if (params.date) {
    //   // params.date = dayjs(params.date)
    // }
    // try {
    //   await saveParticipate(params)
    //   setSaving(false)
    //   props.onSubmitSucceed()
    // } catch (error) {
    //   setSaving(false)
    // }
  }

  return (
    <UniModal
      title={participate ? 'EDIT' : 'CREATE'}
      open={props.open}
      confirmLoading={saving}
      onCancel={props.onCloseFormModal}
      onOk={onOk}
    >
      <UniModalForm
        form={form}
        initialValues={{
          finished: false,
          ...participate
        }}
      >
        <Form.Item label='Name' name='name'>
          <Input />
        </Form.Item>

        <Form.Item label='Date' name='date'>
          <DatePicker className='w-[100%]' placeholder='' />
        </Form.Item>

        <Form.Item label='Ecosystem' name='ecosystemId'>
          <EcosystemSelect />
        </Form.Item>

        <Form.Item label='Finished' name='finished'>
          <Radio.Group>
            <Radio value={true}>YES</Radio>
            <Radio value={false}>NO</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label='Remark' name='remark'>
          <Input.TextArea rows={4} />
        </Form.Item>
      </UniModalForm>
    </UniModal>
  )
}
