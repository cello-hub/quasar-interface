import { Modal, ModalProps } from 'antd'
import { CloseIcon } from '../Icon/CloseIcon'

export default function UniModal(props: ModalProps) {
  return (
    <Modal
      closeIcon={<CloseIcon />}
      maskClosable={false}
      destroyOnClose
      forceRender
      maskStyle={{
        backdropFilter: 'blur(5px) hue-rotate(90deg)'
      }}
      {...props}
    >
      {props.children}
    </Modal>
  )
}
