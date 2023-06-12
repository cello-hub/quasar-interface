// import type { FormProps } from 'antd/es/form'
import { Form, FormProps } from 'antd'

interface IUniModalFormProps extends FormProps {
  children: React.ReactNode
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}

export default function UniModalForm(props: IUniModalFormProps) {
  return (
    <Form
      preserve={false}
      autoComplete='off'
      labelAlign='right'
      labelWrap
      colon={false}
      {...layout}
      {...props}
    >
      {props.children}
    </Form>
  )
}
