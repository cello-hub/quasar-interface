import { Modal, ModalProps } from 'antd'
import { CloseIcon } from '../Icon'

export default function UniModal(props: ModalProps) {
  return (
    <Modal
      closeIcon={<CloseIcon />}
      maskClosable={false}
      destroyOnClose
      maskStyle={{
        backdropFilter: 'blur(5px) hue-rotate(90deg)'
      }}
      {...props}
    >
      {props.children}
    </Modal>
  )
}
