// import type { FormProps } from 'antd/es/form'
import { Form, FormProps } from 'antd'

interface IUniModalFormProps extends FormProps {
  children: React.ReactNode
}

export default function UniModalForm(props: IUniModalFormProps) {
  return (
    <Form {...props} preserve={false}>
      {props.children}
    </Form>
  )
}
