// import type { FormProps } from 'antd/es/form'
import { Form, FormProps } from 'antd'

interface IUniModalFormProps extends FormProps {
  children: React.ReactNode
}

export default function UniModalForm(props: IUniModalFormProps) {
  return (
    <Form preserve={false} autoComplete='off' labelAlign='right' {...props}>
      {props.children}
    </Form>
  )
}
