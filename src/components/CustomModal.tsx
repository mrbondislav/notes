import { Modal } from 'antd'
import { CustomModalProps } from '../models/component-types'

export function CustomModal({
  isOpen,
  title,
  onOk,
  onCancel,
  modalText
}: CustomModalProps) {
  return (
    <>
      <Modal title={title} open={isOpen} onOk={onOk} onCancel={onCancel}>
        <p>{modalText}</p>
      </Modal>
    </>
  )
}
